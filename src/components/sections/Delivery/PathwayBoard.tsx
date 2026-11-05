import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { DELIVERY_STEPS } from "../../../data/process";
import { FINE_POINTER_QUERY, MOBILE_QUERY, useMediaQuery, useReducedMotion } from "../../../hooks/useMediaQuery";
import { useRovingTabs } from "../../../hooks/useRovingTabs";
import { requestScrollFrame, useScrollFrame } from "../../../hooks/useScrollFrame";
import { clamp } from "../../../utils/math";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "../../common/Icons";
import { Lines } from "../../common/Lines";
import "./PathwayBoard.css";

const ROUTE = "M40 224 H110 V194 H180 V164 H250 V134 H320 V104 H390 V74 H460 V44 H560";
const NODES: [number, number][] = [
  [110, 194],
  [180, 164],
  [250, 134],
  [320, 104],
  [390, 74],
  [460, 44],
  [560, 44],
];
const LAST = DELIVERY_STEPS.length - 1;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "The seven steps" — a pinned scene: while the section scrolls past, the
 * board stays fixed below the header and scroll position walks through the
 * seven delivery steps (route draws, dot travels, panel tilts). Tabs and the
 * prev/next buttons jump to a step by scrolling to its position.
 *
 * With reduced motion, or on screens shorter than 620px, it becomes a normal
 * tabbed panel in the document flow.
 */
