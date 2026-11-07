/** The Services hub's catalogue (design: .service-catalogue) — copy verbatim from services.html. */

export interface ServiceRow {
  number: string;
  title: string;
  description: string;
  tags: string[];
  to: string;
}

export interface ServiceGroup {
  id: string;
  number: string;
  title: string;
  intro: string;
  rows: ServiceRow[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "digital-experience",
    number: "01",
    title: "Digital experience",
    intro: "Experiences built around people. Engineering built for scale.",
    rows: [
      {
        number: "1.1",
        title: "Adobe Experience Manager (AEM)",
        description: "Enterprise content management for large-scale, multichannel delivery.",
        tags: ["Content", "Scale", "Delivery"],
        to: "/services/aem-digital-experience",
      },
      {
        number: "1.2",
        title: "Analytics & experimentation",
        description: "Behavioural insight and A/B testing to improve engagement.",
        tags: ["Insight", "Test", "Optimise"],
        to: "/services/analytics-experimentation",
      },
      {
        number: "1.3",
        title: "Headless CMS",
        description: "Decoupled content systems for flexible, fast digital experiences.",
        tags: ["Content", "APIs", "Channels"],
        to: "/services/headless-cms",
      },
      {
        number: "1.4",
        title: "Web development",
        description: "Scalable applications built with React, Next.js and modern stacks.",
        tags: ["React", "Next.js", "Engineering"],
        to: "/services/web-experience",
      },
      {
        number: "1.5",
        title: "UI/UX, accessibility & QA",
        description: "Design, localisation and testing for inclusive, reliable experiences.",
        tags: ["Design", "Accessibility", "Quality"],
        to: "/services/localization-uiux",
      },
    ],
  },
  {
    id: "ai-automation",
    number: "02",
    title: "AI & automation",
    intro: "Practical intelligence that connects your business and moves work forward.",
    rows: [
      {
        number: "2.1",
        title: "AI assistants & chatbots",
        description: "LLM-powered support and internal knowledge assistants.",
        tags: ["Assist", "Support", "Knowledge"],
        to: "/services/ai-assistant",
      },
      {
        number: "2.2",
        title: "Agentic AI & multi-agent systems",
        description: "Specialised agents collaborating on complex business tasks.",
        tags: ["Agents", "Orchestration", "Workflows"],
        to: "/services/agenticai",
      },
      {
        number: "2.3",
        title: "Intelligent, predictive websites",
        description: "Experiences that adapt content to visitor intent.",
        tags: ["Intent", "Content", "Experience"],
        to: "/services/intelligent-websites",
      },
      {
        number: "2.4",
        title: "AI products & research POCs",
        description: "Prototype AI-first features and test product concepts.",
        tags: ["Research", "Prototype", "Validate"],
        to: "/services/aiproduct",
      },
      {
        number: "2.5",
        title: "Hyper automation: AI + RPA",
        description: "Combine process automation with cognitive AI capabilities.",
        tags: ["Processes", "RPA", "AI"],
        to: "/services/hyperautomation",
      },
    ],
  },
  {
    id: "strategy-consulting",
    number: "03",
    title: "Strategy & consulting",
    intro: "Clearer decisions. Stronger foundations. The right next step.",
    rows: [
      {
        number: "3.1",
        title: "Technology & platform consulting",
        description: "Independent guidance on technology stacks and cloud platforms.",
        tags: ["Platforms", "Architecture", "Advice"],
        to: "/services/technology",
      },
      {
        number: "3.2",
        title: "Skilled resource augmentation",
        description: "Specialist engineers and designers embedded with your team.",
        tags: ["People", "Skills", "Delivery"],
        to: "/services/skilled-resource",
      },
      {
        number: "3.3",
        title: "Get-to-Green project recovery",
        description: "Audit and restructure software projects that need recovery.",
        tags: ["Audit", "Restructure", "Recover"],
        to: "/services/green-recovery",
      },
      {
        number: "3.4",
        title: "Product ideation & blueprinting",
        description: "Translate an idea into architecture and a development roadmap.",
        tags: ["Ideation", "Blueprint", "Roadmap"],
        to: "/services/product-solution",
      },
    ],
  },
];

export const SERVICE_FAQS = [
  {
    question: "What can Ladder7 help us build?",
    answer:
      "Our services cover digital experience and web engineering, AI and intelligent automation, and strategy and technology consulting. Explore each service to see its capabilities.",
  },
  {
    question: "How can AI support our business?",
    answer:
      "Ladder7 works with AI assistants, multi-agent systems, intelligent websites, AI product development and hyperautomation. The starting point is your business workflow and the outcome you want to achieve.",
  },
  {
    question: "Can you help with our existing technology?",
    answer:
      "Our services include AEM implementation and cloud migration, platform consulting, project recovery and skilled resource augmentation. Tell us about your current systems and the challenge you need to solve.",
  },
  {
    question: "Where do we start?",
    answer:
      "Share your business goal, your current situation and the next step you have in mind. Use the enquiry form below, email info@ladder7.in or call +91 8137979401.",
  },
];
