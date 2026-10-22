# Ladder7 — Connected Lines & 3D Wireframe Gesture Experience

A ground-up, creative reimagination of [Ladder7 Nextstep Solutions](https://www.ladder7.in/) built as a continuous, cinematic digital experience. This implementation lives exclusively on the **`dev`** branch; **`main`** is preserved read-only as the authoritative source of truth.

---

## 1. Signature Visual Concept

```text
CONNECTED LINES  →  3D WIREFRAME HAND GESTURES  →  CONTENT INTERACTION  →  CONNECTED LINES
```

A continuous technological network of thin, elegant lines flows through the background. As the visitor scrolls, selected lines converge and smoothly construct anatomically recognizable **3D wireframe human hand gestures**. Each gesture interacts with the section's content, dissolves back into flowing network lines, and reforms into the next gesture.

### Hands Choreography:
- **Hero (`#top`):** Cinematic editorial layout; ambient lines converge into an open-palm hand with subtle orbital nodes.
- **Complexity & Transformation (`#thinking`):** Lines reform into a thoughtful discovery hand pose.
- **Innovation & Discovery (`#about`):** Wireframe hand with raised index finger; orbital node at fingertip radiates outward.
- **Capabilities (`#capabilities`):** Interactive connecting/pinch hand that connects to modular nodes as Digital Engineering, AI Automation, Strategy, or Custom Development is selected.
- **Products (`#products`):** Hand points to authentic application interfaces, responding to manual and keyboard product navigation.
- **Why Ladder7 (`#why-ladder7`):** Confident open hand paired with real-world engineering photography.
- **FAQ (`#faq`):** Front-facing human hand directly facing the viewer. All five fingers form in distinct sequence (wrist → palm → thumb → index → middle → ring → little finger), with a technological question mark constructed above the palm from connected lines.
- **Contact (`#contact`):** Dual wireframe hands emerge from opposite edges, meeting at the fingertips with a bridge arc and pulse node.

The hands are rendered strictly as thin, 3D wireframe contours with perspective depth—never solid 3D sculptures, clay models, or cartoon outlines.

---

## 2. Technology Stack & Performance Architecture

- **Framework:** React 19, TypeScript, Vite 8, Tailwind CSS.
- **3D Gesture Engine:** Custom Canvas 2D spatial renderer (`src/lib/gesture3d/*`) utilizing forward kinematics (`handRig.ts`), 23 degrees of freedom, and perspective projection without heavy 3D engine overhead.
- **Code Splitting:** The gesture engine is lazy-loaded into its own chunk (`GestureStage-*.js`, 23.6 KB / 9.5 KB gzip), ensuring initial page load remains blazing fast.
- **Layout Anchoring:** Lightweight `<GestureAnchor scene="..." />` docks reserve dedicated illustration space, preventing overlap with copy, buttons, or imagery.
- **Graceful Degradation:** Wrapped in `<StageBoundary>`: if canvas is unsupported or fails, content remains 100% accessible and usable.
- **Reduced Motion:** Fully complies with `prefers-reduced-motion: reduce` by rendering a static, fully-formed wireframe hand that updates statically only on scroll.

---

## 3. Brand Identity & Authentic Content

- **Brand Tokens:** Primary blue (`#0056b2`), deep navy dark background (`#031226`), surface cards (`#0f1923`), subtle borders (`rgba(143, 203, 255, 0.12)`).
- **Verbatim Copy:** Headings, value propositions, capabilities, audience targets, why statements, and all original FAQs preserved verbatim from the source.
- **Authentic Product Screenshots:** Integrated from reference assets at `D:\l7\l7`:
  - *Site 360:* `product_showcase.jpeg` (Live 12-lens health audit scan)
  - *L7 Nexus:* `nexushome.jpeg` (Omnichannel communications & engagement)
  - *L7 Insights:* `L7-Insights-Home.jpeg` (Predictive telemetry dashboard)
  - *Outreach Engine:* `outreachhm.jpeg` (Campaign management workspace)
  - *Infinite Insights:* `infinityhome.jpeg` (Cognitive RAG knowledge engine)

---

## 4. Getting Started

### Prerequisites
- Node.js 20+ (recommended: Node 22 LTS)
- npm

### Installation & Development
```bash
git checkout dev
npm ci
npm run dev
```

Visit the local development server at `http://localhost:5173`.

### Production Build & Linting
```bash
# Typecheck and build production bundle
npm run build

# Run Oxlint
npm run lint

# Preview production build locally
npm run preview
```

### Running Automated Browser Tests
```bash
# Start preview server or dev server, then:
node scripts/browser-smoke.mjs
```
The test suite validates across 1440px, 1024px, 768px, 390px, and 360px viewports for zero content collisions, zero body overflow, 100% asset loading, full interactive state changes, and reduced-motion fallback.

---

## 5. Repository Documentation

- [`docs/CONTENT_MAP.md`](docs/CONTENT_MAP.md): Detailed traceability map between original source components and new locations.
- [`docs/ASSET_MANIFEST.md`](docs/ASSET_MANIFEST.md): Complete image ledger with dimensions, formats, and placement.
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md): Comprehensive validation report with test results and visual audit notes.
- [`docs/screenshots/`](docs/screenshots/): High-resolution captures of all sections across desktop, tablet, and mobile viewports.

---

## 6. Safety & Contribution Notice

- **Branch Isolation:** All changes belong exclusively to `dev`. `main` is strictly read-only and must never be modified or merged into without explicit stakeholder review.
