# Component Documentation

How to use what's already built, and how to add to it. Design tokens are in
[LADDER7_DESIGN_SYSTEM.md](LADDER7_DESIGN_SYSTEM.md); where things live is in
[PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md).

## 1. UI primitives (`src/components/ui/`)

### `<Button>`

```tsx
import { Button } from "../../components/ui/Button";

<Button to="#contact">Discuss your project</Button>
<Button to="#capabilities" variant="outline" glass>Explore capabilities</Button>
<Button variant="secondary" type="submit">Continue on WhatsApp</Button>
<Button variant="text" to="/about">Meet Ladder7</Button>
```

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `to` | any string accepted by `SmartLink` | — | present → renders a link; absent → renders a `<button>` (accepts normal button props: `type`, `onClick`, `disabled`, `aria-*`) |
| `variant` | `primary` \| `secondary` \| `outline` \| `text` | `primary` | see [LADDER7_DESIGN_SYSTEM.md §6](LADDER7_DESIGN_SYSTEM.md) |
| `size` | `lg` \| `md` \| `sm` | `lg` | ignored for `variant="text"` |
| `glass` | boolean | `false` | frosted background — use only over the particle hero |
| `onBrand` | boolean | `false` | switches the hover fill to near-black, for buttons placed on a red section |
| `block` | boolean | `false` | full width |
| `arrow` | boolean | `true` except for `variant="text"`'s own arrow styling | rarely needs overriding |

### `<Eyebrow>`

```tsx
<Eyebrow>What we do</Eyebrow>
<Eyebrow live>Take the right next step</Eyebrow>   // pulsing dot
```

### `<SectionHeading>`

The standard section opener (eyebrow + heading left, muted intro right,
both halves revealing on scroll).

```tsx
<SectionHeading
  eyebrow="What we do"
  title={"Four capabilities.\nOne connected partner"}   // "\n" = desktop-only line break
  titleId="capabilities-title"                             // pair with aria-labelledby on the <section>
  intro={"From the first strategic question\nto the systems behind your business."}
  aside={<Button to="#contact">Discuss</Button>}           // optional, under the intro
  as="h1"                                                    // default "h2"; use "h1" once per page
/>
```

A trailing red full stop is appended to `title` automatically (`accent={false}`
to suppress it).

### `<TagList>`

```tsx
<TagList tags={["Intelligent websites", "Headless CMS"]} label="Digital experience services" />
```
Renders a semantic `<ul>` of pill tags (`label` is for screen readers, not shown).

## 2. Common pieces (`src/components/common/`)

| Component | Purpose |
| --- | --- |
| `<SmartLink to="…">` | One link for every destination: React Router for routes/hashes, `target="_blank" rel="noopener noreferrer"` for other sites, same-tab for the company's own not-yet-migrated pages. Used internally by `Button`, but use it directly for a plain text link. |
| `<ResponsiveImage name="…" alt="…" sizes="…" />` | `<picture>` with AVIF + WebP sources at every generated width (`src/data/images.generated.ts`). `name` is an `ImageName` from that file — add a new image via `scripts/optimize-images.mjs`, not by hand. `alt=""` for decorative images; `sizes` should match the image's actual rendered width at each breakpoint. |
| `<Lines text="A\nB" accent />` | Renders design copy that contains a desktop-only line break, with the red trailing full stop. Used by every heading. |
| `<CheckArrow />` | The small red "↗" bullet used in feature lists (`<ul className="check-list">`). |
| `<Seo page="home" />` | One per page component; keeps `<head>` in sync on client-side navigation (the initial load is already correct from prerendering). `page` is a `PageKey` from `src/routes.ts`. |
| `<ScrollManager />` | Rendered once in `App.tsx`. Not used directly elsewhere. |
| `<RoutePrefetch importers={…} />` | Rendered once in `main.tsx` (browser only). Not used elsewhere. |
| `Icons.tsx` | `ArrowUpRight`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `Close`, `Plus`, `Play`, `Restart` — inline SVGs, `currentColor`, `aria-hidden`. Add a new icon here, matching the existing stroke width (2.6) and viewBox (`0 0 24 24`). |

## 3. Layout and navigation

| Component | Role |
| --- | --- |
| `layouts/MainLayout.tsx` | Skip link → `<Header>` → `<MegaMenu>` → `<main>` → `<Footer>`. Sets `inert` on `<main>`/`<footer>` while the menu is open. Used once, by `App.tsx`. |
| `components/layout/Header.tsx` | Fixed header: logo, desktop nav (text rolls on hover), division switch (IT/Education), "Let's talk" CTA, menu toggle. The toggle and CTA come from `useEnquiry()`. |
| `components/layout/Footer.tsx` | Scroll-parallax footer. Reads `LOCATIONS` and `FOOTER_NAV` from `data/`. |
| `components/navigation/MegaMenu.tsx` | The overlay menu: `EnquiryForm` (variant `"menu"`) + the site map. Opens/closes via `useEnquiry()`; see §5. |

## 4. Forms (`src/components/forms/EnquiryForm.tsx`)

One component, two skins, used in two places:

