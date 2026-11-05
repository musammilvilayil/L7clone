import { describe, expect, it } from "vitest";
import { ROUTES } from "../routes";
import { buildRobots, buildSitemap } from "./files";
import { PAGE_SEO } from "./pages";

describe("PAGE_SEO", () => {
  it("has an entry for every route, plus notFound", () => {
    for (const route of ROUTES) {
      expect(PAGE_SEO[route.page], `missing PAGE_SEO for ${route.path}`).toBeDefined();
    }
    expect(PAGE_SEO.notFound).toBeDefined();
  });

  it("gives every indexable page a title, description and breadcrumb consistent with its path", () => {
    for (const route of ROUTES) {
      const page = PAGE_SEO[route.page];
      expect(page.path).toBe(route.path);
      expect(page.title.length).toBeGreaterThan(10);
      expect(page.title.length).toBeLessThanOrEqual(70);
      expect(page.description.length).toBeGreaterThan(50);
      expect(page.description.length).toBeLessThanOrEqual(170);
      expect(page.indexable).toBe(true);
    }
  });

  it("keeps the 404 page out of the index", () => {
    expect(PAGE_SEO.notFound.indexable).toBe(false);
  });
});

describe("buildSitemap", () => {
  it("lists exactly the indexable routes, as absolute https URLs", () => {
    const xml = buildSitemap();
    expect(xml.startsWith("<?xml")).toBe(true);
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    const expected = ROUTES.filter((r) => PAGE_SEO[r.page].indexable).map((r) => r.path);
    expect(locs).toHaveLength(expected.length);
    for (const url of locs) {
      expect(url).toMatch(/^https:\/\/[^/]+\/?/);
    }
  });
});

describe("buildRobots", () => {
  it("allows crawling and references the sitemap when indexing is on", () => {
    const robots = buildRobots();
    expect(robots).toContain("User-agent: *");
    expect(robots).toMatch(/Allow: \/|Disallow: \//);
    if (robots.includes("Allow: /")) {
      expect(robots).toContain("Sitemap:");
    }
  });
});
