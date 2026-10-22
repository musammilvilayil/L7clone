# Ladder7 — Content and route preservation map

Source of truth: `main` at `45dbbf44f72cd8ee504b3473efc33909bf411f18`.
Destination: redesign committed exclusively to `dev`.

| Original source | Original content/behavior | New location | Notes |
|---|---|---|---|
| `data/heroSlides.ts`, item 1 | Intelligent AI, complete question title, paragraph, both CTA strings | `#top` hero | Original copy loaded verbatim; connected lines converge into 3D wireframe open hand |
| `data/heroSlides.ts`, items 2–4 | Intelligent Automation, Nextstep Digital Engineering, Enterprise Cloud Strategy titles/descriptions/CTAs | `#thinking` editorial perspectives | All messages and image references retained; lines reform into thinking / discovery pose |
| `JourneySection.tsx` | Every Business. Every Market. One Goal — Revenue.; full mission text | `#about` | Full paragraph retained verbatim; discovery gesture with raised index finger |
| `JourneySection.tsx` | Established Brands & Scaling Businesses, Fast-Growing Startups & SMBs and descriptions | `#about` audience lines | Full copy retained |
| `Capabilities.tsx` | Strategic Capabilities heading, four core pillars subtitle, service catalog CTA | `#capabilities` | Editorial service lines with interactive connection gesture |
| `data/capabilitiesData.ts` | All 4 service titles, descriptions, and 16 original tag strings | `#capabilities` expandable details | Strings and spelling unchanged; hand pinch/connects with digital nodes upon selection |
| `ProductsShowcase.tsx` | Product suite heading/intro, action labels, demo CTA, previous/next control | `#products` | Accessible manual selection with keyboard navigation |
| `data/productsData.ts` | Site 360, L7 Nexus, L7 Insights, Outreach Engine, Infinite Insights; titles, descriptions, features, CTAs | `#products` keyboard-operable product tabs | Complete original product data preserved; all 5 products now display authentic individual screenshots |
| `WhyLadder7.tsx` | Why Innovators Partner With Ladder7; Revenue-First; Global Delivery; Security and Compliance | `#why-ladder7` | Original text reproduced verbatim; confident wireframe gesture |
| `FAQSection.tsx` / `faqData.ts` | All 3 exact questions and answers | `#faq` | Front-facing five-finger hand with sequential finger emergence and line-formed question mark |
| `AdvisorCTA.tsx` | Your Website Should Be Generating Revenue Right Now; body; Start Your Revenue Engine Today | `#contact` | Two line hands emerge from opposite sides and connect with a subtle pulse node |
| `Header.tsx` | Who we are, What we do, What we think, Corporate Training, Contact Us | Fixed header, responsive drawer | All primary destinations resolve to actual anchors |
| `Header.tsx` | Education/IT segment display | Header links to `#training`/`#top` | Functional anchors rather than state-only switcher |
| `Footer.tsx` | Services links; company labels; locations; phone; email; social links; copyright; Privacy Policy | `#footer` | Preserved original destinations; see limitations below |
| `index.html` | Page title, description, favicon | `index.html` | Preserved title/description, added canonical and OG metadata |
| `public/images/**` | Logos, original four slide images, product preview, icons, aliases | Original directory unchanged | All original files preserved; authentic product screenshots added |

## Anchors and route behavior

The application is a single-page Vite site on `/` with fragment anchors.
The redesign preserves `#about`, `#products`, `#capabilities`, `#contact`, and adds real `#training`, `#faq`, and `#why-ladder7`.
No additional real routes were present in the original source.

## Authentic product screenshots integration

The authentic product screenshots from the teammate reference (`D:\l7\l7`) have been integrated into `public/images/products/`:
1. `product_showcase.jpeg` → Site 360 (Live audit quick scan)
2. `nexushome.jpeg` → L7 Nexus (Omnichannel communications & engagement)
3. `L7-Insights-Home.jpeg` → L7 Insights (Predictive analytics & executive telemetry)
4. `outreachhm.jpeg` → Outreach Engine (Autonomous multi-channel acquisition)
5. `infinityhome.jpeg` → Infinite Insights (Cognitive enterprise knowledge engine)

## Known source-content limitations

- The original footer advertises **Blogs** and **Careers** but links them to `#about`, not dedicated pages. This placeholder behavior is preserved without inventing pages.
- The original **Privacy Policy** link points to `#contact`, not a privacy document. A verified policy URL must be provided to make that label truthful.
- The original **Corporate Training** nav had no corresponding content section. The redesign adds a correctly anchored heading and contact email CTA, but invents no course syllabus or offer.
- There was no functional contact form/POST endpoint in the original. A genuine `mailto:` CTA and phone link are preserved; email-client availability depends on visitor configuration.

## Original file preservation

All legacy components and unmodified original `src/data/*` modules remain in the Git tree as reference. The new application is activated via `src/App.tsx` and implemented in `src/CreativeApp.tsx`, `src/creative.css`, `src/components/experience/GestureStage.tsx`, `src/components/experience/GestureAnchor.tsx`, and `src/lib/gesture3d/*`.
