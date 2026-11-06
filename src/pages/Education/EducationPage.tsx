import { Seo } from "../../components/common/Seo";
import { JourneyTimeline } from "../../components/sections/Approach/JourneyTimeline";
import { CapabilityList } from "../../components/sections/Capabilities/CapabilityList";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { ReadingCopy } from "../../components/sections/Delivery/ReadingCopy";
import { Hero } from "../../components/sections/Hero/Hero";
import { MentorSection } from "../../components/sections/Mentor/MentorSection";
import { PossibilitiesWall } from "../../components/sections/PossibilitiesWall/PossibilitiesWall";
import { ProgramsSection } from "../../components/sections/Programs/ProgramsSection";
import { StoriesSection } from "../../components/sections/Stories/StoriesSection";
import { TrainingSection } from "../../components/sections/Training/TrainingSection";
import { Button } from "../../components/ui/Button";
import { SectionHeading } from "../../components/ui/SectionHeading";
import {
  EDUCATION_CONTACT,
  EDUCATION_HERO,
  EDUCATION_JOURNEY_PHASES,
  EDUCATION_PRODUCTS,
  EDUCATION_PRODUCT_LINKS,
  EDUCATION_PROGRESS_PHRASES,
  EDUCATION_WALL,
} from "../../data/education";
import "./EducationPage.css";

/**
 * Education — the full Ladder7 Education design, top to bottom. Reuses the
 * IT division's shared sections (Hero, CapabilityList, ReadingCopy,
 * JourneyTimeline, PossibilitiesWall, ContactSection, TrainingSection —
 * unchanged, its copy is identical in both designs) with Education's own
 * content, plus three sections unique to this division (Mentor/AMIU,
 * Programs, Stories).
 */
export default function EducationPage() {
  return (
    <>
      <Seo page="education" />
      <Hero content={EDUCATION_HERO} variant="education" />

      <section className="section" id="products" aria-labelledby="products-title">
        <SectionHeading
          eyebrow="Your growth toolkit"
          title={"Four products.\nOne better you"}
          titleId="products-title"
          intro={"Know yourself. Find your focus.\nBuild a path that feels like yours."}
        />
        <CapabilityList items={EDUCATION_PRODUCTS} hrefFor={(product) => EDUCATION_PRODUCT_LINKS[product.id]!} headingLevel="h3" />
      </section>

      <MentorSection />
      <ProgramsSection />

      <section className="section section--sheet section--overlap theme-dark education-approach" id="approach" aria-labelledby="approach-title">
        <SectionHeading
          eyebrow="The Ladder7 framework"
          title={"From possibility\nto progress"}
          titleId="approach-title"
          intro={"A practical framework to help you\nmove forward with confidence."}
          aside={
            <Button to="#contact" variant="outline" className="education-approach__cta">
              Find your starting point
            </Button>
          }
        />
        <ReadingCopy number="01" label="What growth can look like" phrases={EDUCATION_PROGRESS_PHRASES} />
        <JourneyTimeline number="02" label="Your journey, in motion" phases={EDUCATION_JOURNEY_PHASES} noBorder />
      </section>

      <PossibilitiesWall content={EDUCATION_WALL} />
      <StoriesSection />
      <TrainingSection />
      <ContactSection headingLevel="h2" content={EDUCATION_CONTACT} />
    </>
  );
}
