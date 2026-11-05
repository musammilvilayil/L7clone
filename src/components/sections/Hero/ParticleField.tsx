import { useEffect, useRef, type RefObject } from "react";
import { FINE_POINTER_QUERY, REDUCED_MOTION_QUERY } from "../../../hooks/useMediaQuery";
import "./ParticleField.css";

/**
 * Perspective particle terrain (WebGL points) with a soft pointer ripple —
 * ported from the design's hero script.
 *
 * Performance: starts after the browser is idle (never competes with first
 * paint or hydration), caps device pixel ratio at 1.75, stops rendering when
 * off-screen or in a background tab, and draws one static frame when the
 * visitor prefers reduced motion. Falls back to a light 2D canvas when WebGL
 * is unavailable.
 */

const VERTEX = `precision highp float;
attribute vec3 aPoint;
uniform float uTime; uniform vec2 uResolution; uniform float uDpr; uniform vec3 uMouse;
varying float vAlpha; varying float vRed; varying float vHighlight;
void main(){
 float x=aPoint.x; float z=aPoint.y;
 float y=sin(x*.38+z*.45+uTime*.52)*.76+cos(z*.42-x*.20-uTime*.48)*.60+sin(x*.65+z*.20+uTime*.70)*.24;
 float dist=length(vec2(x-uMouse.x,z-uMouse.y));
 float pointerBump=exp(-dist*dist*.16)*uMouse.z;
 y+=pointerBump*1.20+sin(dist*7.8-uTime*4.)*exp(-dist*.65)*uMouse.z*.36;
 vHighlight=clamp(pointerBump*.95+max(0.,y-.4)*.23,0.,1.);
 float sway=sin(uTime*.15)*.18; x+=sway;
 vec3 p=vec3(x,y-3.1,z-8.5);
 float pitch=.22; float cy=cos(pitch),sy=sin(pitch);
 vec3 v=vec3(p.x,cy*p.y-sy*p.z,sy*p.y+cy*p.z);
 float depth=-v.z; float focal=1.82;
 vec2 screen=vec2(v.x*focal/(uResolution.x/uResolution.y),v.y*focal);
 screen.y=screen.y*.86-depth*.14;
 gl_Position=vec4(screen,depth*.996-.2,depth);
 float size=clamp(18./depth,.75,2.8);
 vRed=step(.994,aPoint.z);
 gl_PointSize=(size+vRed*.65)*uDpr;
 float fade=(1.-smoothstep(6.,31.,depth))*smoothstep(1.,5.,depth);
 vAlpha=fade*(.23+size*.17+vHighlight*.19)*(1.-smoothstep(10.,15.,abs(x)));
 vAlpha*=1.-smoothstep(-.65,.12,screen.y/depth);
}`;

const FRAGMENT = `precision mediump float; varying float vAlpha; varying float vRed; varying float vHighlight;
void main(){
 float d=length(gl_PointCoord-vec2(.5));
 float a=(1.-smoothstep(.22,.5,d))*vAlpha;
 vec3 pale=mix(vec3(.66,.71,.74),vec3(.98),vHighlight);
 vec3 col=mix(pale,vec3(.96,.07,.20),vRed);
 gl_FragColor=vec4(col,a*(1.+vRed*.6));
}`;

type Vec3 = [number, number, number];

