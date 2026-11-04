import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useSyncExternalStore,
} from 'react';
import * as THREE from 'three';

export interface DepthImageHandle {
  setLightPosition: (x: number, y: number) => void;
}

export interface DepthImageProps {
  image: string;
  depthMap?: string;
  fit?: 'cover' | 'contain';
  depthFromLight?: number;
  depthSmoothing?: number;
  depthContrast?: number;
  invertDepth?: boolean;
  displacement?: number;
  normalStrength?: number;
  detail?: number;
  shadowIntensity?: number;
  shadowSoftness?: number;
  lightColor?: string;
  lightIntensity?: number;
  falloff?: number;
  elevation?: number;
  ambient?: number;
  ambientColor?: string;
  colorPreserve?: number;
  follow?: number;
  autoOrbit?: boolean;
  orbitRadius?: number;
  orbitDuration?: number;
  view?: 'lit' | 'depth' | 'normal';
  backgroundColor?: string;
  fallbackColor?: string;
  paused?: boolean;
  dpr?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(val) ? val : min));

const parseColor = (colStr: string, fallback: string): THREE.Color => {
  const col = new THREE.Color();
  try {
    col.setStyle(colStr, THREE.SRGBColorSpace);
  } catch {
    col.setStyle(fallback, THREE.SRGBColorSpace);
  }
  return col;
};

const updateColor = (target: THREE.Color, colStr: string) => {
  try {
    target.setStyle(colStr, THREE.SRGBColorSpace);
  } catch {}
};

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const loadTextureAsync = (
  url: string,
  anisotropy: number,
  onComplete: (data: { texture: THREE.Texture; width: number; height: number } | null) => void
) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';
  let cancelled = false;

  img.onload = () => {
    if (cancelled) return;
    const tex = new THREE.Texture(img);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.anisotropy = anisotropy;
    tex.needsUpdate = true;
    onComplete({
      texture: tex,
      width: img.naturalWidth || 512,
      height: img.naturalHeight || 512,
    });
  };

  img.onerror = () => {
    if (!cancelled) onComplete(null);
  };

  img.src = url;
  return () => {
    cancelled = true;
  };
};

const VERTEX_SHADER_QUAD = `out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;
const FRAGMENT_SHADER_DEPTH_GEN = `precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uImage;
uniform sampler2D uDepthMap;
uniform float uHasDepthMap;
uniform float uFromLight;
uniform float uContrast;
uniform float uInvert;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main() {
  float depth;
  if (uHasDepthMap > 0.5) {
    depth = texture(uDepthMap, vUv).r;
  } else {



    float near = luma(texture(uImage, vUv).rgb);
    float wide = luma(texture(uImage, vUv).rgb);
    float bright = mix(near, wide, 0.5);
    float floorward = 1.0 - vUv.y;
    depth = mix(floorward, bright, uFromLight);
  }
  depth = clamp((depth - 0.5) * uContrast + 0.5, 0.0, 1.0);
  depth = mix(depth, 1.0 - depth, uInvert);
  fragColor = vec4(depth, depth, depth, 1.0);
}`;
const FRAGMENT_SHADER_BLUR = `precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uSource;
uniform vec2 uDirection;
uniform float uRadius;

const int TAPS = 16;

void main() {
  if (uRadius < 0.5) {
    fragColor = texture(uSource, vUv);
    return;
  }
  float sigma = uRadius * 0.5;
  float stride = uRadius / float(TAPS);
  float total = 1.0;
  float sum = texture(uSource, vUv).r;
  for (int i = 1; i <= TAPS; i++) {
    float offset = float(i) * stride;
    float weight = exp(-(offset * offset) / (2.0 * sigma * sigma));
    vec2 shift = uDirection * offset;
    sum += texture(uSource, vUv + shift).r * weight;
    sum += texture(uSource, vUv - shift).r * weight;
    total += weight * 2.0;
  }
  float depth = sum / total;
  fragColor = vec4(depth, depth, depth, 1.0);
}`;
const FRAGMENT_SHADER_MAIN = `precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2 uImageSize;
uniform vec2 uDepthSize;
uniform float uReady;
uniform vec3 uFallback;
uniform vec3 uBackground;
uniform vec2 uResolution;
uniform float uContain;

uniform vec3 uLight;
uniform vec3 uLightColor;
uniform float uIntensity;
uniform float uFalloff;
uniform float uAmbient;
uniform vec3 uAmbientColor;
uniform float uColorPreserve;

