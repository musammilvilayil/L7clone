import { revealRef } from "../../../hooks/useReveal";
import "./AboutPrinciples.css";

const PRINCIPLES = [
  { number: "1X", title: "Engineering, without compromise.", description: "Scalability, security and performance belong in every layer." },
  { number: "2X", title: "Independent by design.", description: "Platform recommendations follow your goals, free from vendor bias." },
  { number: "3X", title: "Clarity at every step.", description: "Open communication, clear data and honest visibility into risk." },
  { number: "4X", title: "Innovation with an outcome.", description: "Choose technology that reduces friction and delivers business value." },
];

/** Red "Four principles." sheet (design: .about-principles). */
export function AboutPrinciples() {
  return (
    <section className="about-principles" aria-labelledby="principles-title">
      <div className="about-principles__heading">
        <div className="reveal" ref={revealRef}>
          <p className="eyebrow eyebrow--live">How we work</p>
          <h2 id="principles-title">
            Four principles.
            <br />
            Every next step.
          </h2>
        </div>
        <p className="reveal" ref={revealRef}>
          The standards that shape our thinking,
          <br />
          our partnerships and everything we build.
        </p>
      </div>
      <div className="about-principles__grid">
        {PRINCIPLES.map((principle) => (
          <article key={principle.number} className="reveal" ref={revealRef}>
            <span aria-hidden="true">{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
