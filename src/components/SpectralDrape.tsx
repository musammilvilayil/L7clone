import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useSyncExternalStore,
} from 'react';
import * as THREE from 'three';

export interface SpectralDrapeHandle {
  pulse: (x?: number, y?: number) => void;
}

export interface SpectralDrapeProps {
  colors?: [string, string] | string[];
  backgroundColor?: string;
  density?: number;
  dotSize?: number;
  strands?: number;
  amplitude?: number;
  frequency?: number;
  thickness?: number;
  depth?: number;
  softness?: number;
  intensity?: number;
  colorShift?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  zoom?: number;
  flow?: number;
  speed?: number;
  interactive?: boolean;
  brush?: number;
  brushRadius?: number;
  parallax?: number;
  clickRipples?: boolean;
  seed?: number;
  paused?: boolean;
  dpr?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DEFAULT_COLORS = ['#6A4BFF', '#E4DBFF'];

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(val) ? val : min));

const toRad = (deg: number) => (deg * Math.PI) / 180;

const isColorTransparent = (col: string) => {
  const t = col.trim().toLowerCase();
  return (
    t === 'transparent' ||
    (/^#[0-9a-f]{8}$/.test(t) && t.endsWith('00')) ||
    (/^#[0-9a-f]{4}$/.test(t) && t.endsWith('0')) ||
    t.match(/^(?:rgba?|hsla?)\(.*[,/]\s*(0|0?\.0+|0%)\s*\)$/) !== null
  );
};

const setColorFromString = (
  target: THREE.Color,
  str: string,
  fallback: string
) => {
  const clean = str.trim();
  try {
    target.set(/^#[0-9a-f]{8}$/i.test(clean) ? clean.slice(0, 7) : clean);
  } catch {
    target.set(fallback);
  }
  return target;
};

const rgbToOklab = (target: THREE.Vector3, col: THREE.Color) => {
  const lr = col.r;
  const lg = col.g;
  const lb = col.b;
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return target.set(
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  );
};

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === 'undefined') return () => { };
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const buildGridGeometry = (density: number) => {
  const factor = Math.sqrt(clamp(density, 0.2, 2.5));
  const cols = Math.max(24, Math.round(260 * factor));
  const rows = Math.max(16, Math.round(170 * factor));
  const coords = new Float32Array(cols * rows * 2);
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      coords[idx++] = c / (cols - 1);
      coords[idx++] = r / (rows - 1);
    }
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('aGrid', new THREE.BufferAttribute(coords, 2));
  geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(cols * rows * 3), 3));
  geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 22);
  return { geometry: geom, spacing: 11 / (cols - 1) };
};