export function PathwayBoard() {
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();
  const mobile = useMediaQuery(MOBILE_QUERY);

  const sceneRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);

  const stepRef = useRef(0);
  const fromScroll = useRef(false);
  const lockUntil = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const mounted = useRef(false);

  const metrics = useCallback(() => {
    const scene = sceneRef.current!.getBoundingClientRect();
    const anchor = anchorRef.current!.getBoundingClientRect();
    const board = boardRef.current!.getBoundingClientRect();
    const narrow = window.innerWidth <= 700;
    const pin = narrow ? 82 : 92;
    const travel = Math.max(1, scene.bottom - anchor.top - board.height - (narrow ? 35 : 60));
    return { scene, anchor, board, pin, travel };
  }, []);

  const pinEnabled = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.innerHeight >= 620;

  const moveDot = (x: number, y: number) => {
    dotsRef.current?.querySelectorAll("circle").forEach((dot) => {
      dot.setAttribute("cx", x.toFixed(2));
      dot.setAttribute("cy", y.toFixed(2));
    });
  };

  /** Select a step from a tab, a button or the keyboard. */
  const goTo = useCallback(
    (index: number) => {
      const next = clamp(index, 0, LAST);
      fromScroll.current = false;
      setStep(next);
      if (pinEnabled() && sceneRef.current) {
        const m = metrics();
        // Ignore scroll-driven step changes while this smooth scroll runs.
        lockUntil.current = performance.now() + 1100;
        window.scrollTo({ top: window.scrollY + m.anchor.top - m.pin + (m.travel * next) / LAST, behavior: "smooth" });
      }
    },
    [metrics],
  );

  const { getTabProps } = useRovingTabs({ count: DELIVERY_STEPS.length, selected: step, onSelect: goTo, orientation: "both" });

  // Release the lock as soon as the programmatic scroll finishes.
  useEffect(() => {
    const release = () => (lockUntil.current = 0);
    window.addEventListener("scrollend", release);
    return () => window.removeEventListener("scrollend", release);
  }, []);

  // Apply a selected step: route progress, dot, panel entrance, mobile tab strip.
  useEffect(() => {
    stepRef.current = step;
    if (!fromScroll.current) {
      panelRef.current?.style.setProperty("--step-progress", String(step === LAST ? 1 : (step + 1) / 7));
      const node = NODES[step]!;
      moveDot(node[0], node[1]);
    }
    if (mounted.current && !reduced) {
      detailRef.current?.animate(
        [
          { opacity: 0.15, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 460, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    }
    mounted.current = true;
    if (mobile && tablistRef.current) {
      const tab = tablistRef.current.children[step] as HTMLElement | undefined;
      if (tab) tablistRef.current.scrollTo({ left: tab.offsetLeft - tablistRef.current.offsetLeft - 12, behavior: reduced ? "instant" : "smooth" });
    }
  }, [step, mobile, reduced]);

  useScrollFrame(({ vh }) => {
    if (!sceneRef.current || !panelRef.current || !routeRef.current) return;
    const m = metrics();
    if (m.scene.bottom < -200 || m.scene.top > vh + 200) return;
    const progress = clamp((m.pin - m.anchor.top) / m.travel);
    const inPin = !reduced && vh >= 620 && m.anchor.top < m.pin + 10 && m.scene.bottom > m.pin;
    const draw = (1 + progress * 6) / 7;
    const point = inPin ? routeRef.current.getPointAtLength(routeRef.current.getTotalLength() * draw) : null;
    const panelVisible = m.board.bottom > 0 && m.board.top < vh;
    const scene = sceneRef.current;
    const panel = panelRef.current;

    return () => {
      if (inPin && point) {
        if (performance.now() > lockUntil.current) {
          const scrolled = Math.min(LAST, Math.floor(progress * 7));
          if (scrolled !== stepRef.current) {
            fromScroll.current = true;
            setStep(scrolled);
          }
        }
        panel.style.setProperty("--step-progress", draw.toFixed(4));
        moveDot(point.x, point.y);
      }
      if (!reduced && panelVisible) {
        const { x, y } = pointer.current;
        const set = (name: string, value: string) => scene.style.setProperty(name, value);
        set("--panel-y", `${(12 - progress * 24).toFixed(2)}px`);
        set("--panel-rx", `${((0.5 - progress) * 1.6 + y * -1.2).toFixed(3)}deg`);
        set("--panel-ry", `${((0.5 - progress) * 2 + x * 1.7).toFixed(3)}deg`);
        set("--pathway-art-x", `${(x * 9 + progress * 7).toFixed(2)}px`);
        set("--pathway-art-y", `${(-progress * 20 + y * 5).toFixed(2)}px`);
        set("--pathway-number-y", `${(16 - progress * 38).toFixed(2)}px`);
        set("--pathway-grid-y", `${(-progress * 55).toFixed(2)}px`);
        set("--pathway-light-x", `${(40 + progress * 35).toFixed(2)}%`);
        set("--pathway-nav-y", `${(6 - progress * 12).toFixed(2)}px`);
      }
    };
  });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || !window.matchMedia(FINE_POINTER_QUERY).matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 };
    requestScrollFrame();
  };
  const onPointerLeave = () => {
    pointer.current = { x: 0, y: 0 };
    requestScrollFrame();
  };

  const current = DELIVERY_STEPS[step]!;

  return (
    <div className="pathway" id="growth-pathway" ref={sceneRef}>
      <div className="pathway__heading">
        <div>
          <p className="label-tiny">
            <b>02</b> The seven steps
          </p>
          <h3>
            <Lines text={"Your business.\nOne connected journey"} accent />
          </h3>
        </div>
        <p>
          From understanding the need to improving what works. <br className="br-desktop" />
          Explore the decisions behind <br className="br-desktop" />a useful digital solution.
        </p>
      </div>

      <div className="pathway__anchor" ref={anchorRef} aria-hidden="true" />

      <div className="pathway__board" ref={boardRef}>
        <div className="pathway__tabs" role="tablist" aria-label="Seven steps of digital delivery" ref={tablistRef}>
          {DELIVERY_STEPS.map((item, index) => (
            <button key={item.title} type="button" id={`growth-tab-${index}`} aria-controls="growth-panel" className="pathway__tab" {...getTabProps(index)}>
              <span>{pad(index + 1)}</span>
              {item.title}
              <ArrowUpRight className="pathway__tab-arrow" />
            </button>
          ))}
        </div>

        <div
          className="pathway__panel"
          id="growth-panel"
          role="tabpanel"
          aria-labelledby={`growth-tab-${step}`}
          tabIndex={0}
          ref={panelRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <div className="pathway__graphic" aria-hidden="true">
            <span className="pathway__ghost">{pad(step + 1)}</span>
            <svg viewBox="0 0 600 260">
              <defs>
                <filter id="step-glow">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <path className="pathway__route" d={ROUTE} />
              <path className="pathway__route-progress" d={ROUTE} pathLength={1} ref={routeRef} />
              <g className="pathway__nodes">
                {NODES.map(([cx, cy], index) => (
                  <circle key={index} cx={cx} cy={cy} r="4" className={index <= step ? "is-passed" : undefined} />
                ))}
              </g>
              <g ref={dotsRef}>
                <circle className="pathway__dot-glow" cx="110" cy="194" r="12" />
                <circle className="pathway__dot" cx="110" cy="194" r="5" />
              </g>
            </svg>
            <span className="pathway__graphic-label">Your next stage starts with a clear goal</span>
          </div>

          <div className="pathway__detail" ref={detailRef}>
            <p className="eyebrow pathway__kicker">
              Step {pad(step + 1)} / {current.kicker}
            </p>
            <h4>
              {current.title}
              <span className="accent">.</span>
            </h4>
            <p className="pathway__description">{current.description}</p>
            <div className="pathway__prompt">
              <span>Start by asking</span>
              <p>{current.question}</p>
            </div>
          </div>

          <div className="pathway__controls">
            <span className="pathway__counter">
              {pad(step + 1)} <span>/ {pad(DELIVERY_STEPS.length)}</span>
            </span>
            <div className="pathway__mini-progress" aria-hidden="true">
              <span />
            </div>
            <button type="button" className="btn--icon pathway__control" aria-label="Previous delivery step" disabled={step === 0} onClick={() => goTo(step - 1)}>
              <ArrowLeft />
            </button>
            <button type="button" className="btn--icon pathway__control" aria-label="Next delivery step" disabled={step === LAST} onClick={() => goTo(step + 1)}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
