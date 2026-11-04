import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';

export interface CipherRevealHandle {
  replay: () => void;
}

export interface CipherRevealProps {
  text?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: string;
  lineHeight?: number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  scrambleColor?: string;
  scrambleOpacity?: number;
  charset?: string;
  trigger?: 'view' | 'mount' | 'manual';
  order?: 'left' | 'right' | 'center' | 'random';
  from?: 'blank' | 'scrambled';
  duration?: number;
  scramble?: number;
  rate?: number;
  hover?: 'trail' | 'replay' | 'none';
  hoverRadius?: number;
  loop?: boolean;
  interval?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const UPPER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';

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

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const segmentText = (str: string): string[] => {
  if (typeof Intl === 'undefined' || !Intl.Segmenter) {
    return Array.from(str);
  }
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  return Array.from(segmenter.segment(str), (s) => s.segment);
};

const pseudoRandom = (seed: number) => {
  const t = 43758.5453 * Math.sin(127.1 * seed + 311.7);
  return t - Math.floor(t);
};

let measureCtx: CanvasRenderingContext2D | null = null;
const widthCache = new Map<string, number>();

const measureCharWidth = (char: string, font: string): number => {
  const key = `${font}|${char}`;
  const cached = widthCache.get(key);
  if (cached !== undefined) return cached;
  if (!measureCtx && typeof document !== 'undefined') {
    measureCtx = document.createElement('canvas').getContext('2d');
  }
  if (!measureCtx) return 1;
  measureCtx.font = font;
  const w = measureCtx.measureText(char).width;
  if (widthCache.size > 4000) widthCache.clear();
  widthCache.set(key, w);
  return w;
};

interface GlyphData {
  root: HTMLElement;
  face: HTMLElement;
  mask: HTMLElement;
  glyph: string;
  pool: string[];
  state: 'plain' | 'hidden' | 'scramble';
  active: boolean;
  appear: number;
  lock: number;
  phase: number;
  step: number;
  seed: number;
  shown: string;
  cooldown: number;
  x: number;
  y: number;
  width: number;
}

export const CipherReveal = forwardRef<CipherRevealHandle, CipherRevealProps>(
  (
    {
      text = 'Ideas into reality',
      as: Component = 'span',
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight = 1.1,
      align = 'center',
      color,
      scrambleColor = '',
      scrambleOpacity = 0.42,
      charset = 'auto',
      trigger = 'view',
      order = 'left',
      from = 'blank',
      duration = 1.4,
      scramble = 0.45,
      rate = 14,
      hover = 'trail',
      hoverRadius = 0.6,
      loop = false,
      interval = 5,
      onComplete,
      className = '',
      style,
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const engineRef = useRef<{
      measure: (relayout?: boolean) => void;
      sync: () => void;
      destroy: () => void;
      replay: () => void;
    } | null>(null);

    const reducedMotion = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      () => false
    );

    const wordsData = useMemo(() => {
      const parts = text.split(/(\s+)/).filter(Boolean);
      let currentOffset = 0;
      const result: Array<{
        word: string;
        glyphs: string[];
        offset: number;
        space: boolean;
      }> = [];
      for (const word of parts) {
        const isSpace = /^\s+$/.test(word);
        const glyphs = isSpace ? [] : segmentText(word);
        result.push({
          word,
          glyphs,
          offset: currentOffset,
          space: glyphs.length === 0,
        });
        currentOffset += glyphs.length;
      }
      return result;
    }, [text]);

    const settingsRef = useRef({
      scrambleColor,
      scrambleOpacity,
      charset,
      trigger,
      order,
      from,
      duration,
      scramble,
      rate,
      hover,
      hoverRadius,
      loop,
      interval,
      reduced: reducedMotion,
      onComplete,
    });

    useEffect(() => {
      settingsRef.current = {
        scrambleColor,
        scrambleOpacity,
        charset,
        trigger,
        order,
        from,
        duration,
        scramble,
        rate,
        hover,
        hoverRadius,
        loop,
        interval,
        reduced: reducedMotion,
        onComplete,
      };
      engineRef.current?.sync();
    });

    useEffect(() => {
      const el = rootRef.current;
      if (!el) return;

      let glyphs: GlyphData[] = [];
      let rafId = 0;
      let destroyed = false;
      let hasPlayed = false;
      let isIntersecting = true;
      let isAnimating = false;
      let loopTimer = 0;
      let fontStr = '';
      let fontSizePx = 16;
      let letterSpacingPx = 0;
      let mousePos = { x: 0, y: 0, t: 0 };

      const applyScrambleColor = (g: GlyphData) => {
        g.mask.style.color = settingsRef.current.scrambleColor || '';
      };

      const setHidden = (g: GlyphData) => {
        g.state = 'hidden';
        g.face.style.transition = 'none';
        g.face.style.opacity = '0';
        g.mask.style.transition = 'none';
        g.mask.style.opacity = '0';
        g.mask.textContent = '';
        g.shown = '';
      };

      const setScramble = (g: GlyphData) => {
        g.state = 'scramble';
        g.face.style.transition = 'none';
        g.face.style.opacity = '0';
        g.mask.style.transition = 'none';
      };

      const lockGlyph = (g: GlyphData, animate: boolean) => {
        g.state = 'plain';
        g.active = false;
        if (!animate) {
          g.face.style.transition = 'none';
          g.face.style.opacity = '1';
          g.mask.style.transition = 'none';
          g.mask.style.opacity = '0';
          g.mask.textContent = '';
          g.shown = '';
          return;
        }
        g.mask.textContent = g.glyph;
        g.mask.style.transform = 'translateX(-50%)';
        g.shown = g.glyph;
        g.face.style.transition = 'opacity 200ms cubic-bezier(.2,.7,.2,1)';
        g.mask.style.transition = 'opacity 200ms cubic-bezier(.2,.7,.2,1)';
        g.face.style.opacity = '1';
        g.mask.style.opacity = '0';
      };

      const renderMaskChar = (g: GlyphData, char: string) => {
        if (char === g.shown) return;
        g.shown = char;
        g.mask.textContent = char;
        const measured = Math.max(measureCharWidth(char, fontStr) + letterSpacingPx, 1);
        const scaleX = clamp(g.width / measured, 0.55, 1.6);
        g.mask.style.transform =
          Math.abs(scaleX - 1) > 0.004
            ? `translateX(-50%) scaleX(${scaleX.toFixed(3)})`
            : 'translateX(-50%)';
      };

      const stepScramble = (g: GlyphData, timeSec: number) => {
        const s = settingsRef.current;
        const step = Math.floor((timeSec + g.phase) * clamp(s.rate, 2, 60));
        if (step === g.step && g.shown) return;
        g.step = step;
        if (g.pool.length === 0) {
          renderMaskChar(g, g.glyph);
          return;
        }
        let poolIdx = Math.floor(g.seed + 5 * step) % g.pool.length;
        if (g.pool[poolIdx] === g.shown) {
          poolIdx = (poolIdx + 1) % g.pool.length;
        }
        renderMaskChar(g, g.pool[poolIdx]);
      };

      const measure = () => {
        const s = settingsRef.current;
        const computed = getComputedStyle(el);
        fontStr = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
        fontSizePx = parseFloat(computed.fontSize) || 16;
        letterSpacingPx = parseFloat(computed.letterSpacing) || 0;

        const rootRect = el.getBoundingClientRect();
        const rootElements = Array.from(
          el.querySelectorAll('[data-cipher]')
        ) as HTMLElement[];

        const existingMap = new Map(glyphs.map((g) => [g.root, g]));

        glyphs = rootElements.map((elem, idx) => {
          const face = elem.querySelector('[data-face]') as HTMLElement;
          const mask = elem.querySelector('[data-mask]') as HTMLElement;
          const glyph = elem.dataset.glyph ?? '';
          const faceRect = face.getBoundingClientRect();
          const existing = existingMap.get(elem);

          const pool = (() => {
            if (s.charset && s.charset !== 'auto') {
              return Array.from(new Set(segmentText(s.charset))).filter(
                (c) => c !== glyph
              );
            }
            const baseCharset =
              /^[A-Z]$/.test(glyph) || /^\p{Lu}$/u.test(glyph)
                ? UPPER_CHARS
                : /^[0-9]$/.test(glyph)
                ? NUMBER_CHARS
                : /^\p{L}$/u.test(glyph)
                ? LOWER_CHARS
                : '!?#$%&*+=/<>@';

            const targetW = Math.max(measureCharWidth(glyph, fontStr), 1);
            const sortDiff = (chars: string) =>
              Array.from(new Set(Array.from(chars)))
                .filter((c) => c !== glyph)
                .map((c) => ({
                  item: c,
                  gap: Math.abs(
                    Math.log(Math.max(measureCharWidth(c, fontStr), 1) / targetW)
                  ),
                }))
                .sort((a, b) => a.gap - b.gap);

            const matched = sortDiff(baseCharset)
              .filter((e) => e.gap < 0.2)
              .map((e) => e.item);

            if (matched.length >= 4) return matched;

            const allMatched = sortDiff(UPPER_CHARS + LOWER_CHARS + NUMBER_CHARS)
              .filter((e) => e.gap < 0.22)
              .map((e) => e.item);

            return allMatched.length >= 3
              ? allMatched
              : sortDiff(UPPER_CHARS + LOWER_CHARS + NUMBER_CHARS)
                  .slice(0, 4)
                  .map((e) => e.item);
          })();

          const item: GlyphData = {
            root: elem,
            face,
            mask,
            glyph,
            pool,
            state: existing?.state ?? 'plain',
            active: existing?.active ?? false,
            appear: existing?.appear ?? 0,
            lock: existing?.lock ?? 0,
            phase: existing?.phase ?? pseudoRandom(3.7 * idx + 1.3),
            step: -1,
            seed: existing?.seed ?? Math.floor(997 * pseudoRandom(9.1 * idx + 4.2)),
            shown: '',
            cooldown: existing?.cooldown ?? 0,
            x: faceRect.left + faceRect.width / 2 - rootRect.left,
            y: faceRect.top + faceRect.height / 2 - rootRect.top,
            width: faceRect.width,
          };

          mask.style.lineHeight = `${faceRect.height}px`;
          applyScrambleColor(item);
          return item;
        });

        return glyphs.length;
      };

      const startReveal = () => {
        const s = settingsRef.current;
        if (glyphs.length === 0) return;
        hasPlayed = true;

        if (s.reduced) {
          glyphs.forEach((g) => lockGlyph(g, false));
          return;
        }

        const nowSec = performance.now() / 1000;
        const dur = clamp(s.duration, 0.1, 20);
        const scr = clamp(s.scramble, 0.05, 5);
        const len = glyphs.length;

        const orderIndices = glyphs
          .map((_, idx) => {
            const frac = len > 1 ? idx / (len - 1) : 0;
            const rank =
              s.order === 'right'
                ? 1 - frac
                : s.order === 'center'
                ? 2 * Math.abs(frac - 0.5)
                : s.order === 'random'
                ? pseudoRandom(7.31 * idx + 0.001 * Math.random() + 3.7)
                : frac;
            return { rank, idx };
          })
          .sort((a, b) => a.rank - b.rank);

        const normalizedRanks = new Array<number>(len);
        orderIndices.forEach((item, sortedIdx) => {
          normalizedRanks[item.idx] = len > 1 ? sortedIdx / (len - 1) : 0;
        });

        const isBlankFrom = s.from === 'blank';

        glyphs.forEach((g, idx) => {
          const delay = normalizedRanks[idx] * Math.max(dur - scr, 0.35 * dur);
          g.active = true;
          g.appear = isBlankFrom ? nowSec + delay : nowSec;
          g.lock = nowSec + delay + scr;
          g.step = -1;

          if (isBlankFrom) {
            setHidden(g);
          } else {
            setScramble(g);
            stepScramble(g, nowSec);
            g.mask.style.opacity = String(0.55 * clamp(s.scrambleOpacity, 0, 1));
          }
        });

        isAnimating = true;
        requestNextFrame();
      };

      const scheduleLoop = () => {
        window.clearTimeout(loopTimer);
        const s = settingsRef.current;
        if (s.loop && !s.reduced) {
          loopTimer = window.setTimeout(() => {
            if (isIntersecting) startReveal();
            else hasPlayed = false;
          }, 1000 * clamp(s.interval, 0.5, 60));
        }
      };

      const animateLoop = (nowMs: number) => {
        rafId = 0;
        if (destroyed) return;

        const s = settingsRef.current;
        const nowSec = nowMs / 1000;
        const baseOpacity = clamp(s.scrambleOpacity, 0, 1);
        let hasActive = false;

        for (const g of glyphs) {
          if (!g.active) continue;
          if (nowSec >= g.lock) {
            lockGlyph(g, true);
            continue;
          }
          hasActive = true;
          if (nowSec < g.appear) continue;

          if (g.state !== 'scramble') setScramble(g);
          stepScramble(g, nowSec);

          const prog = clamp(
            (nowSec - g.appear) / Math.max(g.lock - g.appear, 0.01),
            0,
            1
          );
          g.mask.style.opacity = (baseOpacity * (0.55 + 0.45 * prog)).toFixed(3);
        }

        if (hasActive && isIntersecting && !document.hidden) {
          rafId = requestAnimationFrame(animateLoop);
        } else if (!hasActive && isAnimating) {
          isAnimating = false;
          settingsRef.current.onComplete?.();
          scheduleLoop();
        }
      };

      const requestNextFrame = () => {
        if (!destroyed && !rafId) {
          rafId = requestAnimationFrame(animateLoop);
        }
      };

      const handlePointerMove = (e: PointerEvent) => {
        const s = settingsRef.current;
        if (s.hover !== 'trail' || s.reduced || e.pointerType === 'touch') return;

        const rect = el.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const now = performance.now();
        const dist = Math.hypot(px - mousePos.x, py - mousePos.y) / Math.max(now - mousePos.t, 1);
        mousePos = { x: px, y: py, t: now };
        if (dist < 0.08) return;

        const nowSec = now / 1000;
        const radiusPx = clamp(s.hoverRadius, 0.2, 6) * fontSizePx;
        let triggered = false;

        for (const g of glyphs) {
          if (g.active || g.state !== 'plain' || nowSec < g.cooldown) continue;
          const delta = Math.hypot((g.x - px) / radiusPx, (g.y - py) / (0.9 * radiusPx));
          if (delta > 1) continue;

          g.active = true;
          g.appear = nowSec;
          g.lock = nowSec + 0.14 + 0.22 * (1 - delta);
          g.cooldown = g.lock + 0.4;
          g.step = -1;

          setScramble(g);
          stepScramble(g, nowSec);
          g.mask.style.opacity = (0.55 * clamp(s.scrambleOpacity, 0, 1)).toFixed(3);
          triggered = true;
        }

        if (triggered) requestNextFrame();
      };

      const handlePointerEnter = (e: PointerEvent) => {
        const s = settingsRef.current;
        if (s.hover !== 'replay' || s.reduced || e.pointerType === 'touch') return;
        if (glyphs.some((g) => g.active)) return;
        startReveal();
      };

      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerenter', handlePointerEnter);

      const resizeObserver = new ResizeObserver(() => measure());
      resizeObserver.observe(el);

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          isIntersecting = entries.some((entry) => entry.isIntersecting);
          const first = entries[0];
          const s = settingsRef.current;
          if (!hasPlayed && s.trigger === 'view' && first && first.intersectionRatio >= 0.35) {
            startReveal();
          }
          if (isIntersecting) requestNextFrame();
        },
        { threshold: [0, 0.35, 1] }
      );
      intersectionObserver.observe(el);

      if (document.fonts?.ready) {
        document.fonts.ready
          .then(() => {
            if (!destroyed) {
              widthCache.clear();
              measure();
            }
          })
          .catch(() => {});
      }

      measure();

      const initialSettings = settingsRef.current;
      if (initialSettings.reduced || initialSettings.trigger === 'manual') {
        glyphs.forEach((g) => lockGlyph(g, false));
      } else {
        glyphs.forEach((g) => setHidden(g));
      }

      if (!initialSettings.reduced && initialSettings.trigger === 'mount') {
        startReveal();
      }

      engineRef.current = {
        measure: (relayout) => {
          measure();
          if (relayout && hasPlayed) startReveal();
        },
        sync: () => {
          glyphs.forEach(applyScrambleColor);
          const s = settingsRef.current;
          if (s.loop) {
            if (!loopTimer && !glyphs.some((g) => g.active)) scheduleLoop();
          } else {
            window.clearTimeout(loopTimer);
            loopTimer = 0;
          }
          if (s.reduced) {
            glyphs.forEach((g) => lockGlyph(g, false));
          }
        },
        destroy: () => {
          destroyed = true;
          cancelAnimationFrame(rafId);
          window.clearTimeout(loopTimer);
          el.removeEventListener('pointermove', handlePointerMove);
          el.removeEventListener('pointerenter', handlePointerEnter);
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          glyphs.forEach((g) => lockGlyph(g, false));
        },
        replay: () => startReveal(),
      };

      return () => {
        engineRef.current?.destroy();
        engineRef.current = null;
      };
    }, []);

