import {
  buildHand, createStrands, landmarks, lerpPose, POSE_LENGTH, SLOT_CLOSED, SLOT_COUNT, SLOT_M, SLOT_ORDER, NODE_SLOTS,
  type Strand,
} from './handRig';
import { rotate, SCENES, type Scene } from './scenes';

const TAU = Math.PI * 2;
const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const sm = (a: number, b: number, x: number) => { const t = clamp((x - a) / Math.max(1e-4, b - a)); return t * t * (3 - 2 * t); };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

interface Anchor { el: HTMLElement; scene: string; build: [number, number] }
interface RGB { r: number; g: number; b: number }

const EXTRA_TOTAL = SLOT_M.reduce((s, m) => s + m * 3, 0);
const EXTRA_OFFSET = SLOT_M.map((_, i) => SLOT_M.slice(0, i).reduce((s, m) => s + m * 3, 0));

/** Everything that is blended between two scenes and smoothed over time. */
class State {
  pose = new Float32Array(POSE_LENGTH);
  ew = new Float32Array(SLOT_COUNT);
  ep = new Float32Array(EXTRA_TOTAL);
  nw = new Float32Array(NODE_SLOTS);
  nodes = new Float32Array(NODE_SLOTS * 3);
  fit = new Float32Array(4); // cx, cy, w, h
  reach = 0; // 1 when the two-hand contact scene is active
  faq = 0; // 1 when the FAQ sequence is active
  active = 0;
  copy(o: State, k: number) {
    const f = (a: Float32Array, b: Float32Array) => { for (let i = 0; i < a.length; i++) a[i] += (b[i] - a[i]) * k; };
    f(this.pose, o.pose); f(this.ew, o.ew); f(this.ep, o.ep); f(this.nw, o.nw); f(this.nodes, o.nodes); f(this.fit, o.fit);
    this.reach += (o.reach - this.reach) * k; this.faq += (o.faq - this.faq) * k; this.active = o.active;
  }
  set(o: State) { this.copy(o, 1); }
}

class Rig {
  strands: Strand[] = createStrands();
  scr: Float32Array[] = this.strands.map(s => new Float32Array(s.count * 3));
  eScr: Float32Array[] = SLOT_M.map(m => new Float32Array(m * 3));
  seeds: Float32Array;
  eSeeds: Float32Array;
  index = new Map<string, number>();
  lm = new Float32Array(21 * 3);
  nScr = new Float32Array(NODE_SLOTS * 3);
  constructor(seed: number) {
    this.strands.forEach((s, i) => this.index.set(s.id, i));
    this.seeds = seeds(this.strands.length, seed);
    this.eSeeds = seeds(SLOT_COUNT, seed + 91);
  }
}

function seeds(n: number, seed: number): Float32Array {
  const a = new Float32Array(n * 6);
  let s = (seed * 9301 + 49297) >>> 0;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = 0; i < n; i++) {
    a[i * 6] = rnd(); a[i * 6 + 1] = 0.35 + rnd() * 0.65; a[i * 6 + 2] = 0.55 + rnd() * 1.1;
    a[i * 6 + 3] = rnd() * TAU; a[i * 6 + 4] = (0.12 + rnd() * 0.22) * (rnd() < 0.5 ? -1 : 1); a[i * 6 + 5] = rnd() < 0.5 ? -1 : 1;
  }
  return a;
}

