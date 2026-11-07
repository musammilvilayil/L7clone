import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { Button } from "../../components/ui/Button";

const CARDS: DetailCard[] = [
  { number: "01", title: "Reflection", description: "Look inward to understand your current state." },
  { number: "02", title: "Realisation", description: "Discover what you are truly capable of achieving." },
  { number: "03", title: "Goal Setting", description: "Define clear, ambitious, and achievable milestones." },
  { number: "04", title: "Visualisation", description: "See your future path clearly mapped out." },
  { number: "05", title: "Action Plan", description: "Get the step-by-step strategy to get there." },
  { number: "06", title: "Tracking & Improving", description: "Monitor your progress and adapt as you grow." },
  { number: "07", title: "Achieve & Celebrate", description: "Reach your goals and set your sights higher." },
  { number: "08", title: "Unicef's Framework", description: "Built upon globally accepted standards for youth development." },
  { number: "09", title: "AI-Powered Precision", description: "Engineered for highly accurate and relevant career matches." },
  { number: "10", title: "Personalised Guidance", description: "Deep psychometric alignment ensures recommendations fit your personality." },
  { number: "11", title: "Customised Learning", description: "Targeted educational steps to close your specific skill gaps." },
  { number: "12", title: "Holistic Discovery", description: "Beyond job suggestions to build a fulfilling life path." },
  { number: "13", title: "Future-Proofed", description: "Recommendations aligned with emerging global industry trends." },
  { number: "14", title: "Mentorship Network", description: "Direct access to real-world exposure and industry professionals." },
  { number: "15", title: "Happiness First", description: "Designed with your ultimate well-being as the core outcome." },
  { number: "16", title: "Self-Assessment", description: "Discover your true self. Uncover your core strengths, deep-rooted interests, and hidden potential through our scientifically backed assessment tools." },
  { number: "17", title: "AI Analysis", description: "Data-driven career mapping. Our advanced AI engine processes your unique profile, mapping it directly to future-ready educational and career pathways." },
  { number: "18", title: "Recommendations", description: "Your roadmap to success. Receive clear, highly accurate, and actionable career guidance that tells you exactly what steps to take next." },
];

/** AMIU — rebuilt from amiu.html. */
export default function AmiuPage() {
  return (
    <>
      <Seo page="productAmiu" />
      <LandingHero
        eyebrow="AMIU"
        title="Meet AMIU. Find your direction"
        description="Make the right career choices early. amiu is an AI mentor that aligns your skills, interests, and personality with future-ready educational and professional pathways."
        image={{ name: "photos/students-laptop-group", alt: "", caption: "AMIU" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="Your Growth Journey" light>
          <p>Seven steps to your best self.</p>
          <p>
            Right Choice. Right Now. Bridge the gap between your raw potential and future success with data-driven guidance.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Why Choose AMIU ?">
          <p>Built on science. Powered by AI. Focused on your happiness.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Choose the Right Path." light>
          <p>Early, confidently, and intelligently.</p>
        </DetailSection>
        <DetailSection eyebrow="The details" title="Explore what’s possible.">
          <DetailCards items={CARDS} />
        </DetailSection>
        <DetailSection eyebrow="Your AI career mentor" title="Start a conversation with AMIU.">
          <Button to="https://amiu.azurewebsites.net/">Open AMIU</Button>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
