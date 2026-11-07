import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailFaq, DetailSection } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { FAQS } from "../../data/company";

/** FAQ — common questions, answered, then the standard enquiry CTA. */
export default function FaqPage() {
  return (
    <>
      <Seo page="faq" />
      <LandingHero
        eyebrow="Your questions, answered"
        title="Good questions. Clear answers"
        description="Find answers to common questions about Ladder7's digital engineering services, applied AI solutions, and skilling and virtual internship programs."
      />
      <div id="page-content">
        <DetailSection eyebrow="A little more clarity" title="Good questions." light>
          <DetailFaq items={FAQS} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
