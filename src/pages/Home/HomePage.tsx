import { useCallback, useState } from "react";
import { Seo } from "../../components/common/Seo";
import { ApproachSection } from "../../components/sections/Approach/ApproachSection";
import { AudienceSection } from "../../components/sections/Audience/AudienceSection";
import { CapabilityList } from "../../components/sections/Capabilities/CapabilityList";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DeliverySection } from "../../components/sections/Delivery/DeliverySection";
import { FaqSection } from "../../components/sections/Faq/FaqSection";
import { Hero } from "../../components/sections/Hero/Hero";
import { MotionStory } from "../../components/sections/MotionStory/MotionStory";
import { PossibilitiesWall } from "../../components/sections/PossibilitiesWall/PossibilitiesWall";
import { ProductSuite } from "../../components/sections/ProductSuite/ProductSuite";
import { SolutionsSection } from "../../components/sections/Solutions/SolutionsSection";
import { TrainingSection } from "../../components/sections/Training/TrainingSection";
import { WhyLadder7 } from "../../components/sections/WhyLadder7/WhyLadder7";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { CAPABILITIES, SOLUTIONS, type Capability, type SolutionId } from "../../data/services";
import "./HomePage.css";

/**
 * Home — the full Ladder7 IT design, top to bottom.
 *
 * Page-level state links three sections the way the design's script did:
 * clicking a capability row or a solution tab selects that solution, and the
 * contact form's "I'm interested in" follows it.
 */
export default function HomePage() {
  const [solution, setSolution] = useState<SolutionId>("web");

  const onCapability = useCallback((capability: Capability) => {
    if (capability.solution) setSolution(capability.solution);
  }, []);

  return (
    <>
      <Seo page="home" />
      <Hero />

      <section className="section home-capabilities capability-section" id="capabilities" aria-labelledby="capabilities-title">
        <SectionHeading
          eyebrow="What we do"
          title={"Four capabilities.\nOne connected partner"}
          titleId="capabilities-title"
          intro={"From the first strategic question\nto the systems behind your business."}
        />
        <CapabilityList
          items={CAPABILITIES}
          hrefFor={(capability) => (capability.solution ? "#solutions" : "#approach")}
          onSelect={onCapability}
        />
      </section>

      <ProductSuite />
      <SolutionsSection active={solution} onChange={setSolution} />
      <ApproachSection />
      <DeliverySection />
      <WhyLadder7 />
      <MotionStory />
      <PossibilitiesWall />
      <AudienceSection />
      <FaqSection />
      <TrainingSection />
      <ContactSection interest={SOLUTIONS[solution].interest} />
    </>
  );
}
