# Ladder7 — Connected Lines Experience

An original creative redesign of [Ladder7 Nextstep Solutions](https://www.ladder7.in/) built as a single responsive, scroll-driven editorial experience. This work lives **only on `dev`**; `main` is the read-only original.

## Visual idea

**Connected lines → distinctive hand gesture → meaningful interaction → next gesture.** Each major section reserves a dedicated illustration dock beside or between its actual content. There is no permanent fixed background network. Gesture paths are drawn progressively on native scroll and reverse naturally when scrolling upward. No random lines extend across the page.

The visuals include an open-palm hero, thoughtful thinking pose, welcoming hand for About, service-specific engineering / pointing / thinking / pinching states, product touch, confident thumb-up, a front-facing five-finger FAQ gesture, and two approaching contact hands. FAQ sequentially draws wrist, palm, thumb, index, middle, ring, little finger, internal contour lines, then a hand-drawn question mark.

The lightweight SVG approach avoids adding Three.js or GSAP. Motion uses IntersectionObserver plus one requestAnimationFrame scroll sampler for active illustration docks, cleaned up on unmount; reduced-motion shows a complete static figure. Geometry and choreography live in `src/components/experience/NetworkGesture.tsx`; illustrations cannot capture pointer events.

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
- `.github/workflows/browser-qa.yml`: Playwright smoke with screenshot artifacts at **1440, 1024, 768, 390, 360px**; verifies no overlap or horizontal overflow, original images, interactive controls, five FAQ fingers, unique section gestures and reduced-motion

To run browser smoke locally, install `playwright` as a temporary dev dependency and browser binaries, start `npm run preview`, then run `node scripts/browser-smoke.mjs`.

## Architecture

```text
src/
  App.tsx                        # activates creative app
  CreativeApp.tsx                # sections, nav, accessibility, interactions
  creative.css                   # responsive editorial design and brand tokens
  components/experience/
    NetworkGesture.tsx           # local scroll sampler and distinct hand contour geometry
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
- CI browser screenshots provide automated visual evidence, but aesthetic assessment on real devices is still required before publishing.\n- The supplied GitHub Codespaces preview requires GitHub sign-in from an external browser and could not be independently visually audited there.

**Never merge to `main` until reviewed by the project team.**
