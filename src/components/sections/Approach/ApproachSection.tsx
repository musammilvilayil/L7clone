import { SectionHeading } from "../../ui/SectionHeading";
import { JourneyTimeline } from "./JourneyTimeline";
import "./ApproachSection.css";

/** "Start with the outcome." — dark sheet overlapping the solutions section. */
export function ApproachSection({ id = "approach" }: { id?: string }) {
  return (
    <section className="section section--sheet section--overlap theme-dark approach" id={id} aria-labelledby={`${id}-title`}>
      <SectionHeading
        eyebrow="From ambition to action"
        title="Start with the outcome"
        titleId={`${id}-title`}
        intro={"Technology decisions become clearer\nwhen the business goal comes first."}
      />
      <JourneyTimeline />
    </section>
  );
}
