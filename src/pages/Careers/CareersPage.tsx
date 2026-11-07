import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailSection, EmptyState } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const TALENT_NETWORK_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSej8MQXZ95cM6a-sP7xmE-zjV2GlGFe7q0rbXSb5Im9DG0IFg/viewform";

/** Careers — who Ladder7 hires and why, then the standard enquiry CTA. */
export default function CareersPage() {
  return (
    <>
      <Seo page="careers" />
      <LandingHero
        eyebrow="Grow with Ladder7"
        title="Good people. Meaningful work"
        description="Build intelligent ecosystems and next-generation digital platforms for Fortune 100 enterprises and high-growth innovators."
        image={{ name: "photos/team-collaboration", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Careers" title="Stay curious. Keep building." light>
          <EmptyState eyebrow="Current opportunities" title="No current openings." cta={{ label: "Join the talent network", to: TALENT_NETWORK_FORM }}>
            Ladder7's live careers page currently lists no open positions. Join the talent network to express your interest.
          </EmptyState>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Proven at Global Scale. Executed with Agility." light>
          <p>
            Top-tier engineers and strategists don't just want a job; they want to solve complex problems at scale. At Ladder7, we bridge the
            gap between strategic consulting and elite software engineering.
          </p>
          <p>
            When you join our team, you aren't just maintaining legacy code. You are architecting Agentic AI systems, deploying global Adobe
            Experience Manager (AEM) infrastructures, and building headless digital experiences that dictate market leadership.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="An Environment Engineered for Excellence.">
          <p>We hire brilliant minds and give them the autonomy, tools, and psychological safety required to innovate.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Current Openings" light>
          <p>Join us in building the next generation of digital infrastructure.</p>
          <p>Check back later or join our talent network below.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Don't See the Perfect Fit?">
          <p>We are always looking for exceptional talent. If you have a passion for elite engineering and digital strategy, we want to hear from you.</p>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