uniform float uDisplacement;
uniform float uNormalStrength;
uniform float uDetail;
uniform float uShadowIntensity;
uniform float uShadowSoftness;
uniform float uView;

const int SHADOW_STEPS = 12;
const float MIN_LIGHT_ANGLE = 0.15;
const float SOFTNESS_GROWTH = 3.0;
const float DETAIL_LOD = 3.0;
const float DETAIL_TEXELS = 8.0;
const float GRADIENT_TEXELS = 3.0;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }


vec2 fitScale() {
  float plane = uResolution.x / uResolution.y;
  float photo = uImageSize.x / uImageSize.y;
  vec2 s = vec2(1.0);
  bool wider = photo > plane;
  if (uContain > 0.5) wider = !wider;
  if (wider) s.x = plane / photo; else s.y = photo / plane;
  return s;
}

vec2 depthGradient(vec2 uv, vec2 step) {
  float l = texture(uDepth, uv - vec2(step.x, 0.0)).r;
  float r = texture(uDepth, uv + vec2(step.x, 0.0)).r;
  float b = texture(uDepth, uv - vec2(0.0, step.y)).r;
  float t = texture(uDepth, uv + vec2(0.0, step.y)).r;
  return vec2(r - l, t - b) * 0.5;
}

vec2 detailGradient(vec2 uv, vec2 step) {
  float l = luma(texture(uImage, uv - vec2(step.x, 0.0)).rgb);
  float r = luma(texture(uImage, uv + vec2(step.x, 0.0)).rgb);
  float b = luma(texture(uImage, uv - vec2(0.0, step.y)).rgb);
  float t = luma(texture(uImage, uv + vec2(0.0, step.y)).rgb);
  return vec2(r - l, t - b) * 0.5;
}

