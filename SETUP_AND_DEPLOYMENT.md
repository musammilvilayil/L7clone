# Setup and Deployment

## 1. Requirements

- Node.js ≥ 22.12 (see `engines` in `package.json`)
- npm (ships with Node)

## 2. First-time setup

```bash
npm install
cp .env.example .env     # adjust values — see §3
npm run dev               # http://localhost:5173
```

`npm run dev` runs the plain Vite dev server — fast HMR, but **not**
prerendered (the `<div id="root">` is empty until React mounts). Use `npm run
build` + `npm start` (§5) to see the site the way a visitor and a search
engine actually will.

Generated assets (fonts, icons, responsive images) are already committed, so
a fresh clone works without re-running `npm run fonts/icons/images`. Re-run
them only when you change a source file in `assets-src/`:

```bash
npm run fonts    # assets-src font package → public/fonts
npm run icons    # assets-src/images/ladder7-logo.webp → public/icons/*, manifest
npm run images   # assets-src/images/* → public/images/* (AVIF/WebP) + src/data/images.generated.ts
```

## 3. Environment variables

Copy `.env.example` to `.env` (local dev) and/or `.env.production` (build).
Every variable is `VITE_`-prefixed and compiled into the public bundle —
**never put a secret, API key or token here.**

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | `https://www.ladder7.in` | Canonical origin for canonical URLs, Open Graph, JSON-LD and the sitemap. No trailing slash. |
| `VITE_LEGACY_SITE_URL` | `https://www.ladder7.in` | Origin for pages not in this release (see §7). |
| `VITE_WHATSAPP_NUMBER` | `918137979401` | Digits only, country code included. Enquiry forms open `wa.me/<this>`. |
| `VITE_ENQUIRY_ENDPOINT` | *(empty)* | Optional HTTPS endpoint that also receives each enquiry as JSON (see §6). Leave empty to use the WhatsApp hand-off only. |
| `VITE_ALLOW_INDEXING` | `true` | Set to `false` on staging/preview builds: every page gets `noindex` and `robots.txt` disallows all crawling. |

Changing any of these requires a rebuild (`npm run build`) — they are baked
into the static HTML, not read at request time.

## 4. Building for production

```bash
npm run build
```

Runs, in order: `tsc -b` (type-check), the client bundle, the SSR bundle
(build-time only, never shipped to browsers), then
`node scripts/prerender.mjs`, which renders every route to static HTML,
inlines its CSS, writes `sitemap.xml`/`robots.txt`/`404.html`, and
pre-compresses every text asset with Brotli and Gzip. See
`PROJECT_ARCHITECTURE.md §3` for the full pipeline. Output: `dist/client/`
(ship this directory; `dist/server/` is a build-time intermediate, not served).

