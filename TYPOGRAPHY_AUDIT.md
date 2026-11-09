# Typography audit — beta

## Initial audit (before implementation)

**Branch:** `beta`
**Audit date:** 2026-11-09
**Scope:** Current source tree, all declared application routes, shared and
co-located styles, and existing website inventory data.

### Repository and rendering architecture

- React 19, TypeScript, React Router 7, and Vite 8.
- 65 live routes in `src/routes.ts`; route components are registered through
  the shared app shell and styles are loaded with lazy page components.
- 59 tracked CSS files, 130 TSX files, and 68 TS files. CSS is plain,
  co-located component styling plus shared styles in `src/styles/`.
- The shared stylesheet order is tokens, reset, typography, global layout,
  reusable components, animations, and responsive overrides. Component
  stylesheets load afterward.
- No Tailwind, SCSS/Sass, Less, CSS Modules, styled-components, or Emotion
  styling system is used. The few JSX `style` props set animation custom
  properties rather than font sizes.
- The repository's inventory JSON was last scanned on 2026-11-07 and reports
  66 pages / 406 sections. Its page count differs from the current route table
  (65), so the source route table is the implementation and test authority.

### Route families covered

| Route family | Routes |
| --- | ---: |
| Home | 1 |
| IT core pages | 4 |
| Education landing pages | 7 |
| Product detail pages | 5 |
| Education product pages | 5 |
| Service detail pages | 14 |
| Corporate training detail pages | 11 |
| Blog index and articles | 8 |
| Course detail pages | 4 |
| Utility / other pages (FAQ, careers, privacy, sitemap, etc.) | 6 |
| **Total** | **65** |

Every route shares the header, navigation, footer, and global component styles;
page-specific typography is in the corresponding section and page styles.
The source inventory also records 406 sections across those pages.

### Existing typography system and findings

The site uses the self-hosted Geist variable font with a metric-matched Arial
fallback. Heading weights and the display scale are intentional and are not
targets for broad changes.

| Existing token / use | Current size | Audit finding |
| --- | ---: | --- |
| Display and H1–H4 | fluid, 24–150 px | Intentional hierarchy; preserve |
| H5 | 19 px | Already readable; preserve |
| H6 and lead | 17 px | Raise to 18 px |
| Body large | 15 px | Raise to 16 px |
| Body paragraph token | 14 px | Raise to 16 px, subject to wrapping checks |
| Small body | 13 px | Raise to 14 px |
| Caption | 12 px | Raise to 13 px |
| Label / eyebrow | 11 px | Raise selectively to 12–13 px |
| Micro text | 10 px | Raise selectively to 12 px |
| Artwork text | 8 px | Decorative/mimicked UI in product and service illustrations; raise to 10 px, then review meaningful labels individually |
| Buttons | 12–16 px by size and breakpoint | Increase small readable labels without changing button or disc dimensions |
| Component-specific literals | Includes 5–17 px | Concentrated in forms, navigation, footer, blog metadata, product/service mockups, and responsive styles |

The audit found typography declarations and token references in shared styles
and 52 CSS files. The most typography-dense component styles are service detail
templates, product suite mockups, pathway boards, blog index, and enquiry forms.
Small hard-coded values in artwork/mock dashboard screens are not all ordinary
reading text; they require separate judgment because changing them can crowd
the illustration.

The literal-size scan found 69 hard-coded font-size declarations below 18 px
across 14 CSS files; 40 are 11 px or smaller. Shared token references are
additional to these literals. The smallest values are predominantly in
illustration/mock-dashboard details, while small non-decorative values occur
in form chips, footer metadata, blog metadata, section labels, and cards.

### Responsive and layout risks

- Shared responsive breakpoints are 1000 px and 700 px, with additional
  component-specific media queries.
- The body line-height is 1.7; paragraph line-height is 1.8. Increasing body
  copy while retaining both values can substantially increase long-page height.
- Mobile overrides reduce lead text and button sizes, so mobile must be
  evaluated independently rather than inheriting desktop changes blindly.
- Small buttons have fixed 40 px heights and horizontal padding; navigation
  and button labels are sensitive to width growth.
- Several small type sizes are inside fixed-size product/service illustrations.
  No content will be hidden or clipped to preserve a viewport.

### Existing worktree state to preserve

Before this audit report was written, the worktree already contained changes
in `AboutStory.css`, `ProductSuite.css`, and `ServiceHero.css`, plus an
untracked `scratch/` directory. The typography changes in those files are
pre-existing user work and are part of the baseline; they are not attributed
to this task and must not be reverted.

### Baseline evidence gathered before implementation

- `beta` is the current branch.
- The development site responds with HTTP 200.
- A browser pass visited all 65 current routes at 1440 × 900: all returned a
  main content region and no horizontal document overflow was detected.
- Initial baseline browser output did not reliably settle page heights for
  every lazy-loaded route. Exact page-height comparisons therefore require a
  settled render and will be reported only where captured reliably.

### Implementation plan (not yet applied at audit time)

1. Retain the existing Geist font, heading/display scale, colors, section
   order, grid structure, and current user edits.
2. Tune the existing shared tokens rather than add a competing type system:
   body 16 px, small body 14 px, caption 13 px, label 12 px, micro 12 px,
   H6/lead 18 px, and body-large 16 px.