void main() {
  if (uReady < 0.5) {
    fragColor = vec4(uFallback, 1.0);
    return;
  }

  float aspect = uResolution.x / uResolution.y;
  vec2 scale = fitScale();
  vec2 uv = (vUv - 0.5) * scale + 0.5;

  if (uContain > 0.5 && (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0)) {
    fragColor = vec4(uFallback, 1.0);
    return;
  }



  vec2 worldPerUv = vec2(2.0 * aspect, 2.0) / scale;

  vec3 albedo = texture(uImage, uv).rgb;
  float depth = texture(uDepth, uv).r;

  vec2 step = vec2(GRADIENT_TEXELS) / uDepthSize;
  vec2 slope = depthGradient(uv, step) / (step * worldPerUv)
    * uDisplacement * uNormalStrength;
  vec2 fine = detailGradient(uv, vec2(DETAIL_TEXELS) / uImageSize) * uDetail * 4.0;
  vec3 normal = normalize(vec3(-slope.x - fine.x, -slope.y - fine.y, 1.0));

  vec3 surface = vec3((vUv - 0.5) * vec2(2.0 * aspect, 2.0), (depth - 1.0) * uDisplacement);
  vec3 toLight = uLight - surface;
  float dist = max(length(toLight), 0.001);
  vec3 dir = toLight / dist;


  float occlusion = 0.0;
  if (uShadowIntensity > 0.0 && dir.z > 0.0) {
    float remaining = 1.0 - depth;
    vec2 rayUv = dir.xy / max(dir.z, MIN_LIGHT_ANGLE) * uDisplacement * remaining / worldPerUv;
    for (int i = 0; i < SHADOW_STEPS; i++) {
      float progress = (float(i) + 1.0) / float(SHADOW_STEPS);
      float rayDepth = depth + remaining * progress;
      float blocker = texture(uDepth, uv + rayUv * progress).r;
      float softness = uShadowSoftness * (progress * SOFTNESS_GROWTH + 1.0);
      occlusion = max(occlusion, clamp((blocker - rayDepth) / softness, 0.0, 1.0));
    }
  }
  float shadow = 1.0 - occlusion * uShadowIntensity;

  float lambert = max(dot(normal, dir), 0.0);
  float attenuation = uIntensity / pow(dist, uFalloff);
  vec3 lit = uLightColor * lambert * attenuation * shadow;
  vec3 fill = uAmbientColor * max(uAmbient, 0.45);
  vec3 exposure = fill + lit;

  exposure = mix(exposure, max(exposure, vec3(luma(albedo) * 0.35)), uColorPreserve);

  vec3 color = albedo * exposure;
  color = clamp(color, 0.0, 1.0);

  if (uView > 1.5) {
    color = normal * 0.5 + 0.5;
  } else if (uView > 0.5) {
    color = vec3(depth);
  }

  fragColor = vec4(color, 1.0);
}`;

export const DepthImage = forwardRef<DepthImageHandle, DepthImageProps>(
  function DepthImage(
    {
      image,
      depthMap,
      fit = 'cover',
      depthFromLight = 0.5,
      depthSmoothing = 7,
      depthContrast = 1.2,
      invertDepth = false,
      displacement = 1.5,
      normalStrength = 1.5,
      detail = 0.8,
      shadowIntensity = 0.7,
      shadowSoftness = 0.1,
      lightColor = '#ffffff',
      lightIntensity = 6,
      falloff = 2.5,
      elevation = 1.2,
      ambient = 0.02,
      ambientColor = '#ffffff',
      colorPreserve = 0,
      follow = 0.12,
      autoOrbit = true,
      orbitRadius = 0.6,
      orbitDuration = 10,
      view = 'lit',
      backgroundColor = '#000000',
      fallbackColor = '#171717',
      paused = false,
      dpr = 1.5,
      className,
      style,
      children,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const reducedMotion = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      () => false
    );

    const propsRef = useRef({
      image,
      depthMap,
      fit,
      depthFromLight,
      depthSmoothing,
      depthContrast,
      invertDepth,
      displacement,
      normalStrength,
      detail,
      shadowIntensity,
      shadowSoftness,
      lightColor,
      lightIntensity,
      falloff,
      elevation,
      ambient,
      ambientColor,
      colorPreserve,
      follow,
      autoOrbit,
      orbitRadius,
      orbitDuration,
      view,
      backgroundColor,
      fallbackColor,
      paused,
      dpr,
      reduced: reducedMotion,
    });

    const pointerRef = useRef({
      x: 0,
      y: 0,
      inside: false,
    });

    const stateRef = useRef<{
      sync: () => void;
      destroy: () => void;
      setLightPosition: (x: number, y: number) => void;
    } | null>(null);

    useEffect(() => {
      propsRef.current = {
        image,
        depthMap,
        fit,
        depthFromLight,
        depthSmoothing,
        depthContrast,
        invertDepth,
        displacement,
        normalStrength,
        detail,
        shadowIntensity,
        shadowSoftness,
        lightColor,
        lightIntensity,
        falloff,
        elevation,
        ambient,
        ambientColor,
        colorPreserve,
        follow,
        autoOrbit,
        orbitRadius,
        orbitDuration,
        view,
        backgroundColor,
        fallbackColor,
        paused,
        dpr,
        reduced: reducedMotion,
      };
      stateRef.current?.sync();
    });

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const doc = container.ownerDocument;
      const win = doc.defaultView ?? window;

      const canvas = doc.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;';
      container.prepend(canvas);
      canvasRef.current = canvas;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: false,
          antialias: false,
          powerPreference: 'high-performance',
        });
      } catch {
        canvas.remove();
        return;
      }

      renderer.autoClear = false;

      const quadGeom = new THREE.PlaneGeometry(2, 2);
      const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // 1. Depth generation & blur pass objects
      const depthScene = new THREE.Scene();
      const depthGenMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: VERTEX_SHADER_QUAD,
        fragmentShader: FRAGMENT_SHADER_DEPTH_GEN,
        uniforms: {
          uImage: { value: null as THREE.Texture | null },
          uDepthMap: { value: null as THREE.Texture | null },
          uHasDepthMap: { value: 0 },
          uFromLight: { value: 0.5 },
          uContrast: { value: 1.2 },
          uInvert: { value: 0 },
        },
        depthTest: false,
        depthWrite: false,
      });

      const depthBlurMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: VERTEX_SHADER_QUAD,
        fragmentShader: FRAGMENT_SHADER_BLUR,
        uniforms: {
          uSource: { value: null as THREE.Texture | null },
          uDirection: { value: new THREE.Vector2(1, 0) },
          uRadius: { value: 0 },
        },
        depthTest: false,
        depthWrite: false,
      });

      const depthMesh = new THREE.Mesh(quadGeom, depthGenMaterial);
      depthScene.add(depthMesh);

      const targetType =
        renderer.extensions.has('EXT_color_buffer_float') ||
        renderer.extensions.has('EXT_color_buffer_half_float')
          ? THREE.HalfFloatType
          : THREE.UnsignedByteType;

      const createDepthTarget = () =>
        new THREE.WebGLRenderTarget(512, 512, {
          type: targetType,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          depthBuffer: false,
          stencilBuffer: false,
          generateMipmaps: false,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
        });

      let depthTarget = createDepthTarget();
      let scratchTarget = createDepthTarget();

      // 2. Main Relight Scene & Material
      const mainScene = new THREE.Scene();
      const mainUniforms = {
        uImage: { value: null as THREE.Texture | null },
        uDepth: { value: depthTarget.texture as THREE.Texture },
        uImageSize: { value: new THREE.Vector2(1, 1) },
        uDepthSize: { value: new THREE.Vector2(512, 512) },
        uReady: { value: 0 },
        uFallback: { value: parseColor(propsRef.current.fallbackColor, '#171717') },
        uBackground: { value: parseColor(propsRef.current.backgroundColor, '#000000') },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uContain: { value: propsRef.current.fit === 'contain' ? 1 : 0 },
        uLight: { value: new THREE.Vector3(0.4, 0.3, 1) },
        uLightColor: { value: parseColor(propsRef.current.lightColor, '#ffffff') },
        uIntensity: { value: 6 },
        uFalloff: { value: 2.5 },
        uAmbient: { value: 0.02 },
        uAmbientColor: { value: parseColor(propsRef.current.ambientColor, '#ffffff') },
        uColorPreserve: { value: 0 },
        uDisplacement: { value: 1.5 },
        uNormalStrength: { value: 1.5 },
        uDetail: { value: 0.8 },
        uShadowIntensity: { value: 0.7 },
        uShadowSoftness: { value: 0.1 },
        uView: { value: 0 },
      };

      const mainMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: VERTEX_SHADER_QUAD,
        fragmentShader: FRAGMENT_SHADER_MAIN,
        uniforms: mainUniforms,
        depthTest: false,
        depthWrite: false,
      });

      const mainMesh = new THREE.Mesh(quadGeom, mainMaterial);
      mainScene.add(mainMesh);

      let currentLightPos = new THREE.Vector2(0.4, 0.3);
      let targetLightPos = new THREE.Vector2(0.4, 0.3);
      let orbitAngle = 0;
      let needsDepthUpdate = true;
      let isVisible = true;
      let isDestroyed = false;
      let animFrameId = 0;
      let lastTime = 0;
      let cssWidth = 1;
      let cssHeight = 1;
      let dprVal = 1;

      let imageTexture: THREE.Texture | null = null;
      let depthMapTexture: THREE.Texture | null = null;
      let cancelImageLoad: (() => void) | null = null;
      let cancelDepthLoad: (() => void) | null = null;
      let loadedImageSrc = '';

      const syncTextures = () => {
        const p = propsRef.current;
        const maxAniso = renderer.capabilities.getMaxAnisotropy();

        cancelImageLoad?.();
        cancelImageLoad = loadTextureAsync(p.image, maxAniso, (data) => {
          if (!data) {
            mainUniforms.uReady.value = 0;
            depthGenMaterial.uniforms.uImage.value = null;
            requestDraw();
            return;
          }
          loadedImageSrc = p.image;
          imageTexture?.dispose();
          imageTexture = data.texture;
          mainUniforms.uImage.value = data.texture;
          mainUniforms.uImageSize.value.set(data.width, data.height);
          mainUniforms.uReady.value = 1;
          depthGenMaterial.uniforms.uImage.value = data.texture;

          const depthH = Math.max(1, Math.round((512 * data.height) / data.width));
          depthTarget.setSize(512, depthH);
          scratchTarget.setSize(512, depthH);
          mainUniforms.uDepthSize.value.set(512, depthH);
          needsDepthUpdate = true;
          requestDraw();
        });

        cancelDepthLoad?.();
        if (p.depthMap) {
          cancelDepthLoad = loadTextureAsync(p.depthMap, 1, (data) => {
            if (!data) {
              depthGenMaterial.uniforms.uHasDepthMap.value = 0;
              depthGenMaterial.uniforms.uDepthMap.value = null;
              needsDepthUpdate = true;
              requestDraw();
              return;
            }
            depthMapTexture?.dispose();
            depthMapTexture = data.texture;
            depthGenMaterial.uniforms.uDepthMap.value = data.texture;
            depthGenMaterial.uniforms.uHasDepthMap.value = 1;
            needsDepthUpdate = true;
            requestDraw();
          });
        } else {
          depthGenMaterial.uniforms.uHasDepthMap.value = 0;
          depthGenMaterial.uniforms.uDepthMap.value = null;
          needsDepthUpdate = true;
          requestDraw();
        }
      };

      const syncUniforms = () => {
        const p = propsRef.current;
        const dU = depthGenMaterial.uniforms;
        dU.uFromLight.value = clamp(p.depthFromLight, 0, 1);
        dU.uContrast.value = Math.max(0, p.depthContrast);
        dU.uInvert.value = p.invertDepth ? 1 : 0;

        const mU = mainUniforms;
        updateColor(mU.uFallback.value, p.fallbackColor);
        updateColor(mU.uBackground.value, p.backgroundColor);
        updateColor(mU.uLightColor.value, p.lightColor);
        updateColor(mU.uAmbientColor.value, p.ambientColor);
        mU.uContain.value = p.fit === 'contain' ? 1 : 0;
        mU.uIntensity.value = Math.max(0, p.lightIntensity);
        mU.uFalloff.value = Math.max(0, p.falloff);
        mU.uAmbient.value = Math.max(0, p.ambient);
        mU.uColorPreserve.value = clamp(p.colorPreserve, 0, 1);
        mU.uDisplacement.value = Math.max(0, p.displacement);
        mU.uNormalStrength.value = Math.max(0, p.normalStrength);
        mU.uDetail.value = Math.max(0, p.detail);
        mU.uShadowIntensity.value = clamp(p.shadowIntensity, 0, 1);
        mU.uShadowSoftness.value = Math.max(0.002, p.shadowSoftness);
        mU.uView.value = p.view === 'normal' ? 2 : p.view === 'depth' ? 1 : 0;

        needsDepthUpdate = true;
        requestDraw();
      };

      const executeDepthPass = () => {
        const p = propsRef.current;
        const blurRadius = 5 * Math.max(0, p.depthSmoothing);

        // 1. Generate depth
        depthMesh.material = depthGenMaterial;
        renderer.setRenderTarget(depthTarget);
        renderer.render(depthScene, orthoCamera);

        // 2. Separable Blur if radius is active
        if (blurRadius >= 0.5) {
          const w = depthTarget.width;
          const h = depthTarget.height;
          depthBlurMaterial.uniforms.uRadius.value = blurRadius;

          // Horizontal blur pass into scratch
          depthMesh.material = depthBlurMaterial;
          depthBlurMaterial.uniforms.uSource.value = depthTarget.texture;
          depthBlurMaterial.uniforms.uDirection.value.set(1 / w, 0);
          renderer.setRenderTarget(scratchTarget);
          renderer.render(depthScene, orthoCamera);

          // Vertical blur pass back into depthTarget
          depthBlurMaterial.uniforms.uSource.value = scratchTarget.texture;
          depthBlurMaterial.uniforms.uDirection.value.set(0, 1 / h);
          renderer.setRenderTarget(depthTarget);
          renderer.render(depthScene, orthoCamera);

          depthBlurMaterial.uniforms.uSource.value = null;
        }

        renderer.setRenderTarget(null);
      };

      const renderFrame = (nowMs: number) => {
        animFrameId = 0;
        if (isDestroyed || !isVisible) return;

        const dt = Math.min(Math.max((nowMs - lastTime) / 1000, 0), 0.05);
        lastTime = nowMs;

        const p = propsRef.current;
        const aspect = cssWidth / Math.max(cssHeight, 1);
        mainUniforms.uResolution.value.set(cssWidth, cssHeight);

        // Execute depth pass once or when params change
        if (needsDepthUpdate && mainUniforms.uReady.value > 0.5) {
          needsDepthUpdate = false;
          executeDepthPass();
        }

        // Calculate cursor light target vs auto orbit
        const ptr = pointerRef.current;
        const isInteracting = ptr.inside && !p.reduced && !p.paused;

        if (isInteracting) {
          targetLightPos.set(ptr.x * aspect, ptr.y);
        } else if (p.autoOrbit && !p.paused && !p.reduced) {
          orbitAngle += dt / Math.max(p.orbitDuration, 0.1);
          const rad = orbitAngle * Math.PI * 2;
          targetLightPos.set(
            Math.cos(rad) * p.orbitRadius * aspect,
            Math.sin(rad) * p.orbitRadius
          );
        }

        const lerpFactor = p.reduced ? 1 : p.follow >= 1 ? 1 : 1 - Math.pow(1 - clamp(p.follow, 0, 1), 60 * dt);
        currentLightPos.lerp(targetLightPos, lerpFactor);
        mainUniforms.uLight.value.set(
          currentLightPos.x,
          currentLightPos.y,
          p.elevation
        );

        // Render main relit image
        renderer.setRenderTarget(null);
        renderer.render(mainScene, orthoCamera);

        const shouldLoop =
          (!p.paused && !p.reduced && p.autoOrbit) ||
          currentLightPos.distanceTo(targetLightPos) > 0.001 ||
          isInteracting;

        if (isVisible && !doc.hidden && shouldLoop) {
          animFrameId = win.requestAnimationFrame(renderFrame);
        }
      };

      const requestDraw = () => {
        if (isDestroyed || !isVisible || animFrameId) return;
        lastTime = win.performance.now();
        animFrameId = win.requestAnimationFrame(renderFrame);
      };

      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        cssWidth = Math.max(1, container.clientWidth || rect.width);
        cssHeight = Math.max(1, container.clientHeight || rect.height);
        dprVal = Math.min(win.devicePixelRatio || 1, Math.max(propsRef.current.dpr, 0.5));

        renderer.setPixelRatio(dprVal);
        renderer.setSize(cssWidth, cssHeight, false);

        needsDepthUpdate = true;
        requestDraw();
      };

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / Math.max(rect.width, 1);
        const relY = (e.clientY - rect.top) / Math.max(rect.height, 1);
        const inside = relX >= 0 && relX <= 1 && relY >= 0 && relY <= 1;

        if (inside) {
          pointerRef.current.x = clamp(relX * 2 - 1, -1, 1);
          pointerRef.current.y = clamp(1 - relY * 2, -1, 1);
          pointerRef.current.inside = true;
          requestDraw();
        } else if (pointerRef.current.inside) {
          pointerRef.current.inside = false;
          requestDraw();
        }
      };

      const handlePointerLeave = () => {
        pointerRef.current.inside = false;
        requestDraw();
      };

      win.addEventListener('pointermove', handlePointerMove, { passive: true });
      win.addEventListener('pointerdown', handlePointerMove, { passive: true });
      doc.documentElement.addEventListener('pointerleave', handlePointerLeave, { passive: true });

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) requestDraw();
        },
        { rootMargin: '80px' }
      );
      intersectionObserver.observe(container);

      const handleVisibilityChange = () => {
        if (!doc.hidden && isVisible) requestDraw();
      };
      doc.addEventListener('visibilitychange', handleVisibilityChange);

      handleResize();
      syncTextures();
      syncUniforms();

      stateRef.current = {
        sync: () => {
          syncUniforms();
          if (propsRef.current.image !== loadedImageSrc) {
            syncTextures();
          }
        },
        setLightPosition: (x: number, y: number) => {
          targetLightPos.set(x, y);
          requestDraw();
        },
        destroy: () => {
          isDestroyed = true;
          if (animFrameId) win.cancelAnimationFrame(animFrameId);
          cancelImageLoad?.();
          cancelDepthLoad?.();
          win.removeEventListener('pointermove', handlePointerMove);
          win.removeEventListener('pointerdown', handlePointerMove);
          doc.documentElement.removeEventListener('pointerleave', handlePointerLeave);
          doc.removeEventListener('visibilitychange', handleVisibilityChange);
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          depthTarget.dispose();
          scratchTarget.dispose();
          depthGenMaterial.dispose();
          depthBlurMaterial.dispose();
          mainMaterial.dispose();
          quadGeom.dispose();
          imageTexture?.dispose();
          depthMapTexture?.dispose();
          renderer.dispose();
          canvas.remove();
        },
      };

      return () => {
        stateRef.current?.destroy();
        stateRef.current = null;
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        setLightPosition: (x, y) => stateRef.current?.setLightPosition(x, y),
      }),
      []
    );

    return (
      <div
        ref={containerRef}
        className={clsx('relative touch-none overflow-hidden', className)}
        style={{
          backgroundColor,
          ...style,
        }}
      >
        {children && (
          <div className="pointer-events-none relative z-10 h-full w-full">
            {children}
          </div>
        )}
      </div>
    );
  }
);

function clsx(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export default DepthImage;
