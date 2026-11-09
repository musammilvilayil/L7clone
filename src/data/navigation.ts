/**
 * Navigation structure for the header, overlay menu and footer.
 *
 * The real design (every exported HTML page, including the home and
 * education pages) carries the exact same header links, overlay-menu
 * content and footer — navigation is no longer split by division; only the
 * division-switch pill itself is division-aware. As pages are built in
 * stages, `liveOnly` drops any item whose target route doesn't exist yet
 * (and any group left with no items), so this file can already describe the
 * finished site without producing dead links today.
 *
 * `to` values:
 *   "/path" or "/path#hash"  internal route (React Router)
 *   "#hash"                  section on the current page
 *   "https://…" / "mailto:…" / "tel:…"   external, never filtered
 */
import type { Division } from "../routes";
import { ROUTES } from "../routes";
import { SOCIAL } from "./site";

export interface NavItem {
  label: string;
  to: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

const LIVE_PATHS = new Set(ROUTES.map((route) => route.path));

/** An internal path is "live" once its route exists; external links always are. */
function isLive(to: string): boolean {
  if (/^(https?:|mailto:|tel:)/.test(to)) return true;
  if (to.startsWith("#")) return true;
  const path = to.split(/[?#]/)[0] ?? to;
  return LIVE_PATHS.has(path);
}

function liveItems(items: NavItem[]): NavItem[] {
  return items.filter((item) => isLive(item.to));
}

function liveGroups(groups: NavGroup[]): NavGroup[] {
  return groups.map((group) => ({ ...group, items: liveItems(group.items) })).filter((group) => group.items.length > 0);
}

/** Header desktop nav — identical on every page. */
const HEADER_NAV: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Insights", to: "/blogs" },
  { label: "Contact us", to: "/contact" },
];

export function headerNav(): NavItem[] {
  return liveItems(HEADER_NAV);
}

export function divisionSwitchFor(division: Division): (NavItem & { current: boolean })[] {
  return [
    { label: "IT", to: "/", current: division === "it" },
    { label: "Education", to: "/education", current: division === "education" },
  ];
}

/** Overlay menu's own quick-enquiry form (design: .mega-contact) — same everywhere. */
export const MENU_FORM = {
  eyebrow: "Let's work together",
  heading: "What comes next for you?",
};

/** Overlay menu's site map (design: .mega-navigation) — three columns, same everywhere. */
const MENU_COLUMNS: NavGroup[][] = [
  [
    {
      title: "Navigation",
      items: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Services", to: "/services" },
        { label: "Products", to: "/products" },
        { label: "Insights", to: "/blogs" },
        { label: "Our work", to: "/portfolio" },
        { label: "Careers", to: "/careers" },
        { label: "FAQ", to: "/faq" },
        { label: "Contact us", to: "/contact" },
      ],
    },
  ],
  [
    {
      title: "Technology",
      items: [
        { label: "Digital experience", to: "/services#digital-experience" },
        { label: "AI & automation", to: "/services#ai-automation" },
        { label: "Strategy & consulting", to: "/services#strategy-consulting" },
        { label: "Corporate training", to: "/corporate-training-kerala" },
      ],
    },
    {
      title: "Learning",
      items: [
        { label: "Training & internships", to: "/it-training-internship-trivandrum" },
        { label: "Bootcamp", to: "/bootcamp" },
        { label: "First-job experience", to: "/experience-the-first-job" },
        { label: "Career guidance", to: "/training-internship/career-goal-finding" },
      ],
    },
  ],
  [
    {
      title: "Products",
      items: [
        { label: "Site 360", to: "/products/site-360" },
        { label: "L7 Nexus", to: "/products/l7-nexus" },
        { label: "L7 Insights", to: "/products/l7-insights" },
        { label: "Outreach Engine", to: "/products/outreach-engine" },
        { label: "Infinite Insights", to: "/products/infinite-insights" },
        { label: "AMIU", to: "/amiu" },
        { label: "My Ladder", to: "/myladder" },
        { label: "Mind Gym", to: "/mindgym" },
        { label: "Mirror Me", to: "/mirrorme" },
        { label: "Fill Dots", to: "/filldots" },
      ],
    },
    {
      title: "Explore",
      items: [
        { label: "All pages", to: "/sitemap" },
        { label: "Privacy", to: "/privacy" },
      ],
    },
  ],
];

export function menuColumns(): NavGroup[][] {
  return MENU_COLUMNS.map(liveGroups).filter((column) => column.length > 0);
}

/** Footer nav (design: .compact-footer-main) — three groups, same everywhere. */
const FOOTER_NAV: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Products", to: "/products" },
      { label: "Insights", to: "/blogs" },
      { label: "Our work", to: "/portfolio" },
    ],
  },
  {
    title: "Learn & grow",
    items: [
      { label: "Education", to: "/education" },
      { label: "Training & internships", to: "/it-training-internship-trivandrum" },
      { label: "Corporate training", to: "/corporate-training-kerala" },
      { label: "Bootcamp", to: "/bootcamp" },
      { label: "Careers", to: "/careers" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Contact", to: "/contact" },
      ...SOCIAL.map((s) => ({ label: s.label, to: s.href })),
      { label: "Privacy", to: "/privacy" },
      { label: "All pages", to: "/sitemap" },
    ],
  },
];

export function footerNav(): NavGroup[] {
  return liveGroups(FOOTER_NAV);
}
