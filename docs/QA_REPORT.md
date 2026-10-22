# Ladder7 — Ultimate cinematic storytelling redesign: QA report

**Branch:** `dev` only. `main` remains read-only at `45dbbf44f72cd8ee504b3473efc33909bf411f18`.

## Scope

A **complete visual redesign** replaces the active layout. The old component and CSS remain in the repository as an untouched rollback reference; the entry `src/App.tsx` now loads `CinematicApp.tsx` and `cinematic.css`.

Nine source-backed scenes: Opening, Vision, About, Services, Products, Engineering, Why Ladder7, FAQ, Finale. Original Ladder7 business copy, hero/media assets, services, product details, FAQs, contact information, footer and working interactions remain data-driven and intact.

## Issues found and addressed

| Issue found in old build / first redesigned render | Change |
| --- | --- |
| Repeated ordinary two-column sections did not feel like a connected story | Dedicated cinematic editorial compositions, scene progress indicator, alternating sticky narrative |
| Services felt like rows rather than a journey | Four interactive chapters beside a large original-image theatre, each with its own gesture |
| Product visuals were too small and secondary | Wide five-product tab rail, larger screenshot-first stage, detail side panel and visual transition |
| No connective engineering scene | New full-bleed Engineering film interlude using original slide text and media |
| Missing narrative pacing | Custom viewport-aware scroll director, depth CSS variables, visible text reveals and sticky vision rail |
| Most gestures formed then only faded | Distinct hand rigs with articulation and reverse stroke unwinding |
| Hand drawings obstructed original imagery in first QA | Reserved art regions and explicit hero/product spacing |
| At 320px the hero hand appeared only after the first viewport | Restructured mobile flow to headline → open palm → pitch/CTA → preserved photo |
| First engineering composition placed the gesture on the photographed subject's face | Separate instrument-style art cell near the lower edge |

## Runtime choices

- This version does **not** introduce GSAP, ScrollTrigger, Lenis or Three.js as a hidden or simulated dependency. Those tools were evaluated through source repositories, but a compact native `IntersectionObserver` / `requestAnimationFrame` / CSS custom-property director fits the website's current assets and avoids heavy mobile dependencies.
- `NetworkGesture.tsx` is the scroll-scrubbed local SVG hand engine with no animation-frame React state updates.
- Original business claims and data are imported without fabrication; no external repository assets or proprietary design code reused.
- Reduced motion removes animation and shows complete scene copy and decorative hands; mobile avoids high GPU usage.

## Verified evidence

**Production build, TypeScript and lint:** PASS on the final tested code at [GitHub validation for `a3c4c448`](https://github.com/musammilvilayil/L7clone/actions/runs/39842549740).

**Browser QA previous redesigned source:** The [`e27c3098` run](https://github.com/musammilvilayil/L7clone/actions/runs/39840613212) completed its responsive, interaction and image tests through 360px but failed the stricter **320px first-screen open-palm visibility** assertion. That failure prompted the mobile narrative layout fix. It is not represented as a passing run.

**Final browser QA:** **PASS** at [run 39842549772 for `a3c4c448`](https://github.com/musammilvilayil/L7clone/actions/runs/39842549772). The tested code contains the final nine-chapter source, mobile-first opening, product/hero collision fixes and Engineering instrument panel. All nine responsive viewport cases completed, including the previously failing 320px hero-visibility check.

Browser smoke contains assertions for:
- 320, 360, 375, 390, 430, 768, 1024, 1440 and 1920px viewports;
- nine section-local gesture docks, meaningful image loading, zero horizontal overflow and no dock/headline/button/content collisions;
- all four service accordions and corresponding hand changes;
- all five product tabs and image loading, keyboard arrows and CTA presence;
- FAQ answers, exactly five named fingers, path-based question mark, reversible scroll progress and geometry;
- mobile menu, theme toggle, anchor and contact links, reduced-motion complete hand;
- browser page errors, screenshot exports and scroll film capture.

**Actual port 5174:** An independent interactive browser inspection of the supplied Codespaces preview confirmed that the live page **still serves the older eight-section layout** (no nine-chapter rail or Engineering interlude), so the new design has **not yet been synchronized into that Codespace**. The GitHub `dev` branch and its compiled CI browser preview do contain the redesign. A Codespace `git pull` (after safeguarding local work) and Vite restart are necessary before judging this live preview.

## Visual evidence

- Baseline images: previous `dev` browser QA [run 39834845277](https://github.com/musammilvilayil/L7clone/actions/runs/39834845277)
- First newly redesigned render and mobile screenshots: [run 39840613212](https://github.com/musammilvilayil/L7clone/actions/runs/39840613212)
- **Final QA artifact**: [run 39842549772](https://github.com/musammilvilayil/L7clone/actions/runs/39842549772) and [screenshots/video archive](https://github.com/musammilvilayil/L7clone/actions/runs/39842549772/artifacts/12454730204) — 97 PNG/video files covering each scene at nine widths, expanded FAQ, joined hands, light mode, reduced motion and reversible full-page scroll.


**Visual spot review after PASS:** The 320px hero palm now appears on the initial screen, 390px uses a safe dedicated gesture slot, desktop Engineering separates its gesture from the photographed person's face, and contact hands reach the interaction point on scroll. Captures remain automated visual evidence rather than a human-device signoff.

## Unresolved content / limitations

1. **No fully rigged 3D hand model** was available in original media; hands are cinematic SVG silhouettes with dimensional contours and proper mobile fallbacks, not photorealistic 3D.
2. Prior source footer entries for `Blogs`, `Careers` and `Privacy Policy` are on-page anchor links, not separate pages. They are preserved instead of inventing destinations.
3. FPS/device-lab tests on real low-memory phones were not performed. Chromium viewport and accessibility smoke tests are not substitutes for a device lab.
4. This redesign has not earned and does not claim any Awwwards distinction.
5. Final visual sign-off requires sync and review of the real `5174` Codespaces preview.

## Codespaces sync

If local work is saved or committed, in the existing Codespace:

```bash
git status
git switch dev
git pull --ff-only origin dev
npm ci
npm run dev -- --host 0.0.0.0 --port 5174
```

Do **not** discard uncommitted local changes to force the pull.
