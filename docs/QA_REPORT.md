# Ladder7 — Visual Rebuild, Architecture and QA Ledger

Branch: `dev` only. `main` remains untouched as the read-only baseline.

## 1. Architecture Highlights

### Signature Visual Concept: Continuous Network → 3D Wireframe Hands → Content Interaction → Continuous Network
- **Fixed Layer:** A single, lightweight full-viewport Canvas 2D engine (`GestureStage.tsx` / `src/lib/gesture3d/engine.ts`), code-split into its own lazy chunk (`GestureStage-*.js`, 23.6 KB / 9.5 KB gzipped).
- **Procedural Forward Kinematics:** Procedural hand skeleton (`handRig.ts`) with 23 kinematic degrees of freedom (wrist yaw/pitch/roll, plus 4 angles per digit for splay, MCP, PIP, DIP).
- **Wireframe Depth & Spatial Geometry:** Hands are rendered strictly as fine technological contour lines (wrist rings, forearm, palm longitudinal ribs, knuckles grid, finger rings, joint dots), never solid, clay, or cartoon geometry.
- **Scroll-Driven Smooth Transitions:** Hand formation and dissolution seamlessly interpolate between ambient flowing network lines and hand gestures. When scrolling upward, animations reverse smoothly with continuous state interpolation (`1 - exp(-9dt)`).
- **Section Hand Choreography:**
  - **Hero (`#top`):** Oversized editorial typography, connected lines converge into a dimensional open-palm gesture with surrounding orbital nodes.
  - **Thinking (`#thinking`):** Lines reform into a thoughtful discovery hand pose.
  - **About (`#about`):** Raised index finger discovery gesture with orbital node trajectory.
  - **Services (`#capabilities`):** Interactive connecting/pinch hand that links to modular nodes upon selecting Digital Engineering, Applied AI, Strategy, or Custom Development.
  - **Products (`#products`):** Hand pointing towards authentic application interfaces.
  - **Why Ladder7 (`#why-ladder7`):** Confident open gesture paired with real-world engineering photography.
  - **FAQ (`#faq`):** Front-facing human hand with palm directly facing the viewer. Exactly five distinct fingers emerge sequentially (wrist, palm, thumb, index, middle, ring, little finger), followed by a technological question mark constructed above the palm from connected lines and nodes.
  - **Contact (`#contact`):** Dual wireframe hands emerge from left and right margins, meeting at the fingertips with a subtle bridge arc and animated pulse node.

## 2. Authentic Product Media Integration
From the local reference project at `D:\l7\l7`, five genuine application screenshots were extracted and integrated:
1. `Site 360`: `product_showcase.jpeg` (Live 12-lens health audit scan)
2. `L7 Nexus`: `nexushome.jpeg` (Omnichannel communications & engagement platform)
3. `L7 Insights`: `L7-Insights-Home.jpeg` (Executive telemetry and predictive dashboard)
4. `Outreach Engine`: `outreachhm.jpeg` (Automated multi-channel campaign workspace)
5. `Infinite Insights`: `infinityhome.jpeg` (Cognitive RAG knowledge engine)

## 3. Automated Validation Results

### Linting
```
oxlint: 0 warnings, 0 errors (Finished in 138ms on 26 files with 116 rules)
```

### Type Checking & Production Build
```
tsc -b: 0 errors
vite build:
  dist/index.html                         1.63 kB │ gzip:  0.66 kB
  dist/assets/index-De1iDx-z.css         70.90 kB │ gzip: 14.17 kB
  dist/assets/GestureStage-BvN6MmKq.js   23.63 kB │ gzip:  9.46 kB (lazy chunk)
  dist/assets/index-BoMU2nNe.js         254.50 kB │ gzip: 79.57 kB
```

### Multi-Viewport Browser Smoke Test Suite
Verified with automated Playwright browser tests (`scripts/browser-smoke.mjs` and `test-all.cjs`) across:
- **Desktop:** 1440 × 900
- **Laptop / Small Desktop:** 1024 × 768
- **Tablet Portrait:** 768 × 1024
- **Mobile Standard:** 390 × 844
- **Mobile Compact:** 360 × 780

#### Checks Executed & Passed:
1. **Layout Integrity & Content Collision:**
   - 0 horizontal body/HTML overflow across all screen widths.
   - 0 bounding-box collisions between gesture anchors and protected copy, headings, buttons, links, or photos.
2. **Asset Loading:**
   - All images loaded with `naturalWidth > 0`.
   - 0 broken images or 404s.
3. **Interactive Components:**
   - Accessible service switching toggles `aria-expanded` and updates gesture target scene.
   - Accessible product tabs support keyboard navigation (ArrowUp, ArrowDown, ArrowLeft, ArrowRight) and switch authentic product screenshots.
   - FAQ accordion expands/collapses properly with `aria-expanded` and `role="region"`.
   - Theme toggle switches between dark mode (`#031226` background, `#8fcbff` accent) and light mode (`#f4f8fc` background, `#0056b2` primary).
   - Mobile navigation drawer opens and closes with focus/aria management.
4. **Accessibility & Reduced Motion:**
   - When `prefers-reduced-motion: reduce` is detected, the engine disables idle continuous animations and renders a fully formed, stationary hand geometry that updates statically only on scroll.
   - Semantic headings (`h1` unique per page, proper `h2`, `h3` hierarchy).
   - Visible focus outlines and WCAG 2.2 AA color contrast compliant tokens.
5. **Console & Runtime Errors:**
   - 0 unhandled exceptions or console errors.

## 4. Visual Artifacts
High-resolution test screenshots saved to `docs/screenshots/`:
- `01_hero.png` / `step_1_top.png`
- `02_thinking.png` / `step_2_thinking.png`
- `03_services.png` / `step_4_capabilities.png`
- `04_products.png` / `step_5_products.png`
- `05_faq.png` / `step_7_faq.png`
- `06_contact.png` / `step_8_contact.png`
- `desktop_light_mode.png`
- `tablet_hero.png`
- `tablet_faq.png`
- `mobile_hero.png`
- `mobile_menu_open.png`
- `mobile_faq.png`
- `mobile_contact.png`
