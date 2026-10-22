# LADDER7 — Cinematic Gesture Experience · Final Implementation & QA

**Date:** 22 October 2026
**Repository:** [musammilvilayil/L7clone](https://github.com/musammilvilayil/L7clone)
**Target branch:** `dev` only
**Source baseline for this refinement:** `e47bc3a`
**Validated functional source:** `6d2698c`
**Read-only main head:** `45dbbf44f72cd8ee504b3473efc33909bf411f18` (unchanged)

## A. Defects identified from code and actual render captures

1. The former `NetworkGesture` called React `setState` for every active scroll frame, unnecessarily re-rendering SVG stroke arrays.
2. Most hand paths completed in nearly the same phase. Aside from small whole-group transforms, hands did not visibly articulate or perform interactions.
3. The thinking silhouette could be mistaken for a V sign; the contact silhouettes looked separate until the end of their scroll phase.
4. On a 390px hero capture, the open-palm wrist extended into the next paragraph. About had artwork painting beyond its reserved dock and into text.
5. The original global `h2` rule was insufficiently specific under the current CSS reset; Services, Products and Why headers appeared close to 16px in captured renders.
6. The Why Ladder7 SVG used to paint into its adjacent preserved image region.
7. Product screenshot and its point gesture were visually distant; the hand did not have a dedicated screenshot-adjacent visual cell.
8. The browser smoke test inspected the *dock rectangle* but not CSS SVG overflow and missed artwork extending beyond it.

## B. Source changes

### Animation architecture — `src/components/experience/NetworkGesture.tsx`

- Retained per-section `NetworkGesture` as decorative, pointer-inert SVG in each section's own dock.
- Replaced render-on-scroll React state with direct SVG transform and path stroke updates; no animation-frame React re-renders.
- Uses viewport-relative, reversible progress with passive scroll/resize handlers, `IntersectionObserver`, requestAnimationFrame and cleanup.
- Four phases: progressive formation; articulated action with controlled translate, scale and yaw; completion; elegant scroll-driven release.
- Fingers rotate around individual local joint pivots. Shadow offset lines create restrained pseudo-dimensional depth without WebGL or random external paths.
- Hero is pre-formed partially on first render, so it is legible without requiring the visitor to scroll.
- Core services show nodes with a deliberate hand-to-node wire; product gesture shows a screenshot-adjacent touch target, not a line crossing the image.
- Contact hands approach symmetrically and fingertip geometry converges on a central point.
- `prefers-reduced-motion` renders fully formed static illustrations. Small screens, Save-Data and low-memory devices simplify nonessential inner contours.

### Content-safe art direction — `src/CreativeApp.tsx`, `src/creative.css`

- The hero now consists of separate headline, CTA/copy, scroll cue, and art slots. At narrow widths the order is headline → gesture → value proposition/CTAs → original hero image.
- Thinking and Who We Are gestures are placed on the left; Services and Why retain allocated right-side visuals.
- Product gesture moved next to the actual product screenshot, with distinct non-overlapping image and interactive hand areas.
- Fixed three sections' heading typography, image cropping, surrounding whitespace and element stacking.
- `overflow:hidden` on gesture docks **and on their SVG** ensures hands cannot paint over adjacent content. All remain `pointer-events:none`.
- Original Ladder7 copy, media, design palette, navigation, service accordion, product tabs, FAQ accordion, contact information and footer links remain intact.

### FAQ: ordered anatomy

The forward animation forms **wrist → palm → thumb → index → middle → ring → little finger → internal contours → drawn question mark**, and reverses under upward scroll. Every digit has its own SVG `data-stroke` identifier and the question mark is a path/circle separate from the palm contour.

## C. Verification performed on the source commit

| Check | Result | Evidence |
| --- | --- | --- |
| TypeScript production build and lint | PASS | [Dev Validation](https://github.com/musammilvilayil/L7clone/actions/runs/39834845232) |
| Playwright browser smoke | PASS | [Browser QA](https://github.com/musammilvilayil/L7clone/actions/runs/39834845277) |
| 1440×900 desktop | PASS | Browser QA screenshots |
| 1024×768 small desktop | PASS | Browser QA screenshots |
| 768×1024 tablet | PASS | Browser QA screenshots |
| 390×844 mobile | PASS | Browser QA screenshots |
| 360×780 narrow mobile | PASS | Browser QA screenshots |
| Scroll progress changes, forward and reverse | PASS | Browser smoke rig-transform/progress assertions |
| FAQ five digits + question-mark path | PASS | Browser smoke DOM assertions |
| Services selection and hand changes | PASS | Browser smoke |
| Product tab selection + keyboard arrow control | PASS | Browser smoke |
| FAQ expanded answer | PASS | Browser smoke |
| Mobile menu open and close via navigation | PASS | Browser smoke |
| Image loading, anchors, console page errors | PASS | Browser smoke |
| No horizontal overflow or dock/text bounding collisions | PASS | Browser smoke |
| SVG clipping and pointer safety | PASS | Browser smoke |
| Contact gesture during active joining phase | PASS | `1440-contact-connection.png` capture |
| Reduced-motion full illustration | PASS | Browser smoke |

**49 QA screenshot files** cover sections at five viewport sizes, with extra expanded FAQ, reversed FAQ, connected-hands, and reduced-motion captures. They are attached to the Browser QA workflow as artifact `ladder7-visual-QA`. Screenshots are from the actual compiled Vite app in headless Chromium, not Photoshop mockups.

## D. Codespaces preview limitation

The [port 5174 Codespaces preview](https://bug-free-lamp-g4qxg9r47qgpcwgq-5174.app.github.dev/) was opened and examined separately in a browser automation session. It serves Ladder7 and key content, but that independent browser session did **not** establish that it was serving source SHA `6d2698c`: the scene-local left-side hand placements and final choreography could not be confirmed. Pushing to GitHub `dev` does **not** automatically synchronize an already-running Codespace working tree.

To inspect this exact new build on port 5174, first check local modifications, pull `dev` and restart the Vite dev server:

```bash
git status
git switch dev
git pull --ff-only origin dev
npm ci
npm run dev -- --host 0.0.0.0 --port 5174
```

Avoid switching or pulling over uncommitted changes without saving them first.

## E. Remaining honest limitations

- These are **dimensional SVG line-art hands**, not fully rigged 3D skinned meshes. Full anatomically realistic finger deformation or a 3D GLTF/WebGL hand would require a dedicated design asset pipeline and performance budget.
- Playwright verifies functional and visual boundaries at static scroll positions plus reversible transforms. No independent FPS/performance trace or device-lab touch testing was performed.
- Visual judgment is subjective; the verified screenshots are supplied for stakeholder approval.
- The linked Codespaces port may require the manual sync above before it shows the final source revision.


## F. Completion refinement (23 October 2026)

After the original cinematic implementation, the following gaps were found by reviewing real Chromium screenshots and frame-by-frame recordings:

- Open-palm hands needed richer anatomical detail. Added ten carefully bounded internal strokes: dorsal finger ridges, distal-joint arcs, palm arch and wrist contours. These remain inside each fingertip/palm and are de-emphasized on small or low-powered devices.
- Previous section departure primarily faded a full hand. Now individual outlines and contour strokes **unspool in reverse** during the exit stage. Reverse scrolling reconstructs them; reduced-motion remains fully static.
- The Thinking silhouette could be mistaken for one aggressively raised finger. Replaced it with a chin-supporting hand and small, contained human side-profile so the visual actually communicates thoughtful problem solving.
- At 360px, the FAQ's line question mark had not finished drawing when its five-finger hand was already clearly visible. Advanced its drawing and dot stages, retaining a natural progressive entrance but making a complete **?** readable at typical mobile capture positions.
- SVG services touch-point scaling used the default transform origin; fixed local SVG `transformBox` and `transformOrigin` for a stable, deliberate pulse.
- Strengthened browser QA: switched to light theme and back, verified `mailto:` and `tel:` CTAs, and recorded a real Chrome-based full forward-and-reverse page scroll to `ladder7-scroll-choreography.webm`.

### Final verification

- **Final functional source commit:** `4aacc38005760b646a3f9a579487f4c3927872e9` (`dev`).
- **Source typecheck, production build and lint:** [passed](https://github.com/musammilvilayil/L7clone/actions/runs/39838548844).
- **Five viewport browser QA, interactive checks, screenshots and motion video:** [passed](https://github.com/musammilvilayil/L7clone/actions/runs/39838548808).
- **Evidence artifact:** [50 PNG screenshots plus full-scroll video](https://github.com/musammilvilayil/L7clone/actions/runs/39838548808/artifacts/12452885213).
- **Main branch:** unchanged (`45dbbf44f72cd8ee504b3473efc33909bf411f18`).

**Source/runtime boundary:** The external port 5174 is a running Codespaces workspace, not an automatic deployment from `dev`. The page was accessible, but the final source SHA could not be established from the preview alone. Pull `dev` in that Codespace (after safeguarding any local changes), restart its Vite server and hard-refresh the preview to inspect this exact build. The GitHub browser QA **did** run the compiled final source across all five specified sizes.

**Honest technical scope:** This is optimized, dimensional anatomical **SVG wireframe choreography** with actual per-finger transforms, not a GLTF skeletal hand or a WebGL skinned mesh. There is no claim of a photorealistic 3D asset, or physical device-lab FPS certification.
