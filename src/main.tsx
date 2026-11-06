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
  notFound: () => import("./pages/NotFound/NotFoundPage"),
};

const pages: PageComponents = {
  home: lazy(importers.home),
  services: lazy(importers.services),
  about: lazy(importers.about),
  contact: lazy(importers.contact),
  education: lazy(importers.education),
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
