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
