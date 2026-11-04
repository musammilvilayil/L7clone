import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface DitherWaveProps {
  width?: number | string;
  height?: number | string;
  speed?: number;
  intensity?: number;
  scale?: number;
  downScale?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  opacity?: number;
  quality?: 'low' | 'medium' | 'high';
  maxFPS?: number;
  pauseWhenOffscreen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  #define COLOR_COUNT 3

  uniform float iTime;
  uniform vec2 iResolution;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uScale;
  uniform float uDownScale;
  uniform float uOpacity;

  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  vec3 colors[COLOR_COUNT];

  void setupColorPalette() {
    colors[0] = uColor1;
    colors[1] = uColor2;
    colors[2] = uColor3;
  }

  float Bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
  }

  #define Bayer4(a)   (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
  #define Bayer8(a)   (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))
  #define Bayer16(a)  (Bayer8(0.5 * (a)) * 0.25 + Bayer2(a))
  #define Bayer32(a)  (Bayer16(0.5 * (a)) * 0.25 + Bayer2(a))
  #define Bayer64(a)  (Bayer32(0.5 * (a)) * 0.25 + Bayer2(a))

  vec3 applyDitheredColor(float value, vec2 pixelCoord) {
    float paletteIndex = clamp(value, 0.0, 1.0) * float(COLOR_COUNT - 1);

    vec3 colorA = vec3(0.0);
    vec3 colorB = vec3(0.0);

    for (int i = 0; i < COLOR_COUNT; i++) {
      if (float(i) == floor(paletteIndex)) {
        colorA = colors[i];
        if (i < COLOR_COUNT - 1) {
          colorB = colors[i + 1];
        } else {
          colorB = colorA;
        }
        break;
      }
    }

    float ditherValue = Bayer64(pixelCoord * 0.25);
    float blendAmount = float(fract(paletteIndex) > ditherValue);

    return mix(colorA, colorB, blendAmount);
  }

  float flowField(vec2 p, float t) {
    return sin(p.x + sin(p.y + t * 0.1)) * sin(p.y * p.x * 0.1 + t * 0.2);
  }

  vec2 computeField(vec2 p, float t) {
    vec2 ep = vec2(0.05, 0.0);
    vec2 result = vec2(0.0);

    for (int i = 0; i < 20; i++) {
      float t0 = flowField(p, t);
      float t1 = flowField(p + ep.xy, t);
      float t2 = flowField(p + ep.yx, t);
      vec2 gradient = vec2((t1 - t0), (t2 - t0)) / ep.xx;
      vec2 tangent = vec2(-gradient.y, gradient.x);

      p += tangent * 0.5 + gradient * 0.005;
      p.x += sin(t * 0.25) * 0.1;
      p.y += cos(t * 0.25) * 0.1;
      result = gradient;
    }

    return result;
  }

  void main() {
    setupColorPalette();

    vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
    uv.x *= iResolution.x / iResolution.y;
    float animTime = iTime * uSpeed;

    vec2 p = uv * uScale;
    vec2 field = computeField(p, animTime);

    float colorValue = length(field) * uIntensity;
    colorValue = clamp(colorValue, 0.0, 1.0);

    vec3 finalColor = applyDitheredColor(colorValue, gl_FragCoord.xy / uDownScale);

    gl_FragColor = vec4(finalColor, uOpacity);
  }
`;

export const DitherWave: React.FC<DitherWaveProps> = ({
  width = '100%',
  height = '100%',
  speed = 1.0,
  intensity = 1.0,
  scale = 6.0,
  downScale = 0.5,
  primaryColor = '#5227FF',
  secondaryColor = '#5227FF',
  tertiaryColor = '#0a0a0a',
  opacity = 1.0,
  quality = 'medium',
  maxFPS = 60,
  pauseWhenOffscreen = true,
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const propsRef = useRef({
    speed,
    intensity,
    scale,
    downScale,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    opacity,
  });

  useEffect(() => {
    propsRef.current = {
      speed,
      intensity,
      scale,
      downScale,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      opacity,
    };
  });

  // Sync uniforms when dynamic props change
  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;

    mat.uniforms.uSpeed.value = speed;
    mat.uniforms.uIntensity.value = intensity;
    mat.uniforms.uScale.value = scale;
    mat.uniforms.uDownScale.value = Math.max(0.1, downScale);
    mat.uniforms.uOpacity.value = opacity;
    mat.uniforms.uColor1.value.set(primaryColor);
    mat.uniforms.uColor2.value.set(secondaryColor);
    mat.uniforms.uColor3.value.set(tertiaryColor);
  }, [
    speed,
    intensity,
    scale,
    downScale,
    opacity,
    primaryColor,
    secondaryColor,
    tertiaryColor,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentProps = propsRef.current;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Determine device pixel ratio based on quality preset
    let dpr = 1.0;
    if (quality === 'low') dpr = 0.5;
    else if (quality === 'high') dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    else dpr = 1.0; // medium

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(dpr);

    const initialW = container.clientWidth || 300;
    const initialH = container.clientHeight || 300;
    renderer.setSize(initialW, initialH);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(initialW * dpr, initialH * dpr),
        },
        uSpeed: { value: prefersReducedMotion ? 0 : currentProps.speed },
        uIntensity: { value: currentProps.intensity },
        uScale: { value: currentProps.scale },
        uDownScale: { value: Math.max(0.1, currentProps.downScale) },
        uOpacity: { value: currentProps.opacity },
        uColor1: { value: new THREE.Color(currentProps.primaryColor) },
        uColor2: { value: new THREE.Color(currentProps.secondaryColor) },
        uColor3: { value: new THREE.Color(currentProps.tertiaryColor) },
      },
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let isVisible = true;
    let rafId: number | null = null;
    let lastTime = 0;
    const targetInterval = 1000 / Math.max(1, maxFPS);

    const renderLoop = (time: number) => {
      rafId = requestAnimationFrame(renderLoop);

      if (!isVisible && pauseWhenOffscreen) return;

      const elapsed = time - lastTime;
      if (elapsed < targetInterval) return;
      lastTime = time - (elapsed % targetInterval);

      if (!prefersReducedMotion) {
        material.uniforms.iTime.value = clock.getElapsedTime();
      }
      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(renderLoop);

    // Visibility observer to pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          renderer.setSize(w, h);
          material.uniforms.iResolution.value.set(w * dpr, h * dpr);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      materialRef.current = null;
    };
  }, [quality, maxFPS, pauseWhenOffscreen]);

  return (
    <div
      ref={containerRef}
      style={{ width, height, position: 'relative' }}
      className={`relative overflow-hidden ${className}`}
    >
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default DitherWave;
