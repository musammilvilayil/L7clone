# Whiteline Project Analysis

Technical and functional reference review of `C:\Users\user\Desktop\ladder7\Whiteline`
(GitHub: `ladder7-dev/Whiteline`), carried out before any Ladder7 code was written.

The Whiteline repository was **read only**. No file in it was created, changed or
deleted (`git status` is clean).

Whiteline is used here as the **technical reference only**. Its visual design
(serif headings, oxblood/porcelain palette, dental imagery) is deliberately not
carried into Ladder7.

---

## 1. Summary

| Area | Whiteline approach | Verdict for Ladder7 |
| --- | --- | --- |
| Framework | React 19 + TypeScript + Vite 8 (Rolldown) | **Adopt** |
| Routing | React Router 7, `BrowserRouter`, all pages `React.lazy` | **Adopt**, simplified |
| Styling | Tailwind CSS v4 with `@theme` tokens + long arbitrary-value class strings | **Replace** with plain CSS + custom-property tokens (brief requires plain CSS / CSS Modules) |
| Animation | `framer-motion` (`LazyMotion` + `m` components) | **Drop**. The Ladder7 design animates with CSS + a few small hooks |
| SEO meta | `<SEO>` component writing `<head>` tags in `useEffect` | **Adopt the idea**, render the same data at build time too |
| Prerendering | Puppeteer loads every route in headless Chrome after build | **Replace** with React's own `react-dom/static` prerender (no browser needed) |
| Server | Express + `express-static-gzip`, cache headers, 404 status, prerender map, 301s | **Adopt the behaviour**, dependency-free Node server |
| Forms | Controlled form, touched-based validation, `fetch` POST to a leads API | **Adopt the pattern**, adapted to the design's WhatsApp hand-off |
| Modals | Portal + framer-motion, Escape to close, body scroll lock | **Improve**: focus trap + focus restore + `inert` background |
| Images | Pre-optimised WebP in `public/`, `sharp` script, LCP preload | **Adopt**, add AVIF + responsive `srcset` |
| Performance | Route prefetch on hover, deferred sections, deferred third-party scripts, precompression, immutable caching | **Adopt** the relevant parts |

---

## 2. Architecture

### 2.1 Repository layout

```
Whiteline/
├── .claude/launch.json            dev server config (npm run dev --prefix Client)
├── .github/workflows/main_Whiteline.yml   CI: build + deploy to Azure Web App
├── Client/                        the whole React application
│   ├── index.html                 shell: font preload, LCP poster preload, inline hero placeholder,
│   │                              deferred Google Translate + chatbot loader
│   ├── vite.config.ts             React, Tailwind, non-blocking-CSS plugin, Brotli+Gzip, vendor chunks
│   ├── prerender.mjs              Puppeteer prerender of every route into dist/<route>/index.html
│   ├── scripts/gen-routes.ts      builds the prerender route manifest + redirects.json, with drift guards
│   ├── scripts/optimize-images.{js,mjs}   one-off sharp recompression
│   ├── server.js                  production Express static server
│   ├── public/                    ~22 MB of images/video, robots.txt, sitemap.xml, llms.txt
│   └── src/
│       ├── main.tsx, App.tsx      bootstrap, router, route prefetch, scroll restoration
│       ├── layouts/MainLayout.tsx skip link, banner, navbar, footer, sticky buttons, cookie banner
│       ├── components/
│       │   ├── ui/                Button, Heading, Text, Container, Section, SectionHeader, Input …
│       │   ├── booking/           BookingForm + BookingModal
│       │   ├── homepage/ aboutpage/ servicespage/ blogpage/ blogarticle/ …   page-section folders
│       │   ├── Navbar.tsx, Footer.tsx, SEO.tsx, DeferredSection.tsx, CookieBanner.tsx …
│       ├── context/               BookingContext (modal), BannerContext (remote announcement bar)
│       ├── data/                  seoData, schemaData, aliases, clinicInfo
│       ├── pages/                 one file per route
│       └── utils/                 cn (clsx + tailwind-merge), tracker (consent-gated analytics)
├── output/qa/…                    QA evidence (screenshots, JSON results, reports) per content release
└── package-lock.json
```

