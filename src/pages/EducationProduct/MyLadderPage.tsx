import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const CARDS: DetailCard[] = [
  { number: "01", title: "Reflection", description: "Assess your current skills, strengths, and areas for improvement." },
  { number: "02", title: "Realization", description: "Identify your core passions and potential career paths." },
  { number: "03", title: "Visualization", description: "Define exactly what your ultimate career success looks like." },
  { number: "04", title: "Goal Setting", description: "Establish SMART objectives to turn dreams into concrete targets." },
  { number: "05", title: "Action Plan", description: "Design a detailed roadmap with specific tasks and deadlines." },
  { number: "06", title: "Tracking", description: "Monitor progress regularly and adjust your strategy as needed." },
  { number: "07", title: "Celebrate", description: "Acknowledge milestones and reward your hard-earned achievements." },
  { number: "08", title: "Personalized Goal Setting", description: "Tailored objectives that align with your unique aspirations and current capabilities." },
  { number: "09", title: "Structured Progression", description: "A logical sequence of milestones that ensures you never feel overwhelmed or lost." },
  { number: "10", title: "Skill Development Focus", description: "Curated resources and learning paths to bridge critical gaps in your professional profile." },
  { number: "11", title: "Global Standards", description: "Leveraging industry-leading growth principles for worldwide career impact." },
];

/** My Ladder — rebuilt from myladder.html. */
export default function MyLadderPage() {
  return (
    <>
      <Seo page="productMyLadder" />
      <LandingHero
        eyebrow="My Ladder"
        title="Your growth. One step at a time"
        description="Take control of your professional journey with MyLadder. A dedicated platform for structured career planning, skill tracking, and continuous personal growth."
        image={{ name: "photos/idea-lightbulb", alt: "", caption: "My Ladder" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="A Systematic Process for Unlimited Growth" light>
          <p>
            MyLadder isn't just another goal-tracking app. It's a comprehensive framework that bridges the gap between where you are today and
            where you want to be. We focus on the fundamental pillars of professional success: strategic planning, skill acquisition, and
            consistent measurement.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="The MyLadder 7-Step Journey">
          <p>An orchestrated evolution from self-reflection to absolute career mastery.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Wellbeing through Personal Growth" light>
          <p>
            We believe true success starts from within. MyLadder places a strong emphasis on self-awareness and mental balance, ensuring that
            as you climb, you remain grounded and fulfilled.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Upskilling for a Balanced Life">
          <p>
            Our comprehensive skill development programs don't just teach you technical skills; they empower you to manage your time and
            energy efficiently for a truly high-impact, balanced career.
          </p>
          <p>Ready to climb your ladder?</p>
        </DetailSection>
        <DetailSection eyebrow="The details" title="Explore what’s possible.">
          <DetailCards items={CARDS} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
