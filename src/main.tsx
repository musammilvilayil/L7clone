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
  productMyLadder: () => import("./pages/EducationProduct/MyLadderPage"),
  productMindGym: () => import("./pages/EducationProduct/MindGymPage"),
  productMirrorMe: () => import("./pages/EducationProduct/MirrorMePage"),
  productFillDots: () => import("./pages/EducationProduct/FillDotsPage"),
  productAmiu: () => import("./pages/EducationProduct/AmiuPage"),
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
  corporateTraining: () => import("./pages/CorporateTraining/CorporateTrainingPage"),
  trainingFullStackDevelopment: () => import("./pages/TrainingDetail/FullStackDevelopmentPage"),
  trainingDataScience: () => import("./pages/TrainingDetail/DataSciencePage"),
  trainingMobileAppDevelopment: () => import("./pages/TrainingDetail/MobileAppDevelopmentPage"),
  trainingPromptEngineeringAiTraining: () => import("./pages/TrainingDetail/PromptEngineeringAiTrainingPage"),
  trainingDataVisualization: () => import("./pages/TrainingDetail/DataVisualizationPage"),
  trainingCloudComputingBootcamp: () => import("./pages/TrainingDetail/CloudComputingBootcampPage"),
  trainingDigitalContentCreation: () => import("./pages/TrainingDetail/DigitalContentCreationPage"),
  trainingBusinessAnalytics: () => import("./pages/TrainingDetail/BusinessAnalyticsPage"),
  trainingBusinessIntelligenceDataAnalytics: () => import("./pages/TrainingDetail/BusinessIntelligenceDataAnalyticsPage"),
  trainingMarketingAutomationCrm: () => import("./pages/TrainingDetail/MarketingAutomationCrmPage"),
  trainingWebopsAiMl: () => import("./pages/TrainingDetail/WebopsAiMlPage"),
  blog: () => import("./pages/Blog/BlogPage"),
  blogAiPersonalization: () => import("./pages/BlogPost/AiPersonalizationPost"),
  blogAiToolsWebTeams: () => import("./pages/BlogPost/AiToolsWebTeamsPost"),
  blogConversationalAi: () => import("./pages/BlogPost/ConversationalAiPost"),
  blogWebsiteChecks: () => import("./pages/BlogPost/WebsiteChecksPost"),
  blogOnam: () => import("./pages/BlogPost/OnamPost"),
  blogChristmas: () => import("./pages/BlogPost/ChristmasPost"),
  blogIndependenceDay: () => import("./pages/BlogPost/IndependenceDayPost"),
  privacy: () => import("./pages/Privacy/PrivacyPage"),
  thankYou: () => import("./pages/ThankYou/ThankYouPage"),
  sitemap: () => import("./pages/Sitemap/SitemapPage"),
  bootcamp: () => import("./pages/Bootcamp/BootcampPage"),
  earnMore: () => import("./pages/EarnMore/EarnMorePage"),
  trainingInternship: () => import("./pages/Course/TrainingInternshipPage"),
  courseFullStack: () => import("./pages/Course/FullStackCoursePage"),
  courseAiDataScience: () => import("./pages/Course/AiDataScienceCoursePage"),
  courseSoftwareTesting: () => import("./pages/Course/SoftwareTestingCoursePage"),
  courseShopify: () => import("./pages/Course/ShopifyCoursePage"),
  firstJob: () => import("./pages/Course/FirstJobPage"),
  careerGoalFinding: () => import("./pages/Course/CareerGoalFindingPage"),
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
  productMyLadder: lazy(importers.productMyLadder),
  productMindGym: lazy(importers.productMindGym),
  productMirrorMe: lazy(importers.productMirrorMe),
  productFillDots: lazy(importers.productFillDots),
  productAmiu: lazy(importers.productAmiu),
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
  corporateTraining: lazy(importers.corporateTraining),
  trainingFullStackDevelopment: lazy(importers.trainingFullStackDevelopment),
  trainingDataScience: lazy(importers.trainingDataScience),
  trainingMobileAppDevelopment: lazy(importers.trainingMobileAppDevelopment),
  trainingPromptEngineeringAiTraining: lazy(importers.trainingPromptEngineeringAiTraining),
  trainingDataVisualization: lazy(importers.trainingDataVisualization),
  trainingCloudComputingBootcamp: lazy(importers.trainingCloudComputingBootcamp),
  trainingDigitalContentCreation: lazy(importers.trainingDigitalContentCreation),
  trainingBusinessAnalytics: lazy(importers.trainingBusinessAnalytics),
  trainingBusinessIntelligenceDataAnalytics: lazy(importers.trainingBusinessIntelligenceDataAnalytics),
  trainingMarketingAutomationCrm: lazy(importers.trainingMarketingAutomationCrm),
  trainingWebopsAiMl: lazy(importers.trainingWebopsAiMl),
  blog: lazy(importers.blog),
  blogAiPersonalization: lazy(importers.blogAiPersonalization),
  blogAiToolsWebTeams: lazy(importers.blogAiToolsWebTeams),
  blogConversationalAi: lazy(importers.blogConversationalAi),
  blogWebsiteChecks: lazy(importers.blogWebsiteChecks),
  blogOnam: lazy(importers.blogOnam),
  blogChristmas: lazy(importers.blogChristmas),
  blogIndependenceDay: lazy(importers.blogIndependenceDay),
  privacy: lazy(importers.privacy),
  thankYou: lazy(importers.thankYou),
  sitemap: lazy(importers.sitemap),
  bootcamp: lazy(importers.bootcamp),
  earnMore: lazy(importers.earnMore),
  trainingInternship: lazy(importers.trainingInternship),
  courseFullStack: lazy(importers.courseFullStack),
  courseAiDataScience: lazy(importers.courseAiDataScience),
  courseSoftwareTesting: lazy(importers.courseSoftwareTesting),
  courseShopify: lazy(importers.courseShopify),
  firstJob: lazy(importers.firstJob),
  careerGoalFinding: lazy(importers.careerGoalFinding),
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