### 2.2 Application architecture

- **Entry**: `main.tsx` calls `createRoot(...).render(<StrictMode><App/></StrictMode>)`.
  It always client-renders; prerendered HTML is replaced, not hydrated.
- **App shell** (`App.tsx`):
  - `BrowserRouter` → `ScrollToTop`, `ScrollToHash`, `RoutePrefetch`.
  - `LazyMotion features={domAnimation}` keeps framer-motion's feature bundle small.
  - `BookingProvider` wraps the routes; `BookingModal` is rendered once, outside the routes.
  - Every page is `lazy()`-loaded. The importer map is shared with the prefetcher so hovering a
    link warms exactly the chunk the navigation will use.
  - Nested `<Routes>` inside `<MainLayout>`; ~100 SEO alias routes map onto canonical pages and
    canonicalise back to them; retired URLs render `<Navigate replace>` (the server sends a 301).
- **Layout** (`MainLayout.tsx`): skip link → marquee banner → navbar → `<main>` → sticky contact
  buttons → footer → scroll-to-top → cookie banner.
- **Pages** are thin: an `<SEO>` element plus an ordered list of section components. Below-the-fold
  sections on the home page are wrapped in `<DeferredSection>`.

### 2.3 Styling architecture

- Tailwind v4 via `@tailwindcss/vite`; tokens declared once in `src/index.css` `@theme`
  (palette, semantic colours, fonts, marquee keyframes).
- Base layer: box-sizing, `overflow-x: clip` (keeps `position: sticky` working), body font,
  responsive media defaults, third-party widget overrides.
- Components use Tailwind utilities, often with arbitrary values (`text-[14px] leading-[22px]`,
  `bg-[#403530]/60`). `cn()` (clsx + tailwind-merge) merges overrides.
- Typography and buttons are centralised in `Heading.tsx`, `Text.tsx` and `buttonStyles.ts`
  (variant/size maps), which is the right idea.
- Weakness: many hex colours and pixel values are repeated inside components instead of using the
  tokens (e.g. `#7A1F23` hard-coded in `ScrollToTopButton` and `BookingForm` while
  `--color-primary` exists). Changing the brand colour would require a search-and-replace.

### 2.4 Assets

- Everything lives under `public/` (not processed or hashed by Vite), organised per page
  (`homepage/`, `servicespage/subpage/before_after/` …).
- Images are already WebP; hero uses a poster image with the video mounted later.
- `assetsInlineLimit: 0` prevents base64 inlining.
- No AVIF and no responsive `srcset`; one size is served to all devices.

### 2.5 Build and deployment

- `npm run build` = `tsc -b && vite build && tsx scripts/gen-routes.ts && node prerender.mjs`.
- Vite plugins: React, Tailwind, a custom plugin that turns stylesheet links into
  `preload` + `onload` swaps (non-blocking CSS) with `<noscript>` fallback, and
  `vite-plugin-compression2` (Brotli + Gzip, videos excluded).
- Manual vendor chunks: `vendor-react`, `vendor-router`, `vendor-motion`, `vendor-icons`.
- CI (`main_Whiteline.yml`): Node 22, `npm install --legacy-peer-deps`, build, assemble
  `deploy/` (dist + server.js + a package.json with only `express` and `express-static-gzip`),
  deploy to Azure Web App with a publish-profile secret.
- `server.js`: 301 redirects from `redirects.json`, maps prerendered routes to their snapshot,
  `/assets` cached immutable for a year, other files for a month, HTML `no-cache`,
  unknown URLs get the content-free shell **with HTTP 404** (avoids soft-404s).

---

## 3. Functional analysis

