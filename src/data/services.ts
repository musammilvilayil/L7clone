/**
 * Capabilities and solution detail — copy taken verbatim from the design.
 * Shared by the home page (rows + tabbed board) and the services page
 * (one detailed section per capability).
 */

export type SolutionId = "web" | "ai" | "software";

export interface Solution {
  id: SolutionId;
  tabLabel: string;
  kicker: string;
  /** "\n" marks a line break that only applies on wide screens. */
  title: string;
  description: string;
  features: string[];
  flow: [string, string, string];
  flowLabels: [string, string, string];
  /** Matching option in the contact form's "I'm interested in" group. */
  interest: string;
}

export const SOLUTIONS: Record<SolutionId, Solution> = {
  web: {
    id: "web",
    tabLabel: "Digital experience",
    kicker: "More than an online presence",
    title: "Give every visit\na clear next step.",
    description:
      "Bring your website, content, lead capture and CRM into a more connected experience for your customers and your team.",
    features: [
      "Website and landing-page engineering",
      "Composable platforms and headless CMS",
      "CRM, analytics and API integration",
    ],
    flow: ["A visitor arrives", "A useful digital experience", "A qualified enquiry"],
    flowLabels: ["Discover", "Connect", "Move forward"],
    interest: "Digital experience",
  },
  ai: {
    id: "ai",
    tabLabel: "AI & automation",
    kicker: "Intelligence that supports action",
    title: "Make everyday work\nmore intelligent.",
    description:
      "Connect AI assistants, knowledge systems and agentic workflows to the tasks your customers and teams need to move forward.",
    features: [
      "AI assistants and customer-facing chatbots",
      "RAG and knowledge-connected systems",
      "Agentic workflows and process automation",
    ],
    flow: ["A question or request", "An AI-connected workflow", "A useful next action"],
    flowLabels: ["Understand", "Assist", "Act"],
    interest: "AI & automation",
  },
  software: {
    id: "software",
    tabLabel: "Custom software",
    kicker: "Built around the way you work",
    title: "A better fit for\nyour business.",
    description:
      "Create applications and integrations around your actual processes, from a focused business tool to a connected digital product.",
    features: [
      "Custom web and business applications",
      "Billing tools and workflow software",
      "Product development and API integration",
    ],
    flow: ["A business need", "A purpose-built application", "A connected workflow"],
    flowLabels: ["Define", "Engineer", "Connect"],
    interest: "Custom software",
  },
};

export const SOLUTION_ORDER: SolutionId[] = ["web", "ai", "software"];

export interface Capability {
  /** Anchor id on the services page. */
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  /** Linked solution, if the design pairs one with this capability. */
  solution?: SolutionId;
  /** Interest option pre-selected when enquiring about this capability. */
  interest: string;
}

/**
 * Technology strategy has no tab in the design's solutions board; its detail
 * on the services page reuses the design's approach copy.
 */
export const STRATEGY_DETAIL = {
  kicker: "From ambition to action",
  title: "Start with\nthe outcome.",
  description: "Technology decisions become clearer when the business goal comes first.",
  features: ["Product ideation", "Architecture", "Research & development", "Solution design"],
};

export const CAPABILITIES: Capability[] = [
  {
    id: "digital-experience",
    number: "01",
    title: "Digital experience",
    subtitle: "Websites, platforms & connections",
    tags: ["Intelligent websites", "Headless CMS", "Web applications", "CRM integration"],
    solution: "web",
    interest: "Digital experience",
  },
  {
    id: "applied-ai",
    number: "02",
    title: "Applied AI",
    subtitle: "Intelligence that moves work forward",
    tags: ["AI assistants", "Chatbots", "Agentic workflows", "RAG systems"],
    solution: "ai",
    interest: "AI & automation",
  },
  {
    id: "technology-strategy",
    number: "03",
    title: "Technology strategy",
    subtitle: "A clearer route from idea to delivery",
    tags: ["Product ideation", "Architecture", "Research & development", "Solution design"],
    interest: "Consulting",
  },
  {
    id: "custom-development",
    number: "04",
    title: "Custom development",
    subtitle: "Software shaped around your business",
    tags: ["Custom applications", "Business software", "Product development", "API integrations"],
    solution: "software",
    interest: "Custom software",
  },
];