A build fails loudly, on purpose, if:
- a route has no matching SEO entry, page module registration, or Vite
  manifest chunk (`scripts/prerender.mjs`'s drift guard);
- a rendered page is missing an `<h1>`;
- TypeScript or ESLint (`npm run lint`) finds an error;
- a Vitest test fails (`npm test` — not part of `npm run build`; run it in
  CI, see §8).

## 5. Running the production build locally

```bash
npm start           # or: npm run preview — both run `node server.mjs`
```

Serves `dist/client` on `http://localhost:8080` (override with `PORT`).
`server.mjs` is a ~200-line, dependency-free Node server (see
`PROJECT_ARCHITECTURE.md §1`) that:

- serves each prerendered route's `index.html` for its clean path
  (`/about` → `about/index.html`), 301-redirecting a trailing slash;
- returns a **real HTTP 404** (not a 200) with `404.html` for any unknown
  path;
- negotiates Brotli → Gzip → identity from `Accept-Encoding`;
- sets `Cache-Control: immutable, 1y` for `/assets/*`, 30 days for other
  static files, `no-cache` for HTML;
- sets baseline security headers (`X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`,
  `Cross-Origin-Opener-Policy`) and blocks path traversal.

## 6. Deploying

`dist/client` is a static site — any static host works (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3+CloudFront). Configure the host to:
serve `404.html` with a 404 status for unmatched paths, respect the
precompressed `.br`/`.gz` files if the host doesn't compress on the fly, and
serve `/assets/*` as immutable (most hosts default to something close to
this).

To deploy on a Node host instead (Azure App Service, Render, a VPS — the
pattern the current `ladder7.in` uses), ship `dist/client`, `server.mjs` and
`package.json`, install only production dependencies (there are none beyond
Node itself), and run `node server.mjs` with `PORT` set by the platform.

### Enquiry endpoint (optional)

The contact form and the overlay menu's quick-enquiry form always open
WhatsApp with the message pre-filled, for the visitor to review and send —
this needs no backend. If `VITE_ENQUIRY_ENDPOINT` is set
(`src/services/enquiry.ts`), a JSON copy of each enquiry is also POSTed there
first (with `keepalive: true`, so it survives the tab switching to WhatsApp):

```json
{
  "name": "string", "email": "string", "interest": "string", "message": "string",
  "source": "menu | contact-section", "page": "/path/the/form/was/on",
  "submittedAt": "ISO 8601 timestamp"
}
```

No such endpoint ships with this project — this is an integration point, not
a built feature. Point it at a CRM webhook, a form-handling service (Formspree,
Basin, a serverless function) or your own API; it must accept
`Content-Type: application/json` and respond `2xx`. A non-2xx response or a
network failure never blocks the WhatsApp hand-off — the visitor's enquiry
still goes through either way, and the confirmation panel reports whether the
copy was saved.

## 7. Pages not included in this release

The brief scoped this redesign to the pages shown in the supplied design
file: Home, Services, About, Contact. The current `ladder7.in` site has
substantially more (Education division, corporate training detail pages,
product detail pages, a blog, careers, portfolio) — see
`WHITELINE_PROJECT_ANALYSIS.md` for how the *reference* project (Whiteline)
structures a similarly large site, and the "Ladder7" / "Ladder7-live-fix"
folders alongside this one for the existing site's own route list.

Links to those pages (the Education division switch, "Insights", "Careers",
each product's "Explore product", corporate training) point at
`VITE_LEGACY_SITE_URL` (`src/data/site.ts`'s `LEGACY_LINKS`) rather than a
broken in-app route. **Before pointing the `ladder7.in` domain at this
build**, either:

- keep `VITE_LEGACY_SITE_URL` pointed at wherever those pages continue to be
  served (a subdomain, or the existing site kept alive at a path this build
  doesn't claim), or
- build the missing pages into this project first, following
  `COMPONENT_DOCUMENTATION.md §8`, and repoint the corresponding
  `LEGACY_LINKS` entries to real in-app routes.

Shipping this build at the apex domain without one of the above will send
visitors clicking "Careers", "Insights", a product link or the Education
switch back to whatever `VITE_LEGACY_SITE_URL` resolves to — correct only if
that's where you intend those pages to keep living.

## 8. Continuous integration (suggested, not yet configured)

No CI workflow is included — add one appropriate to your hosting choice. At minimum, on every pull request:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## 9. Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| `prerender: dist/server not found` | ran `node scripts/prerender.mjs` directly instead of `npm run build` (the SSR bundle hasn't been built yet) |
| `prerender: route data is inconsistent` | a route in `src/routes.ts` is missing from `PAGE_SEO`, `PAGE_MODULES` (in `scripts/prerender.mjs`), or wasn't imported in `entry-server.tsx` — see `COMPONENT_DOCUMENTATION.md §8` |
| Build succeeds but a page shows stale content after editing `src/data/*.ts` | rebuild (`npm run build`) — content is baked into static HTML, not read at request time |
| `server: dist/client not found` | run `npm run build` before `npm start` |
| Enquiry form never shows "copy saved" | `VITE_ENQUIRY_ENDPOINT` is empty (expected — WhatsApp-only mode) or the endpoint returned a non-2xx/network error (check its own logs; the WhatsApp hand-off still worked) |