| Feature | Implementation | Notes |
| --- | --- | --- |
| Header / navigation | `Navbar.tsx` (~840 lines): top info bar, logo, links, treatments dropdown, CTA | Hides itself 2.5 s after scrolling; shrinks into a floating pill; glass background on some routes |
| Responsive mobile nav | Same component, `lg:hidden` hamburger, dropdown panel with expandable treatment list | `aria-expanded` and labels present; no focus trap; `body.nav-open` class hides the chatbot |
| Dropdown menus | Treatments mega-dropdown toggled by a chevron button; closes on outside `mousedown` | Toggle is separate from the link, so the link still navigates |
| Language switch | Google Translate cookie + full page reload | Third-party dependency, loaded on first interaction |
| Buttons / links | `Button` renders `<a>` or `<button>` by `href`; variants via `getButtonClasses`; arrow icon slot | Hover fills via a `:before` layer translating up |
| Forms & validation | `BookingForm`: controlled inputs, `touched` map, `validate()` on every render, phone input filtered to digits/symbols, `min` date | Submit is **disabled until valid**, which hides errors from users who never touch a field |
| Form submission / API | `fetch` POST JSON to a hard-coded leads endpoint; `isSubmitting`, `submitError`, success screen auto-resets after 5 s | API URL is hard-coded although `VITE_API_URL` exists in `.env` (unused) |
| Modals | `BookingModal`: portal to `body`, framer-motion backdrop/panel, Escape closes, body scroll lock, focus close button after 350 ms | No focus trap and no focus restore on close |
| Context / state | `BookingContext` (`openBooking(treatment?)` from any button), `BannerContext` (fetched announcement config → `--banner-h` CSS var) | Local `useState` elsewhere; no global store, which is appropriate |
| Animations | framer-motion variants (`fadeUp`, stagger), `whileInView`; CSS marquee | ~240 `whileInView` usages |
| Sliders / carousels | Native horizontal scroll containers + `scrollBy`, auto-advance every 4 s while in view (IntersectionObserver), play/pause button | Good: native scrolling, keyboard and touch friendly |
| Accordions | FAQ with `openIndex` state, auto-play cycling while in view | |
| Loading states | `Suspense fallback={null}` for routes, `isSubmitting` label in forms, idle-mounted `DeferredSection` placeholders with reserved `minHeight` | |
| Error handling | `try/catch` around fetches returning safe defaults (`DISABLED` banner), inline form error | One `console.log` left in production code |
| Scroll handling | `ScrollToTop` on pathname change (skipped when hash present); `ScrollToHash` waits via `MutationObserver` + `document.fonts.ready` | Robust for lazy routes |
| Cookie consent | `CookieBanner` stores `wl_cookie_consent`; tracker + gtag only load after acceptance | GA/Ads IDs hard-coded in `tracker.ts` |
| 404 | `NotFoundPage` + server 404 status | |

---

## 4. Technical implementation details

- **Component communication**: props down; context for cross-tree actions (booking modal,
  banner); CSS custom properties written to `<html>` for layout values (`--banner-h`).
- **State management**: React state + two small contexts. No Redux/Zustand. Appropriate for a
  marketing site.
- **API requests**: inline `fetch` inside components (BookingForm, BannerContext). No service
  layer, so endpoints are scattered.
- **Reusable components**: `ui/` primitives (Button, Heading, Text, Section, Container,
  SectionHeader, Input). Page sections are page-specific and rarely reused (two near-identical
  booking forms exist in `booking/` and `smilemakeover/`).
- **CSS scoping**: utility classes, so there is no cascade conflict, but also no single place to
  restyle a card or section.
- **Image loading**: `loading="lazy"` on below-the-fold images (≈36 places), `fetchpriority="high"`
  and `<link rel=preload>` for the LCP poster and logo, explicit `width`/`height`.
- **Performance optimisations**: route chunk prefetch on hover/focus/touch, `DeferredSection`
  (IntersectionObserver + `requestIdleCallback` mount), video mounted after load and skipped on
  Save-Data, third-party scripts on first interaction or after 5 s, precompressed assets,
  long-lived caching, modulepreload hints injected for each prerendered route.
- **Routing**: alias routes are pure data in `data/aliases.ts` so the build scripts and the app
  share one list; `gen-routes.ts` fails the build if a service or article lacks SEO data or if a
  redirect points to a non-existent route.

---

## 5. Dependency analysis

