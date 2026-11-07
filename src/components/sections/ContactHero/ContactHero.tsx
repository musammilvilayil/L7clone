import { useRef } from "react";
import { CONTACT_INTERESTS } from "../../../data/company";
import { COMPANY } from "../../../data/site";
import { ArrowUpRight } from "../../common/Icons";
import { ParticleField } from "../Hero/ParticleField";
import { EnquiryForm } from "../../forms/EnquiryForm";
import "./ContactHero.css";

/**
 * The Contact page's own opening section (design: .contact-landing.wave-hero)
 * — direct contacts beside the enquiry form, over the shared particle
 * terrain. Distinct from the reusable red "Let's build what's next" CTA
 * (ContactSection), which every OTHER page ends with; the dedicated Contact
 * page replaces that CTA with this instead.
 */
export function ContactHero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="contact-landing wave-hero" id="contact" aria-labelledby="contact-title">
      <ParticleField pointerTarget={ref} />
      <div className="contact-intro">
        <p className="eyebrow eyebrow--live">Contact Ladder7</p>
        <h1 id="contact-title">
          Let's talk
          <br />
          about what's next<span className="accent">.</span>
        </h1>
        <p>
          A business idea. A new skill. Your next career move.
          <br />
          Tell us where you want to go. We'll help you find the next step.
        </p>
        <div className="contact-direct">
          <div>
            <span className="label-tiny">Write to us</span>
            <a href={`mailto:${COMPANY.email}`}>
              {COMPANY.email} <ArrowUpRight />
            </a>
          </div>
          <div>
            <span className="label-tiny">Prefer a conversation?</span>
            <a href={COMPANY.phone.href}>
              {COMPANY.phone.display} <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <EnquiryForm
        variant="page"
        source="contact-page"
        headingLevel="h2"
        heading="Tell us about your next step."
        intro="A few details will help us understand your next step."
        interests={CONTACT_INTERESTS}
        labels={{ name: "Your name", email: "Email", message: "What would you like to achieve?" }}
        placeholders={{ name: "Your name", email: "you@example.com", message: "Tell us about your business, challenge or idea." }}
        messageRows={3}
      />
    </section>
  );
}
