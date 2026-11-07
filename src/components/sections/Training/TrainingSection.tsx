import { useEnquiry } from "../../../context/EnquiryContext";
import { TRAINING } from "../../../data/company";
import { revealRef } from "../../../hooks/useReveal";
import { Button } from "../../ui/Button";
import { SectionHeading } from "../../ui/SectionHeading";
import "./TrainingSection.css";

/**
 * "Grow your team. Build what comes next." — corporate training tracks. The
 * CTA opens the overlay enquiry form pre-set to "Corporate training" with a
 * starter message (design: data-open-enquiry).
 */
export function TrainingSection() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="section training" id="team-training" aria-labelledby="team-training-title">
      <SectionHeading
        eyebrow="For the people behind your business"
        title={"Grow your team.\nBuild what comes next"}
        titleId="team-training-title"
        intro={"Practical training shaped around your stack,\nyour people, and your schedule."}
      />
      <div className="training__intro">
        <p>{TRAINING.intro}</p>
        <Button to="/corporate-training-kerala" variant="text">
          Explore corporate training
        </Button>
      </div>
      <ul className="training__tracks">
        {TRAINING.tracks.map((track) => (
          <li key={track.label} className="reveal" ref={revealRef}>
            <span>{track.label}</span>
            <h3>{track.title}</h3>
            <p>
              {track.topics[0]}
              <br />
              {track.topics[1]}
            </p>
          </li>
        ))}
      </ul>
      <div className="training__bottom">
        <span>A syllabus that fits. A schedule that works.</span>
        <Button
          onClick={() => openEnquiry({ interest: "Corporate training", message: TRAINING.enquiryMessage })}
          aria-haspopup="true"
          aria-controls="menu"
        >
          Plan your team's next step
        </Button>
      </div>
    </section>
  );
}
