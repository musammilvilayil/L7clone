# Performance Report

Measured against the **production build**, served by `server.mjs` on
`localhost:8080` — not the dev server, and not a hosted deployment. Re-run the
commands in §5 after any change to check for regressions; numbers will differ
slightly once deployed to real hosting and a real network.

Environment: Chrome (headless), Lighthouse 12.8.2, Windows, build of
2026‑11‑05.

## 1. Lighthouse scores

| Page | Mode | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | Mobile | 97 | 100 | 100 | 100 |
| `/` | Desktop | 100 | 100 | 100 | 100 |
| `/services` | Mobile | 98 | 100 | 100 | 100 |
| `/services` | Desktop | 100 | 100 | 100 | 100 |
| `/about` | Mobile | 97 | 100 | 100 | 100 |
| `/about` | Desktop | 100 | 100 | 100 | 100 |
| `/contact` | Mobile | 99 | 100 | 100 | 100 |
| `/contact` | Desktop | 100 | 100 | 100 | 100 |

## 2. Core Web Vitals (lab data, from the same run)

| Page | Mode | FCP | LCP | TBT | CLS | Speed Index |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Mobile | 1.9 s | 2.4 s | 50 ms | 0 | 1.9 s |
| `/` | Desktop | 0.5 s | 0.5 s | 0 ms | 0 | 0.5 s |
| `/services` | Mobile | 1.9 s | 2.1 s | 0 ms | 0 | 1.9 s |
| `/services` | Desktop | 0.5 s | 0.5 s | 0 ms | 0 | 0.5 s |
| `/about` | Mobile | 1.9 s | 2.4 s | 10 ms | 0 | 1.9 s |
| `/about` | Desktop | 0.5 s | 0.6 s | 0 ms | 0 | 0.5 s |
| `/contact` | Mobile | 1.7 s | 1.8 s | 20 ms | 0 | 1.7 s |
| `/contact` | Desktop | 0.4 s | 0.5 s | 0 ms | 0 | 0.5 s |

CLS is 0 on every page: every image carries explicit width/height (via
`<ResponsiveImage>`), the self-hosted font uses a metric-matched fallback
(`Geist Fallback`, see `src/styles/typography.css`), and nothing shifts layout
on hydration.

## 3. What made this possible

- **Static HTML, not a client-rendered shell.** Every route is fully rendered
  server-side at build time (`react-dom/static`) and hydrated, not rendered
  into an empty `<div id="root">` after a JS round trip — this alone accounts
  for most of the FCP/LCP numbers above (see `PROJECT_ARCHITECTURE.md §3`).
- **CSS inlined into the prerendered HTML** (`scripts/prerender.mjs`): zero
  render-blocking external stylesheet requests on first load. A
  `media="not all"` link is still emitted so client-side navigation's chunk
  loader recognises the stylesheet without re-fetching it.
- **Route-level code splitting**: each page is its own JS/CSS chunk
  (`React.lazy` in `main.tsx`); visitors download only the page they open.
  The shared entry chunk (React + Router + layout) is 288 KB raw / **78.7 KB
  Brotli** — the only JS every page pays for.
- **Self-hosted, preloaded font**: one WOFF2 file
  (`/fonts/geist-latin-wght-normal.woff2`, Latin subset, ~29 KB), preloaded in
  `index.html`, `font-display: swap`, with a metric-matched `Geist Fallback`
  face so the swap doesn't reflow headings.
- **Images**: every photo and the two 3 MB statue PNGs from the design were
  converted to AVIF + WebP at 2–3 responsive widths each
  (`scripts/optimize-images.mjs`); `<ResponsiveImage>` emits a `<picture>`
  with `srcset`/`sizes`, `loading="lazy"` below the fold, and intrinsic
  dimensions. The statues went from ~3 MB PNG each to 28–127 KB AVIF.