| Package | Used for | Reuse in Ladder7? |
| --- | --- | --- |
| `react`, `react-dom` 19 | UI | **Yes** |
| `react-router-dom` 7 | Routing | **Yes** (as `react-router` 7, which v7 recommends; not v8, an untested major) |
| `typescript` ~6, `vite` 8, `@vitejs/plugin-react` 6 | Tooling | **Yes** |
| `eslint` 10, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `@eslint/js` | Linting | **Yes**, same flat config |
| `sharp` (dev) | Image optimisation | **Yes**, extended to AVIF + responsive widths |
| `tailwindcss`, `@tailwindcss/vite`, `tailwind-merge`, `clsx` | Styling | **No**: brief asks for centralised plain CSS; the design ships hand-written CSS |
| `framer-motion` | Animations | **No**: design motion is CSS keyframes/transitions + scroll-driven custom properties; saves ~30 KB+ of JS |
| `lucide-react`, `react-icons` | Icons | **No**: the design uses one arrow glyph and a few symbols; inline SVG components are smaller |
| `puppeteer` (dev) | Prerendering | **No**: `react-dom/static` prerenders without a browser; no Chrome dependency in CI |
| `tsx` (dev) | Running TS build scripts | **No**: build scripts run on the compiled SSR bundle |
| `express`, `express-static-gzip` | Production server | **No**: replaced by a ~150-line dependency-free Node server with the same behaviour |
| `vite-plugin-compression2` (dev) | Brotli/Gzip | **No**: done with `node:zlib` in the post-build script |
| `@types/react-router-dom` v5 | Types | **No**: obsolete; React Router 7 ships its own types |

---

## 6. Issues observed (so Ladder7 avoids them)

1. Design tokens exist but many colours/sizes are hard-coded in components.
2. `Navbar.tsx` mixes six concerns and duplicates the link markup for route/non-route links.
3. SEO tags exist only after JS runs; a headless-Chrome prerender (45 s per-route timeout,
   memory tuning, browser path detection) was added to compensate.
4. API endpoint hard-coded despite an unused `VITE_API_URL`.
5. Booking submit button disabled until valid; modal lacks focus trap/restore.
6. Leftover files: `Client/scratch.js`, unused `Client/src/tsconfig.json` (CommonJS),
   two versions of `optimize-images`.
7. `@types/react-router-dom` v5 and the build-only packages (`tailwindcss`, `express`) sit in
   `dependencies`.
8. One `console.log` of API data in production code.
9. Single image size for all devices; no AVIF.

---

## 7. Recommendations applied to Ladder7

1. **Same stack and folder conventions** (React 19, TS, Vite 8, React Router 7, ESLint flat
   config), `pages/` thin, sections composed from reusable components, data in `data/`.
2. **Centralised plain CSS**: tokens in `styles/variables.css`, element typography in
   `typography.css`, shared component classes in `components.css`, section CSS co-located with
   its component and consuming tokens only.
3. **SEO from one data module** (`src/seo/pages.ts`), used by:
   the runtime `<Seo>` head manager, the build-time prerender, `sitemap.xml` and `robots.txt`.
   A drift guard fails the build if a route has no SEO entry.
4. **Real static prerendering with hydration** (`react-dom/static` + `hydrateRoot`) instead of
   client re-rendering over a puppeteer snapshot: crawlers receive full content and metadata,
   users get no re-render flash, and CI needs no browser.
5. **Server behaviour kept**: prerendered route map, real 404 status, immutable hashed assets,
   `no-cache` HTML, Brotli/Gzip.
6. **Forms**: validation on blur and submit (submit never disabled), accessible error wiring
   (`aria-invalid`, `aria-describedby`, live status), a `services/` integration layer with
   environment configuration, no hard-coded endpoints.
7. **Overlay menu/dialogs**: focus trap, Escape, `inert` background, focus restore.
8. **Performance**: route chunk prefetch on intent, modulepreload + CSS links per prerendered
   route, responsive AVIF/WebP, lazy below-the-fold media, WebGL started after first paint and
   paused when off-screen, reduced-motion support everywhere.
