# Ladder7 Design System

Extracted from the supplied design file `ladder7-it.html` (13.7 MB, single page, minified).
Every value below comes from that file unless it is marked **Adjusted** (changed for
accessibility) or **Added** (needed for a state or page the design does not show).

Implementation: `src/styles/` (tokens in `variables.css`). Components consume tokens only.

---

## 1. How the design file was analysed

| Part | Size | Contents |
| --- | --- | --- |
| 28 embedded base64 images | 13.5 MB | Only **8 unique files**: logo (WebP 780×320), two transparent statue PNGs (1024×1536, ~3 MB each), five photos (reused up to 7×) |
| 13 `<style>` blocks | 118 KB | Layered overrides: later blocks restyle earlier ones (e.g. block 12 changes every pill to 16 px / 56 px). 299 rules belong to the Education page and are unused here |
| 5 `<script>` blocks | 30 KB | WebGL particle terrain, overlay menu, tab systems, scroll-driven scenes, film player, WhatsApp hand-off |
| Markup | 37 KB | Header, overlay menu, 12 sections, footer, film dialog |

The final cascade (what the browser actually renders) was reconstructed and is what this
document specifies.

---

## 2. Colour

### 2.1 Brand and surfaces

| Token | Value | Use |
| --- | --- | --- |
| `--color-brand` | `#f31b40` | Accent dots, lines, progress bars, heading full stops, large text |
| `--color-brand-surface` | `#dc143c` | **Adjusted.** Fills that carry text (contact/wall sections, pill hover, selected tabs). White text on the original red is 4.17:1 (fails AA); on this it is 4.99:1 |
| `--color-brand-soft` | `#f47b90` | Small red-toned text on dark (7.13:1) |
| `--color-brand-ink` | `#c8102e` | **Adjusted.** Small red text on light surfaces (5.88:1 on white) |
| `--color-bg` | `#101416` | Page background, ink on light surfaces |
| `--color-bg-deep` | `#0c1114` | Footer |
| `--color-surface-1` | `#14191b` | Contact form card |
| `--color-surface-2` | `#171e22` | Pathway panel, product panel |
| `--color-surface-3` | `#1b2023` | Capability row hover fill |
| `--gradient-card` | `linear-gradient(130deg,#182025,#131a1e)` | Audience cards |
| `--color-paper` | `#f5f7f8` | "Connected by design" section |
| `--color-white` | `#ffffff` | "Why Ladder7" stage |
| `--color-art` | `#e9eded` | Product illustration canvas |
| `--color-menu` | `#bfc1c0` | Overlay menu |
| `--color-menu-card` | `#efeeed` | Overlay menu form card |
| `--color-success` | `#7bcc9b` | "Available" status dot |

### 2.2 Text

| Token | Value | Contrast | Replaces (design) |
| --- | --- | --- | --- |
| `--color-text` | `#f5f6f6` | 17.1 on bg | `--fg` |
| `--color-text-muted` | `#a9acae` | 8.1 | `#a0a3a5`, `#a9acae`, `#a1a7aa`, `#9b9ea0` |
| `--color-text-soft` | `#95a3ac` | 7.2 | `#8f9da6`, `#91a0a8`, `#95a3ac`, `#9da8ae` |
| `--color-text-subtle` | `#808e95` | 5.5 (5.0 on panels) | **Adjusted** from `#6e7b82`, `#647780`, `#657b89` (3.96–4.29, fail) |
| `--color-ink` | `#101416` | 17.2 on paper | |
| `--color-ink-muted` | `#5b6b78` | 5.1 on paper | **Adjusted** from `#728494` (3.59) |
| `--color-ink-subtle` | `#66737a` | 4.9 on white | **Adjusted** from `#858c8e`, `#7e8689` (3.42) |
| `--color-menu-link` | `#3f474a` | 5.25 on menu | **Adjusted** from `#5d6568` (3.29) |
| `--color-menu-label` | `#434d52` | 4.79 on menu | **Adjusted** from `#788389` (2.15) |