    useEffect(() => {
      engineRef.current?.measure(true);
    }, [wordsData, charset]);

    useEffect(() => {
      engineRef.current?.measure(false);
    }, [fontSize, fontWeight, letterSpacing, lineHeight, align]);

    useImperativeHandle(
      ref,
      () => ({
        replay: () => engineRef.current?.replay(),
      }),
      []
    );

    return React.createElement(
      Component,
      {
        ref: rootRef,
        className: `relative inline-block max-w-full ${className}`.trim(),
        style: {
          fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
          fontWeight,
          letterSpacing,
          lineHeight,
          textAlign: align,
          color,
          whiteSpace: 'pre-wrap',
          ...style,
        },
      },
      wordsData.map((wordObj, wIdx) =>
        wordObj.space ? (
          <span key={wIdx}>{wordObj.word}</span>
        ) : (
          <span key={wIdx} style={{ whiteSpace: 'nowrap' }}>
            {wordObj.glyphs.map((gChar, gIdx) => (
              <span
                key={`${wordObj.offset + gIdx}-${gChar}`}
                data-cipher="true"
                data-glyph={gChar}
                style={{ position: 'relative' }}
              >
                <span
                  data-face="true"
                  style={{
                    opacity:
                      reducedMotion || trigger === 'manual' ? undefined : 0,
                  }}
                >
                  {gChar}
                </span>
                <span
                  data-mask="true"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    transform: 'translateX(-50%)',
                    transformOrigin: '50% 50%',
                    whiteSpace: 'pre',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                />
              </span>
            ))}
          </span>
        )
      )
    );
  }
);

CipherReveal.displayName = 'CipherReveal';
export default CipherReveal;