function parseColor(v: string, fallback: RGB): RGB {
  const m = v.trim().match(/^#([0-9a-f]{6})$/i);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export class GestureEngine {
  private ctx: CanvasRenderingContext2D;
  private W = 0; private H = 0; private dpr = 1;
  private anchors: Anchor[] = [];
  private raf = 0;
  private start = performance.now();
  private last = 0;
  private reduced = false;
  private mobile = false;
  private dead = false;
  private target = new State();
  private cur = new State();
  private first = true;
  private primary = new Rig(1);
  private secondary = new Rig(2);
  private amb: Float32Array;
  private ambN = 0;
  private ambPts: Float32Array = new Float32Array(0);
  private pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  private ripples: { x: number; y: number; t: number; w: number }[] = [];
  private boost = 0;
  private col = { accent: { r: 143, g: 203, b: 255 }, muted: { r: 168, g: 184, b: 200 }, light: false };
  private cleanups: (() => void)[] = [];
  private tmp = [0, 0, 0];
  private poseBuf = new Array<number>(POSE_LENGTH).fill(0);
  private poseA = new Array<number>(POSE_LENGTH).fill(0);
  private buf = new Float32Array(128);
  private interval = 0;

  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const c = canvas.getContext('2d', { alpha: true });
    if (!c) throw new Error('2D canvas unavailable');
    this.ctx = c;
    this.amb = seeds(24, 7);
    this.setup();
  }

  /* ---------------- lifecycle ---------------- */
  private setup() {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced = mq.matches;
    const onMq = () => { this.reduced = mq.matches; this.restart(); };
    mq.addEventListener('change', onMq);
    this.cleanups.push(() => mq.removeEventListener('change', onMq));

    const onResize = () => { this.resize(); this.requestFrame(); };
    window.addEventListener('resize', onResize);
    this.cleanups.push(() => window.removeEventListener('resize', onResize));
    const onScroll = () => { if (this.reduced) this.requestFrame(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    this.cleanups.push(() => window.removeEventListener('scroll', onScroll));
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      this.pointer.tx = e.clientX / Math.max(1, window.innerWidth); this.pointer.ty = e.clientY / Math.max(1, window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    this.cleanups.push(() => window.removeEventListener('pointermove', onMove));
    const onVis = () => { if (document.hidden) this.halt(); else this.restart(); };
    document.addEventListener('visibilitychange', onVis);
    this.cleanups.push(() => document.removeEventListener('visibilitychange', onVis));
    const onGesture = (e: Event) => this.pulse((e as CustomEvent<{ kind?: string }>).detail?.kind ?? 'tip');
    window.addEventListener('l7:gesture', onGesture);
    this.cleanups.push(() => window.removeEventListener('l7:gesture', onGesture));

    const mo = new MutationObserver(() => this.collect());
    mo.observe(document.body, { childList: true, subtree: true });
    this.cleanups.push(() => mo.disconnect());
    const theme = new MutationObserver(() => this.readColors());
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    this.cleanups.push(() => theme.disconnect());

    this.readColors();
    this.collect();
    this.resize();
    this.restart();
  }

  private readColors() {
    const cs = getComputedStyle(document.documentElement);
    this.col.accent = parseColor(cs.getPropertyValue('--accent'), this.col.accent);
    this.col.muted = parseColor(cs.getPropertyValue('--muted'), this.col.muted);
    this.col.light = document.documentElement.dataset.theme === 'light';
    this.requestFrame();
  }

  private collect() {
    this.anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).map(el => {
      const b = (el.dataset.build ?? '').split(',').map(Number);
      return { el, scene: el.dataset.scene ?? 'open', build: [Number.isFinite(b[0]) && b.length > 1 ? b[0] : 0.5, Number.isFinite(b[1]) && b.length > 1 ? b[1] : 0.9] as [number, number] };
    });
  }

  private resize() {
    this.mobile = window.innerWidth < 760;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 1.75);
    this.W = window.innerWidth; this.H = window.innerHeight;
    this.canvas.width = Math.round(this.W * this.dpr); this.canvas.height = Math.round(this.H * this.dpr);
    this.canvas.style.width = this.W + 'px'; this.canvas.style.height = this.H + 'px';
    this.ambN = this.mobile ? 9 : 17;
    this.interval = this.mobile ? 1000 / 30 : 0;
  }

  private restart() {
    this.halt();
    this.start = performance.now() - (this.reduced ? 99999 : 0);
    this.requestFrame();
  }
  private halt() { if (this.raf) cancelAnimationFrame(this.raf); this.raf = 0; }
  private requestFrame() {
    if (this.dead || this.raf || document.hidden) return;
    this.raf = requestAnimationFrame(t => this.frame(t));
  }

  destroy() {
    this.dead = true; this.halt();
    this.cleanups.forEach(c => c());
    this.cleanups = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  pulse(kind: string) {
    this.boost = 1;
    const a = this.cur.active;
    void a;
    this.ripples.push({ x: -1, y: -1, t: performance.now(), w: kind === 'mark' ? 1 : kind === 'bridge' ? 2 : 0 });
    if (this.ripples.length > 4) this.ripples.shift();
    this.requestFrame();
  }

  /* ---------------- timeline ---------------- */
  private resolve(now: number): { f: number; win: number; cx: number; cy: number; S: number; ew: number; ah: number; w: number } {
    const sy = window.scrollY, vh = this.H;
    const yc = sy + vh * 0.5;
    const list = this.anchors.map(a => {
      const r = a.el.getBoundingClientRect();
      return { a, r, c: r.top + sy + r.height / 2 };
    }).sort((p, q) => p.c - q.c);
    if (!list.length) return { f: 0, win: 0.3, cx: this.W / 2, cy: this.H / 2, S: 100, ew: 1, ah: 100, w: 0 };
    let i = 0, u = 0;
    if (yc >= list[list.length - 1].c) { i = list.length - 1; u = 0; }
    else if (yc > list[0].c) {
      while (i < list.length - 2 && yc >= list[i + 1].c) i++;
      u = (yc - list[i].c) / Math.max(1, list[i + 1].c - list[i].c);
    }
    const A = list[i], B = list[Math.min(i + 1, list.length - 1)];
    const r0 = Math.max(B.a.build[0], 0.5), r1 = B.a.build[1];
    const d0 = 0.3;
    let f = u < r0 ? 1 - sm(d0, 0.5, u) : sm(r0, r1, u);
    if (i === list.length - 1) f = 1;
    if (i === 0 && u < 0.2) f *= this.reduced ? 1 : sm(0, 2.4, (now - this.start) / 1000);
    if (this.reduced) f = u < 0.5 ? 1 : 1; // static: fully formed nearest scene
    const w = this.reduced ? (u < 0.5 ? 0 : 1) : sm(d0 + 0.1, r1 - 0.04, u);
    const wp = sm(0.25, 0.85, u);

    const sceneA = SCENES[A.a.scene] ?? SCENES.open;
    const sceneB = SCENES[B.a.scene] ?? SCENES.open;
    this.blend(sceneA, sceneB, w);
    this.target.reach = mix(A.a.scene === 'reach' ? 1 : 0, B.a.scene === 'reach' ? 1 : 0, w);
    this.target.faq = mix(A.a.scene === 'faq' ? 1 : 0, B.a.scene === 'faq' ? 1 : 0, w);

    const fitS = (sc: Scene, r: DOMRect) => Math.min(r.height / sc.fit.h, r.width / (sc.fit.w * (sc.name === 'reach' ? 2.15 : 1))) * 0.97;
    const SA = fitS(sceneA, A.r), SB = fitS(sceneB, B.r);
    const cx = mix(A.r.left + A.r.width / 2, B.r.left + B.r.width / 2, wp);
    const cy = mix(A.r.top + A.r.height / 2, B.r.top + B.r.height / 2, wp);
    const ah = mix(A.r.height, B.r.height, wp);
    const aw = mix(A.r.width, B.r.width, wp);
    return { f: clamp(f), win: mix(0.3, 0.17, this.cur.faq), cx, cy, S: mix(SA, SB, wp), ew: aw, ah, w };
  }

  private blend(a: Scene, b: Scene, t: number) {
    const T = this.target;
    lerpPose(a.pose, b.pose, t, this.poseBuf);
    for (let i = 0; i < POSE_LENGTH; i++) T.pose[i] = this.poseBuf[i];
    for (let s = 0; s < SLOT_COUNT; s++) {
      T.ew[s] = mix(a.extras.w[s], b.extras.w[s], t);
      const o = EXTRA_OFFSET[s], pa = a.extras.pts[s], pb = b.extras.pts[s];
      for (let k = 0; k < SLOT_M[s] * 3; k++) T.ep[o + k] = mix(pa[k], pb[k], t);
    }
    for (let n = 0; n < NODE_SLOTS; n++) {
      T.nw[n] = mix(a.extras.nodeW[n], b.extras.nodeW[n], t);
      for (let k = 0; k < 3; k++) T.nodes[n * 3 + k] = mix(a.extras.nodes[n * 3 + k], b.extras.nodes[n * 3 + k], t);
    }
    T.fit[0] = mix(a.fit.cx, b.fit.cx, t); T.fit[1] = mix(a.fit.cy, b.fit.cy, t);
    T.fit[2] = mix(a.fit.w, b.fit.w, t); T.fit[3] = mix(a.fit.h, b.fit.h, t);
    T.active = t < 0.5 ? a.extras.active : b.extras.active;
  }

  /* ---------------- frame ---------------- */
  private frame(now: number) {
    this.raf = 0;
    if (this.dead) return;
    if (this.interval && now - this.last < this.interval) { this.requestFrame(); return; }
    const dt = Math.min(0.05, (now - (this.last || now - 16)) / 1000);
    this.last = now;
    const t = this.reduced ? 0 : now / 1000;

    const r = this.resolve(now);
    if (this.first) { this.cur.set(this.target); this.first = false; } else this.cur.copy(this.target, this.reduced ? 1 : 1 - Math.exp(-dt * 9));
    this.pointer.x += (this.pointer.tx - this.pointer.x) * 0.05; this.pointer.y += (this.pointer.ty - this.pointer.y) * 0.05;
    this.boost *= Math.exp(-dt * 1.6);

    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.W, this.H);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    this.drawAmbient(ctx, t, r.cx, r.cy, r.S * this.cur.fit[3], r.f);
    const cw = clamp(this.cur.reach);
    const gap = mix(0.42, 0.035, sm(0.15, 1, r.f)) * r.ew;
    const shift = this.drawHand(ctx, this.primary, t, r, 1, 0, gap, cw, true);
    if (cw > 0.02) this.drawHand(ctx, this.secondary, t, r, -1, shift, gap, cw, false);
    this.drawRipples(ctx, now);
    if (!this.reduced) this.requestFrame();
  }

  private color(a: number, bright = false): string {
    const c = this.col.accent, m = this.col.muted;
    const k = bright ? 1 : 0.45;
    return `rgba(${Math.round(mix(m.r, c.r, k))},${Math.round(mix(m.g, c.g, k))},${Math.round(mix(m.b, c.b, k))},${a.toFixed(3)})`;
  }

  /* ---------------- ambient network ---------------- */
  private drawAmbient(ctx: CanvasRenderingContext2D, t: number, hx: number, hy: number, R: number, f: number) {
    const W = this.W, H = this.H, sy = window.scrollY;
    const n = this.ambN, M = 26;
    if (this.ambPts.length < n * M * 2) this.ambPts = new Float32Array(24 * 26 * 2);
    const P = this.ambPts;
    const base = this.col.light ? 0.5 : 1;
    const nodes: number[] = [];
    for (let i = 0; i < n; i++) {
      const o = i * 6, yf = this.amb[o], amp = this.amb[o + 1], kf = this.amb[o + 2], ph = this.amb[o + 3], sp = this.amb[o + 4];
      const par = 0.06 + yf * 0.12;
      const yb = ((yf * H * 1.25 - sy * par) % (H * 1.25) + H * 1.25) % (H * 1.25) - H * 0.12;
      for (let k = 0; k < M; k++) {
        const u = k / (M - 1);
        let x = (-0.1 + 1.2 * u) * W;
        let y = yb + amp * H * 0.09 * Math.sin(u * kf * TAU + ph + t * sp) + amp * H * 0.035 * Math.sin(u * kf * 2.6 * TAU - t * sp * 0.8);
        const dx = hx - x, dy = hy - y, d2 = (dx * dx + dy * dy) / (R * R + 1);
        const pull = 0.15 * f * Math.exp(-d2);
        x += dx * pull; y += dy * pull;
        P[(i * M + k) * 2] = x; P[(i * M + k) * 2 + 1] = y;
      }
      ctx.beginPath();
      ctx.moveTo(P[i * M * 2], P[i * M * 2 + 1]);
      for (let k = 1; k < M - 1; k++) {
        const x = P[(i * M + k) * 2], y = P[(i * M + k) * 2 + 1], nx = P[(i * M + k + 1) * 2], ny = P[(i * M + k + 1) * 2 + 1];
        ctx.quadraticCurveTo(x, y, (x + nx) / 2, (y + ny) / 2);
      }
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = this.color((0.1 + 0.06 * amp) * base);
      ctx.stroke();
      for (const u of [0.22, 0.52, 0.82]) {
        const k = Math.round(u * (M - 1));
        nodes.push(P[(i * M + k) * 2], P[(i * M + k) * 2 + 1], i);
      }
    }
    // short connecting segments between nearby nodes of different curves
    ctx.lineWidth = 0.7;
    for (let a = 0; a < nodes.length; a += 3) {
      for (let b = a + 3; b < nodes.length; b += 3) {
        if (nodes[a + 2] === nodes[b + 2]) continue;
        const d = Math.hypot(nodes[a] - nodes[b], nodes[a + 1] - nodes[b + 1]);
        if (d < 190) {
          ctx.strokeStyle = this.color((1 - d / 190) * 0.16 * base);
          ctx.beginPath(); ctx.moveTo(nodes[a], nodes[a + 1]); ctx.lineTo(nodes[b], nodes[b + 1]); ctx.stroke();
        }
      }
    }
    ctx.fillStyle = this.color(0.38 * base, true);
    for (let a = 0; a < nodes.length; a += 3) { ctx.beginPath(); ctx.arc(nodes[a], nodes[a + 1], 1.7, 0, TAU); ctx.fill(); }
  }

  /* ---------------- hand ---------------- */
  private drawHand(
    ctx: CanvasRenderingContext2D, rig: Rig, t: number, r: { f: number; win: number; cx: number; cy: number; S: number },
    sgn: number, inShift: number, gap: number, cw: number, primary: boolean,
  ): number {
    const st = this.cur, W = this.W, H = this.H;
    const pose = this.poseA;
    for (let i = 0; i < POSE_LENGTH; i++) pose[i] = st.pose[i];
    if (!this.reduced) {
      pose[0] += Math.sin(t * 0.55 + (primary ? 0 : 1.7)) * 0.045 + (this.pointer.x - 0.5) * 0.16;
      pose[1] += Math.cos(t * 0.43) * 0.025 + (this.pointer.y - 0.5) * 0.08;
    }
    const yaw = pose[0] * sgn, pitch = pose[1], roll = pose[2] * sgn;
    const frames = buildHand(pose, rig.strands);
    const tmp = this.tmp, D = 5.6;
    const fcx = st.fit[0] * sgn, fcy = st.fit[1], S = r.S;
    const baseX = r.cx;
    const proj = (src: ArrayLike<number>, o: number, dst: Float32Array, p: number) => {
      rotate(src, o, pose[0], pose[1], pose[2], tmp);
      let x = tmp[0], y = tmp[1];
      const z = tmp[2];
      if (sgn < 0) { /* mirrored hand: reflect across the vertical axis */ }
      const k = D / (D - z);
      x = x * k; y = y * k;
      dst[p] = baseX + sgn * (x - st.fit[0]) * S;
      dst[p + 1] = r.cy - (y - fcy) * S;
      dst[p + 2] = z;
    };
    void yaw; void pitch; void roll; void fcx; void W; void H;

    // project strands
    for (let si = 0; si < rig.strands.length; si++) {
      const s = rig.strands[si], dst = rig.scr[si];
      for (let k = 0; k < s.count; k++) proj(s.pts, k * 3, dst, k * 3);
    }
    for (let e = 0; e < SLOT_COUNT; e++) for (let k = 0; k < SLOT_M[e]; k++) proj(st.ep, EXTRA_OFFSET[e] + k * 3, rig.eScr[e], k * 3);
    for (let n = 0; n < NODE_SLOTS; n++) proj(st.nodes, n * 3, rig.nScr, n * 3);
    const lmH = landmarks(frames);
    for (let k = 0; k < 21; k++) proj(lmH[k], 0, rig.lm, k * 3);

    // contact: slide each hand so the index fingertips meet near the centre
    let shift = inShift;
    const tipIdx = rig.index.get('index-bone')!;
    if (primary) {
      const tipX = rig.scr[tipIdx][13 * 3];
      shift = cw > 0.001 ? (baseX - gap - tipX) * cw : 0;
    }
    const sx = primary ? shift : -inShift;

    const f = clamp(r.f), win = r.win;
    const mobile = this.mobile;
    const Hh = this.H, Ww = this.W;
    const cy0 = mix(Hh * 0.5, r.cy, 0.6);

    const drawLine = (scr: Float32Array, count: number, seedArr: Float32Array, so: number, order: number, vis: number,
      accent: boolean, detail: boolean, dashed: boolean, closed: boolean) => {
      const g = sm(0, 1, (f - order * (1 - win)) / win) * vis;
      const netA = detail ? 0 : accent ? 0.3 : 0.2;
      if (g < 0.004 && netA === 0) return;
      const e = g;
      const yf = seedArr[so], amp = seedArr[so + 1], kf = seedArr[so + 2], ph = seedArr[so + 3], sp = seedArr[so + 4], sw = seedArr[so + 5];
      let zSum = 0;
      for (let k = 0; k < count; k++) {
        const u = k / (count - 1);
        let hx = scr[k * 3] + sx * (sgn > 0 ? 1 : 1), hy = scr[k * 3 + 1];
        zSum += scr[k * 3 + 2];
        if (e >= 0.999) { this.buf[k * 2] = hx; this.buf[k * 2 + 1] = hy; continue; }
        const nx = (-0.12 + 1.24 * u) * Ww * (sgn > 0 ? 1 : 1);
        const ny = cy0 + (yf - 0.5) * Hh * 0.9 + amp * Hh * 0.1 * Math.sin(u * kf * TAU + ph + t * sp) + amp * Hh * 0.04 * Math.sin(u * kf * 2.7 * TAU - t * sp * 0.8);
        const ee = e * e * (3 - 2 * e);
        const dx = hx - nx, dy = hy - ny, len = Math.hypot(dx, dy) + 1e-3;
        const off = Math.sin(Math.PI * ee) * len * 0.11 * sw;
        hx = nx + dx * ee + (-dy / len) * off; hy = ny + dy * ee + (dx / len) * off;
        this.buf[k * 2] = hx; this.buf[k * 2 + 1] = hy;
      }
      const depth = clamp((zSum / count + 0.8) / 1.7);
      const a = (netA + ((accent ? 0.92 : 0.66) - netA) * e) * (0.55 + 0.45 * depth) * (this.col.light ? 0.85 : 1) * (e > 0.003 || netA > 0 ? 1 : 0);
      if (a < 0.01) return;
      ctx.beginPath();
      ctx.moveTo(this.buf[0], this.buf[1]);
      for (let k = 1; k < count - 1; k++) {
        const x = this.buf[k * 2], y = this.buf[k * 2 + 1];
        ctx.quadraticCurveTo(x, y, (x + this.buf[k * 2 + 2]) / 2, (y + this.buf[k * 2 + 3]) / 2);
      }
      ctx.lineTo(this.buf[(count - 1) * 2], this.buf[(count - 1) * 2 + 1]);
      if (closed && e > 0.98) ctx.closePath();
      ctx.setLineDash(dashed ? [2, 5] : []);
      ctx.lineWidth = (0.75 + 0.55 * depth) * (0.8 + 0.4 * e) * (accent ? 1.15 : 1);
      ctx.strokeStyle = this.color(a, accent || e > 0.9);
      ctx.stroke();
    };

    // far-to-near ordering is approximated by drawing details first, silhouette last
    for (let si = 0; si < rig.strands.length; si++) {
      const s = rig.strands[si];
      if (!s.detail || (mobile && s.kind === 'ring')) continue;
      drawLine(rig.scr[si], s.count, rig.seeds, si * 6, s.order, 1, s.accent, true, s.kind === 'grid', s.closed);
    }
    for (let e = 0; e < SLOT_COUNT; e++) {
      const w = clamp(st.ew[e]);
      if (w < 0.01) continue;
      drawLine(rig.eScr[e], SLOT_M[e], rig.eSeeds, e * 6, SLOT_ORDER[e], w, true, true, e >= 2 && e <= 4, SLOT_CLOSED[e]);
    }
    for (let si = 0; si < rig.strands.length; si++) {
      const s = rig.strands[si];
      if (s.detail) continue;
      drawLine(rig.scr[si], s.count, rig.seeds, si * 6, s.order, 1, s.accent, false, s.kind === 'tail', s.closed);
    }
    ctx.setLineDash([]);

    // landmark nodes (wrist + joints)
    const gOf = (id: string) => { const s = rig.index.get(id)!; return sm(0, 1, (f - rig.strands[s].order * (1 - win)) / win); };
    const pulse = 1 + (this.reduced ? 0 : Math.sin(t * 2.4) * 0.18);
    const gp = gOf('palm-front');
    this.node(ctx, rig.lm[0] + sx, rig.lm[1], 2.2, gp * 0.85, false);
    ['thumb', 'index', 'middle', 'ring', 'pinky'].forEach((fn, fi) => {
      const g = gOf(`${fn}-bone`);
      for (let j = 0; j < 4; j++) {
        const o = (1 + fi * 4 + j) * 3;
        const tipJ = j === 3;
        this.node(ctx, rig.lm[o] + sx, rig.lm[o + 1], tipJ ? 2.9 : 1.7, g * (tipJ ? 1 : 0.75), tipJ);
      }
    });
    // scene nodes (floating nodes, question mark nodes, module nodes…)
    for (let n = 0; n < NODE_SLOTS; n++) {
      const w = clamp(st.nw[n]) * sm(0, 1, (f - 0.9 * (1 - win)) / win);
      if (w < 0.02) continue;
      const act = n === st.active;
      this.node(ctx, rig.nScr[n * 3] + sx, rig.nScr[n * 3 + 1], act ? 3.4 : 2.4, w, true);
      if (act && !this.reduced) {
        ctx.beginPath(); ctx.arc(rig.nScr[n * 3] + sx, rig.nScr[n * 3 + 1], (6 + 4 * pulse + this.boost * 14), 0, TAU);
        ctx.strokeStyle = this.color((0.42 - this.boost * 0.15) * w, true); ctx.lineWidth = 0.9; ctx.stroke();
      }
    }

    // the connection between two hands
    if (primary && cw > 0.02) {
      const ti = rig.scr[tipIdx];
      const x1 = ti[13 * 3] + sx, y1 = ti[13 * 3 + 1];
      const x2 = baseX + (baseX - x1) , y2 = y1;
      const g = clamp(cw) * sm(0.78, 1, f);
      if (g > 0.01) {
        ctx.beginPath(); ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(baseX, y1 - 14 * g, x2, y2);
        ctx.strokeStyle = this.color(0.85 * g, true); ctx.lineWidth = 1.3; ctx.stroke();
        const pk = this.reduced ? 0.5 : (t * 0.45) % 1;
        const px = mix(x1, x2, pk);
        ctx.beginPath(); ctx.arc(px, y1 - Math.sin(pk * Math.PI) * 14 * g, 2.2, 0, TAU);
        ctx.fillStyle = this.color(0.95 * g, true); ctx.fill();
        this.node(ctx, baseX, y1 - 7 * g, 3.8, g, true);
        if (!this.reduced) {
          const ph = (t * 0.5) % 1;
          ctx.beginPath(); ctx.arc(baseX, y1 - 7 * g, 5 + ph * 38, 0, TAU);
          ctx.strokeStyle = this.color((1 - ph) * 0.35 * g, true); ctx.lineWidth = 0.9; ctx.stroke();
        }
      }
    }
    return shift;
  }

  private node(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, a: number, bright: boolean) {
    if (a < 0.02) return;
    ctx.beginPath(); ctx.arc(x, y, r * 2.4, 0, TAU);
    ctx.fillStyle = this.color(0.1 * a, true); ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
    ctx.fillStyle = this.color(0.92 * a * (this.col.light ? 0.95 : 1), bright); ctx.fill();
  }

  private drawRipples(ctx: CanvasRenderingContext2D, now: number) {
    // Interaction feedback is carried by the active node's `boost` ring; expire bookkeeping here.
    this.ripples = this.ripples.filter(r => now - r.t < 900);
    void ctx;
    if (this.ripples.length || this.boost > 0.02) this.requestFrame();
  }
}