On red surfaces all small text is white (the design's pale pinks `#ffe1e6`/`#ffe6eb` are 3.4:1).

### 2.3 Lines

| Token | Value | Use |
| --- | --- | --- |
| `--color-line` | `#2a2e30` | Default divider |
| `--color-line-cool` | `#2c363b` | Footer, FAQ, cards |
| `--color-line-strong` | `#3d484f` | Card and node borders |
| `--color-line-control` | `#5a6870` | Input underline, outline buttons (3.08:1, meets 1.4.11) |
| `--color-line-light` | `#d6e0e7` | Dividers on paper |

---

## 3. Typography

**Family:** Geist (variable, weights 100–900), self-hosted WoFF2 Latin subset, `font-display: swap`,
preloaded. Fallback: Arial with metric overrides (`Geist Fallback`) to limit layout shift.
The design loaded Geist 400/500/600/700 from Google Fonts; self-hosting removes two
third-party connections from the critical path.

**Character:** large, light (400) headings with very tight negative tracking; small,
widely-tracked uppercase eyebrows; muted 13–15 px body copy with generous leading.

| Token | Value | Element |
| --- | --- | --- |
| `--font-size-display` | `clamp(4rem, 9.7vw, 9.375rem)` → 64–150 px; 9 vw ≤700 | Home hero `h1` (single line) |
| `--font-size-h1` | `clamp(3.25rem, 6.7vw, 5.9375rem)` → 52–95 px | Inner page `h1`, contact heading |
| `--font-size-h2` | `clamp(2.8125rem, 5vw, 4.75rem)` → 45–76 px; 43 px ≤700 | Section headings |
| `--font-size-h2-sm` | `clamp(2.125rem, 4vw, 3.6875rem)` → 34–59 px | FAQ, "Why Ladder7" |
| `--font-size-h3-xl` | `clamp(2.125rem, 4vw, 3.8125rem)` → 34–61 px; 31 px ≤700 | Capability rows |
| `--font-size-h3-lg` | `clamp(2.0625rem, 3.9vw, 3.625rem)` → 33–58 px | Solution title, pathway step |
| `--font-size-h3` | `clamp(1.75rem, 3.5vw, 3.25rem)` → 28–52 px | Journey phases, product name |
| `--font-size-h4` | `clamp(1.5rem, 2.8vw, 2.5rem)` → 24–40 px | Training tracks, audience cards |
| `--font-size-h5` | `1.1875rem` (19 px) | Reasons, tab names |
| `--font-size-h6` | `1.0625rem` (17 px) | FAQ questions, flow nodes |
| `--font-size-lead` | `1.0625rem` (17 px); 14 px ≤700 | Hero description |
| `--font-size-body-lg` | `0.9375rem` (15 px) | Section intros |
| `--font-size-body` | `0.875rem` (14 px) | Body |
| `--font-size-body-sm` | `0.8125rem` (13 px) | Card copy |
| `--font-size-caption` | `0.75rem` (12 px) | Tags, nav in menus |
| `--font-size-label` | `0.6875rem` (11 px) | Eyebrows |
| `--font-size-micro` | `0.625rem` (10 px) | Tiny labels — **Adjusted** floor; the design used 5–9 px for meaningful text |

| Token | Value |
| --- | --- |
| `--line-height-display` | 1.08 |
| `--line-height-heading` | 1.06 |
| `--line-height-title` | 1.1 |
| `--line-height-snug` | 1.35 |
| `--line-height-body` | 1.7 |
| `--line-height-relaxed` | 1.8 |
| `--tracking-display` | −0.068em |
| `--tracking-heading` | −0.055em |
| `--tracking-title` | −0.045em |
| `--tracking-tight` | −0.02em |
| `--tracking-eyebrow` | 0.155em (1.7 px @ 11 px) |
| `--tracking-label` | 0.13em |

Weights: 400 for all headings and body; 500 for UI labels, pills, wordmarks; 600 for hero
stat values.

Decorative text inside `aria-hidden` illustrations (product art, workflow diagram) keeps the
design's small sizes but never goes below 8 px.

---

## 4. Spacing and layout

| Token | Desktop | ≤1000 px | ≤700 px | Source |
| --- | --- | --- | --- | --- |
| `--gutter` | 2.5% | 2.5% | 5% | `.section` side padding |
| `--section-padding-y` | 110 px | 85 px | 68 px | `.section` |
| `--section-heading-gap` | 55 px | 55 px | 35 px | `.section-heading` margin |
| `--header-height` | 72 px | 72 px | 66 px | `.header` |
| `--container-max` | 1500 px | | | ≥1600 px: side padding `max(40px, (100% − 1500px)/2)` |
| `--page-min-width` | 320 px | | | **Added** |

Spacing scale (`--space-*`): 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96 px — the
recurring gaps in the design (8 px tags, 12 px button gaps, 20–28 px card padding, 40 px
heading gaps).

**Grids used by the design** (implemented as named layout classes):

| Pattern | Columns |
| --- | --- |
| Section heading | flex, title left / intro right, `align-items: end` |
| Capability row | `7% 46% 1fr 50px` → `29px 1fr 38px` on mobile (tags wrap to row 2) |
| Product suite | `minmax(260px,.78fr) minmax(0,1.65fr)` |
| Solutions board | `1.05fr 1fr`, gap 7 vw |
| Pathway board | `35% 1fr`, gap 6 vw |
| Audience / FAQ | `1fr 1.3fr`, gap 9 vw (sticky heading) |
| Journey phases / training | 4 / 3 equal columns |
| Footer | `2.1fr 1fr 1fr 1.4fr` → 2 columns on mobile |

---

## 5. Shape and depth

| Token | Value | Use |
| --- | --- | --- |
| `--radius-section` | 48 px (28 px ≤700) | Top corners of overlapping sections |
| `--radius-panel` | 24 px | Product panel, overlay menu form |
| `--radius-dialog` | 22 px | Workflow card, overlay menu |
| `--radius-card` | 20 px | Audience cards |
| `--radius-md` | 12 px | Forms, flow nodes, small cards |
| `--radius-sm` | 7 px | Data chips |
| `--radius-pill` | 50 px | Buttons, tags, chips |

| Token | Value |
| --- | --- |
| `--shadow-panel` | `0 24px 65px #0002` |
| `--shadow-float` | `0 28px 55px #10141619` |
| `--shadow-window` | `0 22px 45px #283b4115` |
| `--shadow-menu-card` | `0 22px 44px #19191d12` |
| `--shadow-overlap` | `0 -22px 38px #00000012` |

Signature move: sections overlap the previous one by the radius (`margin-top: -48px`) with
rounded top corners, so the page reads as stacked sheets.

---

## 6. Components

### Buttons (`.btn`)

| Variant | Design origin | Default | Hover / focus |
| --- | --- | --- | --- |
| `.btn--primary` | `.pill` | `#f5f6f6` fill, `#15191b` text, dark arrow disc | Red fill rises from below (`translateY(110%) → 0`, .45 s), white text, arrow rotates 45°, lifts 2 px |
| `.btn--secondary` | `.mega-submit` | `#111719` fill, light text, red arrow disc | `#30393e`, lifts 2 px |
| `.btn--outline` | `.pill.outline` | Transparent, `--color-line-control` border; glass blur in the hero | Red fill |
| `.btn--text` | `.text-link` | Underline via 1 px bottom border, 10 px padding, arrow after 30 px | Text brightens |
| `.btn--icon` | `.row-arrow`, pathway controls | 36–48 px circle, 1 px border | White or red fill, arrow rotates |

Sizes: `--lg` 56 px / 16 px (design default), `--md` 48 px / 14 px, `--sm` 40 px / 12 px
(header CTA). Mobile: 52 px / 14 px. Arrow disc 41 px (lg), 34 px (md), 32 px (sm).
Disabled: 45% opacity, no lift. Focus: 2 px `--color-brand` outline, 5 px offset.

### Other shared components

| Component | Spec |
| --- | --- |
| Eyebrow | 11 px uppercase, tracking 1.7 px, 5 px red dot before (pulsing variant uses an `<i>`) |
| Tag | 1 px `#383c3e` border, pill radius, 5×11 px padding, 12 px text |
| Choice chip (radio) | 1 px border, 9×13 px padding; checked = white fill, dark text |
| Input / textarea | No box: 1 px bottom border, transparent, 14 px vertical padding; focus = red underline |
| Card | `--gradient-card`, 1 px `--color-line-cool`, 20 px radius, 38 px padding; hover lifts 5 px, pink border |
| Tabs | Vertical list with numbered discs (desktop) → horizontal scrolling chips (mobile) |
| Accordion | `<details>`; `+` rotates 45° when open; one open at a time |
| Section heading | eyebrow + `h2` (red full stop) left, muted intro right |

---

## 7. Motion

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(.22,1,.36,1)` | Default for UI transitions |
| `--ease-hero` | `cubic-bezier(.16,1,.3,1)` | Hero word rise |
| `--ease-reveal` | `cubic-bezier(.2,.65,.3,1)` | Scroll reveal |
| `--duration-fast` | 200 ms | Colour |
| `--duration-base` | 300 ms | Hover |
| `--duration-slow` | 450 ms | Fills, panel swaps |
| `--duration-reveal` | 900 ms / 1100 ms | Opacity / transform reveal |

| Effect | Behaviour |
| --- | --- |
| Hero | Words rise from 115% with 2° rotation, staggered 120 ms; eyebrow/description/actions fade-rise at 100/400/550/700 ms |
| Particle terrain | WebGL point field (240×125 points, 150 columns on narrow screens), pointer ripple on fine pointers, paused off-screen/hidden, single static frame with reduced motion, 2D canvas fallback |
| Reveal | `opacity 0 → 1`, `translateY(45px → 0)` (25 px mobile) when 8% visible |
| Nav links | Text rolls up to a duplicate on hover |
| Reading copy | Words light up with scroll progress |
| Journey | Red progress line and active phases follow scroll |
| Delivery pathway | Board pins below the header; scroll steps through 7 stages; panel tilts with pointer |
| Why Ladder7 | Sticky stage; statues slide in from the sides; reasons fade in sequence |
| Possibilities wall | Three image columns drift vertically (46/53/61 s) |
| Film | 20 s, four slides cross-fading with a slow zoom |
| Footer | Content and wordmark parallax upward; red line draws across |

`prefers-reduced-motion: reduce` turns every effect into its final static state (pinned scenes
become normal flow).

---

## 8. Breakpoints

Desktop-first, matching the design (custom properties cannot be used in media queries, so the
values are documented here and used literally):

| Name | Query | Main changes |
| --- | --- | --- |
| Wide | `min-width: 1600px` | Content centred at 1500 px |
| Laptop | `max-width: 1100px` | Product suite and overlay menu tighten |
| Tablet | `max-width: 1000px` | Smaller gaps, contact form single column |
| Small tablet | `max-width: 850px` | Overlay menu nav to 2 columns |
| Mobile | `max-width: 700px` | Single column, desktop nav hidden, tabs become horizontal chips, timeline vertical |
| Short screens | `max-height: 740px` / `620px` | Compact pinned scenes / pinning disabled |

Verified widths: 1920, 1440, 1366, 1024, 768, 425, 375, 320.

---

## 9. Imagery

| Asset | Source | Delivered as |
| --- | --- | --- |
| Logo | 780×320 WebP, white | 284 px + 568 px WebP (2×) |
| Statues (before/after) | 1024×1536 PNG with alpha, 3 MB each | AVIF + WebP at 400/640/960 w |
| Photos (5) | 1200–1920 px JPEG/WebP | AVIF + WebP at 480/800/1200 w |
| Favicon, app icons, social card | Not in design | **Added**, built from brand tokens |

Photos are shown desaturated or darkened (grayscale, brightness .2–.35) as in the design.
