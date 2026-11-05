import { Seo } from "../../components/common/Seo";
import { JourneyTimeline } from "../../components/sections/Approach/JourneyTimeline";
import { AudienceSection } from "../../components/sections/Audience/AudienceSection";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { ReadingCopy } from "../../components/sections/Delivery/ReadingCopy";
import { LocationsSection } from "../../components/sections/Locations/LocationsSection";
import { PageHero } from "../../components/sections/PageHero/PageHero";
import { ProductGrid } from "../../components/sections/Products/ProductGrid";
import { WhyLadder7 } from "../../components/sections/WhyLadder7/WhyLadder7";
import { Button } from "../../components/ui/Button";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { COMPANY } from "../../data/site";
import { PAGE_SEO } from "../../seo/pages";
import "./AboutPage.css";

/**
 * About — who Ladder7 is and how it works, composed only from facts in the
 * design: positioning, the four reasons, the approach, audiences, products
 * and the two bases.
 */
export default function AboutPage() {
  return (
    <>
      <Seo page="about" />
      <PageHero
        eyebrow="About Ladder7"
        title={"Technology,\nbuilt around you"}
        intro={`${COMPANY.name} connects intelligent websites, applied AI, custom software and technology strategy around your next business goal — for established brands and ambitious startups alike.`}
        breadcrumb={PAGE_SEO.about.breadcrumb}
        actions={
          <>
            <Button to="#contact">Start a conversation</Button>
            <Button to="/services" variant="outline" glass>
              Explore our services
            </Button>
          </>
        }
      />

      <section className="section about-progress" aria-label="What digital progress can look like">
        <ReadingCopy />
      </section>

      <WhyLadder7 />

      <section className="section section--sheet theme-dark about-approach" id="approach" aria-labelledby="about-approach-title">
        <SectionHeading
          eyebrow="From ambition to action"
          title="Start with the outcome"
          titleId="about-approach-title"
          intro={"Technology decisions become clearer\nwhen the business goal comes first."}
        />
        <JourneyTimeline label="How we work" />
      </section>

      <AudienceSection linkTo="/services" linkLabel="See what we build" />
      <ProductGrid />
      <LocationsSection />
      <ContactSection />
    </>
  );
}
