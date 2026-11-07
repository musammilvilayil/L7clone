import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailList, DetailSection, type DetailCard } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const HIGHLIGHTS: DetailCard[] = [
  { number: "01", title: "AI-First Approach", description: "Every solution built with AI at its core" },
  { number: "02", title: "Global Delivery", description: "Serving clients across 10+ countries" },
  { number: "03", title: "Enterprise-Grade", description: "Robust, secure, scalable architecture" },
  { number: "04", title: "Partnership-Driven", description: "Long-term relationships over transactions" },
  { number: "05", title: "SEO / AEO / GEO Readiness", description: "Full compliance with search & AI engine optimization" },
  { number: "06", title: "WCAG Accessibility", description: "Automated detection and remediation of a11y issues" },
  { number: "07", title: "Compliance Monitoring", description: "Real-time scans for legal, content, and data policies" },
  { number: "08", title: "AI-Powered Recommendations", description: "Smart fixes delivered with explanations and priority" },
  { number: "09", title: "Speed, Scale & Security", description: "Optimised processes delivering rapid results at enterprise scale, with robust security baked in." },
  { number: "10", title: "Proven CSAT", description: "9/10 client satisfaction score — consistent delivery and quality are non-negotiable." },
  { number: "11", title: "Continuous Improvement", description: "Improvement cycles built into every delivery; we evolve with your needs." },
  { number: "12", title: "Strong Tech Leadership", description: "Senior architects and engineers from Accenture, Infosys, Cognizant backgrounds." },
  { number: "13", title: "Future-Ready Team", description: "Deep expertise in AI, automation and next-gen digital platforms." },
  { number: "14", title: "AI-Driven Innovation", description: "First-principles AI thinking applied to every product and solution we build." },
  { number: "15", title: "Layered Quality Framework", description: "Multi-layer QA, WCAG compliance, automated testing — zero compromise." },
  { number: "16", title: "Partnership Models", description: "Flexible engagement: Technology, Innovation, Implementation, or Consulting partner." },
  { number: "17", title: "Technology Partner", description: "Co-develop digital products and platforms with our full-stack engineering team." },
  { number: "18", title: "Innovation Partner", description: "Co-create AI, R&D, and emerging tech solutions for your industry." },
  { number: "19", title: "Implementation Partner", description: "Deliver and manage end-to-end client deployments with precision." },
  { number: "20", title: "Consulting Partner", description: "Strategic guidance, roadmaps, and mobilization for digital transformation." },
  { number: "21", title: "Hiring Partner", description: "Access best-in-class talent in AEM, AI, Web, and niche technologies." },
];

/** Portfolio — what Ladder7 builds and why, then the standard enquiry CTA. */
export default function PortfolioPage() {
  return (
    <>
      <Seo page="portfolio" />
      <LandingHero
        eyebrow="Selected work"
        title="Work with purpose. Ideas in action"
        description="From AI-driven innovation to hyper-automation and experience-led transformation, we turn ambitious ideas into scalable digital experiences that move businesses forward."
        image={{ name: "photos/team-collaboration", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Explore" title="Blend deep technical expertise with a commitment to outcomes." light>
          <p>
            We empower organizations to scale intelligently through AI-driven innovation, hyper-automation, and experience-led digital
            transformation — enabling faster growth, greater efficiency, and exceptional user experiences across web, mobile, and enterprise
            platforms.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Our Vision">
          <p>
            To empower businesses through intelligent, accessible, and scalable digital ecosystems, blending technology, automation, and
            creativity to drive measurable impact.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Our Mission" light>
          <p>
            To become a trusted global innovation partner, transforming how organizations think, operate, and grow in the age of AI and
            automation.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="How We Build Intelligent Sites">
          <p>SEO, AEO, and GEO optimized platforms driven by AI for high conversions.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Real results delivered through intelligent solutions." light>
          <p>Explore how we help organizations scale intelligently and overcome complex operational bottlenecks using AI-driven innovation.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="The tools and platforms behind every build.">
          <DetailList items={["Technology Stack — the tools and platforms behind every build."]} />
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Have a project in mind? Let's talk." light>
          <p>Tell us a bit about what you're building and we'll get back to you shortly.</p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Let's build something intelligent together.">
          <p>
            We look forward to partnering with you to build an intelligent, high-performance website — optimized for SEO, AEO, and AI-driven
            conversions.
          </p>
        </DetailSection>
        <DetailSection eyebrow="The details" title="Selected work. Real challenges.">
          <DetailCards items={HIGHLIGHTS} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
