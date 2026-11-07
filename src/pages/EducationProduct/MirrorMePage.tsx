import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const CARDS: DetailCard[] = [
  { number: "01", title: "Enhanced Self-Awareness", description: "Deeper insights into your personality, cognitive skills, and emotional intelligence. Understand the \"why\" behind your actions." },
  { number: "02", title: "Simplified Reflection", description: "Straightforward and accessible exercises for self-improvement. No jargon, just clear pathways to mental clarity and growth." },
  { number: "03", title: "Goal Alignment", description: "Harmonizing personal and professional ambitions with true potential. Bridge the gap between who you are and who you want to be." },
];

/** Mirror Me — rebuilt from mirrorme.html. */
export default function MirrorMePage() {
  return (
    <>
      <Seo page="productMirrorMe" />
      <LandingHero
        eyebrow="Mirror Me"
        title="Know yourself. Grow with clarity"
        description="Discover your true potential. Mirror Me provides deep psychometric and behavioral assessments to help youth and professionals align with the right career opportunities."
        image={{ name: "photos/mirror-reflection-portrait", alt: "", caption: "Mirror Me" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="The Mirror Me Experience" light>
          <p>
            Our structured approach acts as a "mirror," ensuring you see a clear picture of your potential and align self-awareness with life
            goals.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Look Closer. See Clearly.">
          <p>
            Most people live their lives through a clouded lens. Mirror Me provides the clarity needed to identify obstacles that are often
            hidden in plain sight. Through our iterative reflection framework, you'll develop a routine that turns self-awareness into an
            automatic habit.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Ready to meet your real self?" light>
          <p>
            Join thousands of others who have transformed their lives through the power of structured self-reflection.
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
