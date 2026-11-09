import { useCallback } from "react";
import { useEnquiry } from "../../../context/EnquiryContext";
import { useLocation } from "react-router";
import { IT_INTERESTS } from "../../../data/company";
import { EDUCATION_CONTACT } from "../../../data/education";
import { COMPANY } from "../../../data/site";
import { contactDivisionForPath } from "../../../routes";
import { prefersReducedMotion } from "../../../hooks/useMediaQuery";
import { revealRef } from "../../../hooks/useReveal";
import { cn } from "../../../utils/cn";
import { ArrowUpRight } from "../../common/Icons";
import { Lines } from "../../common/Lines";
import { EnquiryForm } from "../../forms/EnquiryForm";
import "./ContactSection.css";

const IT_CONTENT = {
  eyebrow: "Take the right next step",
  title: ["Let's build", "what's next"] as [string, string],
  lead: "A business goal. A technology challenge.\nStart with a conversation.",
  availabilityText: undefined as string | undefined,
  interests: IT_INTERESTS,
  labels: { name: "Your name", email: "Work email", message: "What would you like to achieve?" },
  placeholders: { name: "Your name", email: "you@company.com", message: "Tell us about your business, challenge or idea." },
  formHeading: "Tell us what you're working on.",
  formIntro: "A few details will help us understand your next step.",
};

export interface ContactContent {
  eyebrow: string;
  /** The two-line heading, split before/after the (always-on, not just desktop) <br>. A red full stop is appended. */
  title: [string, string];
  /** "\n" marks a desktop-only line break. */
  lead: string;
  /** Status line under the contact links (Education only; IT's design omits it). */
  availabilityText?: string;
  interests: string[];
  labels: { name: string; email: string; message: string };
  placeholders: { name: string; email: string; message: string };
  formHeading: string;
  formIntro: string;
}

/**
 * "Let's build what's next." — red sheet with direct contacts and the main
 * enquiry form. Every page ends with it (id="contact"), so "Let's talk" and
 * every "Discuss…" button are in-page links that work on any route.
 */
export function ContactSection({
  headingLevel: Heading = "h2",
  interest,
  first = false,
  content: contentProp,
}: {
  headingLevel?: "h1" | "h2";
  /** Pre-selected interest (home: follows the solutions tabs). */
  interest?: string;
  /** Contact page: the section opens the page, below the header. */
  first?: boolean;
  /** Copy bundle; defaults to the current page's division (IT or Education). */
  content?: ContactContent;
}) {
  const { pathname } = useLocation();
  const content = contentProp ?? (contactDivisionForPath(pathname) === "education" ? EDUCATION_CONTACT : IT_CONTENT);

  // A program dialog's "Talk to an advisor" (openEnquiry({ target: "contact" }))
  // fills this form in place and scrolls/focuses it — the overlay menu ignores
  // a "contact"-targeted prefill (see MegaMenu).
  const { prefill } = useEnquiry();
  const contactPrefill = prefill?.target === "contact" ? prefill : null;
  const focusMessage = useCallback(({ message }: { name: HTMLInputElement | null; message: HTMLTextAreaElement | null }) => {
    requestAnimationFrame(() => {
      message?.focus({ preventScroll: true });
      message?.closest(".enquiry")?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "instant" : "smooth" });
    });
  }, []);

  return (
    <section className={cn("section section--sheet theme-brand contact", first && "contact--first")} id="contact" aria-labelledby="contact-title">
      <div className="contact__copy reveal" ref={revealRef}>
        <p className="eyebrow eyebrow--live">{content.eyebrow}</p>
        <Heading id="contact-title">
          {content.title[0]}
          <br />
          {content.title[1]}
          <span className="contact__accent">.</span>
        </Heading>
        <p className="contact__lead">
          <Lines text={content.lead} />
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
        {content.availabilityText && <p className="status contact__status">{content.availabilityText}</p>}
      </div>

      <div className="reveal" ref={revealRef}>
        <EnquiryForm
          variant="contact"
          source="contact-section"
          headingLevel={Heading === "h1" ? "h2" : "h3"}
          heading={content.formHeading}
          intro={content.formIntro}
          interests={content.interests}
          interest={interest}
          labels={content.labels}
          placeholders={content.placeholders}
          prefill={contactPrefill}
          onPrefillApplied={focusMessage}
        />
      </div>
    </section>
  );
}
