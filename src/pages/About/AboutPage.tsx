import { Seo } from "../../components/common/Seo";
import { AboutAudience } from "../../components/sections/AboutAudience/AboutAudience";
import { AboutExpertise } from "../../components/sections/AboutExpertise/AboutExpertise";
import { AboutHero } from "../../components/sections/AboutHero/AboutHero";
import { AboutPrinciples } from "../../components/sections/AboutPrinciples/AboutPrinciples";
import { AboutReach } from "../../components/sections/AboutReach/AboutReach";
import { AboutStory } from "../../components/sections/AboutStory/AboutStory";
import { ContactSection } from "../../components/sections/Contact/ContactSection";

/**
 * About — who Ladder7 is and how it works, rebuilt from the real design
 * (about.html): the drifting-photo hero, four principles, the story behind
 * the work, the people and experience, who it's for, and reach from Kerala.
 */
export default function AboutPage() {
  return (
    <>
      <Seo page="about" />
      <AboutHero />
      <AboutPrinciples />
      <AboutStory />
      <AboutExpertise />
      <AboutAudience />
      <AboutReach />
      <ContactSection headingLevel="h2" />
    </>
  );
}
