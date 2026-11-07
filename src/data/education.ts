/**
 * Content for the Education division (`/education`) — copy taken verbatim
 * from the supplied `education.html` design, kept separate from the IT
 * division's data (`services.ts`, `process.ts`, `company.ts`) because the
 * two divisions' copy, products and journeys are genuinely different things,
 * not variations of the same list.
 */
import type { Capability } from "./services";
import { LEGACY_LINKS } from "./site";
import type { ImageName } from "./images.generated";

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const EDUCATION_HERO = {
  eyebrow: "Education, built around you",
  words: ["Learn.", "Build.", "Grow"] as [string, string, string],
  description:
    "Find your direction. Build real-world skills. Create a career\nthat moves you forward, with well-being at its heart.",
  actions: [
    { to: "#contact", label: "Talk to an advisor" },
    { to: "#products", label: "Explore programs", variant: "outline" as const },
  ],
  /** Counts up from 0 on mount (design behaviour), unlike the IT hero's word stats. */
  stats: [
    { label: "Growth products", value: 4 },
    { label: "Framework phases", value: 4 },
    { label: "Learning pathways", value: 5 },
  ],
  scrollTo: "#products",
  tagline: "Career-focused learning.\nDesigned for your next step.",
};

/* ── Four growth products (design: .product-row, reuses CapabilityList) ── */

export const EDUCATION_PRODUCTS: Capability[] = [
  {
    id: "my-ladder",
    number: "01",
    title: "My Ladder",
    subtitle: "Your goals. Your way forward.",
    tags: ["Personalized goals", "Step-by-step guidance", "Skill alignment", "Progress planning"],
    interest: "My Ladder",
  },
  {
    id: "mind-gym",
    number: "02",
    title: "Mind Gym",
    subtitle: "A stronger mind for what's next",
    tags: ["Mental conditioning", "Stress management", "Decision making", "Resilience"],
    interest: "Personal growth",
  },
  {
    id: "mirror-me",
    number: "03",
    title: "Mirror Me",
    subtitle: "Get to know your potential",
    tags: ["Self-reflection", "Strengths & talents", "IQ & EQ", "Career clarity"],
    interest: "Personal growth",
  },
  {
    id: "fill-dots",
    number: "04",
    title: "Fill Dots",
    subtitle: "Connect you to your next career",
    tags: ["Upskilling", "Bridge skill gaps", "Career readiness", "Personal growth"],
    interest: "Personal growth",
  },
];

/** External product destinations (the products live on the main ladder7.in site). */
export const EDUCATION_PRODUCT_LINKS: Record<string, string> = {
  "my-ladder": LEGACY_LINKS.myLadder,
  "mind-gym": LEGACY_LINKS.mindGym,
  "mirror-me": LEGACY_LINKS.mirrorMe,
  "fill-dots": LEGACY_LINKS.fillDots,
};

/* ── AMIU — AI career mentor ──────────────────────────────────────────── */

export const AMIU = {
  eyebrow: "Meet AMIU · Your AI career mentor",
  title: "Know yourself.\nSee your possibilities",
  description:
    "For students and young professionals finding their direction. AMIU combines self-assessment with AI-assisted career mapping to help connect your strengths and interests to a personal learning pathway.",
  cta: { label: "Explore AMIU", href: LEGACY_LINKS.amiu },
  mapLabel: "A path that starts with you",
  mapCaption: "Self-discovery. With direction.",
  steps: [
    { number: "01", title: "Discover your strengths.", description: "Reflect on your interests, abilities and goals." },
    { number: "02", title: "Explore your direction.", description: "Connect your profile to possible career pathways." },
    { number: "03", title: "Plan your next step.", description: "Build a clearer personal learning roadmap." },
  ],
};

/* ── Programs (training & internships) ───────────────────────────────── */

export type ProgramType = "internship" | "workshop";

export interface Program {
  id: string;
  name: string;
  type: ProgramType;
  duration: string;
  format: string;
  image: ImageName;
  imageAlt: string;
  /** "\n" marks the one design line break in the overlay art caption. */
  art: string;
  label: string;
  description: string;
  skills: string[];
}

