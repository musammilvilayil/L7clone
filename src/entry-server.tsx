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
import ContactPage from "./pages/Contact/ContactPage";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ServicesPage from "./pages/Services/ServicesPage";
import { pageForPath } from "./routes";
import { buildHead, renderHeadHtml } from "./seo/head";

const pages: PageComponents = {
  home: HomePage,
  services: ServicesPage,
  about: AboutPage,
  contact: ContactPage,
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
