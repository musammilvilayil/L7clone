import type { ServiceDetailContent } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";

// NOTE: unlike the other service-detail sources, services--product-solution.html has no
// `.inner-about-cards` grid and no `.inner-deliverables` section in its markup at all (verified
// against the raw export, not just the cleaned copy) — the page is built entirely from its
// `.inner-capability-cloud` tags plus 8 `.inner-editorial-row` entries. `aboutCards` and
// `deliverables` are intentionally empty below rather than inventing card content that isn't in
// the source; `deliverablesHeading` reuses the boilerplate heading seen verbatim on every other
// service page so the (now-empty) deliverables grid still renders a sensible heading.
export const PRODUCT_SOLUTION: ServiceDetailContent = {
  category: "Strategy & Consulting",
  lines: ["From a promising idea", "to a practical blueprint"],
  intro:
    "Transform abstract concepts into viable software products. Ladder7 provides strategic ideation, MVP definition, and rigorous technical solution blueprinting.",
  capabilityCloud: [
    "The Bridge Between Ambition and Execution",
    "Strategic Ideation & Discovery",
    "Solution Architecture",
    "Feasibility & Risk Assessment",
    "Experience Strategy (UX/UI)",
    "MVP & GTM Strategy",
    "The Value of Blueprinting with Ladder7",
  ],
  aboutHeading: "The Bridge Between Ambition and Execution",
  aboutIntro:
    "Product Ideation & Solution Blueprinting practice bridges the critical gap between business ambition and technical execution. Whether you are a high-growth SMB validating a disruptive new software concept, or a global enterprise mapping the modernization of complex legacy systems, we align your stakeholders around a unified roadmap.",
  aboutCards: [],
  editorialRows: [
    { title: "Strategic Ideation & Discovery", paragraphs: ["Uncover the right problem to solve."] },
    { title: "Solution Architecture", paragraphs: ["Design the foundation for limitless scale."] },
    { title: "Feasibility & Risk Assessment", paragraphs: ["Mitigate investment risk early."] },
    { title: "Experience Strategy (UX/UI)", paragraphs: ["Aligning user journeys with business outcomes."] },
    { title: "MVP & GTM Strategy", paragraphs: ["Accelerate your time-to-market."] },
    { title: "Ready to start?", paragraphs: ["Get a professional blueprint for your next breakthrough product."] },
    {
      title: "The Value of Blueprinting with Ladder7",
      paragraphs: [
        "Simplifying complex technical requirements into actionable steps.",
        "Identifying bottlenecks and failure points before coding begins.",
        "Cutting development waste with a precise build strategy.",
        "Ensuring business goals and tech capabilities are in perfect sync.",
      ],
    },
    {
      title: "Let’s Build the Future—One Blueprint at a Time.",
      paragraphs: ["Partner with Ladder7 to validate your next big idea and architect a product built for market dominance."],
    },
  ],
  deliverablesHeading: "Connected expertise.\nPractical possibilities",
  deliverables: [],
};
