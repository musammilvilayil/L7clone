import { revealRef } from "../../../hooks/useReveal";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import "./AboutExpertise.css";

const METRICS = [
  { label: "Uptime engineered", value: "99.9", suffix: "%" },
  { label: "MNC clients", value: "50", suffix: "+" },
  { label: "Major deployments", value: "250", suffix: "+" },
  { label: "Proofs of concept", value: "50", suffix: "+" },
];

const POINTS = [
  { number: "01", title: "Enterprise perspective.", description: "Expertise shaped by work with leading financial and technology institutions." },
  { number: "02", title: "Senior engagement.", description: "Direct access to principal architects throughout the engagement." },
];

/** "Deep experience. Direct involvement." (design: .expertise-section). */
export function AboutExpertise() {
  return (
    <section className="about-expertise" aria-labelledby="expertise-title">
      <div className="company-section-label">
        <span>02 / The people behind the work</span>
        <span>Experience, put to work.</span>
      </div>

      <div className="about-expertise__grid">
        <figure className="about-expertise__image reveal" ref={revealRef}>
          <ResponsiveImage
            name="photos/team-collaboration-desks"
            alt="People collaborating around a table in a bright workspace"
            sizes="(max-width: 1000px) 100vw, 45vw"
          />
          <figcaption>Connected thinking. Shared purpose.</figcaption>
        </figure>

        <div className="about-expertise__copy reveal" ref={revealRef}>
          <p className="eyebrow">Senior minds. Hands-on partnership.</p>
          <h2 id="expertise-title">
            Deep experience.
            <br />
            Direct involvement<span className="accent">.</span>
          </h2>
          <p>Enterprise architects, data scientists and transformation specialists bring experience from demanding global environments.</p>

          <div className="about-expertise__points">
            {POINTS.map((point) => (
              <article key={point.number}>
                <span>{point.number}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <dl className="about-expertise__metrics" aria-label="Ladder7 experience">
        {METRICS.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label.toUpperCase()}</dt>
            <dd>
              {metric.value}
              <span>{metric.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
