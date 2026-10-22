# Ladder7 — Cinematic Storytelling Experience

Complete visual redesign of the [Ladder7 Nextstep Solutions](https://www.ladder7.in/) single-page website. This work lives on **`dev` only**; `main` remains untouched and read-only for original content.

## What the website now does

Nine connected editorial chapters preserve Ladder7's existing content and contacts while introducing an art-directed scroll narrative:

1. Opening — cinematic AI hero, original image, hand and live CTA.
2. Vision — sticky chapter rail with three full original narrative/image panels.
3. Who we are — welcoming gesture, mission and the two original customer segments.
4. Services — four interactive service chapters and large image-backed hand-gesture theatre.
5. Products — five accessible product tabs, original screenshots, separate touch gesture, detail rail and keyboard controls.
6. Engineering — full-bleed original engineering image, existing business messaging, illustrative instrument panel.
7. Why Ladder7 — editorial value pillars and real imagery; no fabricated statistics.
8. FAQ — sequential five-digit hand anatomy and fully accessible original answers.
9. Finale — two hands connecting, original CTA, direct telephone/email links, education/training strip and full footer.

The design uses brand blue `#0056b2`, original dark-blue palette, original copy and media. No reference site code, models or artwork was copied.

## Run locally

Node.js 22 LTS and npm required.

```bash
git switch dev
npm ci
npm run dev -- --host 0.0.0.0 --port 5174
```

The live user preview is `https://bug-free-lamp-g4qxg9r47qgpcwgq-5174.app.github.dev/`. GitHub commits **do not automatically update a running Codespaces checkout**. If its local branch is behind, first inspect `git status`, save your changes, then `git pull --ff-only origin dev` and restart Vite.

## Build and QA

```bash
npm run build
npm run lint
npm run preview
```

GitHub Actions on `dev`:
- `.github/workflows/validate.yml`: Node 22, pinned npm dependencies, TypeScript/Vite production build and lint.
- `.github/workflows/browser-qa.yml`: Playwright real Chromium smoke at **320, 360, 375, 390, 430, 768, 1024, 1440 and 1920px**; scene rendering, no overflow, accessible interactions, copied business assets, theme, reduced-motion, scroll progress, FAQ anatomy, screen captures and video.

The browser action uploads screenshot/video artifacts. For exact **current run status and remaining limitations**, see [docs/QA_REPORT.md](docs/QA_REPORT.md) rather than assuming a queued run succeeded.

## Architecture

```text
src/
  App.tsx                                 active cinematic entrypoint
  CinematicApp.tsx                        new nine-chapter site and working controls
  cinematic.css                           brand-aware responsive cinematic design
  components/experience/
    useScrollDirector.ts                  chapter progress, reveal observer, scroll depth
    NetworkGesture.tsx                    2.5D SVG hands and scroll-scrubbed joint animation
  data/
    heroSlides.ts                         original four hero narratives/media
    capabilitiesData.ts                   original four services and descriptions
    productsData.ts                       original five products and feature lists
    faqData.ts                            original Q&A
  CreativeApp.tsx, creative.css           previous dev design retained for rollback
scripts/
  browser-smoke.mjs                       regression + visual artifact pipeline
docs/
  CINEMATIC_REDESIGN.md                   reference audit, licenses, design reasoning
  QA_REPORT.md                            actual outcomes, known limitations
```

This is a deliberately selective native implementation: `IntersectionObserver`, RAF and CSS transforms provide scroll choreography without adding GSAP, Lenis or heavy Three.js bundles. No rigged 3D hand GLTF assets existed in the reference project; original custom SVG contour hands provide reversibility and reduced-motion fallbacks without mobile WebGL. The implementation does **not** claim real 3D hand meshes or use a library it doesn't import.

## Accessibility and content guarantees

- Semantic document landmarks and headings, skip link, readable original business content.
- Responsive mobile navigation with `aria-expanded`, Escape-to-close and inert collapsed drawer.
- Keyboard operable service accordion, product tablist with arrows/Home/End, FAQ panel relationships.
- Visible focus, original images with meaningful alt text, no gestures over controls.
- Mobile-tailored opening; small-screen modes remove expensive inner SVG details.
- `prefers-reduced-motion` renders full readable content and static complete hand geometry.
- Contact CTAs use working `mailto:` and `tel:` URLs; no fictitious contact form.
- Existing Blogs/Careers/Privacy footer anchors are inherited from original content. No fictional links added.
- The source includes one product screenshot used for five products; product-specific data is changed, but nonexistent screenshots are not invented.

**Release caution:** Do not merge `dev` into `main` until the team reviews the Codespaces preview at the exact latest commit and confirms the final browser QA run.