export const PROGRAMS: Program[] = [
  {
    id: "mern",
    name: "Full Stack Development (MERN)",
    type: "internship",
    duration: "1 or 3 months",
    format: "Live + hands-on projects",
    image: "photos/workspace-laptop",
    imageAlt: "A laptop showing code beside a stack of notebooks on a desk",
    art: "Build the\nwhole picture.",
    label: "MongoDB / Express / React / Node.js",
    description:
      "Learn to build complete web applications using MongoDB, Express, React and Node.js. Explore frontend and backend development, REST APIs, databases and deployment through real projects for your portfolio.",
    skills: [
      "Frontend development with React",
      "Backend development with Express and Node.js",
      "MongoDB databases and REST APIs",
      "Application deployment and portfolio projects",
    ],
  },
  {
    id: "ai",
    name: "AI Development / Python Full Stack",
    type: "internship",
    duration: "1 or 3 months",
    format: "Live + hands-on projects",
    image: "photos/ai-processor",
    imageAlt: "A close-up of a circuit board labelled AI",
    art: "Make your\nideas intelligent.",
    label: "Python / Full stack / Applied AI",
    description:
      "A practical program combining Python programming, web development and applied AI/ML concepts. Work with real datasets and build AI-powered applications alongside a Python-based full stack.",
    skills: [
      "Python programming fundamentals",
      "Python-based full stack development",
      "Applied AI and machine learning concepts",
      "Working with real datasets",
    ],
  },
  {
    id: "testing",
    name: "Software Testing",
    type: "internship",
    duration: "1 or 3 months",
    format: "Live + practical labs",
    image: "photos/code-editor",
    imageAlt: "Computer setup for software development",
    art: "An eye for\nwhat works.",
    label: "Quality assurance / Manual & automation",
    description:
      "Build a foundation for a career in quality assurance. Explore manual and automation testing fundamentals, test case design, bug tracking and tools such as Selenium.",
    skills: [
      "Manual and automation testing fundamentals",
      "Test case design",
      "Bug tracking and reporting",
      "Introduction to Selenium",
    ],
  },
  {
    id: "shopify",
    name: "E-commerce Workshop — Shopify",
    type: "workshop",
    duration: "5 days",
    format: "Intensive workshop",
    image: "photos/online-checkout",
    imageAlt: "Digital commerce and online payments",
    art: "From an idea\nto a storefront.",
    label: "Shopify / E-commerce / Store setup",
    description:
      "A focused five-day workshop on setting up and managing an online store using Shopify. Learn the steps from store creation to product listings and payment integration.",
    skills: [
      "Shopify store setup",
      "Product listings and store management",
      "Payment integration",
      "Basic storefront customization",
    ],
  },
  {
    id: "career",
    name: "Career Goal Finding Program",
    type: "workshop",
    duration: "1 hour",
    format: "One-on-one session",
    image: "photos/mentorship-interview",
    imageAlt: "A career guidance conversation",
    art: "Find your\nown direction.",
    label: "Self-discovery / Strengths / Career goals",
    description:
      "A short, focused session to help students and early professionals understand their strengths and interests, and identify a suitable career direction in technology.",
    skills: [
      "Explore your strengths and interests",
      "Discuss possible career directions",
      "Identify a direction in technology",
      "Consider your next learning step",
    ],
  },
];

export const PROGRAM_FILTERS: { label: string; type: ProgramType | "all" }[] = [
  { label: "All programs", type: "all" },
  { label: "Internships", type: "internship" },
  { label: "Workshops & guidance", type: "workshop" },
];

export const PROGRAMS_CTA = { label: "Explore training & internships", href: LEGACY_LINKS.itTrainingInternship };

/* ── Approach: four-phase journey + reading copy ─────────────────────── */

export const EDUCATION_JOURNEY_PHASES = [
  { number: "01", title: "Discover", description: "Reflect on your experiences. Recognize your strengths and where you are today." },
  { number: "02", title: "Define", description: "Set meaningful goals and visualize the direction you want to take." },
  { number: "03", title: "Develop", description: "Make an action plan. Put your skills into practice and track your progress." },
  { number: "04", title: "Grow", description: "Improve as you go. Celebrate your milestones and take the next step." },
];

export const EDUCATION_PROGRESS_PHRASES = [
  "Self-discovery",
  "Career clarity",
  "Stronger habits",
  "Practical skills",
  "Real-world projects",
  "A clear action plan",
  "Your next step",
];

/* ── Possibilities wall ───────────────────────────────────────────────── */

export const EDUCATION_WALL = {
  eyebrow: "The possibilities",
  title: "Different paths.\nYour next step.",
  text: "From hands-on technology programs to personal growth. Find the direction that works for you.",
  buttonLabel: "Explore all programs",
  buttonTo: "/education#programs",
  columns: [
    ["photos/workspace-laptop", "photos/ai-processor", "photos/mentorship-interview"],
    ["photos/mountain-climb", "photos/online-checkout", "photos/team-workshop"],
    ["photos/mindful-reflection", "photos/code-editor", "photos/self-reflection-mirror"],
  ] as ImageName[][],
};

/* ── Learner story (testimonial) ──────────────────────────────────────── */

export const TESTIMONIAL = {
  quote:
    "The MERN Stack internship was highly practical and project-driven. I built full-stack applications using MongoDB, Express, React, and Node.js, which helped me understand how modern web applications are developed and deployed.",
  name: "Rahul R",
  role: "Intern, Ladder7 Next Step Solutions",
  avatarInitial: "R",
};

/* ── Contact section + overlay menu copy ─────────────────────────────── */

export const EDUCATION_CONTACT = {
  eyebrow: "Take your next step",
  title: ["Let's build", "your future"] as [string, string],
  lead: "You don't need to have it all figured out.\nA conversation is a good place to start.",
  availabilityText: "Let's find your direction",
  interests: ["Internships", "Career guidance", "My Ladder", "Personal growth"],
  labels: { name: "Your name", email: "Email", message: "Tell us a little about your goals" },
  placeholders: { name: "Alex Thomas", email: "alex@example.com", message: "Where are you now, and where would you like to go?" },
  formHeading: "Tell us about your next step.",
  formIntro: "A few details will help our advisors guide you.",
};

