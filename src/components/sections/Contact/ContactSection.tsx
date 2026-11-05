import { CONTACT_INTERESTS } from "../../../data/company";
import { COMPANY } from "../../../data/site";
import { revealRef } from "../../../hooks/useReveal";
import { cn } from "../../../utils/cn";
import { ArrowUpRight } from "../../common/Icons";
import { EnquiryForm } from "../../forms/EnquiryForm";
import "./ContactSection.css";

/**
 * "Let's build what's next." — red sheet with direct contacts and the main
 * enquiry form. Every page ends with it (id="contact"), so "Let's talk" and
 * every "Discuss…" button are in-page links that work on any route.
 */
export function ContactSection({
  headingLevel: Heading = "h2",
  interest,
  first = false,
}: {
  headingLevel?: "h1" | "h2";
  /** Pre-selected interest (home: follows the solutions tabs). */
  interest?: string;
  /** Contact page: the section opens the page, below the header. */
  first?: boolean;
}) {
  return (
    <section className={cn("section section--sheet theme-brand contact", first && "contact--first")} id="contact" aria-labelledby="contact-title">
      <div className="contact__copy reveal" ref={revealRef}>
        <p className="eyebrow eyebrow--live">Take the right next step</p>
        <Heading id="contact-title">
          Let's build
          <br />
          what's next<span className="contact__accent">.</span>
        </Heading>
        <p className="contact__lead">
          A business goal. A technology challenge.
          <br className="br-desktop" /> Start with a conversation.
        </p>
        <div className="contact__links">
          <span className="label-tiny">Write to us</span>
          <a href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
            <ArrowUpRight />
          </a>
          <span className="label-tiny">Prefer a call?</span>
          <a href={COMPANY.phone.href}>
            {COMPANY.phone.display}
            <ArrowUpRight />
          </a>
        </div>
      </div>

      <div className="reveal" ref={revealRef}>
        <EnquiryForm
          variant="contact"
          source="contact-section"
          headingLevel={Heading === "h1" ? "h2" : "h3"}
          heading="Tell us what you're working on."
          intro="A few details will help us understand your next step."
          interests={CONTACT_INTERESTS}
          interest={interest}
          labels={{ name: "Your name", email: "Work email", message: "What would you like to achieve?" }}
          placeholders={{ name: "Your name", email: "you@company.com", message: "Tell us about your business, challenge or idea." }}
        />
      </div>
    </section>
  );
}
