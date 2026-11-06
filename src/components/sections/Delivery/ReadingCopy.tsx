import { Fragment, useRef } from "react";
import { PROGRESS_PHRASES } from "../../../data/process";
import { useReducedMotion } from "../../../hooks/useMediaQuery";
import { useScrollFrame } from "../../../hooks/useScrollFrame";
import { clamp } from "../../../utils/math";
import "./ReadingCopy.css";

/**
 * "What digital progress can look like" — large copy whose words light up
 * one by one as it scrolls through the viewport.
 */
export function ReadingCopy({
  number = "01",
  label = "What digital progress can look like",
  phrases = PROGRESS_PHRASES,
}: {
  number?: string;
  label?: string;
  phrases?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useScrollFrame(({ vh }) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > vh || rect.bottom < 0) return;
    const progress = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.15));
    return () => {
      const words = el.querySelectorAll(".reading__word");
      words.forEach((word, i) => word.classList.toggle("is-lit", reduced || i / words.length < progress));
    };
  });

  return (
    <div className="reading">
      <p className="label-tiny">
        <b>{number}</b> {label}
      </p>
      <p className="reading__copy" ref={ref}>
        {phrases.map((phrase, index) => (
          <Fragment key={phrase}>
            {index > 0 && (
              <>
                {" "}
                <em aria-hidden="true">•</em>{" "}
              </>
            )}
            {phrase.split(" ").map((word, w) => (
              <Fragment key={w}>
                {w > 0 && " "}
                <span className="reading__word">{word}</span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
