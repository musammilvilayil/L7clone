import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailSection } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

/** Thank you — shown after an enquiry; rebuilt from thank-you.html. */
export default function ThankYouPage() {
  return (
    <>
      <Seo page="thankYou" />
      <LandingHero
        eyebrow="Your next step"
        title="Your next step starts here"
        description="Your message has been sent to the Ladder7 team. One of our experts will get back to you shortly, usually within one business day."
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="Before we speak, take a moment to think about:" light>
          <p>
            Need to add something? Write to us at <a href="mailto:info@ladder7.in">info@ladder7.in</a>.
          </p>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