export function ParticleField({ pointerTarget }: { pointerTarget: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    let reduced = reducedQuery.matches;
    let raf = 0;
    let visible = true;
    let time = 0;
    let last = 0;
    let mouse: Vec3 = [0, 0, 0];
    let mouseTarget: Vec3 = [0, 0, 0];
    let draw = () => {};
    let disposed = false;
    const cleanups: (() => void)[] = [];

    const init = () => {
      if (disposed) return;
      const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power", preserveDrawingBuffer: false });
      if (gl) {
        try {
          const compile = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("shader compile failed");
            return shader;
          };
          const program = gl.createProgram()!;
          gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
          gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("shader link failed");
          gl.useProgram(program);

          const cols = window.innerWidth < 700 ? 150 : 240;
          const rows = 125;
          const points = new Float32Array(cols * rows * 3);
          let k = 0;
          for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
              points[k++] = (i / (cols - 1) - 0.5) * 30;
              points[k++] = -22 + (j / (rows - 1)) * 28;
              points[k++] = ((i * 73 + j * 151) % 997) / 997;
            }
          }
          const buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
          const position = gl.getAttribLocation(program, "aPoint");
          gl.enableVertexAttribArray(position);
          gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

          const uTime = gl.getUniformLocation(program, "uTime");
          const uResolution = gl.getUniformLocation(program, "uResolution");
          const uDpr = gl.getUniformLocation(program, "uDpr");
          const uMouse = gl.getUniformLocation(program, "uMouse");
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.clearColor(0, 0, 0, 0);

          draw = () => {
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1f(uTime, time);
            gl.uniform3f(uMouse, mouse[0], mouse[1], mouse[2]);
            gl.drawArrays(gl.POINTS, 0, cols * rows);
          };

          const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
            canvas.width = Math.max(1, Math.round(rect.width * dpr));
            canvas.height = Math.max(1, Math.round(rect.height * dpr));
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResolution, rect.width, rect.height);
            gl.uniform1f(uDpr, dpr);
            if (reduced || !visible) draw();
          };
          const ro = new ResizeObserver(resize);
          ro.observe(canvas);
          cleanups.push(() => ro.disconnect());
          resize();

          const onLost = (event: Event) => {
            event.preventDefault();
            cancelAnimationFrame(raf);
            raf = 0;
          };
          canvas.addEventListener("webglcontextlost", onLost);
          cleanups.push(() => canvas.removeEventListener("webglcontextlost", onLost));
        } catch {
          canvas.dataset.fallback = "true";
        }
      } else {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          draw = () => {
            const width = (canvas.width = canvas.clientWidth);
            const height = (canvas.height = canvas.clientHeight);
            for (let j = 0; j < 45; j++) {
              for (let i = 0; i < 110; i++) {
                const x = (i / 109) * width;
                const y = height * 0.57 + j * 7 + Math.sin(i * 0.08 + j * 0.13 + time) * 35;
                ctx.fillStyle = (i + j * 21) % 167 === 0 ? "#f31b40" : "rgba(160,175,182,.2)";
                ctx.fillRect(x, y, 1.2, 1.2);
              }
            }
          };
        }
      }

      const frame = (now: number) => {
        raf = 0;
        if (document.hidden || !visible) return;
        if (last) time += Math.min(now - last, 40) / 1000;
        last = now;
        mouse = mouse.map((v, i) => v + (mouseTarget[i]! - v) * 0.045) as Vec3;
        draw();
        if (!reduced) raf = requestAnimationFrame(frame);
      };
      const resume = () => {
        if (!raf && visible && !document.hidden) {
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) resume();
        else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      });
      io.observe(canvas);
      cleanups.push(() => io.disconnect());

      const onVisibility = () => (document.hidden ? (cancelAnimationFrame(raf), (raf = 0)) : resume());
      document.addEventListener("visibilitychange", onVisibility);
      cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));

      const onMotion = (event: MediaQueryListEvent) => {
        reduced = event.matches;
        if (reduced) {
          cancelAnimationFrame(raf);
          raf = 0;
          draw();
        } else resume();
      };
      reducedQuery.addEventListener("change", onMotion);
      cleanups.push(() => reducedQuery.removeEventListener("change", onMotion));

      // Pointer ripple: project the cursor onto the terrain plane.
      const target = pointerTarget.current;
      if (target) {
        const onMove = (event: PointerEvent) => {
          if (!finePointer.matches) return;
          const r = target.getBoundingClientRect();
          const nx = ((event.clientX - r.left) / r.width) * 2 - 1;
          const ny = 1 - ((event.clientY - r.top) / r.height) * 2;
          const q = (ny + 0.14) / 0.86 / 1.82;
          const c = Math.cos(0.22);
          const s = Math.sin(0.22);
          const den = Math.max(0.045, s - q * c);
          const dz = (-3.1 * (c + q * s)) / den;
          const z = Math.max(-20, Math.min(5, 8.5 + dz));
          const depth = 3.1 * s - c * (z - 8.5);
          const x = (nx * depth * (r.width / r.height)) / 1.82;
          mouseTarget = [Math.max(-13, Math.min(13, x)), z, 1];
        };
        const onLeave = () => {
          mouseTarget[2] = 0;
        };
        target.addEventListener("pointermove", onMove, { passive: true });
        target.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          target.removeEventListener("pointermove", onMove);
          target.removeEventListener("pointerleave", onLeave);
        });
      }

      if (reduced) draw();
      else resume();
    };

    // Defer until the main thread is idle after first paint / hydration.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(init, { timeout: 1200 });
    else timer = setTimeout(init, 300);

    return () => {
      disposed = true;
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [pointerTarget]);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
