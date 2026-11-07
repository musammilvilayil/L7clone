/**
 * Page-level SEO — the only place titles and descriptions are written.
 *
 * Consumed by <Seo> (runtime), scripts/prerender.mjs (static <head>), the
 * sitemap and JSON-LD. The prerender step fails the build if a route in
 * src/routes.ts has no entry here.
 */
import type { PageKey } from "../routes";

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
}

const DEFAULT_IMAGE = "/og/ladder7-og.jpg";
const DEFAULT_IMAGE_ALT = "Ladder7 — Build. Connect. Grow. Websites, applied AI and custom software.";
const RELEASE_DATE = "2026-11-05";

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
