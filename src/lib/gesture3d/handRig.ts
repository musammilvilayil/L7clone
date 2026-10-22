/**
 * Procedural 3D wireframe hand.
 *
 * A pose is a vector of 23 numbers (global yaw/pitch/roll + 4 numbers per digit).
 * Forward kinematics turns it into 21 joints; the strand builder then produces the
 * same fixed set of line strands for every pose, so poses can be interpolated
 * numerically — the hand geometry itself morphs, nothing is cross-faded.
 *
 * Hand space: wrist at the origin, +y towards the fingers, +x to the viewer's right,
 * +z out of the palm (towards the viewer when the palm faces the camera).
 */
export type V3 = [number, number, number];
export type Finger = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
export const FINGERS: Finger[] = ['thumb', 'index', 'middle', 'ring', 'pinky'];
export const POSE_LENGTH = 23;

const MCP: Record<Finger, V3> = {
  thumb: [-0.3, 0.2, 0.05],
  index: [-0.3, 0.98, 0],
  middle: [-0.03, 1.04, 0],
  ring: [0.24, 0.99, 0],
  pinky: [0.47, 0.86, 0],
};
const LEN: Record<Finger, V3> = {
  thumb: [0.42, 0.31, 0.26],
  index: [0.46, 0.28, 0.23],
  middle: [0.5, 0.31, 0.25],
  ring: [0.47, 0.29, 0.24],
  pinky: [0.38, 0.22, 0.2],
};
const RAD: Record<Finger, number> = { thumb: 0.095, index: 0.078, middle: 0.082, ring: 0.074, pinky: 0.062 };
const TAPER = [1, 0.93, 0.84, 0.7];
const THUMB_BEND: V3 = [0.62, -0.05, 0.78];

export interface Strand {
  id: string;
  /** 'edge' | 'bone' | 'ring' | 'palm' | 'grid' | 'wrist' | 'tail' | 'extra' */
  kind: string;
  /** 0..1 position in the build sequence (wrist first, little finger last, details after) */
  order: number;
  accent: boolean;
  closed: boolean;
  /** fine anatomical detail; dropped on small screens */
  detail: boolean;
  /** which joint group animates it, for node brightness */
  count: number;
  pts: Float32Array;
}

export function mkPose(
  yaw: number, pitch: number, roll: number,
  thumb: number[], index: number[], middle: number[], ring: number[], pinky: number[],
): number[] {
  return [yaw, pitch, roll, ...thumb, ...index, ...middle, ...ring, ...pinky];
}

export function lerpPose(a: number[], b: number[], t: number, out: number[]): number[] {
  for (let i = 0; i < POSE_LENGTH; i++) out[i] = a[i] + (b[i] - a[i]) * t;
  return out;
}

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

export interface DigitFrame {
  /** four joints: base (MCP/CMC), PIP, DIP, tip */
  j: V3[];
  /** side axis */
  w: V3;
  /** direction of each segment */
  dirs: V3[];
  /** binormal (palm-normal-ish) axis per joint */
  b: V3[];
  r: number[];
}

export function digit(name: Finger, pose: number[]): DigitFrame {
  const base = 3 + FINGERS.indexOf(name) * 4;
  const s = pose[base];
  const d0: V3 = [Math.sin(s), Math.cos(s), 0];
  let n: V3 = [0, 0, 1];
  if (name === 'thumb') n = norm(sub(THUMB_BEND, mul(d0, dot(THUMB_BEND, d0))));
  const w = cross(d0, n);
  const j: V3[] = [MCP[name]];
  const dirs: V3[] = [];
  const b: V3[] = [];
  let theta = 0;
  let p = MCP[name];
  const bAt = (th: number): V3 => add(mul(d0, -Math.sin(th)), mul(n, Math.cos(th)));
  b.push(bAt(0));
  for (let k = 0; k < 3; k++) {
    const next = theta + pose[base + 1 + k];
    const d = add(mul(d0, Math.cos(next)), mul(n, Math.sin(next)));
    dirs.push(d);
    p = add(p, mul(d, LEN[name][k]));
    j.push(p);
    b.push(bAt((theta + next) / 2));
    theta = next;
  }
  const r = TAPER.map(t => RAD[name] * t);
  return { j, w, dirs, b, r };
}

