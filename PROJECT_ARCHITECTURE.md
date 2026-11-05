# Project Architecture

How the Ladder7 website is put together, and why. For the design tokens see
[LADDER7_DESIGN_SYSTEM.md](LADDER7_DESIGN_SYSTEM.md); for component usage see
[COMPONENT_DOCUMENTATION.md](COMPONENT_DOCUMENTATION.md); for SEO see
[SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md).

## 1. Stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI | React 19.3 | matches the reference project, concurrent features |
| Language | TypeScript 6 (strict) | catches the drift the reference project's loose typing allowed |
| Build | Vite 8 (Rolldown) | same tool as the reference, fast, native SSR build mode |
| Routing | React Router 7 | client navigation; `StaticRouter` reused for prerendering |
| Styling | Plain CSS + custom properties | brief requires a centralized design system, not a utility framework |
| Prerendering | `react-dom/static` (`prerender`) | real React tree, hydrates; no headless browser needed |
| Server | Dependency-free Node `http` | ~200 lines, nothing to patch for CVEs |
| Images | `sharp` → AVIF/WebP, generated at build time | no runtime image service |
| Tests | Vitest | validates SEO/content data, not UI (see §7) |

No animation library, no icon library, no CSS framework: the design's motion is
CSS transitions/keyframes plus a handful of small hooks (see §5), and the one
recurring icon (↗) is an inline SVG component.

## 2. Folder structure

```
src/
├── App.tsx              shared app shell (routes, layout, providers) — used by
│                         both main.tsx (browser) and entry-server.tsx (build)
├── main.tsx              browser entry: lazy routes, hydrateRoot
├── entry-server.tsx      build-time entry: eager routes, prerender()
├── routes.ts             route table (pure data — no React import)
│
├── components/
│   ├── common/           cross-cutting: SmartLink, ResponsiveImage, Seo,
│   │                     ScrollManager, RoutePrefetch, Icons, Lines
│   ├── ui/                design-system primitives: Button, Eyebrow,
│   │                     SectionHeading, TagList
│   ├── layout/            Header, Footer (page chrome)
│   ├── navigation/        MegaMenu (overlay menu + enquiry)
│   ├── forms/             EnquiryForm (shared by the menu and contact section)
│   └── sections/<Name>/   one folder per page section, each with its .tsx
│                         and co-located .css (Hero, ProductSuite, Solutions,
│                         Approach, Delivery, WhyLadder7, MotionStory,
│                         PossibilitiesWall, Audience, Faq, Training, Contact,
│                         Capabilities, PageHero, Services, Products, Locations)
│
├── pages/<Name>/          one file per route, composed from section components
├── layouts/MainLayout.tsx skip link, header, overlay menu, main, footer
│
├── context/EnquiryContext.tsx   overlay menu open state + enquiry prefill
├── hooks/                 useScrollFrame, useReveal, useRovingTabs,
│                         useFocusTrap, useMediaQuery, useInView
├── services/enquiry.ts    validation, WhatsApp hand-off, optional endpoint POST
├── config/env.ts          typed, validated environment variables
├── data/                  all copy and structured content (see §4)
├── seo/                   pages.ts (data), schema.ts (JSON-LD), head.ts
│                         (render/apply), files.ts (sitemap/robots)
├── styles/                design system (see LADDER7_DESIGN_SYSTEM.md §1–7)
└── utils/                 cn, cssVars, clamp/smoothstep, link classification

scripts/
├── optimize-images.mjs    assets-src/images → public/images (AVIF/WebP) +
│                         src/data/images.generated.ts
├── generate-icons.mjs     brand logo → favicons, app icons, schema logo
├── copy-fonts.mjs         self-hosts Geist from node_modules
└── prerender.mjs          post-build: renders every route, inlines CSS,
                          writes sitemap.xml/robots.txt/404.html, compresses

assets-src/                 source images/fonts the scripts above consume
                          (not shipped; public/ is the shipped, generated output)
server.mjs                  production static server (see
                          SETUP_AND_DEPLOYMENT.md)
```

