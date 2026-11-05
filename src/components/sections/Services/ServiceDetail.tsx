import { JOURNEY_PHASES } from "../../../data/process";
import { SOLUTIONS, STRATEGY_DETAIL, type Capability } from "../../../data/services";
import { revealRef } from "../../../hooks/useReveal";
import { cn } from "../../../utils/cn";
import { CheckArrow } from "../../common/CheckArrow";
import { Lines } from "../../common/Lines";
import { Button } from "../../ui/Button";
import { TagList } from "../../ui/TagList";
import { Workflow } from "../Solutions/Workflow";
import "./ServiceDetail.css";

/**
 * One capability in full (services page): heading, tags, the workflow diagram
 * and the solution copy from the design, all visible without tabs.
 */
export function ServiceDetail({
  capability,
  tone,
  onEnquire,
}: {
  capability: Capability;
  tone: "dark" | "paper";
  onEnquire: (interest: string) => void;
}) {
  const solution = capability.solution ? SOLUTIONS[capability.solution] : null;
  const detail = solution ?? STRATEGY_DETAIL;

  return (
    <section
      id={capability.id}
      className={cn("section section--sheet service-detail", tone === "paper" ? "theme-paper" : "theme-dark", "section--overlap")}
      aria-labelledby={`${capability.id}-title`}
    >
      <header className="service-detail__head reveal" ref={revealRef}>
        <p className="eyebrow">
          {capability.number} / {capability.subtitle}
        </p>
        <h2 id={`${capability.id}-title`}>
          {capability.title}
          <span className="accent">.</span>
        </h2>
        <TagList tags={capability.tags} label={`${capability.title} services`} />
      </header>

      <div className="service-detail__board reveal" ref={revealRef}>
        {solution ? (
          <Workflow solution={solution} />
        ) : (
          <ol className="service-detail__phases" aria-label="How a strategy engagement runs">
            {JOURNEY_PHASES.map((phase) => (
              <li key={phase.number}>
                <span>{phase.number}</span>
                <strong>{phase.title}</strong>
                <p>{phase.description}</p>
              </li>
            ))}
          </ol>
        )}
        <div className="service-detail__copy">
          <p className="eyebrow">{detail.kicker}</p>
          <h3>
            <Lines text={detail.title} />
          </h3>
          <p className="service-detail__description">{detail.description}</p>
          <ul className="check-list">
            {detail.features.map((feature) => (
              <li key={feature}>
                <CheckArrow />
                {feature}
              </li>
            ))}
          </ul>
          <Button to="#contact" onClick={() => onEnquire(capability.interest)}>
            Discuss {capability.title.toLowerCase()}
          </Button>
        </div>
      </div>
    </section>
  );
}
