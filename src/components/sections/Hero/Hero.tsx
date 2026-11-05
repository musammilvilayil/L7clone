import { useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "../../common/Icons";
import { Button } from "../../ui/Button";
import { ParticleField } from "./ParticleField";
import "./Hero.css";

const WORDS = ["Build.", "Connect.", "Grow"];

const STATS = [
  { label: "Digital experience", value: "Build" },
  { label: "Applied AI", value: "Automate" },
  { label: "Custom software", value: "Connect" },
];

/** Home hero: particle terrain, three-word headline, two CTAs and the stat strip. */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <ParticleField pointerTarget={sectionRef} />

      <div className="hero__content">
        <p className="eyebrow eyebrow--live hero__eyebrow">Technology, built around you</p>
        <h1 id="hero-title" className="hero__title">
          {WORDS.map((word, index) => (
            <span className="hero__word" key={word}>
              <span>
                {word}
                {index === WORDS.length - 1 && <span className="accent">.</span>}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero__description">
          Intelligent websites. Applied AI. Custom software.
          <br className="br-desktop" /> Connected around your business, built for your next step.
        </p>
        <div className="hero__actions">
          <Button to="#contact">Discuss your project</Button>
          <Button to="#capabilities" variant="outline" glass>
            Explore capabilities
          </Button>
        </div>
      </div>

      <div className="hero__bottom">
        <dl className="hero__stats">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {stat.value}
                <ArrowUpRight />
              </dd>
            </div>
          ))}
        </dl>
        <Link to="#capabilities" className="hero__scroll">
          Scroll
          <span aria-hidden="true" />
        </Link>
        <p className="hero__tagline">
          Engineering with purpose. <br />
          Built around your business.
        </p>
      </div>
    </section>
  );
}
