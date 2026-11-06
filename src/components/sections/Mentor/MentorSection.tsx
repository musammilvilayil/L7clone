import { AMIU } from "../../../data/education";
import { revealRef } from "../../../hooks/useReveal";
import { Lines } from "../../common/Lines";
import { Button } from "../../ui/Button";
import "./MentorSection.css";

/**
 * "Meet AMIU · Your AI career mentor." — a light panel: copy + CTA on the
 * left, a three-step self-discovery path on the right (design: .mentor-feature).
 */
export function MentorSection() {
  return (
    <section className="section mentor" id="amiu" aria-labelledby="amiu-title">
      <div className="mentor__copy reveal" ref={revealRef}>
        <p className="eyebrow">{AMIU.eyebrow}</p>
        <h2 id="amiu-title">
          <Lines text={AMIU.title} accent />
        </h2>
        <p>{AMIU.description}</p>
        <Button to={AMIU.cta.href}>{AMIU.cta.label}</Button>
      </div>

      <div className="mentor__map reveal" ref={revealRef}>
        <p className="label-tiny">{AMIU.mapLabel}</p>
        <ol>
          {AMIU.steps.map((step, index) => (
            <li key={step.number} className={index === AMIU.steps.length - 1 ? "is-final" : undefined}>
              <span aria-hidden="true">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <span className="mentor__map-caption">
          {AMIU.mapCaption}
          <b aria-hidden="true">↗</b>
        </span>
      </div>
    </section>
  );
}
