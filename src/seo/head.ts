/**
 * Builds the per-page <head> tags once, then either serialises them to HTML
 * (build-time prerender) or applies them to the live document (client-side
 * navigation). Both paths share buildHead(), so crawlers and users always get
 * identical metadata.
 */
import { ALLOW_INDEXING, SITE_URL } from "../config/env";
import { COMPANY } from "../data/site";
import type { PageKey } from "../routes";
import { PAGE_SEO } from "./pages";
import { absoluteUrl, buildSchema } from "./schema";

export type HeadTag =
  | { kind: "title"; text: string }
  | { kind: "meta"; key: "name" | "property"; id: string; content: string }
  | { kind: "link"; rel: string; href: string }
  | { kind: "jsonld"; json: object };

export function buildHead(key: PageKey): HeadTag[] {
  const page = PAGE_SEO[key];
  const indexable = ALLOW_INDEXING && page.indexable;
  const url = page.canonicalUrl ?? absoluteUrl(page.path);
  const image = `${SITE_URL}${page.image}`;
  const robots = indexable ? "index, follow, max-image-preview:large, max-snippet:-1" : "noindex, follow";

  const tags: HeadTag[] = [
    { kind: "title", text: page.title },
    { kind: "meta", key: "name", id: "description", content: page.description },
    { kind: "meta", key: "name", id: "robots", content: robots },
    { kind: "meta", key: "property", id: "og:type", content: page.openGraphType ?? "website" },
    { kind: "meta", key: "property", id: "og:site_name", content: COMPANY.name },
    { kind: "meta", key: "property", id: "og:locale", content: page.openGraphLocale ?? "en_IN" },
    { kind: "meta", key: "property", id: "og:title", content: page.title },
    { kind: "meta", key: "property", id: "og:description", content: page.description },
    { kind: "meta", key: "property", id: "og:image", content: image },
    { kind: "meta", key: "property", id: "og:image:width", content: "1200" },
    { kind: "meta", key: "property", id: "og:image:height", content: "630" },
    { kind: "meta", key: "property", id: "og:image:alt", content: page.imageAlt },
    { kind: "meta", key: "name", id: "twitter:card", content: page.twitterCard ?? "summary_large_image" },
    { kind: "meta", key: "name", id: "twitter:title", content: page.title },
    { kind: "meta", key: "name", id: "twitter:description", content: page.description },
    { kind: "meta", key: "name", id: "twitter:image", content: image },
    { kind: "meta", key: "name", id: "twitter:image:alt", content: page.imageAlt },
  ];

  // A 404 must not claim a canonical URL or an og:url.
  if (key !== "notFound") {
    tags.push({ kind: "link", rel: "canonical", href: url });
    tags.push({ kind: "meta", key: "property", id: "og:url", content: url });
  }

  const schema = buildSchema(key);
  if (schema) tags.push({ kind: "jsonld", json: schema });
  return tags;
}

/* ── Serialisation (build time) ──────────────────────────────────────────── */

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** JSON for a <script> body: neutralise "</script" and HTML comment openers. */
const safeJson = (json: object) => JSON.stringify(json).replace(/</g, "\\u003c");

export function renderHeadHtml(tags: HeadTag[]): string {
  return tags
    .map((tag) => {
      switch (tag.kind) {
        case "title":
          return `<title>${escapeHtml(tag.text)}</title>`;
        case "meta":
          return `<meta ${tag.key}="${escapeHtml(tag.id)}" content="${escapeHtml(tag.content)}" data-seo>`;
        case "link":
          return `<link rel="${escapeHtml(tag.rel)}" href="${escapeHtml(tag.href)}" data-seo>`;
        case "jsonld":
          return `<script type="application/ld+json" data-seo>${safeJson(tag.json)}</script>`;
      }
    })
    .join("\n    ");
}

/* ── Live document (client-side navigation) ──────────────────────────────── */

export function applyHead(tags: HeadTag[], doc: Document = document) {
  const keep = new Set<Element>();

  for (const tag of tags) {
    if (tag.kind === "title") {
      doc.title = tag.text;
      continue;
    }
    let el: Element | null;
    if (tag.kind === "meta") {
      el = doc.head.querySelector(`meta[${tag.key}="${tag.id}"]`);
      if (!el) {
        el = doc.createElement("meta");
        el.setAttribute(tag.key, tag.id);
        doc.head.appendChild(el);
      }
      el.setAttribute("content", tag.content);
    } else if (tag.kind === "link") {
      el = doc.head.querySelector(`link[rel="${tag.rel}"]`);
      if (!el) {
        el = doc.createElement("link");
        el.setAttribute("rel", tag.rel);
        doc.head.appendChild(el);
      }
      el.setAttribute("href", tag.href);
    } else {
      el = doc.head.querySelector('script[type="application/ld+json"][data-seo]');
      if (!el) {
        el = doc.createElement("script");
        el.setAttribute("type", "application/ld+json");
        doc.head.appendChild(el);
      }
      el.textContent = JSON.stringify(tag.json);
    }
    el.setAttribute("data-seo", "");
    keep.add(el);
  }

  // Remove tags the previous page had but this one does not (e.g. canonical on 404).
  doc.head.querySelectorAll("[data-seo]").forEach((el) => {
    if (!keep.has(el)) el.remove();
  });
}
