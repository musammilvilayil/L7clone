import { DELIVERY_STEPS } from "../../../data/process";
import { revealRef } from "../../../hooks/useReveal";
import { SectionHeading } from "../../ui/SectionHeading";
import "./DeliverySteps.css";

/**
 * The seven delivery steps as a static, fully visible list (services page).
 * The home page shows the same data as an interactive pinned scene.
 */
export function DeliverySteps() {
  return (
    <section className="section section--sheet section--overlap theme-dark delivery-steps" id="delivery-steps" aria-labelledby="delivery-steps-title">
      <SectionHeading
        eyebrow="Connected digital delivery"
        title={"Your business.\nOne connected journey"}
        titleId="delivery-steps-title"
        intro={"From understanding the need to improving what works.\nThe decisions behind a useful digital solution."}
      />
      <ol className="delivery-steps__list">
        {DELIVERY_STEPS.map((step, index) => (
          <li key={step.title} className="delivery-steps__item reveal" ref={revealRef}>
            <span className="delivery-steps__number">{String(index + 1).padStart(2, "0")}</span>
            <p className="label-tiny">{step.kicker}</p>
            <h3>{step.title}</h3>
            <p className="delivery-steps__description">{step.description}</p>
            <div className="delivery-steps__prompt">
              <span>Start by asking</span>
              <p>{step.question}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
