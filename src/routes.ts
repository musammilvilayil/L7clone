/**
 * Route table — pure data, no React imports, so the prerender script, the
 * sitemap generator, the client router and the link prefetcher all read the
 * same list and can never drift apart.
 */
export type PageKey =
  | "home"
  | "services"
  | "about"
  | "contact"
  | "education"
  | "faq"
  | "careers"
  | "portfolio"
  | "products"
  | "productSite360"
  | "productL7Nexus"
  | "productOutreachEngine"
  | "productL7Insights"
  | "productInfiniteInsights"
  | "productMyLadder"
  | "productMindGym"
  | "productMirrorMe"
  | "productFillDots"
  | "productAmiu"
  | "serviceAemDigitalExperience"
  | "serviceAnalyticsExperimentation"
  | "serviceHeadlessCms"
  | "serviceWebExperience"
  | "serviceLocalizationUiux"
  | "serviceAiAssistant"
  | "serviceAgenticAi"
  | "serviceIntelligentWebsites"
  | "serviceAiProduct"
  | "serviceHyperautomation"
  | "serviceTechnology"
  | "serviceSkilledResource"
  | "serviceGreenRecovery"
  | "serviceProductSolution"
  | "corporateTraining"
  | "trainingFullStackDevelopment"
  | "trainingDataScience"
  | "trainingMobileAppDevelopment"
  | "trainingPromptEngineeringAiTraining"
  | "trainingDataVisualization"
  | "trainingCloudComputingBootcamp"
  | "trainingDigitalContentCreation"
  | "trainingBusinessAnalytics"
  | "trainingBusinessIntelligenceDataAnalytics"
  | "trainingMarketingAutomationCrm"
  | "trainingWebopsAiMl"
  | "blog"
  | "blogAiPersonalization"
  | "blogAiToolsWebTeams"
  | "blogConversationalAi"
  | "blogWebsiteChecks"
  | "blogOnam"
  | "blogChristmas"
  | "blogIndependenceDay"
  | "privacy"
  | "thankYou"
  | "sitemap"
  | "bootcamp"
  | "earnMore"
  | "trainingInternship"
  | "courseFullStack"
  | "courseAiDataScience"
  | "courseSoftwareTesting"
  | "courseShopify"
  | "firstJob"
  | "careerGoalFinding"
  | "notFound";

export interface RouteDef {
  path: string;
  page: Exclude<PageKey, "notFound">;
}

