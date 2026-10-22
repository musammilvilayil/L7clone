# Ladder7 — Cinematic reference research

## Source and license review

Research performed on 23 October 2026 against the publicly visible GitHub repositories and README/package metadata, **before designing the new nine-chapter experience**.

| Repository | Relevant source architecture | Repo license metadata | Decision for Ladder7 |
| --- | --- | --- | --- |
| [adrianhajdin/award-winning-website](https://github.com/adrianhajdin/award-winning-website) | React + GSAP; geometric masks, intro sequencing, video reveals, interactive card perspective | No SPDX license reported in repository metadata | Inspiration only. Never copy its design/assets/code. |
| [AyushAwasthi26/K72](https://github.com/AyushAwasthi26/K72) | React/Vite + GSAP/Lenis; editorial typography, fullscreen transitions, pinning | MIT | Use conceptual hierarchy and pacing, not design code. |
| [Kavtuai/lattice-drift](https://github.com/Kavtuai/lattice-drift) | React/TS + GSAP, Lenis, Three.js; instanced WebGL geometry and mutable scroll state | MIT | Adopt lightweight scroll state idea; omit heavy field of 3D objects. |
| [KaranChandekar/scroll-storytelling](https://github.com/KaranChandekar/scroll-storytelling) | Next.js + GSAP/Lenis; multi-chapter progression, sticky storytelling, scroll progress rail | No SPDX license reported | Inspiration only for chapter structure; all Ladder7 implementation original. |
| [ITomPoland/portfolio-itom](https://github.com/ITomPoland/portfolio-itom) | React Three Fiber, GSAP, shader preloading; careful DOM state updates | MIT for code; personal assets expressly reserved in README | Adopt render-efficiency principles; do not reuse models/art. |
| [Giats2498/giats-portfolio](https://github.com/Giats2498/giats-portfolio) | R3F + GSAP + Lenis with advanced runtime composition | NOASSERTION license metadata | No borrowed code/assets. |
| [InnvtFoundation/Innvt](https://github.com/InnvtFoundation/Innvt) | React Three Fiber / GSAP / Lenis application | No SPDX license reported | Visual research only. |
| [ShowravKormokar/capsule](https://github.com/ShowravKormokar/capsule) | Agency interaction experiment, based on another site's design | No SPDX license reported | Visual research only. |
| [decriptcypher/scroll-storytelling](https://github.com/decriptcypher/scroll-storytelling) | GSAP, R3F, scroll-driven model and frame sequencing | No SPDX license reported | Visual research only. |
| [ricky-antonio/apple-clone](https://github.com/ricky-antonio/apple-clone) | GSAP ScrollTrigger, model views and source-video management | No SPDX license reported | Product storytelling inspiration, no code or Apple models. |

Other repositories additionally checked for existence, description and implementation stack: [willdebras/formula-three](https://github.com/willdebras/formula-three), [madebyvansh/vanta](https://github.com/madebyvansh/vanta), [zickrian/motionfolio](https://github.com/zickrian/motionfolio), [saeedkolivand/saeed-kolivand-portfolio](https://github.com/saeedkolivand/saeed-kolivand-portfolio), [tricuongdao/game-website](https://github.com/tricuongdao/game-website), [WhiiteRose/Apple](https://github.com/WhiiteRose/Apple), and [HxnDev/Portfolio](https://github.com/HxnDev/Portfolio).

*Absence of an SPDX license in GitHub metadata is not a permission to redistribute source or art. None of these third-party assets, models, CSS snippets, or source code have been added to Ladder7.*

## Creative decisions

- **One continuous story:** A numbered nine-chapter rail and progress line unify scenes without a distracting overlay.
- **Opening:** Dramatic two-column brand statement, an immediately recognizable open palm, original Ladder7 hero photograph and explicit CTA.
- **Vision:** An editorial sticky text chapter and sequential real image-led perspective cards.
- **About:** Left-origin human hand versus large right-side company promise.
- **Services:** Full visual theatre, four real capability accordions and selected capability media/gesture.
- **Products:** A large product-stage layout, five working tabs, a real screenshot and a separate touch gesture.
- **Engineering:** Full-bleed original engineering image, dramatic typography, restrained gesture depth.
- **Why:** Proof anchored in the three actual existing business propositions. No fabricated success metrics.
- **FAQ:** Five-finger palm staged independently from all three preserved questions/answers.
- **Finale:** Two connecting hands, full-size revenue message and original contact channels.

## Engineering choice: no forced GSAP/Three.js bundle

The inspected examples use GSAP/ScrollTrigger, Lenis, Three.js and React Three Fiber when the assets and complexity justify them. Ladder7's visual source assets are primarily 2D photography and custom SVG gestures—not production-ready 3D models. For this iteration we deliberately avoided forcing a WebGL canvas or adding global smooth-scroll that would disrupt native anchors, keyboard navigation, low-power mobile performance or reduced-motion preferences.

Instead, the lightweight `useScrollDirector` uses IntersectionObserver, passive events, rAF and CSS custom properties for native-scroll chapter state and parallax. `NetworkGesture` applies stroke and transform updates directly to scoped SVG nodes. This yields reversible motion and avoids scroll-driven React re-renders. The result is intentionally **not** presented as a GSAP/WebGL implementation.

## Exact source of business information

- `main` branch: read only.
- `dev` files `src/data/heroSlides.ts`, `src/data/capabilitiesData.ts`, `src/data/productsData.ts`, `src/data/faqData.ts`: unchanged source of marketing details, product descriptions, service descriptions and FAQ content.
- `src/CreativeApp.tsx`: reference snapshot of the prior design; retained for comparison, not deleted.
- `src/CinematicApp.tsx`: active redesign.
