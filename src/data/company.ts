/** Why Ladder7, audiences, training and FAQs — copy from the design. */

export const REASONS = [
  { number: "01", title: "Start with the business.", description: "Understand your customers, workflows and priorities." },
  { number: "02", title: "Connect the right systems.", description: "Bring platforms, data and everyday work together." },
  { number: "03", title: "Put intelligence to work.", description: "Use practical AI where it helps people take the next action." },
  { number: "04", title: "Keep moving forward.", description: "Learn from real use and improve the next useful detail." },
];

export const AUDIENCES = [
  {
    label: "01 / Established brands",
    title: "Connect what\ncomes next.",
    description:
      "Bring digital platforms, AI, integrations and customer experiences together with the architectural clarity your next stage needs.",
    tags: ["Platform engineering", "Connected systems", "Market reach"],
  },
  {
    label: "02 / Startups & SMBs",
    title: "Turn ambition\ninto a foundation.",
    description:
      "Build a more capable digital presence, automate repetitive work and connect the tools that help your team move forward.",
    tags: ["Intelligent websites", "AI automation", "Custom applications"],
  },
];

export const TRAINING = {
  intro:
    "On-site in Kerala or delivered virtually. Ladder7 adapts each program to the tools your team uses, with hands-on guidance from working practitioners.",
  tracks: [
    { label: "01 / Engineering", title: "Build with confidence.", topics: ["Full stack · Mobile development", "Cloud & DevOps · WebOps"] },
    { label: "02 / Data & AI", title: "Turn knowledge into action.", topics: ["Data science · AI at work", "Analytics · Power BI, Excel & Tableau"] },
    { label: "03 / Business", title: "Connect the whole team.", topics: ["Digital content creation", "Marketing automation & CRM"] },
  ],
  enquiryMessage:
    "I'd like to discuss corporate training for our team. Our current stack, headcount and preferred timeline are:",
};

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "What can Ladder7 help us build?",
    answer:
      "Intelligent websites and web applications, AI assistants and automation, custom business software, connected platforms and the technology strategy behind them.",
  },
  {
    question: "Do you work with smaller businesses?",
    answer:
      "Ladder7 works with startups and growing SMBs as well as established organisations. Start with a conversation about your goals and current priorities.",
  },
  {
    question: "Where should we start with AI?",
    answer:
      "Start with a specific workflow or customer need. Explore where an assistant, chatbot, knowledge system or automated next action could make that work more useful.",
  },
];

/** Interest options of the two enquiry forms (as in the design). */
export const CONTACT_INTERESTS = ["Digital experience", "AI & automation", "Custom software", "Consulting"];
export const MENU_INTERESTS = ["Digital experience", "Applied AI", "Custom software", "Corporate training", "Other"];
