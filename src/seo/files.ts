/** sitemap.xml and robots.txt, generated from the route table at build time. */
import { ALLOW_INDEXING, SITE_URL } from "../config/env";
import { ROUTES } from "../routes";
import { PAGE_SEO } from "./pages";
import { absoluteUrl } from "./schema";

export function buildSitemap(): string {
  const urls = ROUTES.map((route) => PAGE_SEO[route.page])
    .filter((page) => page.indexable)
    .map(
      (page) =>
        `  <url>\n    <loc>${page.canonicalUrl ?? absoluteUrl(page.path)}</loc>\n    <lastmod>${page.lastModified}</lastmod>\n` +
        `    <changefreq>${page.changeFrequency}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`,
    );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function buildRobots(): string {
  if (!ALLOW_INDEXING) {
    return "# Indexing disabled for this build (VITE_ALLOW_INDEXING=false)\nUser-agent: *\nDisallow: /\n";
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
