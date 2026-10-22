# Ladder7 — Original asset inventory and use

Provenance: `main` at `45dbbf4` and reference project `D:\l7\l7`.
**No original asset was deleted, overwritten, or synthetically replaced.**
Every directory alias in `public/images` is retained, including `hero/`, `logos/`, `products/`, `icons/` and top-level copies.

| Asset / standardized path | Source / dimensions | Format | New placement | Status |
|---|---|---|---|---|
| `hero/hero-ai-platform.webp` | main (5583 × 3722) | WebP | Hero media (#top) | Active |
| `hero/hero-intelligent-automation.webp` | main (5656 × 3771) | WebP | Perspectives (#thinking) | Active |
| `hero/hero-digital-engineering.png` | main (5583 × 3722) | PNG | Perspectives; Why Ladder7 | Active |
| `hero/hero-cloud-architecture.webp` | main (5583 × 3722) | WebP | Perspectives (#thinking) | Active |
| `logos/logo-primary.webp` | main (8334 × 3424) | WebP | Header/footer in light mode | Active |
| `logos/logo-white.webp` | main (780 × 320) | WebP | Header/footer in default dark mode | Active |
| `logos/logo-primary.png` | main (8334 × 3424) | PNG | Preserved original lossless logo | Preserved, backup |
| `logos/logo-icon.png` | main (512 × 512) | PNG | Favicon via `index.html` | Active |
| `products/product_showcase.jpeg` | D:\l7\l7 (73.8 KB) | JPEG | Site 360 live audit preview | Active |
| `products/nexushome.jpeg` | D:\l7\l7 (980.8 KB) | JPEG | L7 Nexus communications preview | Active |
| `products/L7-Insights-Home.jpeg` | D:\l7\l7 (806.3 KB) | JPEG | L7 Insights telemetry preview | Active |
| `products/outreachhm.jpeg` | D:\l7\l7 (724.6 KB) | JPEG | Outreach Engine campaigns preview | Active |
| `products/infinityhome.jpeg` | D:\l7\l7 (884.5 KB) | JPEG | Infinite Insights knowledge preview | Active |
| `products/product-telemetry-preview.webp` | main (1024 × 1024) | WebP | Original telemetry asset | Preserved, fallback |
| `products/product-showcase.webp` | main (1024 × 1024) | WebP | Original showcase asset | Preserved, fallback |
| `icons/icons-sprite.svg` | main (Vector) | SVG | Original sprite | Preserved |
| `icons/favicon.svg` | main (Vector) | SVG | Vector favicon | Preserved |

### Authentic Product Showcase Images

In earlier iterations, all 5 products temporarily fell back to `product-telemetry-preview.webp`. With access to the reference assets at `D:\l7\l7`, all five products now have their genuine, authentic application screenshots loaded with responsive controls, keyboard arrow navigation, and high visual clarity.

### Image Optimization and Placement

- Hero and perspective images use responsive container boundaries with `object-fit: contain` and background panels to eliminate awkward cropping of engineering content.
- Product screenshots are contained within a dimensional tablet frame (`.product-visual`) with subtle elevation and border detailing.
- Brand logos swap smoothly between dark mode (`logo-white.webp`) and light mode (`logo-primary.webp`).