const VERTEX_SHADER = `#define MAX_STRANDS 34
#define MAX_RIPPLES 4

attribute vec2 aGrid;

uniform float uTime;
uniform float uClock;
uniform float uSeed;
uniform float uStrands;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uThickness;
uniform float uDepth;
uniform float uSpacing;
uniform float uSize;
uniform float uViewHeight;
uniform float uIntensity;
uniform float uShift;
uniform vec3 uBodyLab;
uniform vec3 uGlowLab;
uniform vec3 uWake;
uniform vec3 uWakeVector;
uniform float uWakeRadius;
uniform float uAspect;
uniform vec4 uRipple[MAX_RIPPLES];

varying vec3 vColor;
varying float vGlow;

float hash(float n) {
  return fract(sin(n * 127.1 + uSeed * 311.7) * 43758.5453);
}

vec3 labToLinear(vec3 lab) {
  float l = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

float strands(vec2 g, float t) {
  float sum = 0.0;
  for (int k = 0; k < MAX_STRANDS; k++) {
    float index = float(k);
    if (index >= uStrands) break;
    float a = hash(index + 1.0);
    float b = hash(index + 17.0);
    float c = hash(index + 43.0);
    float frequency = uFrequency * (0.55 + 0.9 * a);
    float phase = b * 6.2831853;
    float along = g.x * 6.2831853 * frequency;
    float wave =
      sin(along + phase + t * (0.35 + 0.45 * a)) * 0.62 +
      sin(along * 2.07 - phase * 1.31 - t * (0.27 + 0.36 * b)) * 0.26 +
      sin(along * 0.47 + phase * 0.7 + t * (0.19 + 0.2 * c)) * 0.3;
    float line = 0.5 + (c - 0.5) * 0.8 + uAmplitude * 0.16 * wave;
    float width = uThickness * (0.022 + 0.05 * c) * (0.75 + 0.5 * sin(along * 0.5 + t * 0.4 + phase));
    float d = (g.y - line) / max(width, 0.004);
    sum += exp(-d * d);
  }
  float edge = smoothstep(0.0, 0.12, g.y) * (1.0 - smoothstep(0.88, 1.0, g.y)) *
    smoothstep(0.0, 0.05, g.x) * (1.0 - smoothstep(0.95, 1.0, g.x));
  return (1.0 - exp(-sum * 1.1)) * edge;
}

void main() {
  float field = strands(aGrid, uTime);
  vec3 local = vec3((aGrid.x - 0.5) * 11.0, (aGrid.y - 0.5) * 11.0, field * uDepth);

  float reveal = 0.0;
  for (int k = 0; k < MAX_RIPPLES; k++) {
    vec4 ripple = uRipple[k];
    float age = uClock - ripple.z;
    if (ripple.w <= 0.0 || age < 0.0 || age > 6.0) continue;
    float radius = length((aGrid - ripple.xy) * 11.0);
    float front = radius - age * 3.4;
    float envelope = exp(-front * front * 3.0) * exp(-age * 0.5) * ripple.w;
    local.z += sin(front * 3.2) * 0.3 * envelope;
    reveal += envelope;
  }

  vec4 world = modelMatrix * vec4(local, 1.0);
  vec4 clip = projectionMatrix * viewMatrix * world;
  vec2 ndc = clip.xy / clip.w;
  vec2 offset = (ndc - uWake.xy) * vec2(uAspect, 1.0);
  float touch = exp(-dot(offset, offset) / max(uWakeRadius * uWakeRadius, 1e-4)) * uWake.z;
  world.xyz += uWakeVector * touch;

  vec4 view = viewMatrix * world;
  gl_Position = projectionMatrix * view;

  float eye = -view.z;
  float size = uSpacing * uSize * projectionMatrix[1][1] * uViewHeight * 0.5 / max(eye, 0.1);
  float nearness = clamp(9.0 / max(eye, 0.1), 0.35, 1.8);
  float shade = mix(0.35, 1.0, smoothstep(0.55, 1.2, nearness));

  float lift = smoothstep(0.06, 0.95, field);
  float glow = (pow(lift, 1.35) * 1.3 + reveal * 1.1) * shade * uIntensity;
  float shown = max(size, 1.35);
  vGlow = glow * min(size * size / (shown * shown), 1.0);
  gl_PointSize = shown * (1.0 + touch * 0.35);

  float tone = clamp(lift * 0.9 + (aGrid.x - 0.5) * uShift + reveal * 0.25, 0.0, 1.0);
  vec3 lab = mix(uBodyLab, uGlowLab, tone);
  vColor = toSrgb(max(labToLinear(lab), vec3(0.0)));
}
`;
const FRAGMENT_SHADER = `precision highp float;

uniform float uSoftness;
uniform float uInk;

varying vec3 vColor;
varying float vGlow;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c) * 2.0;
  float disc = 1.0 - smoothstep(mix(0.55, 0.0, uSoftness), 1.0, r);
  float amount = disc * vGlow;
  if (amount < 0.003) discard;
  if (uInk > 0.5) {
    float alpha = clamp(amount, 0.0, 1.0);
    gl_FragColor = vec4(vColor * alpha, alpha);
  } else {
    gl_FragColor = vec4(vColor * amount, clamp(amount, 0.0, 1.0));
  }
}
`;

