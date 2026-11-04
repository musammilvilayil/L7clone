// @ts-nocheck
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useSyncExternalStore,
} from 'react';
import * as THREE from 'three';

export interface BinaryOrbitsHandle {
  ripple: () => void;
}

export interface BinaryOrbitsProps {
  colors?: [string, string];
  backgroundColor?: string;
  mode?: 'auto' | 'glow' | 'ink';
  stars?: number;
  starSize?: number;
  sparkle?: number;
  arms?: number;
  twist?: number;
  armStrength?: number;
  dust?: number;
  core?: number;
  coreSize?: number;
  innerVoid?: number;
  thickness?: number;
  tilt?: number;
  roll?: number;
  scale?: number;
  centerX?: number;
  centerY?: number;
  speed?: number;
  twinkle?: number;
  depth?: number;
  glow?: number;
  intensity?: number;
  interactive?: boolean;
  hoverWake?: boolean;
  clickRipple?: boolean;
  wakeStrength?: number;
  rippleStrength?: number;
  hoverBoost?: number;
  paused?: boolean;
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const TWO_PI = 2 * Math.PI;

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
};

const getReducedMotionSnapshot = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

let cachedCanvasCtx: CanvasRenderingContext2D | null = null;
const parseColor = (colorStr: string, fallback: [number, number, number]): [number, number, number] => {
  if (!cachedCanvasCtx && typeof document !== 'undefined') {
    cachedCanvasCtx = document.createElement('canvas').getContext('2d');
  }
  if (!cachedCanvasCtx) return fallback;
  cachedCanvasCtx.fillStyle = '#010203';
  cachedCanvasCtx.fillStyle = colorStr;
  const style = String(cachedCanvasCtx.fillStyle);
  if (style === '#010203' && colorStr.trim().toLowerCase() !== '#010203') return fallback;
  if (style.startsWith('#')) {
    const hex = style.slice(1);
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  const match = style.match(/[\d.]+/g);
  return !match || match.length < 3
    ? fallback
    : [Number(match[0]) / 255, Number(match[1]) / 255, Number(match[2]) / 255];
};

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const rgbToOklab = ([r, g, b]: [number, number, number]): [number, number, number] => {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const SHADER_SHARED_ORBIT = `
uniform float uTime;
uniform float uSpin;
uniform float uCoreRadius;
uniform float uArms;
uniform float uTwist;
uniform float uEps;
uniform float uPattern;

float omega(float a) {
  return uSpin / sqrt(a * a + uCoreRadius * uCoreRadius);
}

vec3 orbit(float a, float psi, float bulge, out float phase) {
  float th = psi + omega(a) * uTime;
  phase = uArms * (th + uTwist * log(max(a, 1e-3)) - uPattern * uTime);
  float r = a * (1.0 - uEps * cos(phase) * (1.0 - bulge));
  return vec3(r * cos(th), r * sin(th), th);
}
`;

const SHADER_WAKE_COMPUTE = `
precision highp float;
uniform sampler2D uStatic;
uniform sampler2D uState;
uniform vec4 uSegment;
uniform float uGather;
uniform float uDrag;
uniform float uWidth;
uniform float uDecay;
${SHADER_SHARED_ORBIT}
out vec4 fragColor;

void main() {
  ivec2 cell = ivec2(gl_FragCoord.xy);
  vec2 offset = texelFetch(uState, cell, 0).xy;
  if (uGather > 0.0) {
    vec4 star = texelFetch(uStatic, cell, 0);
    float phase;
    vec3 at = orbit(star.x, star.y, star.z, phase);
    vec2 radial = vec2(cos(at.z), sin(at.z));
    vec2 tangent = vec2(-radial.y, radial.x);
    vec2 p = at.xy + radial * offset.x + tangent * offset.y;
    vec2 d = uSegment.zw - uSegment.xy;
    float len = length(d);
    vec2 dir = len > 1e-6 ? d / len : vec2(1.0, 0.0);
    float along = clamp(dot(p - uSegment.xy, dir), 0.0, len);
    vec2 n = p - uSegment.xy - dir * along;
    float w = exp(-dot(n, n) / (uWidth * uWidth)) * (1.0 - 0.7 * star.z) * smoothstep(0.05, 0.3, star.x);
    vec2 delta = (dir * uDrag * uWidth - n * uGather) * w;
    offset += vec2(dot(delta, radial), dot(delta, tangent));
  }
  fragColor = vec4(offset * uDecay, 0.0, 1.0);
}
`;

const SHADER_STARS_VERT = `
in vec4 aOrbit;
in vec4 aTraits;
uniform sampler2D uState;
uniform int uStride;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uFocal;
uniform float uDistance;
uniform float uIncline;
uniform float uRoll;
uniform float uPixelRatio;
uniform float uRealTime;
uniform float uDust;
uniform float uCore;
uniform float uVoid;
uniform float uSize;
uniform float uSizeScale;
uniform float uSparkle;
uniform float uTwinkle;
uniform float uBack;
uniform float uEnergy;
uniform float uInk;
uniform vec3 uLabA;
uniform vec3 uLabB;
uniform vec4 uRipples[6];
uniform float uActive;
${SHADER_SHARED_ORBIT}
out vec3 vColor;
out float vGain;

vec3 labToLinear(vec3 lab) {
  float l = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return max(vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  ), 0.0);
}

void main() {
  float a = aOrbit.x;
  float bulge = aTraits.x;
  float phase;
  vec3 at = orbit(a, aOrbit.y, bulge, phase);
  vec2 radial = vec2(cos(at.z), sin(at.z));
  vec2 tangent = vec2(-radial.y, radial.x);
  vec2 offset = texelFetch(uState, ivec2(gl_VertexID % uStride, gl_VertexID / uStride), 0).xy;
  vec3 p = vec3(at.xy + radial * offset.x + tangent * offset.y, aOrbit.z);
  float tidal = smoothstep(0.004, 0.03, length(offset));
  float ring = 0.0;
  if (uActive > 0.5) {
    for (int k = 0; k < 6; k++) {
      vec4 wave = uRipples[k];
      if (wave.w <= 0.0) continue;
      float age = uRealTime - wave.z;
      if (age < 0.0 || age > 7.0) continue;
      vec2 rel = p.xy - wave.xy;
      float rr = length(rel);
      float front = 0.05 + 0.32 * age;
      float width = 0.07 + 0.03 * age;
      float g = (rr - front) / width;
      float band = exp(-g * g);
      float envelope = wave.w * smoothstep(0.0, 0.7, age) * exp(-age / 2.2) * smoothstep(0.03, 0.2, front + length(wave.xy));
      p.xy -= rel / max(rr, 1e-4) * (rr - front) * 0.55 * envelope * band;
      p.z += 0.03 * envelope * band;
      ring += envelope * band;
    }
  }

  float ci = cos(uIncline);
  float si = sin(uIncline);
  vec3 q = vec3(p.x, p.y * ci + p.z * si, -p.y * si + p.z * ci);
  float cr = cos(uRoll);
  float sr = sin(uRoll);
  q.xy = vec2(cr * q.x - sr * q.y, sr * q.x + cr * q.y);
  float depth = uDistance - q.z;
  vec2 screen = uCenter + uFocal * q.xy / depth;

  float mk = uArms * uTwist;
  float crest = (cos(phase) - mk * sin(phase)) / sqrt(1.0 + mk * mk);
  float arm = pow(max(crest, 0.0), 2.0) * (1.0 - bulge);
  float laneCrest = (cos(phase - 0.55) - mk * sin(phase - 0.55)) / sqrt(1.0 + mk * mk);
  float lane = pow(max(laneCrest, 0.0), 8.0) * (1.0 - arm) * (1.0 - bulge) * smoothstep(0.1, 0.3, a);

  float reach = smoothstep(0.02, 0.55, a);
  vec3 tone = labToLinear(mix(uLabB, uLabA, reach));
  vec3 core = labToLinear(vec3(min(uLabB.x * 1.08 + 0.06, 0.98), uLabB.yz * 0.45));
  vec3 color = mix(tone, core, bulge * 0.75);
  vec3 youngColor = labToLinear(vec3(min(uLabB.x * 0.92, 0.9), uLabB.yz * 1.25));
  float young = smoothstep(0.84, 0.97, aTraits.z) * arm;
  float kindled = clamp(tidal * 0.7 + ring * 1.5, 0.0, 0.75) * (1.0 - bulge * 0.7);
  color = mix(color, youngColor, max(young * 0.75, kindled));
  float bright = step(1.0 - uSparkle, aTraits.y) * (1.0 - bulge * 0.6);
  color = mix(color, vec3(1.0, 0.97, 1.0), bright * 0.35);

  float twinkle = 1.0 - uTwinkle * 0.55 * (0.5 + 0.5 * sin(uRealTime * (0.6 + 1.6 * aTraits.w) + aTraits.w * 61.0));
  float body = mix(0.5 + 1.2 * arm + young * 1.4, uCore * 1.1, bulge) * (1.0 + bright * 2.2);
  body *= 1.0 - uDust * 0.8 * lane;
  float edge = 1.0 - smoothstep(0.82, 1.08, a);
  float hollow = smoothstep(uVoid * 0.85, uVoid * 1.15 + 0.01, a);
  float near = clamp(0.5 + 0.5 * q.z / 0.9, 0.0, 1.0);
  float gain = body * edge * hollow * twinkle * mix(uBack, 1.0, near) * (1.0 + uEnergy * 0.15);
  gain *= 1.0 + 0.9 * tidal * (1.0 - bulge * 0.7) + 0.5 * min(ring, 1.0);

  vColor = mix(color, labToLinear(vec3(uLabA.x * 0.62, uLabA.yz * 1.15)), uInk * 0.35);
  vGain = gain;
  float size = uSize * uSizeScale * uPixelRatio * mix(0.6, 1.1, fract(aTraits.y * 7.31)) * (1.0 + bright * 0.7 + young * 0.4);
  gl_PointSize = max(size * uDistance / depth, 1.0);
  gl_Position = vec4(screen / uResolution * 2.0 - 1.0, 0.0, 1.0);
}
`;

const SHADER_STARS_FRAG = `
precision highp float;
uniform float uStarGain;
in vec3 vColor;
in float vGain;
out vec4 fragColor;

void main() {
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(q, q);
  float e = (exp(-r2 * 6.0) + 0.25 * exp(-r2 * 2.0)) * vGain * uStarGain;
  fragColor = vec4(vColor * e, e);
}
`;

const SHADER_SCREEN_VERT = `
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const SHADER_BLOOM_DOWN = `
precision highp float;
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 fragColor;

void main() {
  vec4 a = texture(uSource, vUv + uTexel * vec2(-1.0, -1.0));
  vec4 b = texture(uSource, vUv + uTexel * vec2(1.0, -1.0));
  vec4 c = texture(uSource, vUv + uTexel * vec2(-1.0, 1.0));
  vec4 d = texture(uSource, vUv + uTexel * vec2(1.0, 1.0));
  fragColor = (a + b + c + d) * 0.125 + texture(uSource, vUv) * 0.5;
}
`;

const SHADER_BLOOM_UP = `
precision highp float;
uniform sampler2D uSource;
uniform sampler2D uBase;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 fragColor;

void main() {
  vec4 sum = texture(uSource, vUv) * 4.0;
  sum += texture(uSource, vUv + uTexel * vec2(-1.0, 0.0)) * 2.0;
  sum += texture(uSource, vUv + uTexel * vec2(1.0, 0.0)) * 2.0;
  sum += texture(uSource, vUv + uTexel * vec2(0.0, -1.0)) * 2.0;
  sum += texture(uSource, vUv + uTexel * vec2(0.0, 1.0)) * 2.0;
  sum += texture(uSource, vUv + uTexel * vec2(-1.0, -1.0));
  sum += texture(uSource, vUv + uTexel * vec2(1.0, -1.0));
  sum += texture(uSource, vUv + uTexel * vec2(-1.0, 1.0));
  sum += texture(uSource, vUv + uTexel * vec2(1.0, 1.0));
  fragColor = texture(uBase, vUv) + sum / 16.0;
}
`;

const SHADER_COMPOSITE = `
precision highp float;
uniform sampler2D uLines;
uniform sampler2D uBloom;
uniform vec3 uBackground;
uniform float uGlow;
uniform float uExposure;
uniform float uMode;
uniform float uGrain;
in vec2 vUv;
out vec4 fragColor;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

void main() {
  vec4 lines = texture(uLines, vUv);
  vec4 bloom = texture(uBloom, vUv);
  vec3 color;
  if (uMode < 0.5) {
    vec3 light = (lines.rgb + bloom.rgb * uGlow) * uExposure;
    vec3 exposed = 1.0 - exp(-light);
    float peak = max(exposed.r, max(exposed.g, exposed.b));
    exposed = mix(exposed, vec3(peak), smoothstep(0.75, 1.0, peak) * 0.35);
    color = uBackground + (1.0 - uBackground) * exposed;
  } else {
    float energy = lines.a + bloom.a * uGlow * 0.2;
    vec3 hue = (lines.rgb + bloom.rgb * uGlow * 0.2) / max(energy, 1e-4);
    float cover = clamp(1.0 - exp(-energy * uExposure * 1.4), 0.0, 0.94);
    color = mix(uBackground, clamp(hue * 0.8, 0.0, 1.0), cover);
  }
  float grain = hash(gl_FragCoord.xy + uGrain * 311.0) - 0.5;
  fragColor = vec4(encode(color) + grain * (1.2 / 255.0), 1.0);
}
`;

export const BinaryOrbits = forwardRef<BinaryOrbitsHandle, BinaryOrbitsProps>(
  function BinaryOrbits(
    {
      colors = ['#2563EB', '#60A5FA'],
      backgroundColor = '#08090C',
      mode = 'auto',
      stars = 70000,
      starSize = 1.7,
      sparkle = 0.5,
      arms = 3,
      twist = 3.5,
      armStrength = 0.5,
      dust = 0.5,
      core = 1,
      coreSize = 0.07,
      innerVoid = 0,
      thickness = 0.02,
      tilt = 62,
      roll = -8,
      scale = 1,
      centerX = 0.5,
      centerY = 0.52,
      speed = 1,
      twinkle = 0.35,
      depth = 0.4,
      glow = 0.45,
      intensity = 1,
      interactive = true,
      hoverWake = true,
      clickRipple = true,
      wakeStrength = 1,
      rippleStrength = 1,
      hoverBoost = 0.5,
      paused = false,
      quality = 1,
      className = '',
      style,
      children,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bridgeRef = useRef<{ ripple: () => void; sync: () => void } | null>(null);
    const reducedMotion = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      () => false
    );

    const propsRef = useRef({
      colors,
      backgroundColor,
      mode,
      stars,
      starSize,
      sparkle,
      arms,
      twist,
      armStrength,
      dust,
      core,
      coreSize,
      innerVoid,
      thickness,
      tilt,
      roll,
      scale,
      centerX,
      centerY,
      speed,
      twinkle,
      depth,
      glow,
      intensity,
      interactive,
      hoverWake,
      clickRipple,
      wakeStrength,
      rippleStrength,
      hoverBoost,
      paused,
      quality,
      reduced: reducedMotion,
    });

    useEffect(() => {
      propsRef.current = {
        colors,
        backgroundColor,
        mode,
        stars,
        starSize,
        sparkle,
        arms,
        twist,
        armStrength,
        dust,
        core,
        coreSize,
        innerVoid,
        thickness,
        tilt,
        roll,
        scale,
        centerX,
        centerY,
        speed,
        twinkle,
        depth,
        glow,
        intensity,
        interactive,
        hoverWake,
        clickRipple,
        wakeStrength,
        rippleStrength,
        hoverBoost,
        paused,
        quality,
        reduced: reducedMotion,
      };
      bridgeRef.current?.sync();
    });

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvas.style.pointerEvents = 'none';
      container.prepend(canvas);

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

      if (!renderer.capabilities.isWebGL2) {
        renderer.dispose();
        canvas.remove();
        return;
      }
      renderer.autoClear = false;

      const floatType =
        renderer.extensions.has('EXT_color_buffer_float') ||
        renderer.extensions.has('EXT_color_buffer_half_float')
          ? THREE.HalfFloatType
          : THREE.UnsignedByteType;

      const screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const quadGeometry = new THREE.PlaneGeometry(2, 2);

      const ripples = Array.from({ length: 6 }, () => new THREE.Vector4(0, 0, -100, 0));
      const stateFloatType = renderer.extensions.has('EXT_color_buffer_float')
        ? THREE.FloatType
        : THREE.HalfFloatType;

      const baseUniforms = {
        uTime: { value: 0 },
        uSpin: { value: 0.11 },
        uCoreRadius: { value: 0.12 },
        uArms: { value: 3 },
        uTwist: { value: 3.5 },
        uEps: { value: 0.1 },
        uPattern: { value: 0.04 },
      };

      const starMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms: {
          ...baseUniforms,
          uState: { value: null },
          uStride: { value: 512 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uCenter: { value: new THREE.Vector2() },
          uFocal: { value: 1 },
          uDistance: { value: 3.6 },
          uIncline: { value: 1 },
          uRoll: { value: 0 },
          uPixelRatio: { value: 1 },
          uRealTime: { value: 0 },
          uDust: { value: 0.5 },
          uCore: { value: 1 },
          uVoid: { value: 0 },
          uSize: { value: 1.4 },
          uSizeScale: { value: 1 },
          uSparkle: { value: 0.08 },
          uTwinkle: { value: 0.4 },
          uBack: { value: 0.5 },
          uEnergy: { value: 0 },
          uInk: { value: 0 },
          uLabA: { value: new THREE.Vector3() },
          uLabB: { value: new THREE.Vector3() },
          uRipples: { value: ripples },
          uActive: { value: 0 },
          uStarGain: { value: 0.3 },
        },
        vertexShader: SHADER_STARS_VERT,
        fragmentShader: SHADER_STARS_FRAG,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.OneFactor,
        blendDst: THREE.OneFactor,
        blendSrcAlpha: THREE.OneFactor,
        blendDstAlpha: THREE.OneFactor,
      });

      const createPassMaterial = (fragmentShader: string, uniforms: any) =>
        new THREE.ShaderMaterial({
          glslVersion: THREE.GLSL3,
          uniforms,
          vertexShader: SHADER_SCREEN_VERT,
          fragmentShader,
          depthTest: false,
          depthWrite: false,
          blending: THREE.NoBlending,
        });

      const wakeMaterial = createPassMaterial(SHADER_WAKE_COMPUTE, {
        ...baseUniforms,
        uStatic: { value: null },
        uState: { value: null },
        uSegment: { value: new THREE.Vector4() },
        uGather: { value: 0 },
        uDrag: { value: 0 },
        uWidth: { value: 0.09 },
        uDecay: { value: 1 },
      });

      const bloomDownMaterial = createPassMaterial(SHADER_BLOOM_DOWN, {
        uSource: { value: null },
        uTexel: { value: new THREE.Vector2() },
      });

      const bloomUpMaterial = createPassMaterial(SHADER_BLOOM_UP, {
        uSource: { value: null },
        uBase: { value: null },
        uTexel: { value: new THREE.Vector2() },
      });

      const compositeMaterial = createPassMaterial(SHADER_COMPOSITE, {
        uLines: { value: null },
        uBloom: { value: null },
        uBackground: { value: new THREE.Vector3() },
        uGlow: { value: 0.5 },
        uExposure: { value: 1 },
        uMode: { value: 0 },
        uGrain: { value: 0 },
      });

      const points = new THREE.Points(new THREE.BufferGeometry(), starMaterial);
      points.frustumCulled = false;
      const starScene = new THREE.Scene();
      starScene.add(points);

      const quadMesh = new THREE.Mesh(quadGeometry, compositeMaterial);
      quadMesh.frustumCulled = false;
      const quadScene = new THREE.Scene();
      quadScene.add(quadMesh);

      let lastConfigKey = '';
      let staticTexture: THREE.DataTexture | null = null;
      let stateTargets: THREE.WebGLRenderTarget[] = [];
      let currentStateIdx = 0;

      const createRenderTarget = (w: number, h: number) =>
        new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), {
          type: floatType,
          format: THREE.RGBAFormat,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          depthBuffer: false,
          stencilBuffer: false,
          generateMipmaps: false,
        });

      let renderTargetScene: THREE.WebGLRenderTarget | null = null;
      const bloomDownTargets: THREE.WebGLRenderTarget[] = [];
      const bloomUpTargets: THREE.WebGLRenderTarget[] = [];

      let isDisposed = false;
      let rafId = 0;
      let lastFrameTime = 0;
      let isIntersecting = true;
      let simTime = 40;
      let realTime = 0;
      let currentEnergy = 0;
      let cssW = 1;
      let cssH = 1;
      let dpr = 1;
      let grainVal = 0;
      let lastWakeTime = -100;

      const pointerState = {
        inside: false,
        disc: null as { x: number; y: number } | null,
        trail: null as { x: number; y: number } | null,
      };

      const clearBloomTargets = () => {
        renderTargetScene?.dispose();
        bloomDownTargets.forEach((t) => t.dispose());
        bloomUpTargets.forEach((t) => t.dispose());
        renderTargetScene = null;
        bloomDownTargets.length = 0;
        bloomUpTargets.length = 0;
      };

      const renderPass = (mat: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null) => {
        quadMesh.material = mat;
        renderer.setRenderTarget(target);
        renderer.render(quadScene, screenCamera);
      };

      const rebuildStarGeometry = () => {
        const p = propsRef.current;
        const totalStars = Math.round(clamp(p.stars, 2000, 250000));
        const cSize = clamp(p.coreSize, 0.02, 0.3);
        const thick = clamp(p.thickness, 0, 0.2);
        const configKey = [totalStars, cSize, thick].join('|');
        if (configKey === lastConfigKey) return;
        lastConfigKey = configKey;

        points.geometry.dispose();
        staticTexture?.dispose();
        stateTargets.forEach((t) => t.dispose());

        // Pseudo-random generator with fixed seed
        let seed = 23;
        const prng = () => {
          seed = (16807 * seed) % 0x7fffffff;
          return seed / 0x7fffffff;
        };
        const normalRand = () =>
          Math.sqrt(-2 * Math.log(Math.max(prng(), 1e-9))) *
          Math.cos(TWO_PI * prng());

        const rows = Math.ceil(totalStars / 512);
        const starBuffer = new Float32Array(8 * totalStars);
        const staticPixels = new Float32Array(512 * rows * 4);

        for (let i = 0; i < totalStars; i++) {
          let a: number;
          let z: number;
          const isBulge = prng() < 0.16;
          if (isBulge) {
            a = Math.min(
              cSize /
                Math.sqrt(
                  Math.pow(Math.min(Math.max(prng(), 1e-4), 0.995), -2 / 3) - 1
                ),
              4 * cSize
            );
            z = normalRand() * a * 0.5;
          } else {
            do {
              a = -0.32 * Math.log(Math.max(prng() * prng(), 1e-9));
            } while (a > 1.08);
            a = Math.max(a, 0.012);
            z = normalRand() * thick * (0.5 + 0.5 * Math.exp(-a / 0.25));
          }
          const psi = prng() * TWO_PI;
          starBuffer.set([a, psi, z, prng(), isBulge ? 1 : 0, prng(), prng(), prng()], 8 * i);
          staticPixels.set([a, psi, isBulge ? 1 : 0, 0], 4 * i);
        }

        const geom = new THREE.BufferGeometry();
        const interleaved = new THREE.InterleavedBuffer(starBuffer, 8);
        geom.setAttribute('aOrbit', new THREE.InterleavedBufferAttribute(interleaved, 4, 0));
        geom.setAttribute('aTraits', new THREE.InterleavedBufferAttribute(interleaved, 4, 4));
        geom.setAttribute('position', new THREE.InterleavedBufferAttribute(interleaved, 3, 0));

        const tex = new THREE.DataTexture(
          staticPixels,
          512,
          rows,
          THREE.RGBAFormat,
          stateFloatType
        );
        tex.minFilter = THREE.NearestFilter;
        tex.magFilter = THREE.NearestFilter;
        tex.generateMipmaps = false;
        tex.needsUpdate = true;

        points.geometry = geom;
        staticTexture = tex;

        stateTargets = [0, 1].map(
          () =>
            new THREE.WebGLRenderTarget(512, rows, {
              type: stateFloatType,
              format: THREE.RGBAFormat,
              minFilter: THREE.NearestFilter,
              magFilter: THREE.NearestFilter,
              depthBuffer: false,
              stencilBuffer: false,
              generateMipmaps: false,
            })
        );
        currentStateIdx = 0;

        for (const target of stateTargets) {
          renderer.setRenderTarget(target);
          renderer.setClearColor(0, 0);
          renderer.clear();
        }

        wakeMaterial.uniforms.uStatic.value = staticTexture;
        starMaterial.uniforms.uState.value = stateTargets[0].texture;
      };

      const getProjectionParams = () => {
        const p = propsRef.current;
        const width = cssW * dpr;
        const height = cssH * dpr;
        const radius = 0.36 * clamp(p.scale, 0.2, 4) * Math.min(width, 1.7 * height);
        return {
          incline: (clamp(p.tilt, 0, 85) * Math.PI) / 180,
          roll: (clamp(p.roll, -180, 180) * Math.PI) / 180,
          focal: 3.6 * radius,
          center: [
            clamp(p.centerX, -0.5, 1.5) * width,
            (1 - clamp(p.centerY, -0.5, 1.5)) * height,
          ],
        };
      };

      const pointerToDisc = (clientX: number, clientY: number) => {
        const rect = container.getBoundingClientRect();
        const proj = getProjectionParams();
        const px = (clientX - rect.left) * dpr;
        const py = (rect.height - (clientY - rect.top)) * dpr;
        const nx = (px - proj.center[0]) / proj.focal;
        const ny = (py - proj.center[1]) / proj.focal;
        const cosR = Math.cos(proj.roll);
        const sinR = Math.sin(proj.roll);
        const m = -sinR * nx + cosR * ny;
        const cosI = Math.cos(proj.incline);
        const sinI = Math.sin(proj.incline);
        const denom = cosI - m * sinI;
        if (denom <= 0.02) return null;
        const y = (3.6 * m) / denom;
        return {
          x: (cosR * nx + sinR * ny) * (3.6 + y * sinI),
          y,
        };
      };

      const triggerRipple = (x = 0, y = 0) => {
        const p = propsRef.current;
        if (p.reduced || p.paused) return;
        const strength = clamp(p.rippleStrength, 0, 3);
        let newest = 0;
        let oldest = 0;
        for (let i = 1; i < 6; i++) {
          if (ripples[i].z > ripples[newest].z) newest = i;
          if (ripples[i].z < ripples[oldest].z) oldest = i;
        }
        const activeWave = ripples[newest];
        if (
          activeWave.w > 0 &&
          realTime - activeWave.z < 0.35 &&
          Math.hypot(activeWave.x - x, activeWave.y - y) < 0.15
        ) {
          activeWave.w = Math.min(activeWave.w + 0.3 * strength, 1.6 * strength);
        } else if (realTime - ripples[oldest].z > 7) {
          ripples[oldest].set(x, y, realTime, strength);
        } else {
          activeWave.w = Math.min(activeWave.w + 0.25 * strength, 1.6 * strength);
        }
        requestFrameIfNeeded();
      };

      const hasActiveRipples = () =>
        ripples.some((r) => r.w > 0 && realTime - r.z < 7);

      const updateUniformsAndRender = () => {
        if (!renderTargetScene || !bloomDownTargets.length) return;
        rebuildStarGeometry();
        const p = propsRef.current;
        const su = starMaterial.uniforms;
        const fullW = cssW * dpr;
        const fullH = cssH * dpr;
        const proj = getProjectionParams();

        const bgRgb = parseColor(p.backgroundColor, [0.04, 0.04, 0.04]);
        const lum = 0.2126 * bgRgb[0] + 0.7152 * bgRgb[1] + 0.0722 * bgRgb[2];
        const isInkMode = p.mode === 'ink' || (p.mode === 'auto' && lum > 0.5);

        const labA = rgbToOklab(parseColor(p.colors[0], [0.48, 0.3, 1]));
        const labB = rgbToOklab(parseColor(p.colors[1], [1, 0.78, 0.95]));

        const armCount = Math.round(clamp(p.arms, 1, 8));
        const twistVal = clamp(p.twist, 0.5, 8);
        const armStr = clamp(p.armStrength, 0, 1);

        su.uResolution.value.set(fullW, fullH);
        su.uCenter.value.set(proj.center[0], proj.center[1]);
        su.uFocal.value = proj.focal;
        su.uIncline.value = proj.incline;
        su.uRoll.value = proj.roll;
        su.uPixelRatio.value = dpr;

        baseUniforms.uTime.value = simTime;
        su.uRealTime.value = realTime;
        baseUniforms.uArms.value = armCount;
        baseUniforms.uTwist.value = twistVal;
        baseUniforms.uEps.value =
          (0.92 * armStr) / Math.sqrt(1 + armCount * armCount * twistVal * twistVal);

        su.uDust.value = clamp(p.dust, 0, 1);
        su.uCore.value = clamp(p.core, 0, 3);
        su.uVoid.value = clamp(p.innerVoid, 0, 0.6);
        su.uSize.value = clamp(p.starSize, 0.3, 6);
        su.uSparkle.value = 0.2 * clamp(p.sparkle, 0, 1);
        su.uTwinkle.value = p.reduced ? 0 : clamp(p.twinkle, 0, 1);
        su.uBack.value = 1 - clamp(p.depth, 0, 1);
        su.uEnergy.value = currentEnergy;
        su.uInk.value = isInkMode ? 1 : 0;
        su.uLabA.value.set(labA[0], labA[1], labA[2]);
        su.uLabB.value.set(labB[0], labB[1], labB[2]);
        su.uActive.value = hasActiveRipples() ? 1 : 0;

        const count = Math.round(clamp(p.stars, 2000, 250000));
        const scaleFactor = clamp(Math.pow(proj.focal / 3.6 / dpr / 380, 2), 0.2, 1);
        const sizeScale = clamp(Math.pow(scaleFactor, 0.25), 0.9, 1.22);
        points.geometry.setDrawRange(0, Math.round(count * scaleFactor));
        su.uSizeScale.value = sizeScale;
        su.uStarGain.value =
          0.3 *
          Math.sqrt(60000 / count) *
          clamp(scaleFactor / (scaleFactor * sizeScale * sizeScale), 0.5, 1.5);

        const cu = compositeMaterial.uniforms;
        cu.uBackground.value.set(srgbToLinear(bgRgb[0]), srgbToLinear(bgRgb[1]), srgbToLinear(bgRgb[2]));
        cu.uGlow.value = clamp(p.glow, 0, 3);
        cu.uExposure.value =
          (isInkMode ? 4.5 : 1) * clamp(p.intensity, 0, 4) * (1 + 0.08 * currentEnergy);
        cu.uMode.value = isInkMode ? 1 : 0;
        cu.uGrain.value = grainVal;

        // Render scene lines into primary target
        renderer.setRenderTarget(renderTargetScene);
        renderer.setClearColor(0, 0);
        renderer.clear();
        renderer.render(starScene, screenCamera);

        // Bloom Downsample Passes
        let currentBloomSrc = renderTargetScene;
        for (const target of bloomDownTargets) {
          bloomDownMaterial.uniforms.uSource.value = currentBloomSrc.texture;
          bloomDownMaterial.uniforms.uTexel.value.set(
            1 / currentBloomSrc.width,
            1 / currentBloomSrc.height
          );
          renderPass(bloomDownMaterial, target);
          currentBloomSrc = target;
        }

        // Bloom Upsample Passes
        let currentBloomUp = bloomDownTargets[bloomDownTargets.length - 1];
        for (let i = bloomDownTargets.length - 2; i >= 0; i--) {
          bloomUpMaterial.uniforms.uSource.value = currentBloomUp.texture;
          bloomUpMaterial.uniforms.uBase.value = bloomDownTargets[i].texture;
          bloomUpMaterial.uniforms.uTexel.value.set(
            1 / currentBloomUp.width,
            1 / currentBloomUp.height
          );
          renderPass(bloomUpMaterial, bloomUpTargets[i]);
          currentBloomUp = bloomUpTargets[i];
        }

        // Composite Final Frame
        compositeMaterial.uniforms.uLines.value = renderTargetScene.texture;
        compositeMaterial.uniforms.uBloom.value = currentBloomUp.texture;
        renderPass(compositeMaterial, null);
      };

      const getTargetEnergy = () => {
        const p = propsRef.current;
        return pointerState.inside && p.interactive && !p.reduced
          ? clamp(p.hoverBoost, 0, 2)
          : 0;
      };

      const tick = (now: number) => {
        rafId = 0;
        if (isDisposed) return;
        const delta = Math.min(0.05, Math.max(0, (now - lastFrameTime) / 1000));
        lastFrameTime = now;

        const p = propsRef.current;
        const targetEnergy = getTargetEnergy();
        currentEnergy += (targetEnergy - currentEnergy) * (1 - Math.exp(-delta / 0.5));

        if (!p.paused && !p.reduced) {
          realTime += delta;
          simTime += delta * clamp(p.speed, -4, 4) * (1 + 0.25 * currentEnergy);
          grainVal = (grainVal + 0.618034) % 1;
        }

        rebuildStarGeometry();

        // Wake simulation step
        if (stateTargets.length && !p.paused && !p.reduced && delta > 0) {
          let gather = 0;
          let drag = 0;
          const trail = pointerState.trail;
          const disc = pointerState.disc;
          const wu = wakeMaterial.uniforms;

          if (pointerState.inside && p.interactive && p.hoverWake && trail && disc) {
            const dist = Math.hypot(disc.x - trail.x, disc.y - trail.y);
            if (dist > 1e-5) {
              const speedRatio = clamp((dist / Math.max(delta, 1 / 240) - 0.05) / 1.15, 0, 1);
              gather = 0.9 * clamp(p.wakeStrength, 0, 3) * speedRatio * speedRatio * (3 - 2 * speedRatio) * dist / (dist + 0.16);
              drag = 0.25 * gather;
              wu.uSegment.value.set(trail.x, trail.y, disc.x, disc.y);
              if (gather > 0) lastWakeTime = realTime;
            }
          }

          pointerState.trail = disc ? { x: disc.x, y: disc.y } : null;

          if (gather > 0 || realTime - lastWakeTime <= 24.5) {
            wu.uGather.value = gather;
            wu.uDrag.value = drag;
            wu.uDecay.value = Math.exp(-delta / 3.5);
            wu.uState.value = stateTargets[currentStateIdx].texture;
            wu.uTime.value = simTime;

            quadMesh.material = wakeMaterial;
            renderer.setRenderTarget(stateTargets[1 - currentStateIdx]);
            renderer.render(quadScene, screenCamera);
            currentStateIdx = 1 - currentStateIdx;
            starMaterial.uniforms.uState.value = stateTargets[currentStateIdx].texture;
          }
        }

        updateUniformsAndRender();

        const activeSimulation =
          (!p.paused && !p.reduced) ||
          Math.abs(currentEnergy - getTargetEnergy()) > 0.002 ||
          hasActiveRipples() ||
          realTime - lastWakeTime < 24.5;

        if (isIntersecting && !document.hidden && activeSimulation) {
          rafId = requestAnimationFrame(tick);
        }
      };

      const requestFrameIfNeeded = () => {
        if (!isDisposed && !rafId && isIntersecting) {
          lastFrameTime = performance.now();
          rafId = requestAnimationFrame(tick);
        }
      };

      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        cssW = Math.max(1, rect.width);
        cssH = Math.max(1, rect.height);
        dpr = Math.min(window.devicePixelRatio || 1, 2) * clamp(propsRef.current.quality, 0.25, 1);
        renderer.setPixelRatio(dpr);
        renderer.setSize(cssW, cssH, false);

        const physW = Math.round(cssW * dpr);
        const physH = Math.round(cssH * dpr);
        clearBloomTargets();

        renderTargetScene = createRenderTarget(physW, physH);
        const bloomPasses = clamp(Math.floor(Math.log2(Math.min(physW, physH) / 8)), 3, 7);
        for (let i = 1; i <= bloomPasses; i++) {
          bloomDownTargets.push(createRenderTarget(Math.max(1, physW >> i), Math.max(1, physH >> i)));
          bloomUpTargets.push(createRenderTarget(Math.max(1, physW >> i), Math.max(1, physH >> i)));
        }

        updateUniformsAndRender();
        requestFrameIfNeeded();
      };

      const onPointerMove = (e: PointerEvent) => {
        const p = propsRef.current;
        if (e.pointerType === 'touch' || !p.interactive) return;
        if (!pointerState.inside) {
          pointerState.inside = true;
          pointerState.trail = null;
          requestFrameIfNeeded();
        }
        const coords = pointerToDisc(e.clientX, e.clientY);
        pointerState.disc = coords && Math.hypot(coords.x, coords.y) < 1.6 ? coords : null;
        if (!pointerState.disc) pointerState.trail = null;
        requestFrameIfNeeded();
      };

      const onPointerLeave = () => {
        pointerState.inside = false;
        pointerState.disc = null;
        pointerState.trail = null;
        requestFrameIfNeeded();
      };

      const onPointerDown = (e: PointerEvent) => {
        const p = propsRef.current;
        if (e.button !== 0 || !p.interactive || !p.clickRipple) return;
        const coords = pointerToDisc(e.clientX, e.clientY);
        const isValid = coords && Math.hypot(coords.x, coords.y) < 1.2;
        triggerRipple(isValid ? coords.x : 0, isValid ? coords.y : 0);
      };

      container.addEventListener('pointermove', onPointerMove);
      container.addEventListener('pointerleave', onPointerLeave);
      container.addEventListener('pointercancel', onPointerLeave);
      container.addEventListener('pointerdown', onPointerDown);

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          isIntersecting = entries.some((entry) => entry.isIntersecting);
          if (isIntersecting) requestFrameIfNeeded();
        },
        { rootMargin: '80px' }
      );
      intersectionObserver.observe(container);

      const onVisibilityChange = () => {
        if (!document.hidden) requestFrameIfNeeded();
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      const onContextLost = (e: Event) => e.preventDefault();
      canvas.addEventListener('webglcontextlost', onContextLost);

      handleResize();

      bridgeRef.current = {
        sync: () => {
          const currentDprTarget =
            Math.min(window.devicePixelRatio || 1, 2) *
            clamp(propsRef.current.quality, 0.25, 1);
          if (Math.abs(currentDprTarget - dpr) > 0.001) {
            handleResize();
          } else {
            updateUniformsAndRender();
          }
          requestFrameIfNeeded();
        },
        ripple: () => triggerRipple(0, 0),
      };

      return () => {
        isDisposed = true;
        if (rafId) cancelAnimationFrame(rafId);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerleave', onPointerLeave);
        container.removeEventListener('pointercancel', onPointerLeave);
        container.removeEventListener('pointerdown', onPointerDown);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        clearBloomTargets();
        points.geometry.dispose();
        staticTexture?.dispose();
        stateTargets.forEach((t) => t.dispose());
        quadGeometry.dispose();
        [starMaterial, wakeMaterial, bloomDownMaterial, bloomUpMaterial, compositeMaterial].forEach(
          (m) => m.dispose()
        );
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
        bridgeRef.current = null;
      };
    }, []);

    useImperativeHandle(ref, () => ({
      ripple: () => bridgeRef.current?.ripple(),
    }), []);

    return (
      <div
        ref={containerRef}
        className={`relative isolate h-full min-h-[240px] w-full overflow-hidden ${className}`}
        style={{ backgroundColor, ...style }}
      >
        {children && (
          <div className="relative z-10 h-full w-full pointer-events-auto">
            {children}
          </div>
        )}
      </div>
    );
  }
);

BinaryOrbits.displayName = 'BinaryOrbits';

export default BinaryOrbits;

