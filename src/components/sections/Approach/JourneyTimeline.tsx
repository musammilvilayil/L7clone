import { useRef } from "react";
import { JOURNEY_PHASES, type Phase } from "../../../data/process";
import { useReducedMotion } from "../../../hooks/useMediaQuery";
import { useScrollFrame } from "../../../hooks/useScrollFrame";
import { cn } from "../../../utils/cn";
import { clamp } from "../../../utils/math";
import "./JourneyTimeline.css";

/**
 * Four-phase journey. A red line fills and phases light up as the timeline
 * scrolls through the viewport (horizontal on desktop, vertical on phones).
 */
export function JourneyTimeline({
  label = "Your business journey, in motion",
  number = "01",
  phases = JOURNEY_PHASES,
  /** Drops the bottom border/margin when this is the last thing in its section (Education's approach). */
  noBorder = false,
}: {
  label?: string;
  number?: string;
  phases?: Phase[];
  noBorder?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useScrollFrame(({ vh }) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > vh || rect.bottom < 0) return;
    const progress = reduced ? 1 : clamp((vh * 0.78 - rect.top) / (rect.height * 0.85));
    return () => {
      el.style.setProperty("--progress", progress.toFixed(4));
      el.querySelectorAll<HTMLElement>(".journey__phase").forEach((phase, i) =>
        phase.classList.toggle("is-active", reduced || progress >= i / 3),
      );
    };
  });

  return (
    <div className={cn("journey", noBorder && "journey--no-border")} ref={ref}>
      <p className="label-tiny journey__label">
        <b>{number}</b> {label}
      </p>
      <div className="journey__track" aria-hidden="true">
        <span className="journey__fill" />
        <span className="journey__spark" />
      </div>
      <ol className="journey__phases">
        {phases.map((phase) => (
          <li key={phase.number} className="journey__phase">
            <i aria-hidden="true" />
            <span>{phase.number}</span>
            <h3>{phase.title}</h3>
            <p>{phase.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
