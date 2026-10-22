# Ladder7 — Connected Lines Experience

An original creative redesign of [Ladder7 Nextstep Solutions](https://www.ladder7.in/) built as a single responsive, scroll-driven editorial experience. This work lives **only on `dev`**; `main` is the read-only original.

## Visual idea

**Connected lines → hand gesture → digital interaction → connected lines.** A fixed SVG network moves through the website and interpolates polyline geometry towards recognizable wireframe hand gestures. The positions, perspectives, and formations change with native scrolling, including reverse scrolling. FAQ renders a front-facing palm with thumb, index, middle, ring and little fingers composed as separate path groups. Contact introduces two mirrored outlines.

The experience does **not** depend on Three.js or animation plugins, which keeps the page smaller and allows a static reduced-motion alternative. Hand geometry, transformation timing, and spatial positions are centralized in `src/components/experience/NetworkGesture.tsx`.

## Requirements

- Node.js 22.12+ (recommended: Node 22 LTS)
- npm
- Browsers with modern SVG/CSS support

## Run

```bash
git checkout dev
npm ci
npm run dev
```

Visit the local Vite URL shown in the terminal.

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

The build command runs the TypeScript compiler before bundling. GitHub Actions:
- `.github/workflows/validate.yml`: dependency installation, typecheck/build, lint
- `.github/workflows/browser-qa.yml`: Playwright browser smoke with screenshot artifacts on dev pushes, covering major desktop/mobile interactions and reduced-motion rendering

To run browser smoke locally, install `playwright` as a temporary dev dependency and browser binaries, start `npm run preview`, then run `node scripts/browser-smoke.mjs`.

## Architecture

```text
src/
  App.tsx                        # activates creative app
  CreativeApp.tsx                # sections, nav, accessibility, interactions
  creative.css                   # responsive editorial design and brand tokens
  components/experience/
    NetworkGesture.tsx           # scroll scene engine + polylines
  data/
    heroSlides.ts                # authoritative original hero text
    capabilitiesData.ts          # original four service capabilities
    productsData.ts              # five products and complete features
    faqData.ts                   # original FAQ copy
  components/                   # legacy originals preserved as reference
docs/
  CONTENT_MAP.md                 # exact origin-to-redesign mapping
  ASSET_MANIFEST.md              # unique image source, dimensions, usage
  QA_REPORT.md                   # completed checks and blockers
scripts/
  browser-smoke.mjs              # browser interaction regression script
```

## Content and branding

The primary brand blue is **`#0056b2`**, hover **`#004494`**, dark surfaces **`#0f1923`** and **`#031226`**. Original headlines, descriptions, FAQ answers, product details, company locations, phone, and email are retained. The new layout uses original categorized assets under `public/images`. No old file or binary asset is deleted.

The source project is a homepage with hash links. All main navigation destinations now exist; no fictional inner pages, case studies, performance metrics, or forms have been added.

## Accessibility

- Accessible skip link, semantic headings and a logical reading order
- Fully keyboard-usable product tabs (including arrow keys)
- FAQ and service disclosures with `aria-expanded` and stable panel relationships
- Mobile navigation with proper expanded state, Escape handling, and inert closed drawer
- Visible focus indicators and image alt text
- User-selectable dark/light interface (dark by default)
- Native scroll, no scroll trapping
- `prefers-reduced-motion` disables decorative animation and produces a static geometry fallback

## Known constraints

- Source had no configured contact-form backend: CTA uses real `mailto:` and `tel:` links.
- The original footer links to Blogs/Careers/Privacy Policy are placeholder fragment links, not standalone pages.
- The source contains just one product preview asset reused across all products; a different authenticated preview is not fabricated.
- The local teammate directory `D:\\l7\\l7` could not be accessed remotely.
- Visual and performance QA should be confirmed on target devices before publishing.

**Never merge to `main` until reviewed by the project team.**
