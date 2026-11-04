# LADDER7 Nextstep Solutions LLP — 2026 Dark-Only Digital Rebuild

Complete ground-up architectural redesign and front-end rebuild of the **LADDER7 Nextstep Solutions LLP** web platform (`https://www.ladder7.in/`).

## Design System & Architecture

- **Theme**: Dark-First & Dark-Only (`#08090C` Carbon Obsidian base, `#0F1117` / `#151922` / `#1D222E` layered surfaces)
- **Accent Palette**: Signal Blue (`#2563EB`, `#3B82F6`) + Sky Blue (`#93C5FD`)
- **Typography**: `Syne` (Editorial Display), `Plus Jakarta Sans` (Body), `JetBrains Mono` (Technical Telemetry)
- **Logo Treatment**: Crisp white dark-theme inversion (`.logo-dark-invert`) of `/images/LADDER 7 NS Black.webp` preserving exact geometry and aspect ratio.

## Source Structure

```text
src/
├── catalog/
│   └── freshContent.ts               # Reused asset registry, factual details, & 100% fresh copy
├── design-system/
│   └── tokens.ts                     # Single-source design tokens & TypeScript interfaces
├── motion/
│   ├── BlueSpotlightCard.tsx      # Cursor-tracked radial blue spotlight surface
│   ├── MagneticTrigger.tsx           # Spring-interpolated magnetic wrapper
│   └── ScrollReveal.tsx              # IntersectionObserver reveal & word-by-word kinetic text
├── modules/
│   ├── GlassPillHeader.tsx           # Floating glass pill nav, scroll-spy, hide/show on scroll, full-screen mobile menu
│   ├── HeroMosaicStage.tsx           # Hook: Outcome headline, dual CTAs, interactive 4-asset lens mosaic, trust strip
│   ├── VisionEditorialSplit.tsx      # Vision: Sticky editorial manifesto + vertical architectural thesis ledger
│   ├── IdentityDualLedger.tsx        # Who We Are: Company narrative + interactive Cochin/Trivandrum studio switcher
│   ├── ServicesBentoGrid.tsx         # What We Do: 12-column asymmetric Bento matrix with interactive scope drawer
│   ├── ProductsDraggableRail.tsx     # Proof: Reinvented horizontal draggable snap rail & split inspection stage
│   ├── ExecutionBlueprintMatrix.tsx  # How We Build: 4-gate interactive engineering blueprint & deliverables matrix
│   ├── CredibilityTelemetryWall.tsx  # Why Trust Us: Architectural telemetry wall & live technology stack filter
│   ├── FaqSplitDrawer.tsx            # FAQ: Categorized executive objection filter & accessible accordion
│   ├── ProjectBriefConsole.tsx       # Contact: Interactive scope synthesizer with direct WhatsApp & Email dispatch
│   └── ArchitecturalFooter.tsx       # Footer: Final CTA band, link columns, socials, oversized wordmark, legal
├── App.tsx                           # Storytelling flow orchestration
├── index.css                         # Token variables, dark-theme utilities, & reduced-motion support
└── main.tsx                          # React 19 entry point
```

## Scripts

- `npm run dev` — Start Vite development server
- `npm run lint` — Run Oxlint static verification
- `npm run build` — Run TypeScript compiler check (`tsc -b`) and Vite production build
