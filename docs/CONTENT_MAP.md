# Ladder7 — Content and route preservation map

Source of truth: `main` at `45dbbf44f72cd8ee504b3473efc33909bf411f18`.
Destination: redesign committed only to `dev`.

| Original source | Original content/behavior | New location | Notes |
|---|---|---|---|
| `data/heroSlides.ts`, item 1 | Intelligent AI, complete question title, paragraph, both CTA strings | `#top` hero | Original copy loaded verbatim from unchanged data |
| `data/heroSlides.ts`, items 2–4 | Intelligent Automation, Nextstep Digital Engineering, Enterprise Cloud Strategy titles/descriptions/CTAs | `#thinking` editorial perspectives | All messages and image references retained without auto-rotating slides |
| `JourneySection.tsx` | Every Business. Every Market. One Goal — Revenue.; full mission text | `#about` | Full paragraph retained verbatim |
| `JourneySection.tsx` | Established Brands & Scaling Businesses, Fast-Growing Startups & SMBs and descriptions | `#about` audience lines | Full copy retained |
| `Capabilities.tsx` | Strategic Capabilities heading, four core pillars subtitle, service catalog CTA | `#capabilities` | Editorial service lines instead of cards |
| `data/capabilitiesData.ts` | All 4 service titles, descriptions, and 16 original tag strings | `#capabilities` expandable details | Strings and spelling unchanged; no fabricated services |
| `ProductsShowcase.tsx` | Product suite heading/intro, action labels, demo CTA, previous/next control | `#products` | Accessible manual selection replaces autoplay |
| `data/productsData.ts` | Site 360, L7 Nexus, L7 Insights, Outreach Engine, Infinite Insights; titles, descriptions, features, CTAs, image paths | `#products` keyboard-operable product tabs | Complete original product data preserved; all products share the original provided preview image |
| `WhyLadder7.tsx` | Why Innovators Partner With Ladder7; Revenue-First; Global Delivery; Security and Compliance | `#why-ladder7` | Original text reproduced verbatim |
| `FAQSection.tsx` / `faqData.ts` | All 3 exact questions and answers | `#faq` | Expanded one at a time via accessible buttons; FAQ wireframe front-facing palm visual |
| `AdvisorCTA.tsx` | Your Website Should Be Generating Revenue Right Now; body; Start Your Revenue Engine Today | `#contact` | Original mailto endpoint retained; no fake submission form |
| `Header.tsx` | Who we are, What we do, What we think, Corporate Training, Contact Us | Fixed header, responsive drawer | All primary destinations now resolve to actual anchors |
| `Header.tsx` | Education/IT segment display | Header links to `#training`/`#top` | Functional anchors rather than state-only switcher |
| `Footer.tsx` | Services links; company labels; locations; phone; email; social links; copyright; Privacy Policy | `#footer` | Preserved original destinations; see limitations below |
| `index.html` | Page title, description, favicon | `index.html` | Preserved title/description, added canonical and OG fields |
| `public/images/**` | Logos, original four slide images, product preview, icons, aliases | Original directory unchanged | See ASSET_MANIFEST.md |

## Anchors and route behavior

The original application is a single-page Vite site on `/` with fragment anchors.
The redesign preserves `#about`, `#products`, `#capabilities`, `#contact`, and adds real `#training`, `#faq`, and `#why-ladder7`.
No additional real routes were present in the original source.

## Known source-content limitations

- The original footer advertises **Blogs** and **Careers** but links them to `#about`, not dedicated pages. This placeholder behavior is preserved without inventing pages.
- The original **Privacy Policy** link points to `#contact`, not a privacy document. A verified policy URL must be provided to make that label truthful.
- The original **Corporate Training** nav had no corresponding content section. The redesign adds a correctly anchored heading and contact email CTA, but invents no course syllabus or offer.
- There was no functional contact form/POST endpoint in the original. A genuine `mailto:` CTA and phone link are preserved; email-client availability depends on visitor configuration.
- The original product data uses the same preview image for all 5 products. Additional authentic screenshots are needed for product-specific previews.

## Original file preservation

All legacy components and unmodified original `src/data/*` modules remain in the Git tree as reference. The new application is activated via `src/App.tsx` and implemented in `src/CreativeApp.tsx`, `src/creative.css`, and `src/components/experience/NetworkGesture.tsx`.
