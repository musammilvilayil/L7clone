# Ladder7 — Visual rebuild, corrections and QA ledger

Branch: `dev` only. `main` remains read-only at the audit baseline `45dbbf4`.

## 1. Defects traced to source

1. A single fixed, full-window `.network-experience` SVG rendered random connecting paths permanently behind unrelated sections.
2. Most pages reused one `HAND` polyline array, mostly changing rotation/translation. Silhouettes and hand positioning were not meaningfully section-specific.
3. A single `SCENE_POS` mapping positioned hand geometry in a viewport coordinate system without allocating content-free illustration columns, making readability and image composition fragile.
4. Scroll stage progression was tied to long section boundaries: an illustration at a section's top could remain half-drawn after it had moved away.
5. SVG paths were fine but lacked strong silhouette contours; the FAQ sequence was distributed too late through its scroll cycle.
6. Original hero media was significantly darkened as an atmospheric background, not shown in a dedicated image region.
7. Product imagery was cropped with `object-fit:cover`, making screenshot details less accessible.

These findings are **verified by the versioned code**, not claimed as a direct visual observation of the protected Codespaces URL.

## 2. Fixes implemented

- Rebuilt `src/components/experience/NetworkGesture.tsx` as an isolated `<NetworkGesture gesture="..."/>` component with hand drawing based on its OWN visible dock rectangle.
- Removed the fixed global visual and random backdrop network entirely.
- Added distinct SVG contour datasets for open palm, thinking, welcoming, engineering/building, pointing, pinching, and confident/thumb-up gestures.
- Service selection updates the visual to Digital Engineering, AI Automation, Strategy, or Development gesture.
- FAQ: separate wrist/palm/thumb/index/middle/ring/little strokes; fine internal line work; genuine line-path question mark. Sequence fits into the on-screen illustration duration.
- Contact uses two hands emerging from opposite sides, plus one short connection path.
- Illustrated scenes use native scrolling, IntersectionObserver, requestAnimationFrame, reversible progress, passive listeners and clean disposal.
- Dedicated responsive gesture docks in hero, thinking, about, services, product detail, why, FAQ and contact. All are `pointer-events:none` and separate from images/text.
- Original hero and product images now use visible editorial placements and `object-fit:contain` to avoid screenshot cropping.
- Removed residual decorative line rails outside hand illustrations.
- Preserved source-provided headings, descriptions, FAQs, contact details, brand hex colors, and image files.

## 3. Gesture-to-section map

| Section | Gesture | Composition |
|---|---|---|
| Hero | Open palm | Dedicated right column above hero visual |
| Thinking / Perspectives | Thinking / folded hand | Opposite the section introduction, before editorial image rows |
| Who We Are | Welcoming hand | Separate right-side illustration space, above audience content |
| Services — Digital | Engineering / connecting hand | Responsive service illustration column |
| Services — Applied AI | Pointing hand | Replaces illustration when corresponding service is selected |
| Services — Strategy | Thinking hand | Replaces illustration on selection |
| Services — Custom Development | Pinching hand | Replaces illustration on selection |
| Products | Rotated touch/point gesture | Separate visual beneath selected product details, not on product screenshot |
| Why Ladder7 | Confident/thumb-up silhouette | Independent illustration dock before authentic engineering photo |
| FAQ | Front-facing, five-finger palm and question mark | Left side of split layout; on mobile above the questions |
| Contact | Two approaching hands | Full dedicated band between headline and CTA copy |

## 4. Automated validation

Workflows:
- [Dev TypeScript/build/lint](https://github.com/musammilvilayil/L7clone/actions/workflows/validate.yml)
- [Browser QA and screenshot artifacts](https://github.com/musammilvilayil/L7clone/actions/workflows/browser-qa.yml)

The browser regression script at `scripts/browser-smoke.mjs` exercises **1440 × 900, 1024 × 768, 768 × 1024, 390 × 844, and 360 × 780** resolutions and checks:
- All eight main sections and their gestures
- No legacy fixed network
- Zero bounding-box overlaps between gesture docks and section headings, paragraphs, buttons, links or pictures
- No horizontal body/HTML overflow
- No broken original image assets
- Service state changes, product tab keyboard navigation, FAQ expansion and all five finger groups
- Accessible responsive menu behavior, reduced-motion static hand and JavaScript runtime errors
- Per-section screenshots exported in a downloadable GitHub Actions artifact

**Final application code verification:** browser QA passed at commit [`7fd3953`](https://github.com/musammilvilayil/L7clone/actions/runs/39825007484), including five viewport screenshots and the generated [screenshot artifact](https://github.com/musammilvilayil/L7clone/actions/runs/39825007484/artifacts/12446875516). The same commit passed [TypeScript/build/lint](https://github.com/musammilvilayil/L7clone/actions/runs/39825007474). The subsequent documentation-only commit [`cf9123c`](https://github.com/musammilvilayil/L7clone/actions/runs/39825120309) also passed TypeScript/build/lint. These checks verify automated criteria; subjective visual quality still needs human screenshot review.

## 5. External preview limitation and remaining reviews

The Codespaces URL `https://bug-free-lamp-g4qxg9r47qgpcwgq-5173.app.github.dev/` redirects an unauthenticated external browser to GitHub login. Direct visual inspection and screenshots of that instance could not be performed. An existing connected browser tab did provide page text, but **not** image-level inspection or interaction control.

Automated Playwright screenshots from GitHub Actions are available in its uploaded `ladder7-visual-QA` artifact. These confirm rendered page test execution; they are not a substitute for an art director manually viewing each image.

Further checks before production deployment: authenticated preview on real devices, manual visual inspection of hands and type, color/contrast audit, automated accessibility scanning and screen-reader testing, Lighthouse performance/Core Web Vitals, external link checks, and contact mail-client handoff.

The original site has no configured contact form endpoint and reuses one product screenshot for five products; neither is fabricated. The legacy Privacy Policy/Blogs/Careers destinations remain source placeholder anchors, not invented new pages.

Do not merge to `main` without review.
