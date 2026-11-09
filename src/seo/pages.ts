/**
 * Page-level SEO — the only place titles and descriptions are written.
 *
 * Consumed by <Seo> (runtime), scripts/prerender.mjs (static <head>), the
 * sitemap and JSON-LD. The prerender step fails the build if a route in
 * src/routes.ts has no entry here.
 */
import type { PageKey } from "../routes";
import { ROUTES } from "../routes";
import { websitePageSeo } from "../data/websiteSeo";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  /** Visible H1 name used in breadcrumbs and WebPage.name. */
  name: string;
  /** Social card, relative to the site root. */
  image: string;
  imageAlt: string;
  indexable: boolean;
  /** Last meaningful content change (ISO date) — sitemap lastmod. */
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  /** Breadcrumb trail below Home; empty for the home page. */
  breadcrumb: { name: string; path: string }[];
  canonicalUrl?: string;
  openGraphType?: string;
  openGraphLocale?: string;
  twitterCard?: string;
}

const DEFAULT_IMAGE = "/og/ladder7-og.jpg";
const DEFAULT_IMAGE_ALT = "Ladder7 — Build. Connect. Grow. Websites, applied AI and custom software.";
const RELEASE_DATE = "2026-11-05";

function proposedPageSeo(pageKey: PageKey): PageSeo {
  const route = ROUTES.find((item) => item.page === pageKey);
  const seo = websitePageSeo(pageKey);
  if (!route || !seo) throw new Error(`Missing JSON SEO content for proposed route: ${pageKey}`);

  return {
    path: route.path,
    title: seo.title,
    description: seo.description,
    name: seo.h1,
    image: seo.og_image ? new URL(seo.og_image).pathname : DEFAULT_IMAGE,
    imageAlt: seo.og_image_alt || DEFAULT_IMAGE_ALT,
    indexable: !seo.robots?.toLowerCase().includes("noindex"),
    lastModified: "2026-11-09",
    changeFrequency: "monthly",
    priority: 0.7,
    breadcrumb: seo.breadcrumb ?? [],
    canonicalUrl: seo.canonical_url,
    openGraphType: seo.og_type,
    openGraphLocale: seo.og_locale,
    twitterCard: seo.twitter_card,
  };
}

