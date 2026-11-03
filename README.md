# Ladder7 Web Platform — 2026 Dark-First Redesign

Complete dark-first redesign and rebuild of the **Ladder7 NextStep Solutions** (`https://www.ladder7.in/`) digital presence, engineered from the ground up with zero legacy code or layout reuse while preserving all official brand assets, logos, visual media, and business content.

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS 3 (Dark-only layered obsidian token system)
- **Icons:** Lucide React
- **Linter:** Oxlint

## Clean Architecture
```text
d:/desktop/L7clone/
├── public/
│   ├── favicon.svg
│   ├── logo-icon.png
│   └── images/
│       ├── hero/
│       ├── icons/
│       ├── logos/
│       └── products/
├── src/
│   ├── content/
│   │   └── siteCatalog.ts         # Reused brand assets, copy, products, links & locations
│   ├── primitives/
│   │   ├── MagneticAction.tsx     # Pointer-magnetic interactive CTA primitive
│   │   ├── RevealOnScroll.tsx     # Scroll-triggered & staggered word reveal primitives
│   │   └── SpotlightSurface.tsx   # Cursor-tracked radial glow Bento surface
│   ├── sections/
│   │   ├── FloatingGlassNav.tsx   # Floating glass pill nav (scroll-spy + hide/show on scroll)
│   │   ├── HeroShowcase.tsx       # 01. Hook: Outcome headline + 3D Stacked Perspective Asset Stage
│   │   ├── VisionManifesto.tsx    # 02. Vision: Oversized manifesto & architectural shift ledger
│   │   ├── AudienceArchitecture.tsx # 03. Who We Are: Enterprise, Startups/SMBs, Bootcamps & Hubs
│   │   ├── CapabilitiesBento.tsx  # 04. What We Do: Asymmetrical 12-col 2026 Bento Grid
│   │   ├── ProductDeckRail.tsx    # 05. Proof: Horizontal Product Rail + Site 360 12-Lens Preview
│   │   ├── ProcessTimeline.tsx    # 06. How We Build: Illuminated vertical spine + staggered stages
│   │   ├── TrustMetricsMatrix.tsx # 07. Why Trust Us: Telemetry wall + 3 core value pillars
│   │   ├── ObjectionsAccordion.tsx# 08. Objections: Sticky split layout + smooth FAQ drawers
│   │   ├── ActionBriefForm.tsx    # 09. Action: Validated scoping console + Email/WhatsApp dispatch
│   │   └── MonumentFooter.tsx     # 10. Footer: Final CTA band, columns, socials & oversized wordmark
│   ├── tokens/
│   │   └── designTokens.ts        # Single-source color, layout & TypeScript contracts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Scripts
```bash
npm run dev      # Start development server
npm run lint     # Run Oxlint static analysis
npm run build    # Type-check and build production bundle
npm run preview  # Preview production build
```
