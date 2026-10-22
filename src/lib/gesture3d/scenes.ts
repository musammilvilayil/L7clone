import {
  buildHand, createStrands, landmarks, mkPose, NODE_SLOTS, SLOT_COUNT, SLOT_M,
  type JointSet, type V3,
} from './handRig';

/** Hand-space centre used as the rotation pivot. */
export const PIVOT: V3 = [0.1, 0.6, 0];

export function rotate(v: ArrayLike<number>, o: number, yaw: number, pitch: number, roll: number, out: number[]) {
  const x = v[o] - PIVOT[0], y = v[o + 1] - PIVOT[1], z = v[o + 2] - PIVOT[2];
  const cr = Math.cos(roll), sr = Math.sin(roll);
  const x1 = x * cr - y * sr, y1 = x * sr + y * cr;
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const y2 = y1 * cp - z * sp, z2 = y1 * sp + z * cp;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  out[0] = x1 * cy + z2 * sy;
  out[1] = y2;
  out[2] = -x1 * sy + z2 * cy;
}

export interface Extras {
  w: number[];
  pts: Float32Array[];
  nodeW: number[];
  nodes: Float32Array;
  /** index of the node that pulses */
  active: number;
}
export interface Scene {
  name: string;
  pose: number[];
  extras: Extras;
  fit: { cx: number; cy: number; w: number; h: number };
}

const lin = (M: number, ...c: V3[]): Float32Array => {
  const out = new Float32Array(M * 3);
  for (let k = 0; k < M; k++) {
    const u = (k / (M - 1)) * (c.length - 1);
    const i = Math.min(Math.floor(u), c.length - 2);
    const t = u - i;
    for (let a = 0; a < 3; a++) out[k * 3 + a] = c[i][a] + (c[i + 1][a] - c[i][a]) * t;
  }
  return out;
};
const quad = (M: number, p0: V3, p1: V3, p2: V3): Float32Array => {
  const out = new Float32Array(M * 3);
  for (let k = 0; k < M; k++) {
    const t = k / (M - 1), m = 1 - t;
    for (let a = 0; a < 3; a++) out[k * 3 + a] = m * m * p0[a] + 2 * m * t * p1[a] + t * t * p2[a];
  }
  return out;
};
const arc = (M: number, c: V3, r: number, a0: number, a1: number): Float32Array => {
  const out = new Float32Array(M * 3);
  for (let k = 0; k < M; k++) {
    const a = a0 + (a1 - a0) * (k / (M - 1));
    out[k * 3] = c[0] + Math.cos(a) * r; out[k * 3 + 1] = c[1] + Math.sin(a) * r; out[k * 3 + 2] = c[2];
  }
  return out;
};
const ring = (M: number, c: V3, r: number, sides = 0): Float32Array => {
  if (!sides) return arc(M, c, r, 0, Math.PI * 2);
  const v: V3[] = [];
  for (let i = 0; i <= sides; i++) { const a = (i / sides) * Math.PI * 2 + Math.PI / 6; v.push([c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r, c[2]]); }
  return lin(M, ...v);
};
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mid = (a: V3, b: V3): V3 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
const rest = (M: number): Float32Array => { const o = new Float32Array(M * 3); for (let k = 0; k < M; k++) { o[k * 3] = 0.1; o[k * 3 + 1] = 0.55; o[k * 3 + 2] = 0.06; } return o; };

function emptyExtras(): Extras {
  return { w: new Array(SLOT_COUNT).fill(0), pts: SLOT_M.map(rest), nodeW: new Array(NODE_SLOTS).fill(0), nodes: new Float32Array(NODE_SLOTS * 3), active: 0 };
}
function setNodes(e: Extras, active: number, ...n: V3[]) {
  n.slice(0, NODE_SLOTS).forEach((p, i) => { e.nodes.set(p, i * 3); e.nodeW[i] = 1; });
  e.active = active;
}

