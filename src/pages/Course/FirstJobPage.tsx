import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { Button } from "../../components/ui/Button";

const APPLY_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeSdfZjshBaIB2PATDu-x1xpwJ6V85LqVbocumsyJz5uO915A/viewform?usp=header";

const ROLES: DetailCard[] = [
  {
    number: "01",
    title: "Jr. AI/ML Developer (Intern)",
    description:
      "Join our engineering team to bridge the gap between raw data and intelligent insights. Assist in building, testing, and deploying models that solve real-world problems.",
  },
  {
    number: "02",
    title: "Jr. MERN Developer (Intern)",
    description: "Budding Full-Stack Developer to scale web platforms. Perfect for JS lovers who want to see code in production and impact real users.",
  },
  {
    number: "03",
    title: "Jr. HR (Intern)",
    description: "First point of contact for candidates, helping maintain a high-energy company culture and sourcing the best talent.",
  },
  {
    number: "04",
    title: "Jr. Digital Marketing Executive (Intern)",
    description: "Creative, data-curious intern to support digital marketing across channels and help tell our brand's story.",
  },
];

/** Experience the First Job — rebuilt from experience-the-first-job.html. */
export default function FirstJobPage() {
  return (
    <>
      <Seo page="firstJob" />
      <LandingHero
        eyebrow="Your next step"
        title="Experience your first real step"
        description={'Bridge the gap between academia and industry. "Experience the First Job" provides immersive, real-world project simulations for youth entering the workforce.'}
        image={{ name: "photos/first-job", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Get started" title="Take your first step." light>
          <Button to={APPLY_FORM}>Apply for the program</Button>
        </DetailSection>
        <DetailSection eyebrow="The details" title="Explore what’s possible.">
          <DetailCards items={ROLES} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
