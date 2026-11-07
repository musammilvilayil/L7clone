import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const CARDS: DetailCard[] = [
  { number: "01", title: "Stress Management Techniques", description: "Interactive exercises to manage stress effectively and maintain a balanced mindset in high-pressure situations." },
  { number: "02", title: "Enhanced Decision-Making Skills", description: "Sharpen cognitive abilities for more informed and confident decisions through logical frameworks and bias awareness." },
  { number: "03", title: "Practical Mental Health Strategies", description: "Real-world tools and techniques for daily routines that support long-term well-being and emotional regulation." },
  { number: "04", title: "Holistic Mental Well-Being", description: "Combines stress reduction with cognitive enhancement for a fulfilling life aligned with your core values." },
];

/** Mind Gym — rebuilt from mindgym.html. */
export default function MindGymPage() {
  return (
    <>
      <Seo page="productMindGym" />
      <LandingHero
        eyebrow="Mind Gym"
        title="Train your mind. Move forward"
        description="Train your brain for success. MyndGym offers interactive exercises and assessments designed to enhance cognitive skills, focus, and analytical thinking."
        image={{ name: "photos/ai-network-brain", alt: "", caption: "Mind Gym" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="Your toolkit for a resilient mind" light>
          <p>
            Mind Gym provides tools and techniques to reduce stress, improve cognitive function, and make informed decisions, leading to a
            balanced and fulfilling life. We translate complex psychological principles into practical strategies for daily challenges.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Key Features">
          <p>Our program focuses on core pillars of mental strength designed by experts.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Empowering Growth through Holistic Development" light>
          <p>Bridging Science and Well-Being</p>
          <p>
            Unlock your potential by understanding your mental patterns, leading to greater clarity and success.
          </p>
          <p>
            Comprehensive skill development that prepares you for modern professional and personal environments.
          </p>
          <p>
            Our curriculum is meticulously aligned with the UNICEF Global Framework on Transferable Skills and the Ikigai philosophy, ensuring
            a balance between purpose, skill, and societal contribution.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Ready to transform your mental landscape?">
          <p>
            Join thousands of others in the Mind Gym program and start building a more resilient, focused, and happier you today.
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
