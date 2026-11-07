import { revealRef } from "../../../hooks/useReveal";
import { Button } from "../../ui/Button";
import "./AboutAudience.css";

const AUDIENCES = [
  {
    kicker: "For global enterprises",
    title: "Connect the complex.",
    items: ["Compliance requirements and risk management", "Resilience and redundancy", "Integration with existing systems"],
    cta: { label: "Explore our services", to: "/services", variant: "primary" as const },
  },
  {
    kicker: "For growing SMBs",
    title: "Build for the next stage.",
    items: ["Enterprise experience with local agility", "Specialist talent", "Foundations designed to scale"],
    cta: { label: "Discuss your next step", to: "#contact", variant: "outline" as const },
  },
];

/** "Enterprise rigour. Startup agility." (design: .audience-section). */
export function AboutAudience() {
  return (
    <section className="about-audience" aria-labelledby="audience-title">
      <div className="company-section-label">
        <span>04 / A partner for your next stage</span>
        <span>Rigour, with room to move.</span>
      </div>

      <div className="about-audience__heading reveal" ref={revealRef}>
        <h2 id="audience-title">
          Enterprise rigour.
          <br />
          Startup agility<span className="accent">.</span>
        </h2>
        <p>
          The discipline to build well.
          <br />
          The flexibility to move forward.
        </p>
      </div>

      <div className="about-audience__grid">
        {AUDIENCES.map((audience) => (
          <article key={audience.kicker} className="reveal" ref={revealRef}>
            <span className="company-kicker">{audience.kicker}</span>
            <h3>{audience.title}</h3>
            <ul>
              {audience.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button to={audience.cta.to} variant={audience.cta.variant}>
              {audience.cta.label}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
