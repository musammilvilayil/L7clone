import { useRef } from "react";
import { JOURNEY_PHASES } from "../../../data/process";
import { useReducedMotion } from "../../../hooks/useMediaQuery";
import { useScrollFrame } from "../../../hooks/useScrollFrame";
import { clamp } from "../../../utils/math";
import "./JourneyTimeline.css";

/**
 * Four-phase journey. A red line fills and phases light up as the timeline
 * scrolls through the viewport (horizontal on desktop, vertical on phones).
 */
export function JourneyTimeline({ label = "Your business journey, in motion", number = "01" }: { label?: string; number?: string }) {
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
    <div className="journey" ref={ref}>
      <p className="label-tiny journey__label">
        <b>{number}</b> {label}
      </p>
      <div className="journey__track" aria-hidden="true">
        <span className="journey__fill" />
        <span className="journey__spark" />
      </div>
      <ol className="journey__phases">
        {JOURNEY_PHASES.map((phase) => (
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
