# Audit Summary

Scan date: 2026-11-07 · Project: Ladder7 website (React + TypeScript + Vite, statically prerendered) · Original project **not modified**; all deliverables are in `website-audit-documentation/`.

## Result counts

| Metric | Count |
|---|---|
| Routes declared in `src/routes.ts` | 65 |
| Prerendered pages found & parsed successfully | **66** (65 routes + 404 fallback) |
| Pages failed / inaccessible | **0** |
| URLs in `sitemap.xml` | 64 |
| Sections extracted | **406** |
| `<img>` elements (all documents) | 227 (161 inside page sections) |
| `<a href>` links (all documents) | 4672 (448 inside page sections) |
| Distinct asset URLs referenced in HTML | 140 |
| Reusable component files | 62 |
| Distinct forms | 3 (131 instances) |

Definitions: a *section* is a top-level `<section>` inside `<main>` (or, where a page's main content is not wrapped in `<section>`, the top-level content blocks). Nested `<section>` elements are listed under `child_sections`, not counted separately. Every route in `routes.json` has a prerendered HTML file; nothing was skipped.

## Method

1. Discovered routes from `src/routes.ts`, cross-checked with `dist/client/routes.json`, `sitemap.xml` and the folder of prerendered HTML.
2. Parsed each prerendered page (`dist/client/**/index.html`, built from the current source — no source file is newer than the build) with a purpose-built HTML parser; extracted head/SEO, headings, sections, cards, CTAs, images, links, forms.
3. Read source for routes, components, hooks, data files, CSS (media queries, keyframes) and the enquiry service; built a component → page usage graph from imports.
4. Ran a short browser session against a local server of `dist/client` for the behaviours listed under *Observed*.

## Key findings

- **Content coverage:** 0 empty sections, 0 sections without any heading element. 110 sections have no stand-alone description paragraph (their copy is in cards/lists) — informational.
- **Titles/descriptions:** 7 page(s) with title > 60 chars (/, /services, /products/l7-insights, /corporate-training-kerala, /corporate-training-kerala/mobile-app-development, /corporate-training-kerala/business-intelligence-data-analytics, /blogs/why-website-checks-need-to-go-beyond-performance-scores); 5 with description > 160 chars. Duplicate titles: 0; duplicate descriptions: 0.
- **Sitemap:** routes missing from sitemap.xml: /thank-you. `/thank-you` and similar utility pages should be reviewed for indexing intent.
- **Heading structure:** 0 page(s) skip a heading level inside `<main>`.
- **Images:** 0 `<img>` without an alt attribute; 153 with empty alt (decorative); 0 referenced assets missing in `dist`.
- **Links:** `/__not-found__#contact` does not resolve to a documented route. On the 404 page the header's “Let's talk” CTA is prerendered as `/__not-found__#contact`.
- **Structured data:** JSON-LD (via src/seo/schema.ts) is present on 65/66 pages (Organization, WebSite, WebPage/AboutPage/ContactPage, BreadcrumbList, FAQPage, Service, BlogPosting); the 404 page has none.
- **No analytics/tag manager** scripts were found in source or HTML.
- **Enquiry flow** is a WhatsApp hand-off by default; an optional JSON POST endpoint exists but is not configured in `.env.example` — no enquiry is stored server-side by default.

## Observed vs source-derived

**Observed in a browser:**

- Pages hydrate in the browser (window.__l7Hydrated === true) on / and /services: observed: true
- Overlay menu opens/closes: observed: before open #menu.hidden=true & aria-expanded=false; after click hidden=false, aria-expanded=true, body.menu-open=true, #main inside an inert region; after Escape hidden=true, aria-expanded=false, body.menu-open=false
- Contact form validation and submit hand-off (home page contact section): observed: empty submit showed 'Please enter your name.', 'Please enter your email address.', 'Please tell us a little about your project.' and summary 'Please check 3 fields: Your name, Work email, What would you like to achieve?.' (window.open calls 0, focus 
- Home FAQ accordion (native <details>) toggles: observed: opened (false → true). Note: the prerendered HTML marks the first <details> as open, but after hydration details[0].open was false at load — SSR markup and hydrated DOM differ for that attribute.
- Header layout by viewport width: observed: 375px → .desktop-nav none, .site-header__cta none, .menu-toggle flex, .division-switch flex, no horizontal overflow. 768px → .desktop-nav flex, .site-header__cta flex, .menu-toggle flex, no horizontal overflow. 1024px → .desktop-nav flex, .menu-toggl
- Client-side navigation with page transition: observed: URL changed /services → /about without full reload (window marker preserved); title became 'About Ladder7 NextStep Solutions \| Cochin & Trivandrum'; a route-leaving/arriving/revealing class was seen on the transition overlay.

**Source-code only (not executed):** route transition animation timings, scroll-reveal observer, particle canvas, dialogs/film player, program dialogs, tabs/pathway boards, optional enquiry POST, mailto fallback, responsive rules other than the header widths above.

## Limitations

- All behaviours in functionalities are derived from source code / prerendered markup; no interaction, animation, hover, form submission, or viewport behaviour was executed unless listed under observed_behavior.
- Section backgrounds & layouts are inferred from class names and element types, not from computed styles or screenshots.
- Section names are humanised from HTML ids/CSS classes (the site does not display section names); purposes are auditor-inferred and labelled as such.
- Content hidden until interaction (dialogs, closed accordions, non-selected tabs, menu overlay) is captured only if present in the prerendered HTML.
- Content loaded after hydration was not captured (the site has no runtime data fetching other than the optional enquiry POST, per source).

## Deliverables

| File | Purpose |
|---|---|
| `complete-website-documentation.json` | Full structured documentation (pages → sections, components, nav, footer, forms, integrations, functionalities, technical, scan summary) |
| `complete-website-documentation.md` | Human-readable version with every section's exact text |
| `website-page-inventory.json` | One row per page |
| `website-section-inventory.json` | One row per section |
| `website-seo-audit.json` | Per-page SEO fields + site-level checks |
| `website-assets-inventory.json` | Images/icons/video and where they're used, file sizes, CSS/source-only assets |
| `website-functionalities.json` | Functions, forms, integrations, responsive/animation findings, observed behaviour |
| `audit-summary.md` | This file |