- **The WebGL particle hero** starts after `requestIdleCallback` (never
  competes with first paint or hydration), stops rendering when scrolled
  off-screen or the tab is hidden, caps device pixel ratio at 1.75, and draws
  a single static frame under `prefers-reduced-motion`.
- **Scroll-driven effects** (footer parallax, the journey timeline, "Why
  Ladder7", the delivery pathway) share one `requestAnimationFrame`-batched
  loop (`useScrollFrame`) instead of each registering its own scroll
  listener — see `PROJECT_ARCHITECTURE.md §5`.
- **Compression**: every text asset (HTML, JS, CSS, sitemap, robots.txt) is
  pre-compressed at build time with both Brotli and Gzip; `server.mjs` serves
  whichever the client's `Accept-Encoding` prefers. The home page's HTML is
  169 KB raw, **26.8 KB over the wire**.
- **Caching**: `/assets/*` (content-hashed by Vite) is cached
  `public, max-age=31536000, immutable`; everything else gets 30 days;
  HTML is always `no-cache` so a deploy is visible immediately.

## 4. Known, accepted trade-offs

Lighthouse still flags a few items below the 0.9 threshold on some pages;
none were worth the cost of fixing further:

- **`unused-javascript` (~33–37 KB)**: React, React DOM and React Router's own
  code that a single page doesn't call. This is the floor for any React app
  of this size; eliminating it would mean dropping React Router or React
  itself, which contradicts the brief's stack requirement.
- **`uses-long-cache-ttl`** on the font file and the logo: both are served
  from `public/` (not content-hashed), so they get the 30-day `max-age`
  rather than the 1-year `immutable` the hashed `/assets/*` bundle gets. The
  trade-off is deliberate — a brand asset that might change shouldn't be
  cached for a year under a filename that never changes.
- **`network-dependency-tree-insight`**: an informational diagnostic (no
  numeric score), not a failure.
- One desktop run flagged `bf-cache` once (a transient Chrome
  back-forward-cache classification); it did not reproduce on a second run
  and is not a real issue with the site.

## 5. How to re-run this report

```bash
npm run build
node server.mjs &                 # serves http://localhost:8080

npx lighthouse http://localhost:8080/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --view

npx lighthouse http://localhost:8080/ --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --view
```

Repeat for `/services`, `/about`, `/contact`. Numbers measured on a hosted
deployment will differ from localhost (real network latency, a real CDN,
possibly a slower or faster server) — re-run against the live URL after
deploying and compare against the baseline above.

## 6. Manual testing performed for this release

In addition to Lighthouse, the production build was checked directly (see
`PROJECT_ARCHITECTURE.md §7` for what the automated Vitest suite covers
instead):

- **No horizontal overflow** at 1920, 1440, 1366, 1024, 768, 425, 375 and
  320 px, on all four pages.
- **Server behaviour**: `/about` → 200, `/about/` → 301 → `/about`, an
  unknown path → 404 (real HTTP status, not a 200 with 404-looking content),
  `robots.txt`/`sitemap.xml` → 200, a path-traversal attempt
  (`/..%2f..%2fpackage.json`) → 404, Brotli/Gzip negotiated correctly.
- **Interactions**: overlay menu (opens, traps focus, `inert`s the
  background, Escape closes and restores focus), the training section's CTA
  (pre-fills interest + message and focuses the name field), contact form
  validation (empty submit, invalid email, successful submit opens the
  correct WhatsApp URL and shows the confirmation panel), capability rows
  selecting the matching solution tab and syncing the contact form's
  pre-selected interest, the solutions/product-suite tabs' keyboard
  navigation, the FAQ accordion (opening one closes the others), and the
  film dialog (opens, plays, Escape closes).
- **Client-side navigation**: title, canonical, meta description and the
  JSON-LD count update correctly when moving between pages without a full
  reload, and a 404 route sets `noindex` and removes the canonical tag.
- **Console**: zero JavaScript errors across all of the above.
