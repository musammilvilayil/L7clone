import { useRef } from "react";
import type { ImageName } from "../../../data/images.generated";
import { useInView } from "../../../hooks/useInView";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { Button } from "../../ui/Button";
import "./AboutHero.css";

const COLLAGE: ImageName[][] = [
  [
    "photos/idea-lightbulb",
    "photos/team-collaboration",
    "photos/team-workshop",
    "photos/team-whiteboard-session",
    "photos/mentorship-interview",
    "photos/team-analytics-review",
  ],
  [
    "photos/ai-network-brain",
    "photos/product-dashboard-scan",
    "photos/product-dashboard-agents",
    "photos/product-dashboard-nocode",
    "photos/product-outreach-dashboard",
    "photos/product-insights-dashboard",
  ],
  [
    "photos/workspace-laptop",
    "photos/ai-processor",
    "photos/code-editor",
    "photos/online-checkout",
    "photos/training-analytics-meeting",
    "photos/training-laptop-code",
  ],
];

const FACTS = [
  { label: "Major deployments", value: "250", suffix: "+" },
  { label: "MNC clients", value: "50", suffix: "+" },
  { label: "Proofs of concept", value: "50", suffix: "+" },
];

const LINES = ["Clear purpose.", "Deep expertise.", "Real progress."];

/**
 * About's opening section (design: .about-video-hero.wave-hero) — three
 * drifting photo columns behind the page's own headline, facts and CTA.
 */
export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, "200px");

  return (
    <section ref={ref} className="about-hero" aria-labelledby="page-title" data-animating={inView || undefined}>
      <div className="about-hero__copy">
        <p className="eyebrow eyebrow--live">About Ladder7</p>
        <h1 id="page-title">
          {LINES.map((line, index) => (
            <span key={line}>
              <b>
                {index === LINES.length - 1 ? (
                  <>
                    {line.replace(/\.$/, "")}
                    <span className="accent">.</span>
                  </>
                ) : (
                  line
                )}
              </b>
            </span>
          ))}
        </h1>
        <p>
          We connect business ambition with technical execution. Enterprise architects, data scientists and transformation specialists,
          working together for your next chapter.
        </p>
        <Button to="#contact">Meet your next step</Button>
        <dl className="about-hero__facts">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label.toUpperCase()}</dt>
              <dd>
                {fact.value}
                <span>{fact.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="about-hero__collage" aria-hidden="true">
        {COLLAGE.map((images, column) => (
          <div className="about-hero__column" key={column} data-reverse={column === 1 || undefined}>
            {images.map((image) => (
              <div className="about-hero__card" key={image}>
                <ResponsiveImage name={image} alt="" sizes="(max-width: 700px) 45vw, 20vw" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
