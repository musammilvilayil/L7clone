import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailSection } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

/** Career Goal Finding — rebuilt from training-internship--career-goal-finding.html. */
export default function CareerGoalFindingPage() {
  return (
    <>
      <Seo page="careerGoalFinding" />
      <LandingHero
        eyebrow="Training & internship"
        title="Find a direction that feels like you"
        description="A focused, one-to-one career conversation to connect your strengths and interests with a practical next step."
        facts={["One-on-One Session"]}
        image={{ name: "photos/team-workshop", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="A clearer next step." light>
          <p>
            A focused, one-on-one session to help you understand your strengths and interests, and figure out a career direction in tech that
            actually fits you.
          </p>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
