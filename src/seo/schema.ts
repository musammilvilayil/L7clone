import { SITE_URL } from "../config/env";
import { websiteCommonSchema, websitePageSchema } from "../data/websiteSeo";
import type { PageKey } from "../routes";
import { PAGE_SEO } from "./pages";

const { organization, website } = websiteCommonSchema();

export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

function webPage(key: PageKey) {
  const page = PAGE_SEO[key];
  const url = page.canonicalUrl ?? absoluteUrl(page.path);
  const type = key === "about" ? "AboutPage" : key === "contact" ? "ContactPage" : "WebPage";
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${page.image}` },
    ...(page.breadcrumb.length ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

function breadcrumb(key: PageKey) {
  const page = PAGE_SEO[key];
  const url = page.canonicalUrl ?? absoluteUrl(page.path);
  const trail = [{ name: "Home", path: "/" }, ...page.breadcrumb];
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function buildSchema(key: PageKey): object | null {
  if (key === "notFound") return null;

  const page = PAGE_SEO[key];
  const graph: object[] = [organization, website, webPage(key)];
  if (page.breadcrumb.length) graph.push(breadcrumb(key));
  graph.push(...websitePageSchema(key));

  return { "@context": "https://schema.org", "@graph": graph };
}
