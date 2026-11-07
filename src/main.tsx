import { lazy, StrictMode, type ComponentType } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App, type PageComponents } from "./App";
import type { PageKey } from "./routes";

/**
 * Browser entry. Pages are code-split; the prerendered HTML already contains
 * the current page, and the build adds <link rel="modulepreload"> for its
 * chunk so hydration does not wait on a request waterfall.
 */
const importers: Record<PageKey, () => Promise<{ default: ComponentType }>> = {
  home: () => import("./pages/Home/HomePage"),
  services: () => import("./pages/Services/ServicesPage"),
  about: () => import("./pages/About/AboutPage"),
  contact: () => import("./pages/Contact/ContactPage"),
  education: () => import("./pages/Education/EducationPage"),
  faq: () => import("./pages/Faq/FaqPage"),
  careers: () => import("./pages/Careers/CareersPage"),
  portfolio: () => import("./pages/Portfolio/PortfolioPage"),
  products: () => import("./pages/Products/ProductsPage"),
  productSite360: () => import("./pages/ProductDetail/Site360Page"),
  productL7Nexus: () => import("./pages/ProductDetail/L7NexusPage"),
  productOutreachEngine: () => import("./pages/ProductDetail/OutreachEnginePage"),
  productL7Insights: () => import("./pages/ProductDetail/L7InsightsPage"),
  productInfiniteInsights: () => import("./pages/ProductDetail/InfiniteInsightsPage"),
  serviceAemDigitalExperience: () => import("./pages/ServiceDetail/AemDigitalExperiencePage"),
  serviceAnalyticsExperimentation: () => import("./pages/ServiceDetail/AnalyticsExperimentationPage"),
  serviceHeadlessCms: () => import("./pages/ServiceDetail/HeadlessCmsPage"),
  serviceWebExperience: () => import("./pages/ServiceDetail/WebExperiencePage"),
  serviceLocalizationUiux: () => import("./pages/ServiceDetail/LocalizationUiuxPage"),
  serviceAiAssistant: () => import("./pages/ServiceDetail/AiAssistantPage"),
  serviceAgenticAi: () => import("./pages/ServiceDetail/AgenticAiPage"),
  serviceIntelligentWebsites: () => import("./pages/ServiceDetail/IntelligentWebsitesPage"),
  serviceAiProduct: () => import("./pages/ServiceDetail/AiProductPage"),
  serviceHyperautomation: () => import("./pages/ServiceDetail/HyperautomationPage"),
  serviceTechnology: () => import("./pages/ServiceDetail/TechnologyConsultingPage"),
  serviceSkilledResource: () => import("./pages/ServiceDetail/SkilledResourcePage"),
  serviceGreenRecovery: () => import("./pages/ServiceDetail/GreenRecoveryPage"),
  serviceProductSolution: () => import("./pages/ServiceDetail/ProductSolutionPage"),
  notFound: () => import("./pages/NotFound/NotFoundPage"),
};

const pages: PageComponents = {
  home: lazy(importers.home),
  services: lazy(importers.services),
  about: lazy(importers.about),
  contact: lazy(importers.contact),
  education: lazy(importers.education),
  faq: lazy(importers.faq),
  careers: lazy(importers.careers),
  portfolio: lazy(importers.portfolio),
  products: lazy(importers.products),
  productSite360: lazy(importers.productSite360),
  productL7Nexus: lazy(importers.productL7Nexus),
  productOutreachEngine: lazy(importers.productOutreachEngine),
  productL7Insights: lazy(importers.productL7Insights),
  productInfiniteInsights: lazy(importers.productInfiniteInsights),
  serviceAemDigitalExperience: lazy(importers.serviceAemDigitalExperience),
  serviceAnalyticsExperimentation: lazy(importers.serviceAnalyticsExperimentation),
  serviceHeadlessCms: lazy(importers.serviceHeadlessCms),
  serviceWebExperience: lazy(importers.serviceWebExperience),
  serviceLocalizationUiux: lazy(importers.serviceLocalizationUiux),
  serviceAiAssistant: lazy(importers.serviceAiAssistant),
  serviceAgenticAi: lazy(importers.serviceAgenticAi),
  serviceIntelligentWebsites: lazy(importers.serviceIntelligentWebsites),
  serviceAiProduct: lazy(importers.serviceAiProduct),
  serviceHyperautomation: lazy(importers.serviceHyperautomation),
  serviceTechnology: lazy(importers.serviceTechnology),
  serviceSkilledResource: lazy(importers.serviceSkilledResource),
  serviceGreenRecovery: lazy(importers.serviceGreenRecovery),
  serviceProductSolution: lazy(importers.serviceProductSolution),
  notFound: lazy(importers.notFound),
};

const app = (
  <StrictMode>
    <BrowserRouter>
      <App pages={pages} importers={importers} />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById("root")!;
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app); // dev server (no prerendered HTML)
}
window.__l7Hydrated = true;