type Key = 'float' | 'think' | 'raise' | 'connect' | 'point' | 'confident' | 'mark' | 'none';

function makeExtras(key: Key, f: JointSet): Extras {
  const e = emptyExtras();
  const tip = (n: string) => f[n].j[3];
  const set = (slot: number, pts: Float32Array, w = 1) => { e.pts[slot] = pts; e.w[slot] = w; };
  switch (key) {
    case 'float': {
      const n1 = add(tip('index'), [-0.12, 0.55, 0.35]), n2 = add(tip('middle'), [0.02, 0.85, 0.45]), n3 = add(tip('ring'), [0.14, 0.6, 0.3]);
      set(2, quad(14, tip('index'), add(mid(tip('index'), n1), [-0.1, 0, 0.1]), n1));
      set(3, quad(14, tip('middle'), add(mid(tip('middle'), n2), [0.08, 0, 0.12]), n2));
      set(4, quad(14, tip('ring'), add(mid(tip('ring'), n3), [0.1, 0, 0.1]), n3));
      set(0, lin(26, n1, n2, n3), 0.85);
      set(1, ring(13, n1, 0.05));
      set(5, ring(17, n2, 0.14));
      set(6, ring(17, n2, 0.3), 0.7);
      setNodes(e, 1, n1, n2, n3);
      break;
    }
    case 'think': {
      const t = tip('index'), c = add(t, [0.12, 0.62, 0.2]);
      set(2, arc(14, c, 0.34, 0.35, 5.2));
      set(3, arc(14, c, 0.18, 3.4, 8.0), 0.9);
      set(4, lin(14, add(c, [0.5, -0.12, 0]), add(c, [0.68, 0.1, 0]), add(c, [0.92, 0.04, 0])), 0.9);
      set(0, lin(26, t, add(t, [0.03, 0.22, 0.08]), add(c, [0.34 * Math.cos(0.35), 0.34 * Math.sin(0.35), 0])), 0.8);
      set(1, ring(13, c, 0.045));
      setNodes(e, 4, add(c, [0.34 * Math.cos(0.35), 0.34 * Math.sin(0.35), 0]), add(c, [0.34 * Math.cos(5.2), 0.34 * Math.sin(5.2), 0]), add(c, [0.92, 0.04, 0]), c);
      break;
    }
    case 'raise': {
      const t = tip('index');
      const a = add(t, [-0.62, 0.82, 0.1]), b = add(t, [0.0, 1.12, 0.18]), c = add(t, [0.62, 0.82, 0.1]);
      set(2, quad(14, t, add(mid(t, a), [-0.06, 0.12, 0]), a));
      set(3, quad(14, t, add(mid(t, b), [0.04, 0, 0.05]), b));
      set(4, quad(14, t, add(mid(t, c), [0.06, 0.12, 0]), c));
      set(0, lin(26, a, add(mid(a, b), [0, 0.1, 0.1]), b, add(mid(b, c), [0, 0.1, 0.1]), c), 0.9);
      set(1, ring(13, t, 0.06));
      set(5, ring(17, t, 0.14));
      set(6, ring(17, t, 0.32), 0.75);
      setNodes(e, 0, t, a, b, c);
      break;
    }
    case 'connect': {
      const p = mid(tip('index'), tip('thumb'));
      const m1 = add(p, [-0.95, 0.6, 0]), m2 = add(p, [-1.05, -0.38, 0.1]), m3 = add(p, [0.95, 0.7, -0.1]);
      set(2, quad(14, p, add(mid(p, m1), [0, 0.15, 0]), m1));
      set(3, quad(14, p, add(mid(p, m2), [-0.05, -0.1, 0]), m2));
      set(4, quad(14, p, add(mid(p, m3), [0.1, 0.2, 0]), m3));
      set(0, lin(26, m1, m2, add(m2, [-0.02, -0.45, 0])), 0.8);
      set(1, ring(13, m3, 0.07));
      set(5, ring(17, m1, 0.19, 6));
      set(6, ring(17, m2, 0.19, 6));
      setNodes(e, 0, p, m1, m2, m3);
      break;
    }
    case 'point': {
      const t = tip('index'), d = f.index.dirs[2], T: V3 = [t[0] + d[0] * 0.95, t[1] + d[1] * 0.95, t[2] + d[2] * 0.95];
      set(2, lin(14, t, T));
      set(3, lin(14, add(T, [-0.3, 0.2, 0]), add(T, [-0.3, 0.3, 0]), add(T, [0.3, 0.3, 0]), add(T, [0.3, 0.2, 0])), 0.9);
      set(4, lin(14, add(T, [-0.3, -0.2, 0]), add(T, [-0.3, -0.3, 0]), add(T, [0.3, -0.3, 0]), add(T, [0.3, -0.2, 0])), 0.9);
      set(1, ring(13, T, 0.06));
      set(5, ring(17, t, 0.13));
      set(6, ring(17, t, 0.3), 0.75);
      setNodes(e, 0, t, T);
      break;
    }
    case 'confident': {
      const t = tip('thumb');
      set(2, lin(14, add(t, [-0.12, 0.2, 0]), add(t, [-0.28, 0.5, 0])));
      set(3, lin(14, add(t, [0, 0.24, 0]), add(t, [0, 0.62, 0])));
      set(4, lin(14, add(t, [0.12, 0.2, 0]), add(t, [0.28, 0.5, 0])));
      set(5, ring(17, t, 0.13));
      set(6, ring(17, t, 0.3), 0.7);
      setNodes(e, 0, t);
      break;
    }
    case 'mark': {
      // network question mark above the open palm
      const c: V3 = [0.02, 2.98, 0.1], r = 0.4;
      const hook = new Float32Array(26 * 3);
      for (let k = 0; k < 26; k++) {
        const u = k / 25;
        let x: number, y: number;
        if (u < 0.78) { const a = ((200 - 270 * (u / 0.78)) * Math.PI) / 180; x = c[0] + Math.cos(a) * r; y = c[1] + Math.sin(a) * r; }
        else {
          const s = (u - 0.78) / 0.22;
          const ex = c[0] + Math.cos((-70 * Math.PI) / 180) * r, ey = c[1] + Math.sin((-70 * Math.PI) / 180) * r;
          x = ex + (0.02 - ex) * s; y = ey + (2.52 - ey) * s;
        }
        hook[k * 3] = x; hook[k * 3 + 1] = y; hook[k * 3 + 2] = c[2];
      }
      const dotC: V3 = [0.02, 2.28, 0.1];
      set(0, hook);
      set(1, ring(13, dotC, 0.058));
      const hookStart: V3 = [hook[0], hook[1], hook[2]];
      set(2, quad(14, tip('index'), [-0.4, 1.9, 0.1], hookStart), 0.9);
      set(3, lin(14, tip('middle'), dotC), 0.9);
      set(4, quad(14, tip('ring'), [0.5, 1.9, 0.1], [hook[24 * 3], hook[24 * 3 + 1], hook[24 * 3 + 2]]), 0.9);
      setNodes(e, 0, dotC, [c[0], c[1] + r, c[2]], hookStart);
      break;
    }
    default:
      break;
  }
  return e;
}