export const PAGE_SEO: Record<PageKey, PageSeo> = {
  home: {
    path: "/",
    title: "Ladder7 IT — Build. Connect. Grow. | Web, AI & Custom Software",
    description:
      "Ladder7 IT connects intelligent websites, applied AI, custom software and technology strategy around your next business goal. Teams in Cochin and Trivandrum.",
    name: "Build. Connect. Grow.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "weekly",
    priority: 1,
    breadcrumb: [],
  },
  services: {
    path: "/services",
    title: "IT Services: Websites, Applied AI & Custom Software | Ladder7",
    description:
      "Digital experience, applied AI, technology strategy and custom software from Ladder7 — connected around your next business goal, from discovery to launch.",
    name: "Four capabilities. One connected partner.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    breadcrumb: [{ name: "Services", path: "/services" }],
  },
  about: {
    path: "/about",
    title: "About Ladder7 NextStep Solutions | Cochin & Trivandrum",
    description:
      "Ladder7 NextStep Solutions builds intelligent websites, applied AI and custom software around business goals, for established brands and startups in Kerala.",
    name: "Clear purpose. Deep expertise. Real progress.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    breadcrumb: [{ name: "About", path: "/about" }],
  },
  contact: {
    path: "/contact",
    title: "Contact Ladder7 | Start Your Next Technology Project",
    description:
      "Talk to Ladder7 about a website, AI assistant, custom application or technology strategy. Email info@ladder7.in, call +91 8137979401 or send an enquiry.",
    name: "Let's talk about what's next.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "yearly",
    priority: 0.7,
    breadcrumb: [{ name: "Contact", path: "/contact" }],
  },
  education: {
    path: "/education",
    title: "Ladder7 Education | Learn. Build. Grow.",
    description:
      "Discover your next step with Ladder7 Education. Career-focused learning, practical internships and a framework for personal growth, from Cochin and Trivandrum.",
    name: "Learn. Build. Grow.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    breadcrumb: [{ name: "Education", path: "/education" }],
  },
  faq: {
    path: "/faq",
    title: "Good Questions. Clear Answers. | Ladder7 FAQ",
    description:
      "Find answers to common questions about Ladder7's digital engineering services, applied AI solutions, and skilling and virtual internship programs.",
    name: "Good questions.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [{ name: "FAQ", path: "/faq" }],
  },
  careers: {
    path: "/careers",
    title: "Careers at Ladder7 | Good People. Meaningful Work.",
    description:
      "Build intelligent ecosystems and next-generation digital platforms for Fortune 100 enterprises and high-growth innovators. Join the Ladder7 talent network.",
    name: "Good people. Meaningful work.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [{ name: "Careers", path: "/careers" }],
  },
  portfolio: {
    path: "/portfolio",
    title: "Ladder7 Portfolio | Work With Purpose. Ideas In Action.",
    description:
      "From AI-driven innovation to hyper-automation and experience-led transformation, we turn ambitious ideas into scalable digital experiences that move businesses forward.",
    name: "Work with purpose. Ideas in action.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [{ name: "Portfolio", path: "/portfolio" }],
  },
  products: {
    path: "/products",
    title: "Ladder7 Products | AI Tools for Your Next Chapter",
    description:
      "Site 360, L7 Nexus, Outreach Engine, L7 Insights and Infinite Insights — five AI products from Ladder7 NextStep Solutions, built around real business needs.",
    name: "Tools for your next chapter.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    breadcrumb: [{ name: "Products", path: "/products" }],
  },
  productSite360: {
    path: "/products/site-360",
    title: "Site 360 | Website Intelligence Platform | Ladder7",
    description:
      "Audit your website across twelve lenses — performance, accessibility, SEO, AEO, GEO, AI readiness and security — into one Digital Health score.",
    name: "One website audit across twelve lenses.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "Site 360", path: "/products/site-360" },
    ],
  },
  productL7Nexus: {
    path: "/products/l7-nexus",
    title: "L7 Nexus | An AI Executive Team | Ladder7",
    description:
      "L7 Nexus is a leased AI executive team for businesses of any size. It builds a permanent company brain and puts named executives and specialists to work on it.",
    name: "An AI executive team for your business.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "L7 Nexus", path: "/products/l7-nexus" },
    ],
  },
  productOutreachEngine: {
    path: "/products/outreach-engine",
    title: "Outreach Engine | B2B Email Outreach | Ladder7",
    description:
      "Outreach Engine is a B2B email outreach platform. It researches each prospect and writes a single email for that person, rather than filling a template.",
    name: "B2B email written one at a time.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "Outreach Engine", path: "/products/outreach-engine" },
    ],
  },
  productL7Insights: {
    path: "/products/l7-insights",
    title: "L7 Insights | Dashboards From Data You Already Have | Ladder7",
    description:
      "Connect Google Sheets, BigQuery, Snowflake, Zoho, SharePoint, SAP or a CSV, and each source becomes a table you can chart in one dashboard.",
    name: "One view across the systems you already use.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "L7 Insights", path: "/products/l7-insights" },
    ],
  },
  productInfiniteInsights: {
    path: "/products/infinite-insights",
    title: "Infinite Insights | Marketing Analytics Platform | Ladder7",
    description:
      "Infinite Insights is an AI-powered marketing analytics platform that unifies Meta, Google Ads, LinkedIn and GA4 into a single dashboard.",
    name: "Every ad channel in one marketing analytics view.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "Infinite Insights", path: "/products/infinite-insights" },
    ],
  },
  productMyLadder: {
    path: "/myladder",
    title: "My Ladder | Career Planning & Growth | Ladder7",
    description:
      "Take control of your professional journey with MyLadder. A dedicated platform for structured career planning, skill tracking, and continuous personal growth.",
    name: "Your growth. One step at a time.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "My Ladder", path: "/myladder" },
    ],
  },
  productMindGym: {
    path: "/mindgym",
    title: "Mind Gym | Train Your Mind, Build Focus | Ladder7",
    description:
      "Train your brain for success. MyndGym offers interactive exercises and assessments designed to enhance cognitive skills, focus, and analytical thinking.",
    name: "Train your mind. Move forward.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "Mind Gym", path: "/mindgym" },
    ],
  },
  productMirrorMe: {
    path: "/mirrorme",
    title: "Mirror Me | Psychometric Self-Assessment | Ladder7",
    description:
      "Discover your true potential. Mirror Me provides deep psychometric and behavioral assessments to help youth and professionals align with the right career opportunities.",
    name: "Know yourself. Grow with clarity.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "Mirror Me", path: "/mirrorme" },
    ],
  },
  productFillDots: {
    path: "/filldots",
    title: "Fill Dots | Bridge Your Career Skill Gaps | Ladder7",
    description:
      "Connect the dots between where you are and where you want to be. Fill Dots provides customized learning pathways to bridge educational and professional skill gaps.",
    name: "Connect the dots. Shape your career.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "Fill Dots", path: "/filldots" },
    ],
  },
  productAmiu: {
    path: "/amiu",
    title: "AMIU | AI Career Mentor | Ladder7",
    description:
      "Make the right career choices early. AMIU is an AI mentor that aligns your skills, interests, and personality with future-ready educational and professional pathways.",
    name: "Meet AMIU. Find your direction.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Products", path: "/products" },
      { name: "AMIU", path: "/amiu" },
    ],
  },
  serviceAemDigitalExperience: {
    path: "/services/aem-digital-experience",
    title: "Adobe AEM Digital Experience Services | Ladder7",
    description:
      "Enterprise Adobe Experience Manager implementation, cloud migration and headless architecture. AEM infrastructures engineered for multinational enterprises.",
    name: "Enterprise experiences. Built to scale.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Adobe AEM Digital Experience", path: "/services/aem-digital-experience" },
    ],
  },
  serviceAnalyticsExperimentation: {
    path: "/services/analytics-experimentation",
    title: "Analytics & Experimentation Services | Ladder7",
    description: "Behavioural insight and A/B testing to improve engagement. Measure what matters and experiment with purpose.",
    name: "Turn insight into better experiences.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Analytics & Experimentation", path: "/services/analytics-experimentation" },
    ],
  },
  serviceHeadlessCms: {
    path: "/services/headless-cms",
    title: "Headless CMS Services | Ladder7",
    description:
      "Empower your digital ecosystem with an API-first headless CMS that unifies content, accelerates delivery and scales across every channel.",
    name: "Create content once. Deliver it everywhere.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Headless CMS", path: "/services/headless-cms" },
    ],
  },
  serviceWebExperience: {
    path: "/services/web-experience",
    title: "Web Development Services | Ladder7",
    description:
      "Scalable applications built with React, Next.js and modern stacks. Custom, scalable web solutions tailored to your business goals.",
    name: "We engineer websites for your next chapter.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Web Development", path: "/services/web-experience" },
    ],
  },
  serviceLocalizationUiux: {
    path: "/services/localization-uiux",
    title: "UI/UX, Accessibility & QA Services | Ladder7",
    description:
      "Design, localisation and testing for inclusive, reliable experiences. Human-centred design combined with engineering precision.",
    name: "Digital experiences. Built around people.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "UI/UX, Accessibility & QA", path: "/services/localization-uiux" },
    ],
  },
  serviceAiAssistant: {
    path: "/services/ai-assistant",
    title: "AI Assistants & Chatbots Services | Ladder7",
    description:
      "LLM-powered support and internal knowledge assistants. Next-gen AI assistants that move beyond rule-based bots to human-like reasoning.",
    name: "Better conversations. Intelligence at work.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "AI Assistants & Chatbots", path: "/services/ai-assistant" },
    ],
  },
  serviceAgenticAi: {
    path: "/services/agenticai",
    title: "Agentic AI & Multi-Agent Systems | Ladder7",
    description:
      "Specialised agents collaborating on complex business tasks. Dynamic, multi-agent systems that reason, collaborate and execute workflows.",
    name: "Connected agents. Smarter ways to work.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Agentic AI & Multi-Agent Systems", path: "/services/agenticai" },
    ],
  },
  serviceIntelligentWebsites: {
    path: "/services/intelligent-websites",
    title: "Intelligent, Predictive Websites | Ladder7",
    description: "Experiences that adapt content to visitor intent. AI-driven, context-aware web experiences that anticipate user intent.",
    name: "Websites that think, learn and adapt.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Intelligent, Predictive Websites", path: "/services/intelligent-websites" },
    ],
  },
  serviceAiProduct: {
    path: "/services/aiproduct",
    title: "AI Products & Research POCs | Ladder7",
    description: "Prototype AI-first features and test product concepts. Validating and deploying custom AI solutions from idea to ROI.",
    name: "Turn your AI vision into a working product.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "AI Products & Research POCs", path: "/services/aiproduct" },
    ],
  },
  serviceHyperautomation: {
    path: "/services/hyperautomation",
    title: "Hyper Automation: AI + RPA | Ladder7",
    description: "Combine process automation with cognitive AI capabilities to build autonomous ecosystems at any scale.",
    name: "Connect your workflows. Move work forward.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Hyper Automation: AI + RPA", path: "/services/hyperautomation" },
    ],
  },
  serviceTechnology: {
    path: "/services/technology",
    title: "Technology & Platform Consulting | Ladder7",
    description:
      "Independent guidance on technology stacks and cloud platforms. Vendor-neutral architecture consulting and legacy modernization.",
    name: "Clear technology choices. A stronger foundation.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Technology & Platform Consulting", path: "/services/technology" },
    ],
  },
  serviceSkilledResource: {
    path: "/services/skilled-resource",
    title: "Skilled Resource Augmentation | Ladder7",
    description: "Specialist engineers and designers embedded with your team. Pre-vetted engineering talent for cloud, AI and digital experience.",
    name: "The right expertise. Part of your team.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Skilled Resource Augmentation", path: "/services/skilled-resource" },
    ],
  },
  serviceGreenRecovery: {
    path: "/services/green-recovery",
    title: "Get-to-Green Project Recovery | Ladder7",
    description: "Audit and restructure software projects that need recovery. Stabilize delivery and restore program velocity.",
    name: "Bring your project back on track.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Get-to-Green Project Recovery", path: "/services/green-recovery" },
    ],
  },
  serviceProductSolution: {
    path: "/services/product-solution",
    title: "Product Ideation & Blueprinting | Ladder7",
    description: "Translate an idea into architecture and a development roadmap. Strategic ideation, MVP definition and solution blueprinting.",
    name: "From a promising idea to a practical blueprint.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Services", path: "/services" },
      { name: "Product Ideation & Blueprinting", path: "/services/product-solution" },
    ],
  },
  corporateTraining: {
    path: "/corporate-training-kerala",
    title: "Corporate Training in Kerala | IT, Data, Cloud & AI | Ladder7",
    description:
      "Hands-on IT, data, cloud, AI and marketing training for company teams: on-site in Trivandrum, Kochi and across Kerala, or fully virtual.",
    name: "Grow your team. Build what comes next.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
    ],
  },
  trainingFullStackDevelopment: {
    path: "/corporate-training-kerala/full-stack-development",
    title: "Full Stack Development | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on full stack development training for corporate teams in Kerala and virtually across India.",
    name: "Full Stack Development.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Full Stack Development", path: "/corporate-training-kerala/full-stack-development" },
    ],
  },
  trainingDataScience: {
    path: "/corporate-training-kerala/data-science",
    title: "Data Science | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on data science training for corporate teams in Kerala and virtually across India.",
    name: "Data Science.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Data Science", path: "/corporate-training-kerala/data-science" },
    ],
  },
  trainingMobileAppDevelopment: {
    path: "/corporate-training-kerala/mobile-app-development",
    title: "Mobile Application Development | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on mobile development training for corporate teams in Kerala and virtually across India.",
    name: "Mobile Application Development.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Mobile Application Development", path: "/corporate-training-kerala/mobile-app-development" },
    ],
  },
  trainingPromptEngineeringAiTraining: {
    path: "/corporate-training-kerala/prompt-engineering-ai-training",
    title: "AI Training | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on AI training for employees, on-site in Kerala (Trivandrum, Kochi and beyond) or virtually.",
    name: "AI Training.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "AI Training", path: "/corporate-training-kerala/prompt-engineering-ai-training" },
    ],
  },
  trainingDataVisualization: {
    path: "/corporate-training-kerala/data-visualization",
    title: "Data Visualization | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on data visualization training for corporate teams in Kerala and virtually across India.",
    name: "Data Visualization.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Data Visualization", path: "/corporate-training-kerala/data-visualization" },
    ],
  },
  trainingCloudComputingBootcamp: {
    path: "/corporate-training-kerala/cloud-computing-bootcamp",
    title: "Cloud Computing Bootcamp | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers a hands-on cloud computing bootcamp for corporate teams in Kerala and virtually across India.",
    name: "Cloud Computing Bootcamp.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Cloud Computing Bootcamp", path: "/corporate-training-kerala/cloud-computing-bootcamp" },
    ],
  },
  trainingDigitalContentCreation: {
    path: "/corporate-training-kerala/digital-content-creation",
    title: "Digital Content Creation | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on content creation training for corporate marketing and comms teams in Kerala and virtually across India.",
    name: "Digital Content Creation.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Digital Content Creation", path: "/corporate-training-kerala/digital-content-creation" },
    ],
  },
  trainingBusinessAnalytics: {
    path: "/corporate-training-kerala/business-analytics",
    title: "Business Analytics | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on business analytics training for corporate teams in Kerala and virtually across India.",
    name: "Business Analytics.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Business Analytics", path: "/corporate-training-kerala/business-analytics" },
    ],
  },
  trainingBusinessIntelligenceDataAnalytics: {
    path: "/corporate-training-kerala/business-intelligence-data-analytics",
    title: "Business Intelligence & Data Analytics | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on BI and data analytics training for corporate teams in Kerala and virtually across India.",
    name: "Business Intelligence & Data Analytics.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "Business Intelligence & Data Analytics", path: "/corporate-training-kerala/business-intelligence-data-analytics" },
    ],
  },
  trainingMarketingAutomationCrm: {
    path: "/corporate-training-kerala/marketing-automation-crm",
    title: "CRM & Automation Training | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on CRM and marketing automation training for corporate sales and marketing teams in Kerala and virtually across India.",
    name: "CRM & Automation Training.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "CRM & Automation Training", path: "/corporate-training-kerala/marketing-automation-crm" },
    ],
  },
  trainingWebopsAiMl: {
    path: "/corporate-training-kerala/webops-ai-ml",
    title: "WebOps & AI/ML Training | Corporate Training | Ladder7",
    description:
      "Ladder7 delivers hands-on WebOps and AI/ML training for corporate ops and infrastructure teams in Kerala and virtually across India.",
    name: "WebOps & AI/ML Training.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [
      { name: "Corporate Training", path: "/corporate-training-kerala" },
      { name: "WebOps & AI/ML Training", path: "/corporate-training-kerala/webops-ai-ml" },
    ],
  },
  blog: {
    path: "/blogs",
    title: "Insights: AI, Web Engineering & Life at Ladder7 | Ladder7",
    description:
      "Practical perspectives on AI and digital experiences from Ladder7, plus stories from the people behind the company in Cochin and Trivandrum.",
    name: "Ideas for your next step. In technology, work and life.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
    ],
  },
  blogAiPersonalization: {
    path: "/blogs/ai-personalize-web-experince",
    title: "The Role of AI in Personalizing Web Experiences | Ladder7",
    description:
      "Discover how Artificial Intelligence and machine learning are revolutionizing web design through predictive personalization and dynamic content delivery.",
    name: "The Role of AI in Personalizing Web Experiences",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
      { name: "The Role of AI in Personalizing Web Experiences", path: "/blogs/ai-personalize-web-experince" },
    ],
  },
  blogAiToolsWebTeams: {
    path: "/blogs/ai-tools-web-development-team",
    title: "AI Tools for Web Development Teams | Ladder7",
    description:
      "How web development teams can use AI tools to build intelligent websites that improve collaboration, automate repetitive work and support conversion.",
    name: "AI Tools for Web Development Teams: How to Build Intelligent Websites That Convert",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
      { name: "AI Tools for Web Development Teams: How to Build Intelligent Websites That Convert", path: "/blogs/ai-tools-web-development-team" },
    ],
  },
  blogConversationalAi: {
    path: "/blogs/conversational-ai-customer-experience",
    title: "Conversational AI for Customer Experience | Ladder7",
    description:
      "How enterprise teams can use conversational AI, private knowledge, workflow orchestration, and analytics to improve customer experience beyond scripted chatbots.",
    name: "Conversational AI for Customer Experience: When Chatbots Need to Do More",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
      { name: "Conversational AI for Customer Experience: When Chatbots Need to Do More", path: "/blogs/conversational-ai-customer-experience" },
    ],
  },
  blogWebsiteChecks: {
    path: "/blogs/why-website-checks-need-to-go-beyond-performance-scores",
    title: "Why Website Checks Need to Go Beyond Performance Scores | Ladder7",
    description:
      "A fast site can still fail if buyers, search engines and AI systems cannot understand it or act on it.",
    name: "Why Website Checks Need to Go Beyond Performance Scores",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
      { name: "Why Website Checks Need to Go Beyond Performance Scores", path: "/blogs/why-website-checks-need-to-go-beyond-performance-scores" },
    ],
  },
  blogOnam: {
    path: "/blogs/festive-onam-ladder7",
    title: "Ladder7’s Grand Onam Celebration | Life at Ladder7",
    description:
      "Tradition meets tech at Ladder7! Experience the vibrant colors, festive feasts, and lasting memories from our grand Onam celebration in Kerala.",
    name: "Festive Moments and Lasting Memories: Ladder7’s Grand Onam Celebration",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
      { name: "Festive Moments and Lasting Memories: Ladder7’s Grand Onam Celebration", path: "/blogs/festive-onam-ladder7" },
    ],
  },
  blogChristmas: {
    path: "/blogs/magical-christmas-celebration",
    title: "Lux Noel: A Magical Christmas Celebration | Ladder7",
    description:
      "Explore the festive spirit at Ladder7! Read about \"Lux Noel,\" our magical Christmas celebration filled with team bonding, joy, and holiday cheer.",
    name: "Lux Noel: A Magical Christmas Celebration",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
      { name: "Lux Noel: A Magical Christmas Celebration", path: "/blogs/magical-christmas-celebration" },
    ],
  },
  blogIndependenceDay: {
    path: "/blogs/independence-day-ladder7",
    title: "Independence Day at Ladder7 | Life at Ladder7",
    description:
      "Get an inside look at Ladder7's company culture as we celebrate Independence Day with a focus on unity, corporate social responsibility, and national pride.",
    name: "Celebrating Unity and Responsibility: Independence Day at Ladder7",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [
      { name: "Insights", path: "/blogs" },
      { name: "Celebrating Unity and Responsibility: Independence Day at Ladder7", path: "/blogs/independence-day-ladder7" },
    ],
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | Ladder7",
    description:
      "Ladder7’s privacy policy: how we collect, use and safeguard information gathered through Facebook Ads and related services.",
    name: "Your privacy. In clear terms.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "yearly",
    priority: 0.3,
    breadcrumb: [{ name: "Privacy policy", path: "/privacy" }],
  },
  thankYou: {
    path: "/thank-you",
    title: "Thank You | Ladder7",
    description:
      "Your message has been sent to the Ladder7 team. One of our experts will get back to you shortly, usually within one business day.",
    name: "Your next step starts here.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: false,
    lastModified: RELEASE_DATE,
    changeFrequency: "yearly",
    priority: 0.1,
    breadcrumb: [{ name: "Thank you", path: "/thank-you" }],
  },
  sitemap: {
    path: "/sitemap",
    title: "Sitemap | Every Ladder7 Page in One Place",
    description:
      "Explore Ladder7’s technology, products, learning programs and company pages.",
    name: "Every path. One place.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.3,
    breadcrumb: [{ name: "Sitemap", path: "/sitemap" }],
  },
  bootcamp: {
    path: "/bootcamp",
    title: "30-Day AI E-commerce Bootcamp | Ladder7",
    description:
      "A 30-day hands-on bootcamp where you build, launch, and scale an AI-powered e-commerce business — from zero to your first sale.",
    name: "Bring your ambition. Build your skills.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [{ name: "Bootcamp", path: "/bootcamp" }],
  },
  earnMore: {
    path: "/earnmore",
    title: "EarnMore | Mentor & IT Consultant Programme | Ladder7",
    description:
      "Accelerate your earning potential. Discover targeted upskilling resources, industry certifications, and strategies designed to maximize your professional value.",
    name: "Learn. Grow. Earn more.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [{ name: "EarnMore", path: "/earnmore" }],
  },
  trainingInternship: {
    path: "/it-training-internship-trivandrum",
    title: "IT Training & Internships in Trivandrum | Ladder7",
    description:
      "Live, mentor-led IT courses in Trivandrum, Kerala: MERN full stack, Python & AI, software testing and Shopify, with internship support and certification.",
    name: "Learn by doing. Grow with direction.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    breadcrumb: [{ name: "Training & internships", path: "/it-training-internship-trivandrum" }],
  },
  courseFullStack: {
    path: "/full-stack-developer-course-trivandrum",
    title: "Full Stack Developer Course in Trivandrum | MERN | Ladder7",
    description:
      "A live, mentor-led MERN full stack developer course in Trivandrum, Kerala. Build and deploy real applications on 1-month and 3-month tracks.",
    name: "Full stack. Real possibilities.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
    breadcrumb: [{ name: "Training & internships", path: "/it-training-internship-trivandrum" }, { name: "Full stack. Real possibilities.", path: "/full-stack-developer-course-trivandrum" }],
  },
  courseAiDataScience: {
    path: "/ai-data-science-course-trivandrum",
    title: "AI, Data Science & Python Course in Trivandrum | Ladder7",
    description:
      "A live, mentor-led AI, data science and analytics course in Trivandrum, Kerala. Learn Python, web development and machine learning on real datasets.",
    name: "Python. AI. Your next step.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
    breadcrumb: [{ name: "Training & internships", path: "/it-training-internship-trivandrum" }, { name: "Python. AI. Your next step.", path: "/ai-data-science-course-trivandrum" }],
  },
  courseSoftwareTesting: {
    path: "/software-testing-course-trivandrum",
    title: "Software Testing Course in Trivandrum | Ladder7",
    description:
      "A live, mentor-led software testing course in Trivandrum, Kerala covering manual and automation testing with Selenium, plus API testing and placement support.",
    name: "Build confidence in quality.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
    breadcrumb: [{ name: "Training & internships", path: "/it-training-internship-trivandrum" }, { name: "Build confidence in quality.", path: "/software-testing-course-trivandrum" }],
  },
  courseShopify: {
    path: "/shopify-developer-course-workshop",
    title: "Shopify Course in Trivandrum | 5-Day Workshop | Ladder7",
    description:
      "A focused, hands-on 5-day Shopify workshop in Trivandrum, Kerala that takes you from a blank account to a live, functioning online store.",
    name: "From an idea to a storefront.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
    breadcrumb: [{ name: "Training & internships", path: "/it-training-internship-trivandrum" }, { name: "From an idea to a storefront.", path: "/shopify-developer-course-workshop" }],
  },
  firstJob: {
    path: "/experience-the-first-job",
    title: "Experience the First Job | Internships | Ladder7",
    description:
      "Bridge the gap between academia and industry. Immersive, real-world project simulations and internships for youth entering the workforce.",
    name: "Experience your first real step.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [{ name: "Experience the first job", path: "/experience-the-first-job" }],
  },
  careerGoalFinding: {
    path: "/training-internship/career-goal-finding",
    title: "Career Goal Finding Session | Ladder7",
    description:
      "A focused, one-on-one session to help you understand your strengths and interests, and find a career direction in tech that actually fits you.",
    name: "Find a direction that feels like you.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [{ name: "Training & internships", path: "/it-training-internship-trivandrum" }, { name: "Find a direction that feels like you.", path: "/training-internship/career-goal-finding" }],
  },
  customSoftwareIndia: proposedPageSeo("customSoftwareIndia"),
  hireDevelopersIndia: proposedPageSeo("hireDevelopersIndia"),
  offshoreDevelopmentIndia: proposedPageSeo("offshoreDevelopmentIndia"),
  mobileAppDevelopment: proposedPageSeo("mobileAppDevelopment"),
  regionUAE: proposedPageSeo("regionUAE"),
  regionKSA: proposedPageSeo("regionKSA"),
  regionGCC: proposedPageSeo("regionGCC"),
  regionEurope: proposedPageSeo("regionEurope"),
  regionAfrica: proposedPageSeo("regionAfrica"),
  engagementModels: proposedPageSeo("engagementModels"),
  blogChooseCompanyIndia: proposedPageSeo("blogChooseCompanyIndia"),
  blogOutsourcingComparison: proposedPageSeo("blogOutsourcingComparison"),
  notFound: {
    path: "/404",
    title: "Page Not Found | Ladder7",
    description: "The page you were looking for could not be found. Explore Ladder7's services, company and contact details.",
    name: "Page not found",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: false,
    lastModified: RELEASE_DATE,
    changeFrequency: "yearly",
    priority: 0,
    breadcrumb: [],
  },
};

for (const [pageKey, page] of Object.entries(PAGE_SEO)) {
  const content = websitePageSeo(pageKey);
  if (!content) continue;

  page.title = content.title;
  page.description = content.description;
  page.name = content.h1;
  page.canonicalUrl = content.canonical_url;
  page.image = content.og_image ? new URL(content.og_image).pathname : page.image;
  page.imageAlt = content.og_image_alt || page.imageAlt;
  page.openGraphType = content.og_type;
  page.openGraphLocale = content.og_locale;
  page.twitterCard = content.twitter_card;
  page.indexable = !content.robots?.toLowerCase().includes("noindex");
  if (content.breadcrumb) page.breadcrumb = content.breadcrumb;
}