Rule of thumb: a **page** lays out **sections**; a **section** is a named
chunk of the design (its own folder, its own CSS); **ui/common** are the
pieces more than one section reuses; **data/** holds every string the pages
render, so copy changes never touch a component.

## 3. Rendering pipeline

```
npm run build
  ├─ tsc -b                         type-check (no emit)
  ├─ vite build                     client bundle → dist/client (+ manifest.json)
  ├─ vite build --ssr entry-server  server bundle → dist/server (build-only)
  └─ node scripts/prerender.mjs
       ├─ imports dist/server/entry-server.js
       ├─ for each route in src/routes.ts:
       │     render(path) → { appHtml, headHtml }   (react-dom/static)
       │     inline the page's CSS chunks into index.html's <head>
       │     write dist/client/<route>/index.html
       ├─ writes dist/client/404.html, sitemap.xml, robots.txt, routes.json
       └─ Brotli + Gzip every text asset
```

- **`App.tsx`** is rendered by *both* entries with the same route table, so the
  server and client trees can never diverge (no hydration mismatch by
  construction). The only difference is how page components arrive: eager
  imports on the server, `React.lazy` in the browser.
- **CSS is inlined**, not linked, in the prerendered HTML (`PRERENDER_INLINE_CSS`
  env var can disable this). A non-blocking `<link rel="stylesheet" media="not
  all">` is kept alongside each inlined block purely so Vite's own
  client-side chunk loader recognises the stylesheet as already present when
  the visitor navigates to another route — it is never fetched on first load.
- **Hydration**: `main.tsx` calls `hydrateRoot` when the `#root` div already
  has content (the normal, built case) and falls back to `createRoot` only
  when running against the plain Vite dev server (`npm run dev`), which skips
  prerendering entirely.
- **`window.__l7Hydrated`**: a flag in `index.html`'s inline script sets
  `motion-ready` on `<html>` immediately (so entrance animations run without
  waiting for JS) and removes it again after 6s if hydration never completed —
  the safety net for a blocked or failed script.

## 4. Data layer

Every string of copy lives in `src/data/*.ts`, typed, and is the single
source both the React components and `scripts/prerender.mjs`'s drift guard
read from:

| File | Content |
| --- | --- |
| `site.ts` | company facts, locations, legacy-site links |
| `navigation.ts` | header, overlay menu, footer link structures |
| `services.ts` | the four capabilities + three solution tabs |
| `products.ts` | the five Ladder7 products |
| `process.ts` | the four-phase journey + seven delivery steps |
| `company.ts` | "why Ladder7" reasons, audiences, training, FAQs |
| `media.ts` | which photo goes where (film slides, wall collage, statues) |
| `images.generated.ts` | **generated** — do not edit; see `scripts/optimize-images.mjs` |

Adding a product, FAQ or capability is a data-file edit; no JSX changes.

## 5. Interaction architecture

Nothing in this project depends on `framer-motion` or another animation
runtime. Three small, shared primitives cover every effect the design uses:

- **`useScrollFrame`** (`hooks/useScrollFrame.ts`) — one `requestAnimationFrame`-
  batched scroll/resize loop for the whole page. Each subscriber *reads*
  layout, returns a function that *writes* (CSS custom properties, class
  toggles); all reads run before all writes each frame, so nothing forces a
  synchronous layout. Used by the footer parallax, the journey timeline, the
  reading-copy word-lighting, "Why Ladder7", the pathway board and the film
  launch scale.
- **`useReveal`** (`hooks/useReveal.ts`) — one shared `IntersectionObserver`;
  elements with the `reveal` class get `.is-visible` once, then unobserve.
- **`useRovingTabs`** (`hooks/useRovingTabs.ts`) — the WAI-ARIA tabs keyboard
  model (arrow keys, Home/End, roving `tabindex`), shared by the solutions
  tabs, the product-suite tabs and the seven-step pathway tabs.
- **`useFocusTrap`** (`hooks/useFocusTrap.ts`) — Tab-cycling, Escape and
  focus-restore for the overlay menu.

All of the above degrade to "fully visible, fully static" automatically: the
`.reveal`/`.motion-ready` classes only hide content once JavaScript has set
`motion-ready` on `<html>`, so a crawler or a visitor with JavaScript disabled
always sees the complete page (see `index.html`'s inline script and
`src/styles/animations.css`).

## 6. Accessibility and resilience decisions

- Overlay menu: real focus trap, `inert` on the rest of the page while open
  (`layouts/MainLayout.tsx`), Escape to close, focus restored to the trigger.
- Film dialog: native `<dialog>` (`showModal`), so focus containment and
  Escape are the browser's own behaviour, not re-implemented.
- Forms: validation runs on blur and on submit; the submit button is **never**
  disabled (a corrected gap from the Whiteline reference, see
  [WHITELINE_PROJECT_ANALYSIS.md §6](WHITELINE_PROJECT_ANALYSIS.md)), errors
  use `aria-invalid`/`aria-describedby`, and a `role="alert"` summary
  announces how many fields need attention.
- FAQ accordion: native `<details>`/`<summary>` — keyboard and screen-reader
  support for free, content present in markup even with JavaScript off.
- Colour: every text/background pair in the design system was checked against
  WCAG AA and adjusted where the original design fell short (12 pairs; see
  [LADDER7_DESIGN_SYSTEM.md §2](LADDER7_DESIGN_SYSTEM.md)); Lighthouse
  accessibility is 100 on every page (see
  [PERFORMANCE_REPORT.md](PERFORMANCE_REPORT.md)).
- `prefers-reduced-motion: reduce`: every animation and scroll-pinned scene
  has a static fallback, defined in the same stylesheet as the effect.

## 7. Testing

`npm test` runs Vitest against `src/**/*.test.ts`. The suite is deliberately
small and data-focused (not a UI test harness): it checks that every route has
a `PAGE_SEO` entry, that `buildSitemap`/`buildRobots` produce well-formed
output, and that `validateEnquiry` rejects/accepts the expected inputs. UI and
cross-page behaviour (navigation, forms, responsive layout, accessibility,
Lighthouse) were verified manually against the production build — see
[PERFORMANCE_REPORT.md](PERFORMANCE_REPORT.md) for the results and the exact
commands used, which can be re-run after any change.

## 8. What intentionally differs from the Whiteline reference

See [WHITELINE_PROJECT_ANALYSIS.md §7](WHITELINE_PROJECT_ANALYSIS.md) for the
full reasoning. In short: Tailwind → plain CSS, `framer-motion` → CSS +
small hooks, Puppeteer prerendering → `react-dom/static`, Express → a
dependency-free server, and several bug fixes (hard-coded endpoint, a submit
button disabled instead of validated, no focus trap) were not carried over.