function makeScene(name: string, pose: number[], key: Key): Scene {
  const strands = createStrands();
  const frames = buildHand(pose, strands);
  const extras = makeExtras(key, frames);
  void landmarks;
  const tmp = [0, 0, 0];
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  const eat = (arr: ArrayLike<number>, n: number) => {
    for (let k = 0; k < n; k++) {
      rotate(arr, k * 3, pose[0], pose[1], pose[2], tmp);
      x0 = Math.min(x0, tmp[0]); x1 = Math.max(x1, tmp[0]); y0 = Math.min(y0, tmp[1]); y1 = Math.max(y1, tmp[1]);
    }
  };
  for (const s of strands) if (s.kind !== 'wrist' || s.id.startsWith('wrist-ring-a')) eat(s.pts, s.count);
  extras.pts.forEach((p, i) => { if (extras.w[i] > 0) eat(p, SLOT_M[i]); });
  // include a short forearm so the wrist anchors read as lines leaving the hand
  return { name, pose, extras, fit: { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 } };
}

const T = (a: number[]) => a;
export const SCENES: Record<string, Scene> = {
  open: makeScene('open',
    mkPose(-0.42, -0.46, 0.2, T([-0.95, 0.22, 0.2, 0.12]), T([-0.1, 0.2, 0.26, 0.16]), T([0, 0.15, 0.22, 0.14]), T([0.09, 0.22, 0.26, 0.16]), T([0.2, 0.28, 0.3, 0.18])), 'float'),
  cup: makeScene('cup',
    mkPose(0.34, -0.7, -0.14, T([-0.8, 0.3, 0.3, 0.2]), T([-0.08, 0.42, 0.5, 0.32]), T([0, 0.38, 0.5, 0.3]), T([0.08, 0.42, 0.52, 0.34]), T([0.18, 0.5, 0.55, 0.36])), 'float'),
  think: makeScene('think',
    mkPose(0.55, 0.06, -0.36, T([-0.25, 0.85, 0.7, 0.35]), T([-0.05, 0.1, 0.08, 0.05]), T([-0.02, 1.45, 1.6, 1.0]), T([0.05, 1.5, 1.65, 1.0]), T([0.12, 1.5, 1.6, 0.9])), 'think'),
  raise: makeScene('raise',
    mkPose(0.36, -0.02, 0.06, T([-0.28, 0.7, 0.8, 0.5]), T([-0.02, 0, 0.02, 0]), T([-0.02, 1.45, 1.6, 1.0]), T([0.05, 1.5, 1.65, 1.0]), T([0.12, 1.5, 1.6, 0.9])), 'raise'),
  connect: makeScene('connect',
    mkPose(-0.5, -0.16, 0.3, T([-0.5, 0.45, 0.5, 0.45]), T([-0.1, 0.95, 0.9, 0.55]), T([0, 0.45, 0.6, 0.4]), T([0.08, 0.55, 0.7, 0.4]), T([0.18, 0.65, 0.75, 0.4])), 'connect'),
  point: makeScene('point',
    mkPose(0.42, 0.08, 0.7, T([-0.5, 0.35, 0.5, 0.3]), T([-0.04, 0, 0.02, 0]), T([0, 1.4, 1.55, 0.95]), T([0.05, 1.45, 1.6, 0.95]), T([0.12, 1.45, 1.55, 0.9])), 'point'),
  confident: makeScene('confident',
    mkPose(-0.95, 0.02, 0.12, T([-0.12, 0.18, 0.1, 0.06]), T([-0.05, 1.5, 1.7, 1.0]), T([0, 1.55, 1.75, 1.0]), T([0.05, 1.55, 1.75, 1.0]), T([0.1, 1.5, 1.7, 0.95])), 'confident'),
  faq: makeScene('faq',
    mkPose(0.03, 0, 0, T([-1.0, 0.12, 0.1, 0.05]), T([-0.13, 0, 0, 0]), T([-0.01, 0, 0, 0]), T([0.1, 0, 0, 0]), T([0.23, 0, 0, 0])), 'mark'),
  reach: makeScene('reach',
    mkPose(0.45, -0.1, -1.25, T([-0.7, 0.2, 0.2, 0.1]), T([-0.04, 0.08, 0.1, 0.05]), T([0, 0.15, 0.2, 0.1]), T([0.07, 0.3, 0.35, 0.2]), T([0.15, 0.4, 0.45, 0.25])), 'none'),
};