```tsx
// Overlay menu (navigation/MegaMenu.tsx)
<EnquiryForm
  variant="menu"
  source="menu"
  eyebrow="Let's work together"
  heading="Have a project in mind?"
  headingLevel="h2"
  interests={MENU_INTERESTS}
  labels={{ name: "Your name", email: "Email", message: "Tell us about your project" }}
  messageRows={2}
  prefill={prefill}                 // from useEnquiry()
  onPrefillApplied={focusNameInput}
/>

// Contact section (sections/Contact/ContactSection.tsx)
<EnquiryForm
  variant="contact"
  source="contact-section"
  heading="Tell us what you're working on."
  intro="A few details will help us understand your next step."
  interests={CONTACT_INTERESTS}
  interest={interest}               // pre-select without opening (e.g. from solution tabs)
  labels={{ name: "Your name", email: "Work email", message: "What would you like to achieve?" }}
  placeholders={{ name: "Your name", email: "you@company.com", message: "Tell us about your business, challenge or idea." }}
/>
```

Behaviour (see `src/services/enquiry.ts` for the logic, unit-tested in
`enquiry.test.ts`):

1. Validation runs on blur and on submit; the submit button is **never**
   disabled, so a visitor who never blurs a field still gets a clear error
   list (`role="alert"` summary + per-field `aria-describedby`).
2. On a valid submit, a WhatsApp URL is opened in a new tab with the message
   pre-filled, and the form switches to a confirmation panel (with an
   email fallback and an "edit your message" button).
3. If `VITE_ENQUIRY_ENDPOINT` is set, a JSON copy is also POSTed — see
   [SETUP_AND_DEPLOYMENT.md](SETUP_AND_DEPLOYMENT.md).

### Opening the menu programmatically

```tsx
const { openEnquiry } = useEnquiry();
<Button onClick={() => openEnquiry({ interest: "Corporate training", message: "…starter text…" })}>
  Plan your team's next step
</Button>
```

## 5. Context (`src/context/EnquiryContext.tsx`)

```tsx
const { menuOpen, openMenu, closeMenu, toggleMenu, openEnquiry, prefill } = useEnquiry();
```

Wraps the whole app once, in `App.tsx`. `openEnquiry(prefill)` both opens the
menu and hands `prefill` (with a fresh `key`) to the `EnquiryForm` inside it,
which re-applies it even if the same interest/message is requested twice.

## 6. Section components (`src/components/sections/`)

Each folder is one section of the design: a `.tsx` and a co-located `.css`
file, both named after the folder. They are composed, not nested, inside page
files — a page owns the order, a section owns its own markup and styling.
Sections that appear on more than one page (`CapabilityList`, `JourneyTimeline`,
`Workflow`, `ReadingCopy`, `FaqSection`, `TrainingSection`, `WhyLadder7`,
`AudienceSection`) take the differing bits (heading copy, link targets,
`headingLevel`) as props — see each page file for the exact call.

Most sections need no props (`Hero`, `ProductSuite`, `ApproachSection`,
`DeliverySection`, `MotionStory`, `PossibilitiesWall`, `FaqSection`,
`TrainingSection`): they read their own copy straight from `data/`. The
exceptions, and why:

| Component | Key props | Why |
| --- | --- | --- |
| `SolutionsSection` | `active`, `onChange` | the home page keeps the selected solution in sync with the capability rows above it and the contact form below it |
| `ContactSection` | `headingLevel`, `interest`, `first` | `h1` on the dedicated Contact page vs `h2` elsewhere; pre-selected interest; `first` removes the top rounding when it's the page's own hero |
| `CapabilityList` | `items`, `hrefFor`, `onSelect`, `headingLevel` | home links rows to `#solutions`/`#approach` and selects a tab; services page links each row to its own `#id` section |
| `ServiceDetail` | `capability`, `tone`, `onEnquire` | one call per capability on the services page, alternating `theme-paper`/`theme-dark` |
| `WhyLadder7`, `AudienceSection` | `linkTo`, `linkLabel` | the About page reuses the home section with different link targets |

## 7. Building a new section

1. `src/components/sections/MySection/MySection.tsx` + `MySection.css`.
2. Put every string in a `data/*.ts` file — never inline copy in JSX.
3. Wrap the section in `<section className="section theme-… my-section" id="…" aria-labelledby="my-section-title">`; use `<SectionHeading>` for a standard opener.
4. Reach for existing classes first — `.btn`, `.tag`, `.card`, `.field`,
   `.check-list`, `.eyebrow`, `.label-tiny` — before writing new CSS; use the
   tokens in `src/styles/variables.css`, never a literal colour or px value.
5. If it scrolls or animates, use `useScrollFrame`/`useReveal`/`useRovingTabs`
   rather than a new `IntersectionObserver` or scroll listener.
6. Import the section into the page(s) that need it; add an entry to
   `src/data/navigation.ts` if it should appear in the header/footer/menu.

## 8. Adding a new page

1. `src/pages/MyPage/MyPage.tsx` (+ `.css` if it needs page-level layout).
2. Add the route to `src/routes.ts` (`ROUTES` array and the `PageKey` union).
3. Add an entry to `PAGE_SEO` in `src/seo/pages.ts` — the prerender build
   fails loudly if one is missing.
4. Register the page in both `src/main.tsx` (`importers`, for the lazy
   browser chunk) and `src/entry-server.tsx` (`pages`, for the eager build
   import) and in `scripts/prerender.mjs`'s `PAGE_MODULES` map (its *source*
   path, for CSS/JS chunk resolution) — the prerender script's drift guard
   checks all three are present.
5. `npm run build` and look at `dist/client/<path>/index.html`.
