import { AUDIENCES } from "../../../data/company";
import { revealRef } from "../../../hooks/useReveal";
import { Lines } from "../../common/Lines";
import { Button } from "../../ui/Button";
import { Eyebrow } from "../../ui/Eyebrow";
import { TagList } from "../../ui/TagList";
import "./AudienceSection.css";

/** "Built around your business." — sticky heading + two audience cards. */
export function AudienceSection({ linkTo = "/about", linkLabel = "Meet Ladder7" }: { linkTo?: string; linkLabel?: string }) {
  return (
    <section className="section split audience" aria-labelledby="audience-title">
      <div className="audience__heading reveal" ref={revealRef}>
        <Eyebrow>Your next stage</Eyebrow>
        <h2 id="audience-title">
          Built around <br className="br-desktop" />
          your business<span className="accent">.</span>
        </h2>
        <p>
          Established enterprise or ambitious startup.
          <br className="br-desktop" /> The right next step should fit where you are.
        </p>
        <Button to={linkTo} variant="text" className="audience__link">
          {linkLabel}
        </Button>
      </div>
      <div className="audience__cards">
        {AUDIENCES.map((audience) => (
          <article key={audience.label} className="card card--interactive audience__card reveal" ref={revealRef}>
            <span>{audience.label}</span>
            <h3>
              <Lines text={audience.title} />
            </h3>
            <p>{audience.description}</p>
            <TagList tags={audience.tags} />
          </article>
        ))}
      </div>
    </section>
  );
}