/* ---------- spline sampling ---------- */
export function sampleSpline(ctrl: V3[], M: number, closed: boolean, out: Float32Array) {
  const n = ctrl.length;
  for (let k = 0; k < M; k++) {
    const u = closed ? (k / (M - 1)) * n : (k / (M - 1)) * (n - 1);
    const i = Math.min(Math.floor(u), closed ? n - 1 : n - 2);
    const t = u - i;
    const p0 = ctrl[closed ? (i - 1 + n) % n : Math.max(i - 1, 0)];
    const p1 = ctrl[i % n];
    const p2 = ctrl[closed ? (i + 1) % n : i + 1];
    const p3 = ctrl[closed ? (i + 2) % n : Math.min(i + 2, n - 1)];
    const t2 = t * t, t3 = t2 * t;
    for (let c = 0; c < 3; c++) {
      out[k * 3 + c] = 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t
        + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2
        + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3);
    }
  }
}

function ringPts(c: V3, a: V3, b: V3, r: number, n = 12): V3[] {
  const out: V3[] = [];
  for (let i = 0; i < n; i++) {
    const ph = (i / n) * Math.PI * 2;
    out.push(add(c, add(mul(a, Math.cos(ph) * r), mul(b, Math.sin(ph) * r))));
  }
  return out;
}

/* ---------- strand layout (fixed for every pose) ---------- */
interface Spec { id: string; kind: string; order: number; accent: boolean; closed: boolean; detail: boolean; M: number }
const SPECS: Spec[] = [];
const spec = (id: string, kind: string, order: number, M: number, o: Partial<Spec> = {}) =>
  SPECS.push({ id, kind, order, M, accent: false, closed: false, detail: false, ...o });

spec('wrist-ring-a', 'wrist', 0.0, 17, { closed: true });
spec('wrist-ring-b', 'wrist', 0.03, 17, { closed: true, detail: true });
spec('forearm-l', 'wrist', 0.02, 12);
spec('forearm-r', 'wrist', 0.02, 12);
spec('palm-front', 'palm', 0.14, 34, { closed: true, accent: true });
spec('palm-back', 'palm', 0.2, 30, { closed: true, detail: true });
for (let i = 0; i < 4; i++) spec(`rib-${i}`, 'palm', 0.22, 6, { detail: true });
for (let i = 0; i < 4; i++) spec(`grid-l-${i}`, 'grid', 0.82 + i * 0.01, 12, { detail: i % 2 === 1 });
for (let i = 0; i < 3; i++) spec(`grid-t-${i}`, 'grid', 0.86 + i * 0.01, 12, { detail: true });
spec('knuckles', 'grid', 0.8, 16, { accent: true });
FINGERS.forEach((f, i) => {
  const o = 0.3 + i * 0.105;
  spec(`${f}-outline`, 'edge', o, 26, { accent: f === 'index' || f === 'middle' });
  spec(`${f}-bone`, 'bone', o + 0.03, 14, { accent: true });
  for (let k = 0; k < 3; k++) spec(`${f}-ring-${k}`, 'ring', o + 0.05 + k * 0.01, 13, { closed: true, detail: true });
  spec(`${f}-tail`, 'tail', 0.93, 10);
});

/** Extras (scene decorations). Fixed slot count so scenes can interpolate. */
export const SLOT_M = [26, 13, 14, 14, 14, 17, 17];
export const SLOT_CLOSED = [false, true, false, false, false, true, true];
export const SLOT_ORDER = [0.86, 0.98, 0.9, 0.92, 0.94, 0.95, 0.97];
export const SLOT_COUNT = SLOT_M.length;
export const NODE_SLOTS = 6;

export function createStrands(): Strand[] {
  return SPECS.map(s => ({
    id: s.id, kind: s.kind, order: s.order, accent: s.accent, closed: s.closed,
    detail: s.detail, count: s.M, pts: new Float32Array(s.M * 3),
  }));
}

export interface JointSet { [finger: string]: DigitFrame }

