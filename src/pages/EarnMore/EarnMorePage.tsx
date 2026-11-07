import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailSection } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { Button } from "../../components/ui/Button";

const INTEREST_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSej8MQXZ95cM6a-sP7xmE-zjV2GlGFe7q0rbXSb5Im9DG0IFg/viewform";

/** EarnMore — rebuilt from earnmore.html. */
export default function EarnMorePage() {
  return (
    <>
      <Seo page="earnMore" />
      <LandingHero
        eyebrow="Your next step"
        title="Learn. Grow. Earn more"
        description="Accelerate your earning potential. Discover targeted upskilling resources, industry certifications, and strategies designed to maximize your professional value."
        image={{ name: "photos/earnmore", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Get started" title="Start your conversation." light>
          <Button to={INTEREST_FORM}>Express your interest</Button>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Empowering Professionals">
          <p>
            EarnMore is a revolutionary program that empowers IT consultants and trainers to work from home on their own terms. It combines
            flexibility, real-world projects, and opportunities to maximize income effortlessly.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Available Paths" light>
          <p>Choose how you want to share your expertise</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Become a Mentor">
          <p>
            Join the EarnMore program as a Mentor and use your expertise to guide the next generation of IT professionals. Benefit from the
            flexibility of part-time work while increasing your income on your terms.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Become a Consultant" light>
          <p>
            Join the EarnMore program as an IT Consultant and apply your expertise to help businesses thrive. Take advantage of the flexibility of
            part-time work while boosting your income on your terms.
          </p>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
