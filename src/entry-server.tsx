/**
 * Build-time renderer (never shipped to browsers). scripts/prerender.mjs
 * imports the compiled version of this file to write static HTML, <head>
 * tags, sitemap.xml and robots.txt for every route.
 */
import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router";
import { App, type PageComponents } from "./App";
import AboutPage from "./pages/About/AboutPage";
import CareersPage from "./pages/Careers/CareersPage";
import ContactPage from "./pages/Contact/ContactPage";
import EducationPage from "./pages/Education/EducationPage";
import FaqPage from "./pages/Faq/FaqPage";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import AemDigitalExperiencePage from "./pages/ServiceDetail/AemDigitalExperiencePage";
import AgenticAiPage from "./pages/ServiceDetail/AgenticAiPage";
import AiAssistantPage from "./pages/ServiceDetail/AiAssistantPage";
import AiProductPage from "./pages/ServiceDetail/AiProductPage";
import AnalyticsExperimentationPage from "./pages/ServiceDetail/AnalyticsExperimentationPage";
import GreenRecoveryPage from "./pages/ServiceDetail/GreenRecoveryPage";
import HeadlessCmsPage from "./pages/ServiceDetail/HeadlessCmsPage";
import HyperautomationPage from "./pages/ServiceDetail/HyperautomationPage";
import IntelligentWebsitesPage from "./pages/ServiceDetail/IntelligentWebsitesPage";
import LocalizationUiuxPage from "./pages/ServiceDetail/LocalizationUiuxPage";
import ProductSolutionPage from "./pages/ServiceDetail/ProductSolutionPage";
import SkilledResourcePage from "./pages/ServiceDetail/SkilledResourcePage";
import TechnologyConsultingPage from "./pages/ServiceDetail/TechnologyConsultingPage";
import WebExperiencePage from "./pages/ServiceDetail/WebExperiencePage";
import ServicesPage from "./pages/Services/ServicesPage";
import { pageForPath } from "./routes";
import { buildHead, renderHeadHtml } from "./seo/head";

const pages: PageComponents = {
  home: HomePage,
  services: ServicesPage,
  about: AboutPage,
  contact: ContactPage,
  education: EducationPage,
  faq: FaqPage,
  careers: CareersPage,
  portfolio: PortfolioPage,
  serviceAemDigitalExperience: AemDigitalExperiencePage,
  serviceAnalyticsExperimentation: AnalyticsExperimentationPage,
  serviceHeadlessCms: HeadlessCmsPage,
  serviceWebExperience: WebExperiencePage,
  serviceLocalizationUiux: LocalizationUiuxPage,
  serviceAiAssistant: AiAssistantPage,
  serviceAgenticAi: AgenticAiPage,
  serviceIntelligentWebsites: IntelligentWebsitesPage,
  serviceAiProduct: AiProductPage,
  serviceHyperautomation: HyperautomationPage,
  serviceTechnology: TechnologyConsultingPage,
  serviceSkilledResource: SkilledResourcePage,
  serviceGreenRecovery: GreenRecoveryPage,
  serviceProductSolution: ProductSolutionPage,
  notFound: NotFoundPage,
};

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let html = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}

/** Renders one URL to { appHtml, headHtml, page }. */
export async function render(url: string) {
  const page = pageForPath(url);
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App pages={pages} />
      </StaticRouter>
    </StrictMode>,
    {
      // React outlines Suspense content larger than this into a hidden <div>
      // at the end of the document, moved into place by an inline script.
      // Static pages must keep the main content in source order for
      // crawlers and no-JS visitors, so never outline.
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
    },
  );
  return {
    page,
    appHtml: await streamToString(prelude),
    headHtml: renderHeadHtml(buildHead(page)),
  };
}

export { ROUTES, normalisePath } from "./routes";
export { PAGE_SEO } from "./seo/pages";
export { buildRobots, buildSitemap } from "./seo/files";
export { SITE_URL, ALLOW_INDEXING } from "./config/env";
