import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const CARDS: DetailCard[] = [
  { number: "01", title: "Live daily sessions", description: "60-minute live workshops every day — taught by practitioners, not theorists. Recordings available immediately after." },
  { number: "02", title: "AI-first workflows", description: "Product research, copywriting, ad creative, and customer support — we automate the parts that kill momentum early on." },
  { number: "03", title: "Your store, built live", description: "You don't watch someone else build — you build. By the end of week 1, your store is live. By day 30, it's selling." },
  { number: "04", title: "Sourcing & supplier playbook", description: "Vetted supplier lists, negotiation scripts, and dropship-to-brand frameworks ready to use from day one." },
  { number: "05", title: "Paid ads crash course", description: "Meta and Google ads structured for beginners — spend ₹800 a day to validate before you scale a single rupee." },
  { number: "06", title: "Private cohort community", description: "A private group of peers at the same stage. Feedback, accountability, and partnerships that outlast the 30 days." },
  { number: "07", title: "First-time founders", description: "You have an idea — or you're still finding one — and need a structured path from concept to your first profitable store without months of trial and error." },
  { number: "08", title: "Side-hustle builders", description: "You have a day job and limited time. The bootcamp is designed to complete in 90 minutes a day — live sessions in the evening with async options when life intervenes." },
  { number: "09", title: "Existing business owners", description: "You already sell offline or on a marketplace and want to build a direct-to-consumer channel that isn't dependent on platform fees or algorithm changes." },
];

/** Bootcamp — rebuilt from bootcamp.html. */
export default function BootcampPage() {
  return (
    <>
      <Seo page="bootcamp" />
      <LandingHero
        eyebrow="Your next step"
        title="Bring your ambition. Build your skills"
        description="A 30-day hands-on bootcamp where you build, launch, and scale an AI-powered e-commerce business — from zero to your first sale."
        image={{ name: "photos/team-collaboration", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="Everything you need. Nothing you don't." light>
          <p>Every resource, tool, and session is chosen to get you to a live, profitable store — not to pad a curriculum.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Not a certificate. A running business.">
          <p>
            “I started with a product idea and no tech background. By day 30 I had ₹1,20,000 in sales and a store I was genuinely proud of. The AI
            tools changed everything.”
          </p>
          <p>— Bootcamp alumni, Sydney cohort</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Built for builders. Not browsers." light>
          <p>If you're willing to show up daily and do the work, this programme is for you.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Pick your path.">
          <p>One-time payment. Lifetime access to recordings and the alumni community.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="30 days from now, your store is live." light>
          <p>The only question is whether you're in the next cohort or watching someone else build theirs.</p>
          <p>Seats are capped at 40 per cohort. Early enrolment includes access to the pre-bootcamp prep module.</p>
        </DetailSection>
        <DetailSection eyebrow="The details" title="Explore what’s possible.">
          <DetailCards items={CARDS} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
