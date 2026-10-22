# Ladder7 — Ultimate cinematic redesign

## Scope and baseline

- **Working branch:** `dev` only; `main` is read-only (original-business reference).
- **Baseline:** previous `CreativeApp.tsx` plus scroll-gesture engine (source around `970245b`).
- **Delivery:** `src/CinematicApp.tsx` and `src/cinematic.css` replace the active visual composition; `src/CreativeApp.tsx` and `src/creative.css` remain in the repo unchanged as a reference/rollback path.
- **Original data:** imports `HERO_SLIDES`, `CAPABILITIES`, `PRODUCTS`, and `FAQS` directly. The copy, supplied imagery, links, and contact information are not re-created from guesses.

## Reference research and source-use policy

Public GitHub repositories inspected (repository metadata, dependency manifests, and where available READMEs):

| Reference | Relevant verified approach | License / reuse decision |
| --- | --- | --- |
| [Zentry tutorial](https://github.com/adrianhajdin/award-winning-website) | GSAP chapter motion, geometric image reveals, 3D hover | README explicitly prohibits commercial/public use of original Zentry assets; **no code/assets copied** |
| [K72 agency](https://github.com/AyushAwasthi26/K72) | Type-forward storytelling, sectional pinning, scene-scale motion | MIT, but only conceptual inspiration |
| [Innvt](https://github.com/InnvtFoundation/Innvt) | GSAP, Lenis, R3F/drei, cinematic agency scene architecture | No verified reusable license in metadata; no copying |
| [Lattice Drift](https://github.com/Kavtuai/lattice-drift) | React/TypeScript, GSAP, Lenis, Three | MIT; conceptual inspiration |
| [Capsule](https://github.com/ShowravKormokar/capsule) | Art-directed responsive section treatment | No verified reusable license; no copying |
| [Apple-style Scroll Storytelling](https://github.com/KaranChandekar/scroll-storytelling) | Scroll-linked chapter progress, sticky rails, parallax, reduced-motion | README describes MIT; authored own implementation |
| [HxnDev](https://github.com/HxnDev/Portfolio) | Responsive React/Vite motion composition | No verified reusable license; no copying |
| [Giats portfolio](https://github.com/Giats2498/giats-portfolio) | React Three Fiber cinematic scenes | Metadata license unverified; no copying |
| [ITom](https://github.com/ITomPoland/portfolio-itom) | Complex WebGL interaction budget and R3F architecture | MIT; only concept borrowed |
| [Scroll Storytelling Experiments](https://github.com/decriptcypher/scroll-storytelling) | Model/Canvas/scroll narrative experiments | No verified reusable license; no copying |
| [Formula Three](https://github.com/willdebras/formula-three) | Three.js/GSAP scrollytelling | No verified reusable license; no copying |
| [Vanta](https://github.com/madebyvansh/vanta) | Video-first responsive motion | No verified reusable license; no copying |
| [Motionfolio](https://github.com/zickrian/motionfolio) | GSAP-ready minimal starter structure | MIT, inspiration only |
| [Saeed Kolivand portfolio](https://github.com/saeedkolivand/saeed-kolivand-portfolio) | Interactive scroll-driven 3D | No verified reusable license; no copying |
| [VALORANT Game Website](https://github.com/tricuongdao/game-website) | Full-bleed game presentation, locally hosted imagery | MIT, design treatment only |
| [Apple Clone](https://github.com/ricky-antonio/apple-clone) | 3D product rotation and scroll-paced product framing | No verified reusable license; no copying |
| [Apple R3F MacBook](https://github.com/WhiiteRose/Apple) | Product-led 3D/perspective narrative | No verified reusable license; no copying |

**Important:** No third-party code, models, or imagery from these reference repos was imported. The redesign only uses original Ladder7 media from `public/images/`. The design language and scroll director were authored for Ladder7. `GSAP`, Lenis, R3F and Three.js were deliberately **not** added to runtime dependencies: this site has no suitable rigged GLTF product/hand models, and native intersection-based progress with CSS perspective already satisfies the specified storytelling interactions at significantly lower package and mobile GPU cost. It would be misleading to claim this implementation uses those libraries.

## New narrative structure

1. **Opening:** full-height editorial hero, recognizable local palm, reserved large original AI image, CTA and chapter-progress indication.
2. **Vision:** sticky editorial chapter rail and three existing original-perspective stories, each with original photo, description and CTA.
3. **Who we are:** left welcoming palm and large letterspaced business mission, followed by two audience profiles.
4. **Services:** interactive four-chapter accordion plus separate original-media illustration theatre with corresponding gesture and visual chapter number.
5. **Products:** wide five-tab selector, large original product screen, separate touch gesture, features and accessible next/previous controls.
6. **Engineering:** filmic full-bleed original engineering photo, actual existing engineering story copy, distinct technical hand gesture and contact action.
7. **Why Ladder7:** large headline, original photo and sequential value rows without fabricated metrics.
8. **FAQ:** accessible independently formed five-finger hand, question mark, three original questions and answers.
9. **Finale:** human-to-human joining gesture, clear existing revenue-oriented contact message, original contact links, training strip and complete footer.

## Architecture and performance

- The nine scenes reside in `src/CinematicApp.tsx`; preserve semantic `section`/heading markup and real text nodes for SEO.
- `useScrollDirector` drives scroll progress via CSS variables and DOM transforms in requestAnimationFrame; React state changes only when a chapter changes.
- `NetworkGesture` remains a section-local scroll-scrubbed SVG. Strokes form, articulate, contact meaningful nodes, unwind, and reverse on upward scroll.
- Intersection observers limit updates to nearby scenes and reveal sections.
- Avoids global permanent 3D canvases, random particles, heavy animation libraries, autoplay media and dependency inflation.
- Keyboard-accessible navigation, responsive menu, service accordion, product tablist, FAQ accordion, `prefers-reduced-motion`, theme toggle and direct contact links are preserved.
- Responsive layouts adapt at 1600, 1180, 1024, 850, 600, and 355px; the browser QA covers 320 to 1920px.

## Known limitations

- The line-art hands use SVG perspective and contour drawing rather than true rigged, photorealistic WebGL 3D; no unseen model or image asset is invented.
- Some pre-existing footer links (`Blogs`, `Careers`, `Privacy Policy`) point to on-page anchors even in the original source. They remain as originally supplied rather than being directed to invented destinations.
- Pushing to GitHub `dev` does not automatically pull changes into a separately running Codespace on port 5174. The latest source needs a local `git pull` and Vite restart if Codespaces does not auto-sync.
- Visual quality remains a creative judgment; reference resemblance is not proof of an Awwwards award.

## Verification

See `docs/QA_REPORT.md` and the `Ladder7 Browser QA` workflow on `dev` for measured viewport sizes, interactions, video and screenshots. GitHub Actions builds the actual Vite app and runs Playwright against the served production preview; any observed test failures are corrected before treating a revision as validated.
