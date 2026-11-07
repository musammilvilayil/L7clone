# Ladder7 redesign — handoff for the next Claude session

## What this task is

Rebuilding the Ladder7 NextStep Solutions website (React 19 + TypeScript + Vite,
static-prerendered) at `C:\Users\user\Desktop\ladder7\Ladder7redesign`, page by
page, from the **real design HTML exports** the user supplied in
`C:\Users\user\Downloads\New folder\ladder7-complete-html\` (~70 single-file
HTML exports, each with inline base64 images and a shared global stylesheet).

The user's standing instructions for this task:

- Work happens on the **`beta` branch**. Never touch `Dev` or `main`.
- **Do not commit anything** unless the user explicitly asks in that turn.
  (The user said "hold off commits" and "keep going" — check with them before
  committing again; don't assume permission carries over.)
- Match the Home/Education pages' existing rigor: pixel-accurate CSS
  extraction, proper component architecture, accessibility, SEO, build/lint/
  test verification, and a visual screenshot QA pass per page before calling
  it done.
- Check in with the user after each major group rather than silently
  ploughing through the whole remaining list.

## Current git state (verify this yourself — may have moved on)

```
branch: beta
last commit: c9314ab "Add service detail pages and content for new offerings"
```

Commit history so far on `beta` (oldest → newest):
`91958c8` Initial commit → `4de1493` global styles → `f159183` doc cleanup →
`ef1d9f1` Education division → `92f8493` AVIF removal (user's own commit) →
`bc67004` shared chrome reconciliation → `728d2e2` Contact/FAQ/Careers/
Portfolio → `b78164c` About page rebuild → `c9314ab` Services hub + 14
service-detail pages.

**Important:** multiple sessions share this working folder. Run `git status`
and `git log` yourself before assuming anything below is still accurate —
another session may have committed or changed things since this file was
written.

As of writing, the working tree has the **Products group** built but
**uncommitted**: `git status --short` shows modified `scripts/optimize-
images.mjs`, `scripts/prerender.mjs`, `src/components/sections/DetailSection/
DetailSection.css`, `src/data/images.generated.ts`, `src/entry-server.tsx`,
`src/main.tsx`, `src/routes.ts`, `src/seo/pages.ts`, plus new files under
`src/data/productCatalogue.ts`, `src/components/sections/ProductCatalogue/`,
`src/pages/Products/`, `src/pages/ProductDetail/`, and new images in
`assets-src/images/` + `public/images/photos/`.

**This Products group has been built, typechecked, linted, tested, built
(production build), and partially visually verified (hero + catalogue grid on
the hub page confirmed correct) — but the 5 individual product-detail pages
have NOT yet been screenshot-checked, and nothing has been committed.**

## What's done (full page-build groups)

1. ✅ **Shared chrome reconciliation** (committed `bc67004`) — Header, Footer
   (rewritten to the compact variant), MegaMenu (universal content, not
   division-specific), `src/data/navigation.ts` (rewritten around a
   route-existence filter — see "Key pattern" below).
2. ✅ **Contact, FAQ, Careers, Portfolio pages** (committed `728d2e2`).
3. ✅ **About page rebuild** (committed `b78164c`) — full rebuild from
   `about.html`, including a reused-verbatim public-domain dotted world map
   SVG (Natural Earth 1:50m data) for the "reach from Kerala" section.
4. ✅ **Services hub + 14 service-detail pages** (committed `c9314ab`) — a
   shared `ServiceDetailTemplate` component drives all 14 detail pages; the
   hub page has a hand-built pure-CSS laptop-mockup hero.
5. ✅ **Products hub + 5 product-detail pages** (committed `4d86f57`; visual
   QA finished 2026-11-07 — all section structures match the design. Site
   360's design has an empty-bodied "PRODUCT DETAILS / Explore the product."
   section that is intentionally omitted per the empty-section rule below).
6. ✅ **Corporate Training hub + 11 course pages** (committed `5ae94e9` +
   `301732f`).
7. 🟡 **Education product pages** (`/myladder`, `/mindgym`, `/mirrorme`,
   `/filldots`, `/amiu`) — built and verified, **uncommitted** as of
   2026-11-07. Hand-written pages in `src/pages/EducationProduct/` (same
   shape as Products detail pages), SEO breadcrumbs under Products. Fill
   Dots' hero uses `photos/mountain-climb` (design embeds the logo). Legacy
   ladder7.in links repointed to the new internal pages: Education product
   links + AMIU CTA, home ProductSuite (`/products/*`), home Training
   section (`/corporate-training-kerala`); those LEGACY_LINKS entries were
   removed. Only `blogs` and `itTrainingInternship` remain legacy.
   Pieces: `CatalogueGrid` (extracted from ProductCatalogue, shared by both
   hubs), `LandingHero facts` prop (design `.landing-facts`),
   `DetailCurriculum` + `DetailFaq defaultOpen` in DetailSection.tsx,
   `TrainingDetailTemplate`, `src/data/corporateTraining.ts` (hub cards),
   `src/data/corporate-training/*.ts` (one per course, generated verbatim from
   the HTML), pages under `src/pages/CorporateTraining/` + `TrainingDetail/`,
   9 new `photos/training-*` images. Only canonical
   `/corporate-training-kerala/*` routes are registered; the design's
   `/corporate-training/*` aliases are not (no alias mechanism exists).

## What's left (in the agreed order)
8. ⬜ Blog hub (`blogs.html`) + 7 blog posts (`blogs--*.html`) — shared
   template; blog hub likely reuses the same `.catalogue-section` pattern as
   Products (filterable grid) — check before building a new component.
9. ⬜ Utility pages: Privacy, Thank You, Sitemap (HTML sitemap page, not
   sitemap.xml), 404 (already exists, just verify it still matches), Bootcamp,
   Earn More, and the course/program landing pages (`ai-data-science-course-
   trivandrum.html`, `full-stack-developer-course-trivandrum.html`,
   `software-testing-course-trivandrum.html`, `shopify-developer-course-
   workshop.html`, `it-training-internship-trivandrum.html`, `experience-the-
   first-job.html`, `training-internship--career-goal-finding.html`).
10. ⬜ Final full-site verification: lint/test/build across every route,
    responsive breakpoints, interaction testing (menu, forms, filters,
    dialogs), and a Lighthouse pass compared against the project's documented
    baseline (97–100 range).

Also still owed to the user (flagged earlier, not yet acted on): confirm
whether they still want anything further done now that About/Services were
rebuilt from the real design files that originally prompted that question —
this is likely already resolved by now, just noting it existed.

## Key architecture / reusable patterns (don't rebuild these)

- **`C:\Users\user\AppData\Local\Temp\claude\<session>\scratchpad\clean_html.py`**
  — strips `<style>`/`<script>` and replaces base64 image data URIs with short
  placeholders, shrinking a 200KB–5MB single-file export down to a few KB of
  readable markup. **This script lives in a session-specific scratchpad
  directory that will NOT exist in a new session** — recreate it first (it's
  small, see any of the component-build commits' context, or just rewrite it:
  regex-replace `<style>...</style>` and `<script>...</script>` bodies with a
  byte-count comment, and `data:image/...;base64,<data>` with an MD5-based
  placeholder).
- **`window.LADDER7_ROUTES`** — every design HTML file embeds this client-side
  router map (`{"/path": "file.html", ...}`) in an inline script. It is the
  **authoritative source of truth for canonical route slugs** — don't guess
  URL casing/nesting. It revealed, e.g., `/services/*` and `/products/*` and
  `/corporate-training-kerala/*` are nested, but `/myladder`, `/mindgym`,
  `/mirrorme`, `/filldots`, `/amiu` are flat with no hyphenation.
- **Route casing gotcha**: `src/routes.ts`'s `normalisePath()` lowercases
  every path before matching. Some design slugs have mixed case
  (`Web-experience.html`, `Hyperautomation.html`) — register these as
  **all-lowercase** routes (`/services/web-experience`,
  `/services/hyperautomation`) to stay consistent with how this app's router
  actually matches, rather than preserving the source's accidental casing.
- **`src/data/navigation.ts`** — Header/Footer/MegaMenu nav items are filtered
  by `isLive()`, which checks each `to` path against `ROUTES` from
  `src/routes.ts`. This means **nav items for pages that don't exist yet are
  automatically hidden**, and appear automatically the moment you add that
  page's route — no manual nav editing needed per page, just make sure the
  `to` path in `navigation.ts` already matches the eventual real route.
- **Reusable page-shape components** (for simple "hero + content blocks +
  contact CTA" pages — this covers Careers, Portfolio, FAQ, and all 5 Products
  detail pages, and will very likely cover most of the remaining utility
  pages and course landing pages too):
  - `LandingHero` (`src/components/sections/LandingHero/LandingHero.tsx`) —
    `eyebrow`, `title` (red accent "." auto-appended), `description`, optional
    `image: {name: ImageName, alt, caption}` (omit for the text-only
    `.text-hero` variant).
  - `DetailSection` + helpers
    (`src/components/sections/DetailSection/DetailSection.tsx`) — exports
    `DetailSection` (`eyebrow`, `title`, `light?: boolean`, `children`),
    `DetailCards` (numbered card grid), `DetailList` (arrow-bulleted list),
    `DetailFaq` (accordion), `EmptyState` (bordered callout w/ CTA button). A
    `<p className="detail-emphasis">` renders as a larger pull-quote line.
  - `ContactSection` with `headingLevel="h2"` — the closing CTA, identical
    content everywhere (don't pass other props unless a page's design
    genuinely differs, which none have so far).
  - For a **catalogue/filterable-grid hub page** (Products did this; Blog
    likely needs the same): see `src/data/productCatalogue.ts` +
    `src/components/sections/ProductCatalogue/ProductCatalogue.tsx` for the
    pattern (`useState` filter + `.filter()` over a flat data array, each item
    has a `category` field and an `ImageName`).
  - For a **richer, many-section template reused by a whole family of detail
    pages** (Services did this; Corporate Training very likely needs the same
    — check one example training-detail page first): see
    `src/components/sections/ServiceDetailTemplate/ServiceDetailTemplate.tsx`
    and its content-shape type `ServiceDetailContent`, plus the 14 data files
    under `src/data/services-detail/` for the extraction pattern.
- **Image pipeline**: new images go in `assets-src/images/`, get a job entry
  in `scripts/optimize-images.mjs` (`{src, name: "photos/x", widths, formats:
  ["webp"]}`), then `npm run images` regenerates `public/images/photos/*` and
  `src/data/images.generated.ts`. Extract images from a design HTML's base64
  data URIs by MD5-matching against already-extracted images first (many
  photos are reused across multiple pages) before adding a new one.
- **Wiring a new page** (routes.ts → seo/pages.ts → main.tsx →
  entry-server.tsx → scripts/prerender.mjs) — always 5 files, always the same
  shape. **When delegating page-building to parallel subagents**, have them
  create ONLY the page component (+ data file if needed) and explicitly tell
  them NOT to touch these 5 shared files — do that wiring yourself afterward
  in one consolidated pass per group, or you'll get merge conflicts between
  agents editing the same files in parallel. This worked well for both
  Services (3 parallel agents) and Products (2 parallel agents).
- **Verification loop per page/group**: `npx tsc -b` → `npm run lint` →
  `npm test -- --run` → `npm run build` (prerenders every route — watch for
  the route count in its output to confirm new routes registered) → restart
  the local prod server (`node server.mjs`, port 8080; kill whatever's
  holding the port first) → screenshot each new page section-by-section via
  the built-in browser tool and compare against what the HTML source
  actually says, not just "does it look nice".

## Known gotchas hit so far (don't re-discover these)

- The design evolved between when Home/Education were originally built and
  this `ladder7-complete-html` export: shared chrome (footer, menu, header
  nav) had drifted. Already reconciled — don't redo this.
- `.pill`/`.outline` are the **design's own** raw CSS class names from the
  source HTML — this codebase's actual button component is `Button` /
  `btn`/`btn--outline`/`btn--primary`. Don't write raw `<a className="pill">`
  — use `<Button>`.
- CSS selectors like `.about-hero h1 span` (no child combinator) can
  accidentally match a nested `<span className="accent">` and break layout —
  always scope with `>` when targeting direct structural children.
- Empty content sections in the source (some service/product pages have a
  `.detail-section-body` with literally nothing in it, or no `.inner-
  about-cards`/`.inner-deliverables` at all) are real, not extraction bugs —
  the shared templates conditionally skip rendering when an array is empty,
  don't fabricate placeholder content to fill them.
- A couple of catalogue thumbnail images in the source are placeholder/broken
  (e.g. Fill Dots' card image hash matched the **brand logo**, clearly a
  missing-image artifact in the source) — use reasonable judgement to
  substitute a fitting existing image rather than literally showing the logo.

## Immediate next step

1. Re-run `git status`/`git log` to confirm current state hasn't changed.
2. If the Education product pages (item 7) are still uncommitted, ask the
   user whether to commit them before moving on.
3. Continue with the Blog hub + 7 posts (item 8 below). When Blog lands,
   repoint `LEGACY_LINKS.blogs` (NotFound page) too.

Note: the local prod server may land on port 8081 if a stale `node
server.mjs` still holds 8080 (the preview tool auto-picks a free port).
