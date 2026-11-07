import { useRef } from "react";
import { Button } from "../../ui/Button";
import { ParticleField } from "../Hero/ParticleField";
import "./ServiceHero.css";

const TAGS = [
  { label: "Experience", to: "#digital-experience" },
  { label: "AI", to: "#ai-automation" },
  { label: "Strategy", to: "#strategy-consulting" },
];

const FACTS = [
  { label: "Specialist services", value: "14" },
  { label: "Core disciplines", value: "3" },
  { label: "Connected approach", value: "1" },
];

const KEYS = Array.from({ length: 60 });

/** Services hub hero (design: .service-hero) — a pure-CSS laptop mockup beside the headline. */
export function ServiceHero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="service-hero" aria-labelledby="page-title">
      <ParticleField pointerTarget={ref} />
      <div className="service-hero__copy">
        <p className="eyebrow eyebrow--live">Ladder7 services</p>
        <h1 id="page-title">
          <span>
            <b>Design. Build. Grow.</b>
          </span>
          <span>
            <b>
              One connected team<span className="accent">.</span>
            </b>
          </span>
        </h1>
        <p>
          Digital experiences, applied AI and technology strategy.
          <br />
          Connected around your business, built for your next step.
        </p>
        <div className="service-hero__actions">
          <Button to="#contact">Discuss your next step</Button>
          <nav className="service-hero__tags" aria-label="Service categories">
            {TAGS.map((tag) => (
              <a key={tag.label} href={tag.to}>
                {tag.label}
              </a>
            ))}
          </nav>
        </div>
        <dl className="service-hero__facts">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label.toUpperCase()}</dt>
              <dd>
                {fact.value}
                <span>.</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="service-device" role="img" aria-label="A laptop displaying the Ladder7 digital experience">
        <div className="service-laptop" aria-hidden="true">
          <div className="service-lid">
            <div className="service-screen">
              <div className="service-screen__top">
                <strong>Ladder7.</strong>
                <span>
                  Services&nbsp;&nbsp;Products&nbsp;&nbsp;About <i />
                </span>
              </div>
              <div className="service-screen__body">
                <small>Technology, built around you</small>
                <p>
                  Build. Connect. Grow<span className="accent">.</span>
                </p>
                <span>Intelligent websites. Applied AI. Connected software.</span>
                <div className="service-screen__buttons">
                  <i>Discuss your project ↗</i>
                  <i>Explore capabilities ↗</i>
                </div>
              </div>
              <div className="service-screen__wave" />
            </div>
          </div>
          <div className="service-keyboard-base">
            <div className="service-keyboard">
              {KEYS.map((_, i) => (
                <i key={i} />
              ))}
            </div>
            <div className="service-trackpad" />
          </div>
        </div>
      </div>
    </section>
  );
}
