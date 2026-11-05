import { useCallback, useEffect, useRef } from "react";
import { SOLUTION_ORDER, SOLUTIONS, type SolutionId } from "../../../data/services";
import { prefersReducedMotion } from "../../../hooks/useMediaQuery";
import { revealRef } from "../../../hooks/useReveal";
import { useRovingTabs } from "../../../hooks/useRovingTabs";
import { CheckArrow } from "../../common/CheckArrow";
import { Lines } from "../../common/Lines";
import { Button } from "../../ui/Button";
import { SectionHeading } from "../../ui/SectionHeading";
import { Workflow } from "./Workflow";
import "./SolutionsSection.css";

/**
 * "Make the next action happen." — light section with three solution tabs.
 * Controlled by the page so capability rows and the contact form stay in
 * sync with the selected tab (design behaviour).
 */
export function SolutionsSection({ active, onChange }: { active: SolutionId; onChange: (id: SolutionId) => void }) {
  const index = SOLUTION_ORDER.indexOf(active);
  const solution = SOLUTIONS[active];
  const copyRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const select = useCallback((i: number) => onChange(SOLUTION_ORDER[i]!), [onChange]);
  const { getTabProps } = useRovingTabs({ count: SOLUTION_ORDER.length, selected: index, onSelect: select });

  // Re-entrance animation on change (skipped on first render / reduced motion).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    copyRef.current?.animate(
      [
        { opacity: 0.2, transform: "translateY(12px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 450, easing: "cubic-bezier(.22,1,.36,1)" },
    );
  }, [active]);

  return (
    <section className="section section--sheet theme-paper solutions" id="solutions" aria-labelledby="solutions-title">
      <SectionHeading
        eyebrow="Connected by design"
        title={"Make the next\naction happen"}
        titleId="solutions-title"
        intro={"A website, an AI assistant, or an application\nworks harder when it connects to the next step."}
      />

      <div className="solutions__tabs" role="tablist" aria-label="Explore solution types">
        {SOLUTION_ORDER.map((id, i) => (
          <button key={id} type="button" id={`solution-tab-${id}`} aria-controls="solution-panel" className="solutions__tab" {...getTabProps(i)}>
            {SOLUTIONS[id].tabLabel}
          </button>
        ))}
      </div>

      <div
        className="solutions__board reveal"
        ref={revealRef}
        id="solution-panel"
        role="tabpanel"
        aria-labelledby={`solution-tab-${active}`}
      >
        <Workflow solution={solution} />
        <div className="solutions__copy" ref={copyRef}>
          <p className="eyebrow">{solution.kicker}</p>
          <h3>
            <Lines text={solution.title} />
          </h3>
          <p className="solutions__description">{solution.description}</p>
          <ul className="check-list">
            {solution.features.map((feature) => (
              <li key={feature}>
                <CheckArrow />
                {feature}
              </li>
            ))}
          </ul>
          <Button to="#contact" className="solutions__cta">
            Discuss your requirements
          </Button>
        </div>
      </div>
    </section>
  );
}
