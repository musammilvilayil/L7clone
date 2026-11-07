import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const CARDS: DetailCard[] = [
  { number: "01", title: "Customized Skill Development", description: "Tailored programs to upskill corporate professionals for higher roles, ensuring they meet the demands of their next career move." },
  { number: "02", title: "Bridging Career Barriers", description: "Focused on eliminating skill gaps and overcoming obstacles, ensuring participants are fully prepared for career progression and new opportunities." },
  { number: "03", title: "Interview Readiness", description: "Targeted coaching to help students overcome interview fears and prepare for their first steps into the professional world." },
  { number: "04", title: "Career Restart Support", description: "Specialized training for individuals returning to work after a break, helping them regain confidence and close skill gaps effectively." },
];

/** Fill Dots — rebuilt from filldots.html — the hero image is a stand-in: the design export embeds the brand logo here. */
export default function FillDotsPage() {
  return (
    <>
      <Seo page="productFillDots" />
      <LandingHero
        eyebrow="Fill Dots"
        title="Connect the dots. Shape your career"
        description="Connect the dots between where you are and where you want to be. Fill Dots provides customized learning pathways to bridge educational and professional skill gaps."
        image={{ name: "photos/mountain-climb", alt: "", caption: "Fill Dots" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="What is Fill Dots?" light>
          <p>
            "Fill Dots is a specialized program aimed at bridging skill gaps to help individuals advance to their next career level. The
            program focuses on enhancing specific skills and overcoming barriers, ensuring that participants are well-prepared for their
            career progression."
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Our Specialized Programs">
          <p>Explore how we tailor our expertise to your specific career stage and professional goals.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Ready to take your next career step?" light>
          <p>
            Don't let skill gaps hold you back. Join the Fill Dots program today and start your journey toward professional excellence with
            Ladder7.
          </p>
        </DetailSection>
        <DetailSection eyebrow="The details" title="Explore what’s possible.">
          <DetailCards items={CARDS} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
