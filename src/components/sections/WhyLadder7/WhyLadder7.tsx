import { useRef } from "react";
import { REASONS } from "../../../data/company";
import { STATUES } from "../../../data/media";
import { useReducedMotion } from "../../../hooks/useMediaQuery";
import { useScrollFrame } from "../../../hooks/useScrollFrame";
import { clamp, smoothstep } from "../../../utils/math";
import { ArrowUpRight } from "../../common/Icons";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { SmartLink } from "../../common/SmartLink";
import "./WhyLadder7.css";

/**
 * "Less friction. More forward motion." — white sticky stage. As it scrolls,
 * the fractured and restored statues slide in from the sides and the four
 * reasons appear in sequence (one at a time on phones).
 */
export function WhyLadder7({ linkTo = "#contact" }: { linkTo?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useScrollFrame(({ vh, vw }) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > vh * 1.2 || rect.bottom < -vh) return;
    const growth = clamp(-rect.top / Math.max(1, rect.height - vh));
    const enter = smoothstep(clamp((vh * 0.42 - rect.top) / (vh * 0.42)));
    const mobile = vw <= 700;
    const n = REASONS.length;
    const reasons = REASONS.map((_, i) =>
      reduced
        ? 1
        : mobile
          ? clamp(1 - Math.abs(Math.min(n - 1, growth * (n - 0.4)) - i) * 1.8)
          : clamp((growth - (0.055 + i * 0.13)) / 0.115),
    );
    return () => {
      el.style.setProperty("--character-enter", reduced ? "1" : enter.toFixed(4));
      el.style.setProperty("--character-label", reduced ? "1" : clamp((enter - 0.5) / 0.5).toFixed(4));
      el.style.setProperty("--character-rise", reduced ? "0px" : `${((1 - enter) * 35).toFixed(2)}px`);
      el.style.setProperty("--growth-title-y", reduced ? "0px" : `${((1 - enter) * 10).toFixed(2)}px`);
      el.style.setProperty("--growth-link-opacity", reduced ? "1" : clamp((growth - 0.55) / 0.15).toFixed(3));
      el.querySelectorAll<HTMLElement>(".why__reason").forEach((reason, i) => {
        reason.style.setProperty("--reason-progress", (reasons[i] ?? 1).toFixed(4));
      });
    };
  });

  return (
    <section ref={ref} className="why section--sheet" id="why-ladder7" aria-labelledby="why-title">
      <div className="why__stage">
        <div className="why__labels" aria-hidden="true">
          <div>
            <span>[ Your starting point ]</span>Friction, disconnected.
          </div>
          <div>
            <span>[ Your next chapter ]</span>Connected, with purpose.
          </div>
        </div>

        <div className="why__title">
          <p className="eyebrow">Why Ladder7</p>
          <h2 id="why-title">
            Less friction.
            <br />
            More forward motion<span className="accent">.</span>
          </h2>
        </div>

        <figure className="why__photo why__photo--before">
          <ResponsiveImage name={STATUES.before.image} alt={STATUES.before.alt} sizes="(max-width: 700px) 62vw, (max-width: 1000px) 39vw, 32vw" />
        </figure>
        <figure className="why__photo why__photo--after">
          <ResponsiveImage name={STATUES.after.image} alt={STATUES.after.alt} sizes="(max-width: 700px) 62vw, (max-width: 1000px) 39vw, 32vw" />
        </figure>

        <ol className="why__reasons">
          {REASONS.map((reason) => (
            <li key={reason.number} className="why__reason">
              <span>{reason.number}</span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </li>
          ))}
        </ol>

        <SmartLink to={linkTo} className="why__link">
          Discuss your next step
          <ArrowUpRight />
        </SmartLink>
      </div>
    </section>
  );
}