export const ROUTES: RouteDef[] = [
  { path: "/", page: "home" },
  { path: "/services", page: "services" },
  { path: "/about", page: "about" },
  { path: "/contact", page: "contact" },
  { path: "/education", page: "education" },
  { path: "/faq", page: "faq" },
  { path: "/careers", page: "careers" },
  { path: "/portfolio", page: "portfolio" },
  { path: "/products", page: "products" },
  { path: "/products/site-360", page: "productSite360" },
  { path: "/products/l7-nexus", page: "productL7Nexus" },
  { path: "/products/outreach-engine", page: "productOutreachEngine" },
  { path: "/products/l7-insights", page: "productL7Insights" },
  { path: "/products/infinite-insights", page: "productInfiniteInsights" },
  { path: "/myladder", page: "productMyLadder" },
  { path: "/mindgym", page: "productMindGym" },
  { path: "/mirrorme", page: "productMirrorMe" },
  { path: "/filldots", page: "productFillDots" },
  { path: "/amiu", page: "productAmiu" },
  { path: "/services/aem-digital-experience", page: "serviceAemDigitalExperience" },
  { path: "/services/analytics-experimentation", page: "serviceAnalyticsExperimentation" },
  { path: "/services/headless-cms", page: "serviceHeadlessCms" },
  { path: "/services/web-experience", page: "serviceWebExperience" },
  { path: "/services/localization-uiux", page: "serviceLocalizationUiux" },
  { path: "/services/ai-assistant", page: "serviceAiAssistant" },
  { path: "/services/agenticai", page: "serviceAgenticAi" },
  { path: "/services/intelligent-websites", page: "serviceIntelligentWebsites" },
  { path: "/services/aiproduct", page: "serviceAiProduct" },
  { path: "/services/hyperautomation", page: "serviceHyperautomation" },
  { path: "/services/technology", page: "serviceTechnology" },
  { path: "/services/skilled-resource", page: "serviceSkilledResource" },
  { path: "/services/green-recovery", page: "serviceGreenRecovery" },
  { path: "/services/product-solution", page: "serviceProductSolution" },
  { path: "/corporate-training-kerala", page: "corporateTraining" },
  { path: "/corporate-training-kerala/full-stack-development", page: "trainingFullStackDevelopment" },
  { path: "/corporate-training-kerala/data-science", page: "trainingDataScience" },
  { path: "/corporate-training-kerala/mobile-app-development", page: "trainingMobileAppDevelopment" },
  { path: "/corporate-training-kerala/prompt-engineering-ai-training", page: "trainingPromptEngineeringAiTraining" },
  { path: "/corporate-training-kerala/data-visualization", page: "trainingDataVisualization" },
  { path: "/corporate-training-kerala/cloud-computing-bootcamp", page: "trainingCloudComputingBootcamp" },
  { path: "/corporate-training-kerala/digital-content-creation", page: "trainingDigitalContentCreation" },
  { path: "/corporate-training-kerala/business-analytics", page: "trainingBusinessAnalytics" },
  { path: "/corporate-training-kerala/business-intelligence-data-analytics", page: "trainingBusinessIntelligenceDataAnalytics" },
  { path: "/corporate-training-kerala/marketing-automation-crm", page: "trainingMarketingAutomationCrm" },
  { path: "/corporate-training-kerala/webops-ai-ml", page: "trainingWebopsAiMl" },
  { path: "/blogs", page: "blog" },
  { path: "/blogs/ai-personalize-web-experince", page: "blogAiPersonalization" },
  { path: "/blogs/ai-tools-web-development-team", page: "blogAiToolsWebTeams" },
  { path: "/blogs/conversational-ai-customer-experience", page: "blogConversationalAi" },
  { path: "/blogs/why-website-checks-need-to-go-beyond-performance-scores", page: "blogWebsiteChecks" },
  { path: "/blogs/festive-onam-ladder7", page: "blogOnam" },
  { path: "/blogs/magical-christmas-celebration", page: "blogChristmas" },
  { path: "/blogs/independence-day-ladder7", page: "blogIndependenceDay" },
  { path: "/privacy", page: "privacy" },
  { path: "/thank-you", page: "thankYou" },
  { path: "/sitemap", page: "sitemap" },
  { path: "/bootcamp", page: "bootcamp" },
  { path: "/earnmore", page: "earnMore" },
  { path: "/it-training-internship-trivandrum", page: "trainingInternship" },
  { path: "/full-stack-developer-course-trivandrum", page: "courseFullStack" },
  { path: "/ai-data-science-course-trivandrum", page: "courseAiDataScience" },
  { path: "/software-testing-course-trivandrum", page: "courseSoftwareTesting" },
  { path: "/shopify-developer-course-workshop", page: "courseShopify" },
  { path: "/experience-the-first-job", page: "firstJob" },
  { path: "/training-internship/career-goal-finding", page: "careerGoalFinding" },
];

/** Normalises a pathname (no trailing slash except root, lower-case). */
export function normalisePath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0] ?? "/";
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return (trimmed || "/").toLowerCase();
}

export function pageForPath(pathname: string): PageKey {
  const path = normalisePath(pathname);
  return ROUTES.find((route) => route.path === path)?.page ?? "notFound";
}

export type Division = "it" | "education";

/**
 * Ladder7 has two divisions (the design's own `it-page` body class vs its
 * absence). Education is its own division; every other page — including the
 * shared About/Services/Contact pages — presents as IT, matching the
 * `about.html`/`services.html` design files (both carry `it-page`).
 */
export function divisionForPath(pathname: string): Division {
  return normalisePath(pathname).startsWith("/education") ? "education" : "it";
}

const EDUCATION_CONTACT_PAGES: ReadonlySet<PageKey> = new Set<PageKey>([
  "education",
  "productMyLadder",
  "productMindGym",
  "productMirrorMe",
  "productFillDots",
  "productAmiu",
  "bootcamp",
  "earnMore",
  "trainingInternship",
  "courseFullStack",
  "courseAiDataScience",
  "courseSoftwareTesting",
  "courseShopify",
  "firstJob",
  "careerGoalFinding",
]);

/**
 * Which division's enquiry form a page ends with. Wider than divisionForPath
 * (which drives the header): student-facing training, course and learning
 * product pages get the Education form; everything else gets the IT form.
 */
export function contactDivisionForPath(pathname: string): Division {
  return EDUCATION_CONTACT_PAGES.has(pageForPath(pathname)) ? "education" : "it";
}
