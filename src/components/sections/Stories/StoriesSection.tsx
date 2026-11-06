import { TESTIMONIAL } from "../../../data/education";
import { revealRef } from "../../../hooks/useReveal";
import "./StoriesSection.css";

/**
 * "Built through experience." — a single learner testimonial (design: .stories
 * / .quote-layout). Only one story exists in the design; the "01 / 01" index
 * is kept so a future second story slots in without changing the layout.
 */
export function StoriesSection() {
  return (
    <section className="section stories" aria-labelledby="stories-title">
      <div className="section-heading">
        <div className="reveal" ref={revealRef}>
          <p className="eyebrow">A learner's perspective</p>
          <h2 id="stories-title">
            Built through experience<span className="accent">.</span>
          </h2>
        </div>
        <span className="stories__index">01 / 01</span>
      </div>

      <div className="stories__quote reveal" ref={revealRef}>
        <span className="stories__mark" aria-hidden="true">
          &ldquo;
        </span>
        <div>
          <blockquote>{TESTIMONIAL.quote}</blockquote>
          <div className="stories__person">
            <span className="stories__avatar" aria-hidden="true">
              {TESTIMONIAL.avatarInitial}
            </span>
            <div>
              <strong>{TESTIMONIAL.name}</strong>
              <p>{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