3. Raise the artwork token to 10 px for decorative details; individually
   raise meaningful labels in mockups where they fit without clipping.
4. Reduce paragraph line-height from 1.8 to 1.6 as the 14 px → 16 px body
   change preserves nearly the same per-line height (25.2 px → 25.6 px).
   Adjust other type-related line-height/tracking only where browser evidence
   shows avoidable wrapping or vertical expansion. Never hide, clip, truncate,
   or shrink meaningful text as compensation.
5. Compare all routes at desktop where feasible and representative shared,
   education, blog, product, service, and form pages at the requested
   responsive viewports; run the available automated checks.

## Implementation and final validation

### Typography updates

- Updated the existing typography tokens rather than adding a second system:
  body 16 px, body-large 16 px, small body 14 px, caption 13 px, label and
  micro 12 px, H6/lead 18 px, and decorative artwork text 10 px where it fit.
- Kept the display and H1–H5 scale unchanged. Raised selected component labels,
  descriptions, metadata, buttons, and meaningful illustration text.
- Adjusted paragraph line-height from 1.8 to 1.6 to keep its line box close to
  the original 14 px at 1.8 scale while increasing the text to 16 px.
- Made typography edits in 28 CSS files, including 44 added/updated
  `font-size` declarations. On tablet widths, the product-suite note now scales
  responsively and wraps instead of forcing horizontal overflow. Existing user
  edits in AboutStory, ServiceHero, and header-related files were not included
  in the typography commit; only the scoped responsive note rules from
  ProductSuite are included.

### Route and viewport checks

The settled browser pass visited all 65 live routes at each requested viewport.
The browser's 125% display scaling was accounted for so the measured CSS
viewport matched the requested dimensions.
The source inventory covers 406 page sections, and typography definitions were
inspected across 52 CSS files. The repository contains 130 TSX files.

| CSS viewport | Routes checked | Main heading present | Horizontal overflow |
| --- | ---: | ---: | --- |
| 1366 × 768 | 65 | 65 | None |
| 1440 × 900 | 65 | 65 | None |
| 1920 × 1080 | 65 | 65 | None |
| 390 × 844 | 65 | 65 | None |
| 430 × 932 | 65 | 65 | None |
| 768 × 1024 | 65 | 65 | None |

The first 768 × 1024 pass found a horizontal overflow in the home page's
product-suite note: its no-wrap 45 px text extended beyond the tablet column.
The note now scales down within the tablet breakpoint and wraps without hiding
content. A repeat check confirmed the home page has no horizontal overflow and
that the note fits its column. The product tab interaction was also exercised:
selecting the second tab updated its `aria-selected` state and displayed its
associated panel without introducing horizontal overflow.

No settled, per-route pre-change screenshots or page-height measurements were
captured before implementation, so exact before/after screenshot and page
height comparisons cannot be claimed. The initial route pass was also not
reliable for settled heights. The current route checks establish rendering and
overflow status, not pixel-equivalence or absence of all vertical growth.

### Build, tests, and remaining limitations

- `npm test`: passed, 13 tests.
- `npm run typecheck`: passed.
- `npm run lint`: passed with 0 errors and 1 existing React Refresh warning in
  `src/context/EnquiryContext.tsx`.
- `npm run build`: not run because permission was denied.
- Browser route checks reported a server/client hydration mismatch. Its source
  was not traced in this typography task; concurrent user header changes were
  present and intentionally left untouched.

The hydration mismatch, the missing pre-change visual baseline, and the denied
build are remaining limitations.

### Typography files changed

```text
src/components/forms/EnquiryForm.css
src/components/layout/Footer.css
src/components/navigation/MegaMenu.css
src/components/sections/AboutAudience/AboutAudience.css
src/components/sections/AboutExpertise/AboutExpertise.css
src/components/sections/AboutPrinciples/AboutPrinciples.css
src/components/sections/BlogArticle/BlogArticle.css
src/components/sections/BlogIndex/BlogIndex.css
src/components/sections/CatalogueGrid/CatalogueGrid.css
src/components/sections/ContactHero/ContactHero.css
src/components/sections/ContactLocations/ContactLocations.css
src/components/sections/Delivery/PathwayBoard.css
src/components/sections/DetailSection/DetailSection.css
src/components/sections/Hero/Hero.css
src/components/sections/LandingHero/LandingHero.css
src/components/sections/Mentor/MentorSection.css
src/components/sections/ProductSuite/ProductSuite.css
src/components/sections/Programs/ProgramsSection.css
src/components/sections/ServiceCatalogue/ServiceCatalogue.css
src/components/sections/ServiceDetailTemplate/ServiceDetailTemplate.css
src/components/sections/Solutions/Workflow.css
src/components/sections/Stories/StoriesSection.css
src/components/sections/WhyLadder7/WhyLadder7.css
src/pages/Sitemap/SitemapPage.css
src/styles/components.css
src/styles/responsive.css
src/styles/typography.css
src/styles/variables.css
TYPOGRAPHY_AUDIT.md
```

**Implementation commit SHA:** `cc7cc67dd8356f71a46a5fd0f903533e32107e6f`