export const SpectralDrape = forwardRef<SpectralDrapeHandle, SpectralDrapeProps>(
  function SpectralDrape(
    {
      colors = DEFAULT_COLORS,
      backgroundColor = '#0a0a0a',
      density = 1,
      dotSize = 1,
      strands = 8,
      amplitude = 1,
      frequency = 1,
      thickness = 0.7,
      depth = 1,
      softness = 0.6,
      intensity = 1,
      colorShift = 0.3,
      tilt = -40,
      turn = -45,
      roll = 110,
      zoom = 1,
      flow = 1,
      speed = 1,
      interactive = true,
      brush = 1,
      brushRadius = 0.2,
      parallax = 1,
      clickRipples = true,
      seed = 0,
      paused = false,
      dpr = 2,
      className,
      style,
      children,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const stateRef = useRef<{
      pulse: (x?: number, y?: number) => void;
      sync: () => void;
      destroy: () => void;
    } | null>(null);

    const reducedMotion = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      () => false
    );

    const propsRef = useRef({
      colors,
      backgroundColor,
      density,
      dotSize,
      strands,
      amplitude,
      frequency,
      thickness,
      depth,
      softness,
      intensity,
      colorShift,
      tilt,
      turn,
      roll,
      zoom,
      flow,
      speed,
      interactive,
      brush,
      brushRadius,
      parallax,
      clickRipples,
      seed,
      paused,
      dpr,
      reduced: reducedMotion,
    });

    useEffect(() => {
      propsRef.current = {
        colors,
        backgroundColor,
        density,
        dotSize,
        strands,
        amplitude,
        frequency,
        thickness,
        depth,
        softness,
        intensity,
        colorShift,
        tilt,
        turn,
        roll,
        zoom,
        flow,
        speed,
        interactive,
        brush,
        brushRadius,
        parallax,
        clickRipples,
        seed,
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
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        });
      } catch {
        canvas.remove();
        return;
      }

      renderer.autoClear = true;

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      const scene = new THREE.Scene();
      const drapeGroup = new THREE.Group();
      scene.add(drapeGroup);

      const mathHelpers = {
        right: new THREE.Vector3(),
        up: new THREE.Vector3(),
        raycaster: new THREE.Raycaster(),
        ndc: new THREE.Vector2(),
        plane: new THREE.Plane(),
        normal: new THREE.Vector3(),
        point: new THREE.Vector3(),
        inverse: new THREE.Matrix4(),
        euler: new THREE.Euler(),
        colorHelper: new THREE.Color(),
      };

      const ripples = Array.from(
        { length: 4 },
        () => new THREE.Vector4(0, 0, -99, 0)
      );

      const simState = {
        time: 0,
        clock: 0,
        leanX: 0,
        leanY: 0,
        wakeX: 9,
        wakeY: 9,
        lastX: 0.5,
        lastY: 0.5,
        hasLast: false,
        velocityX: 0,
        velocityY: 0,
        strength: 0,
        presses: 0,
        nextRipple: 0,
        ripples,
      };

      const uniforms = {
        uTime: { value: 0 },
        uClock: { value: 0 },
        uSeed: { value: 0 },
        uStrands: { value: 8 },
        uAmplitude: { value: 1 },
        uFrequency: { value: 0.6 },
        uThickness: { value: 1 },
        uDepth: { value: 1.6 },
        uSpacing: { value: 0.04 },
        uSize: { value: 0.5 },
        uViewHeight: { value: 600 },
        uIntensity: { value: 1 },
        uShift: { value: 0 },
        uBodyLab: { value: new THREE.Vector3() },
        uGlowLab: { value: new THREE.Vector3() },
        uWake: { value: new THREE.Vector3(9, 9, 0) },
        uWakeVector: { value: new THREE.Vector3() },
        uWakeRadius: { value: 0.3 },
        uAspect: { value: 1 },
        uRipple: { value: ripples },
        uSoftness: { value: 0.6 },
        uInk: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      let { geometry: activeGeom, spacing: activeSpacing } = buildGridGeometry(
        propsRef.current.density
      );
      let currentDensity = propsRef.current.density;

      const pointsMesh = new THREE.Points(activeGeom, material);
      pointsMesh.frustumCulled = false;
      drapeGroup.add(pointsMesh);

      const pointerState = {
        x: 0.5,
        y: 0.5,
        inside: false,
        pressX: 0,
        pressY: 0,
        pressCount: 0,
      };

      let isDestroyed = false;
      let isVisible = true;
      let animFrameId = 0;
      let lastTime = 0;
      let cssWidth = 1;
      let cssHeight = 1;
      let dprVal = 1;

      const triggerRippleAtWorldPoint = (xNorm: number, yNorm: number) => {
        const next = simState.nextRipple;
        simState.nextRipple = (next + 1) % 4;
        simState.ripples[next].set(
          clamp(xNorm, -0.5, 1.5),
          clamp(yNorm, -0.5, 1.5),
          simState.clock,
          1
        );
      };

      const syncMaterialColors = () => {
        const p = propsRef.current;
        const colorList = p.colors && p.colors.length > 0 ? p.colors : DEFAULT_COLORS;
        const colorA = colorList[0] || DEFAULT_COLORS[0];
        const colorB = colorList[1] || colorList[0] || DEFAULT_COLORS[1];

        setColorFromString(mathHelpers.colorHelper, colorA, DEFAULT_COLORS[0]);
        rgbToOklab(uniforms.uBodyLab.value, mathHelpers.colorHelper);

        setColorFromString(mathHelpers.colorHelper, colorB, DEFAULT_COLORS[1]);
        rgbToOklab(uniforms.uGlowLab.value, mathHelpers.colorHelper);

        const isTransparent = isColorTransparent(p.backgroundColor);
        setColorFromString(
          mathHelpers.colorHelper,
          isTransparent ? '#000000' : p.backgroundColor,
          '#000000'
        );
        const lum =
          0.2126 * mathHelpers.colorHelper.r +
          0.7152 * mathHelpers.colorHelper.g +
          0.0722 * mathHelpers.colorHelper.b;
        const isInk = !isTransparent && lum > 0.25;

        uniforms.uInk.value = isInk ? 1 : 0;
        material.blending = THREE.CustomBlending;
        material.blendEquation = THREE.AddEquation;
        material.blendSrc = THREE.OneFactor;
        material.blendDst = isInk ? THREE.OneMinusSrcAlphaFactor : THREE.OneFactor;
        material.blendSrcAlpha = THREE.OneFactor;
        material.blendDstAlpha = THREE.OneMinusSrcAlphaFactor;
        material.needsUpdate = true;
      };

      const syncDensity = () => {
        const p = propsRef.current;
        if (p.density !== currentDensity) {
          currentDensity = p.density;
          activeGeom.dispose();
          const built = buildGridGeometry(currentDensity);
          activeGeom = built.geometry;
          activeSpacing = built.spacing;
          pointsMesh.geometry = activeGeom;
        }
      };

      const renderFrame = (nowMs: number) => {
        animFrameId = 0;
        if (isDestroyed || !isVisible) return;

        const dt = Math.min(Math.max((nowMs - lastTime) / 1000, 0), 0.05);
        lastTime = nowMs;

        const p = propsRef.current;
        const isAnimated = !p.paused && !p.reduced;

        if (isAnimated) {
          simState.time += dt * clamp(p.speed, 0, 4) * clamp(p.flow, 0, 4) * 0.3;
        }
        if (!p.reduced) {
          simState.clock += dt;
        }

        const aspect = cssWidth / Math.max(cssHeight, 1);
        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        const isInteracting = p.interactive && !p.reduced && pointerState.inside;
        const parallaxVal = clamp(p.parallax, 0, 3);
        const targetLeanX = isInteracting ? (pointerState.x - 0.5) * 2 : 0;
        const targetLeanY = isInteracting ? (pointerState.y - 0.5) * 2 : 0;

        const leanSmooth = 1 - Math.exp(-2.2 * dt);
        simState.leanX += (targetLeanX - simState.leanX) * leanSmooth;
        simState.leanY += (targetLeanY - simState.leanY) * leanSmooth;

        mathHelpers.euler.set(
          toRad(clamp(p.tilt, -180, 180)) - 0.06 * simState.leanY * parallaxVal,
          toRad(clamp(p.turn, -180, 180)) + 0.08 * simState.leanX * parallaxVal,
          toRad(clamp(p.roll, -180, 180)),
          'XYZ'
        );
        drapeGroup.rotation.copy(mathHelpers.euler);
        drapeGroup.scale.setScalar(clamp(p.zoom, 0.3, 3));
        drapeGroup.updateMatrixWorld();

        let instVelX = 0;
        let instVelY = 0;
        if (isInteracting) {
          if (!simState.hasLast) {
            simState.lastX = pointerState.x;
            simState.lastY = pointerState.y;
            simState.wakeX = pointerState.x;
            simState.wakeY = pointerState.y;
            simState.hasLast = true;
          }
          if (dt > 0) {
            instVelX = (pointerState.x - simState.lastX) / dt;
            instVelY = (pointerState.y - simState.lastY) / dt;
          }
          simState.lastX = pointerState.x;
          simState.lastY = pointerState.y;
        } else {
          simState.hasLast = false;
        }

        const velSmooth = 1 - Math.exp(-6 * dt);
        simState.velocityX += (clamp(instVelX, -5, 5) - simState.velocityX) * velSmooth;
        simState.velocityY += (clamp(instVelY, -5, 5) - simState.velocityY) * velSmooth;

        const wakeSmooth = 1 - Math.exp(-7 * dt);
        if (isInteracting) {
          simState.wakeX += (pointerState.x - simState.wakeX) * wakeSmooth;
          simState.wakeY += (pointerState.y - simState.wakeY) * wakeSmooth;
        }

        const speedMag = Math.hypot(simState.velocityX * aspect, simState.velocityY);
        const targetStrength = isInteracting ? clamp(0.9 * speedMag, 0, 1.4) : 0;
        simState.strength += (targetStrength - simState.strength) * (1 - Math.exp(-4 * dt));

        camera.updateMatrixWorld();
        mathHelpers.right.setFromMatrixColumn(camera.matrixWorld, 0);
        mathHelpers.up.setFromMatrixColumn(camera.matrixWorld, 1);

        const fovTan = 9 * Math.tan(toRad(38) / 2);
        const brushVal = clamp(p.brush, 0, 3);
        const dirX = simState.velocityX / Math.max(speedMag, 1e-4);
        const dirY = simState.velocityY / Math.max(speedMag, 1e-4);

        uniforms.uWake.value.set(
          2 * simState.wakeX - 1,
          2 * simState.wakeY - 1,
          simState.strength * brushVal
        );
        uniforms.uWakeVector.value
          .copy(mathHelpers.right)
          .multiplyScalar(dirX * aspect * fovTan * 0.16)
          .addScaledVector(mathHelpers.up, dirY * fovTan * 0.16);
        uniforms.uWakeRadius.value = clamp(p.brushRadius, 0.03, 1);

        // Process pointer press / ripples
        if (
          pointerState.pressCount !== simState.presses &&
          p.clickRipples &&
          p.interactive &&
          !p.reduced
        ) {
          simState.presses = pointerState.pressCount;
          mathHelpers.ndc.set(pointerState.pressX, pointerState.pressY);
          mathHelpers.raycaster.setFromCamera(mathHelpers.ndc, camera);
          mathHelpers.normal
            .set(0, 0, 1)
            .transformDirection(drapeGroup.matrixWorld);
          mathHelpers.point.setFromMatrixPosition(drapeGroup.matrixWorld);
          mathHelpers.plane.setFromNormalAndCoplanarPoint(
            mathHelpers.normal,
            mathHelpers.point
          );
          if (
            mathHelpers.raycaster.ray.intersectPlane(
              mathHelpers.plane,
              mathHelpers.point
            )
          ) {
            mathHelpers.inverse.copy(drapeGroup.matrixWorld).invert();
            mathHelpers.point.applyMatrix4(mathHelpers.inverse);
            triggerRippleAtWorldPoint(
              mathHelpers.point.x / 11 + 0.5,
              mathHelpers.point.y / 11 + 0.5
            );
          }
        }

        let hasActiveRipple = false;
        for (let i = 0; i < 4; i++) {
          uniforms.uRipple.value[i].copy(simState.ripples[i]);
          if (
            simState.ripples[i].w > 0 &&
            simState.clock - simState.ripples[i].z < 6
          ) {
            hasActiveRipple = true;
          }
        }

        uniforms.uTime.value = simState.time;
        uniforms.uClock.value = simState.clock;
        uniforms.uSeed.value = 0.137 * p.seed;
        uniforms.uStrands.value = Math.round(clamp(p.strands, 1, 24));
        uniforms.uAmplitude.value = clamp(p.amplitude, 0, 3);
        uniforms.uFrequency.value = 0.6 * clamp(p.frequency, 0.05, 4);
        uniforms.uThickness.value = clamp(p.thickness, 0.2, 4);
        uniforms.uDepth.value = 1.6 * clamp(p.depth, 0, 3);
        uniforms.uSpacing.value = activeSpacing;
        uniforms.uSize.value = 0.5 * clamp(p.dotSize, 0.1, 4);
        uniforms.uViewHeight.value = cssHeight * dprVal;
        uniforms.uIntensity.value = clamp(p.intensity, 0, 4);
        uniforms.uShift.value = clamp(p.colorShift, -1, 1);
        uniforms.uAspect.value = aspect;
        uniforms.uSoftness.value = clamp(p.softness, 0, 1);

        renderer.render(scene, camera);

        const needsLoop =
          isAnimated ||
          hasActiveRipple ||
          simState.strength > 0.002 ||
          Math.abs(simState.leanX - targetLeanX) > 0.001 ||
          Math.abs(simState.leanY - targetLeanY) > 0.001;

        if (isVisible && !doc.hidden && needsLoop) {
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

        syncDensity();
        syncMaterialColors();
        requestDraw();
      };

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
        const y = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1);
        const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
        if (inside) {
          pointerState.x = x;
          pointerState.y = y;
          pointerState.inside = true;
          requestDraw();
        } else if (pointerState.inside) {
          pointerState.inside = false;
          requestDraw();
        }
      };

      const handlePointerDown = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
        const y = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1);
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
          pointerState.x = x;
          pointerState.y = y;
          pointerState.inside = true;
          pointerState.pressX = 2 * x - 1;
          pointerState.pressY = 2 * y - 1;
          pointerState.pressCount += 1;
          requestDraw();
        }
      };

      const handlePointerLeave = () => {
        pointerState.inside = false;
        requestDraw();
      };

      win.addEventListener('pointermove', handlePointerMove, { passive: true });
      win.addEventListener('pointerdown', handlePointerDown, { passive: true });
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

      stateRef.current = {
        pulse: (x = 0.5, y = 0.5) => {
          triggerRippleAtWorldPoint(x, y);
          requestDraw();
        },
        sync: () => {
          syncDensity();
          syncMaterialColors();
          requestDraw();
        },
        destroy: () => {
          isDestroyed = true;
          if (animFrameId) win.cancelAnimationFrame(animFrameId);
          win.removeEventListener('pointermove', handlePointerMove);
          win.removeEventListener('pointerdown', handlePointerDown);
          doc.documentElement.removeEventListener('pointerleave', handlePointerLeave);
          doc.removeEventListener('visibilitychange', handleVisibilityChange);
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          material.dispose();
          activeGeom.dispose();
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
        pulse: (x, y) => stateRef.current?.pulse(x, y),
      }),
      []
    );

    const isTransparent = isColorTransparent(backgroundColor);

    return (
      <div
        ref={containerRef}
        className={clsx('relative isolate overflow-hidden', className)}
        style={{
          backgroundColor: isTransparent ? undefined : backgroundColor,
          ...style,
        }}
      >
        {children && <div className="relative z-10 h-full w-full">{children}</div>}
      </div>
    );
  }
);

function clsx(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export default SpectralDrape;