/** Fill all strands for a pose. Returns digit frames (joints are reused for nodes). */
export function buildHand(pose: number[], strands: Strand[]): JointSet {
  const frames: JointSet = {};
  for (const f of FINGERS) frames[f] = digit(f, pose);
  const by = new Map<string, Strand>();
  for (const s of strands) by.set(s.id, s);
  const put = (id: string, ctrl: V3[]) => {
    const s = by.get(id)!;
    sampleSpline(ctrl, s.count, s.closed, s.pts);
  };

  // wrist
  const wrC = (y: number, rx: number, rz: number) => {
    const out: V3[] = [];
    for (let i = 0; i < 12; i++) { const ph = (i / 12) * Math.PI * 2; out.push([Math.cos(ph) * rx + 0.1, y, Math.sin(ph) * rz]); }
    return out;
  };
  put('wrist-ring-a', wrC(-0.06, 0.27, 0.17));
  put('wrist-ring-b', wrC(-0.34, 0.25, 0.16));
  put('forearm-l', [[-0.17, -0.06, 0], [-0.19, -0.5, 0.01], [-0.23, -0.95, 0.02], [-0.28, -1.45, 0.03]]);
  put('forearm-r', [[0.37, -0.06, 0], [0.38, -0.5, 0.01], [0.41, -0.95, 0.02], [0.46, -1.45, 0.03]]);

  // palm outline (front) and back layer
  const outline: V3[] = [
    [-0.17, 0, 0.02], [-0.3, 0.12, 0.05], [-0.38, 0.34, 0.06], [-0.37, 0.62, 0.02],
    [-0.38, 0.93, 0], [-0.3, 1.04, 0], [-0.03, 1.11, 0], [0.24, 1.06, 0], [0.5, 0.94, 0],
    [0.56, 0.78, 0], [0.5, 0.46, 0.02], [0.37, 0.0, 0.02],
  ];
  put('palm-front', outline);
  put('palm-back', outline.map(p => [0.1 + (p[0] - 0.1) * 0.93, p[1] * 0.96 + 0.02, -0.17] as V3));
  const ribAt = [0, 4, 7, 9];
  ribAt.forEach((idx, i) => {
    const p = outline[idx];
    put(`rib-${i}`, [p, [p[0] * 0.98 + 0.002, p[1], p[2] * 0.5 - 0.085], [0.1 + (p[0] - 0.1) * 0.93, p[1] * 0.96 + 0.02, -0.17]]);
  });
  // knuckle arch
  put('knuckles', FINGERS.slice(1).map(f => [MCP[f][0], MCP[f][1] + 0.045, 0.012] as V3));
  // longitudinal palm lines
  FINGERS.slice(1).forEach((f, i) => {
    const m = MCP[f];
    put(`grid-l-${i}`, [[0.1, -0.02, 0.01], [0.1 + (m[0] - 0.1) * 0.4, 0.3, 0.07], [0.1 + (m[0] - 0.1) * 0.78, 0.65, 0.07], [m[0], m[1] - 0.02, 0.02]]);
  });
  // transverse arcs (creases)
  [0.3, 0.56, 0.8].forEach((y, i) => {
    const l = -0.28 - 0.1 * y, r = 0.37 + 0.2 * y;
    put(`grid-t-${i}`, [[l, y, 0.02], [l + (r - l) * 0.33, y + 0.05 - i * 0.015, 0.075], [l + (r - l) * 0.66, y + 0.05 - i * 0.02, 0.075], [r, y - 0.02, 0.02]]);
  });

  // digits
  for (const f of FINGERS) {
    const d = frames[f];
    const L = d.j.map((p, k) => sub(p, mul(d.w, d.r[k])));
    const R = d.j.map((p, k) => add(p, mul(d.w, d.r[k])));
    const last = d.dirs[2];
    const apex = add(d.j[3], mul(last, d.r[3] * 1.15));
    put(`${f}-outline`, [L[0], L[1], L[2], L[3], apex, R[3], R[2], R[1], R[0]]);
    put(`${f}-bone`, d.j);
    for (let k = 0; k < 3; k++) put(`${f}-ring-${k}`, ringPts(d.j[k], d.w, d.b[k], d.r[k]));
    const tip = d.j[3];
    put(`${f}-tail`, [tip, add(tip, mul(last, 0.12)), add(add(tip, mul(last, 0.3)), mul(d.w, 0.025)), add(tip, mul(last, 0.52))]);
  }
  return frames;
}

/** 21 landmark joints for node dots */
export function landmarks(frames: JointSet): V3[] {
  const out: V3[] = [[0.1, 0, 0]];
  for (const f of FINGERS) for (const p of frames[f].j) out.push(p);
  return out;
}
