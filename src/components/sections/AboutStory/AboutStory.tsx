import { revealRef } from "../../../hooks/useReveal";
import "./AboutStory.css";

/** "Big ambitions. Built on strong foundations." (design: #our-story). */
export function AboutStory() {
  return (
    <section className="about-story" id="our-story" aria-labelledby="story-title">
      <div className="company-section-label">
        <span>01 / Our purpose</span>
        <span>Ambition, meet execution.</span>
      </div>

      <div className="about-story__heading reveal" ref={revealRef}>
        <p className="eyebrow eyebrow--live">The reason we build</p>
        <h2 id="story-title">
          Big ambitions.
          <br />
          Built on strong foundations<span className="accent">.</span>
        </h2>
      </div>

      <div className="about-story__grid">
        <article className="reveal" ref={revealRef}>
          <span className="company-kicker">Our mission</span>
          <h3>
            Close the gap.
            <br />
            Move the business forward.
          </h3>
          <p>
            We connect business ambition with technical execution, combining architectural discipline, experienced engineering and clear
            strategy.
          </p>
        </article>
        <article className="reveal" ref={revealRef}>
          <span className="company-kicker">Our vision</span>
          <h3>
            Technology that
            <br />
            gets out of your way.
          </h3>
          <p>
            A future where intelligent, resilient systems anticipate change and help organisations grow, from ambitious SMBs to global
            enterprises.
          </p>
        </article>
      </div>

      <div className="about-story__statement reveal" ref={revealRef}>
        <span>Strategy</span>
        <i aria-hidden="true">+</i>
        <span>Engineering</span>
        <i aria-hidden="true">=</i>
        <span className="accent">Forward.</span>
      </div>
    </section>
  );
}
