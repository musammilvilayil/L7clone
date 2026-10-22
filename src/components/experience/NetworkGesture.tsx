import { useEffect, useMemo, useState } from 'react';

type Point = [number, number];
type Gesture = 'hero' | 'thinking' | 'discovery' | 'services' | 'products' | 'why' | 'faq' | 'contact';
type Scene = { gesture: Gesture; progress: number; reduced: boolean };
type Stroke = { id: string; points: Point[]; step?: number };

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (a: number, b: number, t: number) => {
  const v = clamp((t - a) / (b - a));
  return v * v * (3 - 2 * v);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** One front-facing anatomical construction, separated so each finger can grow individually. */
const HAND: Stroke[] = [
  { id: 'wrist-left', points: [[40, 95], [40, 87], [38, 82], [33, 75], [30, 68]] },
  { id: 'wrist-right', points: [[69, 95], [68, 86], [70, 79], [78, 65], [79, 58]] },
  { id: 'palm-arc', points: [[30, 68], [35, 60], [43, 52], [54, 49], [65, 49], [74, 54], [79, 58]] },
  { id: 'thumb', step: 0, points: [[32, 70], [22, 64], [14, 58], [11, 52], [15, 48], [22, 50], [36, 60]] },
  { id: 'index', step: 1, points: [[40, 52], [38, 39], [38, 22], [40, 13], [45, 11], [49, 16], [49, 48]] },
  { id: 'middle', step: 2, points: [[49, 48], [49, 25], [50, 9], [54, 5], [59, 8], [61, 24], [61, 48]] },
  { id: 'ring', step: 3, points: [[61, 48], [62, 24], [65, 12], [69, 11], [73, 16], [74, 30], [72, 53]] },
  { id: 'little', step: 4, points: [[72, 53], [75, 36], [80, 29], [84, 30], [87, 36], [86, 47], [79, 58]] },
  { id: 'palm-fold', points: [[34, 70], [42, 65], [52, 64], [63, 67], [72, 65]] },
  { id: 'thenar', points: [[36, 62], [43, 71], [46, 81], [44, 89]] },
  { id: 'knuckles', points: [[39, 54], [46, 51], [53, 52], [61, 52], [72, 56]] },
  { id: 'lifeline', points: [[46, 69], [51, 74], [58, 79], [64, 81]] },
];

const SCENE_POS: Record<Gesture, { x: number; y: number; s: number; r: number }> = {
  hero: { x: 495, y: 68, s: 4.5, r: -13 },
  thinking: { x: 590, y: 110, s: 3.3, r: 30 },
  discovery: { x: 530, y: 75, s: 4.15, r: -24 },
  services: { x: 540, y: 120, s: 3.6, r: 13 },
  products: { x: 535, y: 115, s: 3.7, r: -23 },
  why: { x: 470, y: 125, s: 3.8, r: 24 },
  faq: { x: 95, y: 84, s: 4.45, r: 0 },
  contact: { x: 140, y: 135, s: 3.4, r: -58 },
};

function pointForGesture([x, y]: Point, gesture: Gesture, step?: number): Point {
  if (gesture === 'thinking') {
    return [x - y * 0.055, y + (step !== undefined && step > 1 ? 10 : 0)];
  }
  if (gesture === 'discovery' || gesture === 'products' || gesture === 'services') {
    // Raised index remains extended; other fingers fold towards the palm.
    const fold = step !== undefined && step !== 1;
    return [x + (fold ? (54 - x) * 0.23 : 0), y + (fold ? 23 : 0)];
  }
  return [x, y];
}

function networkPoint(i: number, j: number, total: number): Point {
  const x = 7 + j * (90 / Math.max(1, total - 1)) + Math.sin(i * 1.87 + j * 0.71) * 9;
  const y = 12 + (i * 13) % 79 + Math.cos(i * 1.25 + j * 0.65) * 13;
  return [x, y];
}

const BACKGROUND_LINES = Array.from({ length: 43 }, (_, i) => {
  const x = (i * 163 + 81) % 1000;
  const y = (i * 113 + 63) % 660;
  const x2 = (x + 120 + (i % 5) * 49) % 1000;
  const y2 = (y + 48 + (i % 3) * 61) % 660;
  return { id: i, x, y, x2, y2 };
});

export function NetworkGesture() {
  const [scene, setScene] = useState<Scene>({ gesture: 'hero', progress: 0.38, reduced: false });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    const update = () => {
      raf = 0;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-gesture]'));
      const center = window.innerHeight * 0.52;
      let selected: HTMLElement | undefined;
      let distance = Number.POSITIVE_INFINITY;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        const d = Math.abs((rect.top + rect.bottom) / 2 - center);
        if (d < distance) { selected = node; distance = d; }
      }
      if (!selected) return;
      const rect = selected.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      const gesture = (selected.dataset.gesture || 'hero') as Gesture;
      setScene(previous => previous.gesture === gesture && Math.abs(previous.progress - progress) < .003 && previous.reduced === media.matches
        ? previous : { gesture, progress, reduced: media.matches });
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', schedule);
    };
  }, []);

  const { gesture, progress, reduced } = scene;
  const layout = SCENE_POS[gesture];
  const strength = reduced ? 1 : gesture === 'faq'
    ? ease(0.06, 0.5, progress)
    : ease(0.05, 0.33, progress) * (1 - ease(0.73, 0.96, progress));
  const backgroundFade = 0.17 + (1 - strength) * 0.23;

  const paths = useMemo(() => HAND.map((line, i) => {
    const fingerStrength = line.step === undefined || gesture !== 'faq' || reduced
      ? strength
      : ease(0.22 + line.step * 0.105, 0.35 + line.step * 0.105, progress);
    const t = gesture === 'faq' ? Math.min(strength, fingerStrength) : strength;
    const points = line.points.map((point, j) => {
      const start = networkPoint(i, j, line.points.length);
      const end = pointForGesture(point, gesture, line.step);
      return [lerp(start[0], end[0], t), lerp(start[1], end[1], t)] as Point;
    });
    return { ...line, points, t };
  }), [gesture, progress, reduced, strength]);

  return (
    <div className="network-experience" aria-hidden="true">
      <svg viewBox="0 0 1000 660" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id="networkStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0056b2" />
            <stop offset="55%" stopColor="#69b8ff" />
            <stop offset="100%" stopColor="#0056b2" />
          </linearGradient>
          <filter id="wireSoft"><feGaussianBlur stdDeviation="1.3" /></filter>
        </defs>
        <g stroke="#327bbf" strokeWidth=".7" opacity={backgroundFade} fill="none">
          {BACKGROUND_LINES.map(line => (
            <g key={line.id}>
              <path d={`M ${line.x} ${line.y} Q ${(line.x + line.x2) / 2} ${line.y - 35} ${line.x2} ${line.y2}`} />
              <circle cx={line.x} cy={line.y} r="2.1" fill="#65adf0" stroke="none" />
            </g>
          ))}
        </g>
        <g transform={`translate(${layout.x} ${layout.y}) scale(${layout.s}) rotate(${layout.r} 55 52)`}
          fill="none" strokeLinecap="round" strokeLinejoin="round">
          {paths.map((line, index) => {
            const points = line.points.map(p => p.map(n => n.toFixed(2)).join(',')).join(' ');
            return (
              <g key={line.id}>
                <polyline points={points} stroke="#0056b2" strokeWidth=".8"
                  opacity={0.17 + strength * .35} transform="translate(1.8 2.4)" />
                <polyline points={points} stroke="url(#networkStroke)" strokeWidth=".31"
                  opacity={0.55 + strength * .44} />
                {index < 8 && <polyline points={points} stroke="#8dcfff" strokeWidth=".18"
                  opacity={strength * .5} transform="translate(-.65 -.4)" />}
              </g>
            );
          })}
          {gesture === 'faq' && (
            <g opacity={reduced ? 1 : ease(0.76, 0.96, progress)} fill="none"
              stroke="url(#networkStroke)" strokeWidth=".48">
              <path d="M 50 -5 C 42 -17 48 -30 59 -28 C 70 -27 74 -17 67 -11 L 58 -3 L 58 1" />
              <circle cx="58" cy="8" r="1.7" fill="#69b8ff" stroke="none" />
              <path d="M 44 -17 L 51 -21 L 62 -25 L 69 -19" strokeWidth=".18" />
            </g>
          )}
        </g>
        {gesture === 'contact' && (
          <g transform="translate(1000 0) scale(-1 1)" fill="none" stroke="url(#networkStroke)"
            strokeWidth="1.4" opacity={strength * .85}>
            <g transform="translate(140 135) scale(3.4) rotate(-58 55 52)">
              {paths.slice(0, 8).map(line => (
                <polyline key={line.id} points={line.points.map(p => p.join(',')).join(' ')} />
              ))}
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
