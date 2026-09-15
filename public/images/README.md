# Ladder7 Production Assets Archive

Professional, production-grade asset archive for the Ladder7 web application. All assets follow standard enterprise naming conventions (kebab-case, clean descriptors, and no raw or machine-generated strings).

## Folder Organization

```
assets/
├── logos/
│   ├── logo-primary.webp          # Light mode primary brand header logo (WebP)
│   ├── logo-primary.png           # Light mode lossless fallback logo (PNG)
│   ├── logo-white.webp            # Dark mode inverted brand header logo
│   └── logo-icon.png              # Square brand mark for tab favicon & metadata
│
├── hero/
│   ├── hero-ai-platform.webp              # Slide 1: Intelligent AI banner
│   ├── hero-intelligent-automation.webp   # Slide 2: Intelligent Automation banner
│   ├── hero-digital-engineering.png       # Slide 3: Nextstep Digital Engineering banner
│   └── hero-cloud-architecture.webp       # Slide 4: Enterprise Cloud Strategy banner
│
├── products/
│   └── product-telemetry-preview.webp     # Product suite diagnostic interface showcase
│
└── icons/
    ├── favicon.svg                        # Vector SVG ladder emblem
    └── icons-sprite.svg                   # SVG sprite sheet
```

## Asset Mapping (Legacy / Raw to Production Naming)

| Original Raw / Scraped Name | New Production-Grade Name | Category | Resolution | Format |
|---|---|---|---|---|
| `LADDER 7 NS Black.webp` | `logo-primary.webp` | Logo | 8334 × 3424 | WebP |
| `LADDER 7 NS Black.png` | `logo-primary.png` | Logo | 8334 × 3424 | PNG |
| `ladder7.webp` | `logo-white.webp` | Logo | 780 × 320 | WebP |
| `logo-for-indexpage.png` | `logo-icon.png` | Favicon | 512 × 512 | PNG |
| `Intelligent-AI.webp` | `hero-ai-platform.webp` | Hero | 5583 × 3722 | WebP |
| `Intelligent-Automation.webp` | `hero-intelligent-automation.webp` | Hero | 5656 × 3771 | WebP |
| `Engineering_the_Future_of_Digital_Business_herosection.png` | `hero-digital-engineering.png` | Hero | 5583 × 3722 | PNG |
| `Enterprise-Cloud-Strategy.webp` | `hero-cloud-architecture.webp` | Hero | 5583 × 3722 | WebP |
| `product-showcase.webp` | `product-telemetry-preview.webp` | Product | 1024 × 1024 | WebP |
| `icons.svg` | `icons-sprite.svg` | Icon | Vector | SVG |
