# Ladder7 — website redesign

A complete React rebuild of the Ladder7 IT website: the technical and
functional patterns are taken from the `Whiteline` reference project, the
visual design is its own (from the supplied `ladder7-it.html`), not a copy of
Whiteline's.

```bash
npm install
npm run dev          # http://localhost:5173 — fast dev server (no prerendering)

npm run build        # production build → dist/client
npm start            # http://localhost:8080 — serves the production build
```

## Documentation

| Document | Covers |
| --- | --- |
| [WHITELINE_PROJECT_ANALYSIS.md](WHITELINE_PROJECT_ANALYSIS.md) | Phase 1: architecture, patterns and issues found in the Whiteline reference, and what this project took from it |
| [LADDER7_DESIGN_SYSTEM.md](LADDER7_DESIGN_SYSTEM.md) | Phase 2: every design token (colour, type, spacing, shape, motion) extracted from the supplied HTML |
| [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) | Stack, folder structure, the build/prerender pipeline, interaction architecture |
| [COMPONENT_DOCUMENTATION.md](COMPONENT_DOCUMENTATION.md) | How to use and extend every component; how to add a page or section |
| [SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md) | Page metadata, JSON-LD, sitemap/robots, how to verify |
| [PERFORMANCE_REPORT.md](PERFORMANCE_REPORT.md) | Lighthouse scores, Core Web Vitals, what was tested, how to re-test |
| [SETUP_AND_DEPLOYMENT.md](SETUP_AND_DEPLOYMENT.md) | Environment variables, build, deploy, the optional enquiry endpoint, pages not yet migrated |

## At a glance

- **Stack**: React 19, TypeScript (strict), Vite 8, React Router 7, plain CSS
  with a centralized token system — no Tailwind, no animation library, no
  icon library.
- **Rendering**: every route is statically prerendered (`react-dom/static`)
  and hydrates on load; no client-only rendering, no headless-browser
  prerender step.
- **Server**: a ~200-line, dependency-free Node server (`server.mjs`) —
  immutable caching for hashed assets, Brotli/Gzip, real HTTP 404s.
- **Pages**: Home, Services, About, Contact (the pages in the supplied
  design — see [SETUP_AND_DEPLOYMENT.md §7](SETUP_AND_DEPLOYMENT.md) before
  pointing the live domain here).
- **Lighthouse**: 97–100 performance, 100 accessibility, 100 best practices,
  100 SEO on every page (mobile and desktop) — see
  [PERFORMANCE_REPORT.md](PERFORMANCE_REPORT.md).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | type-check → client build → SSR build → prerender |
| `npm start` / `npm run preview` | serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest (SEO data, sitemap/robots, enquiry validation) |
| `npm run images` / `npm run icons` / `npm run fonts` | regenerate generated assets from `assets-src/` (see `SETUP_AND_DEPLOYMENT.md`) |
