/**
 * Navigation structure for the header, overlay menu and footer — one set per
 * division (see routes.ts `Division`). Every shared page (Home, Services,
 * About, Contact) presents as "it"; only `/education` presents as
 * "education", matching the design's own `about.html`/`services.html`
 * (both carry `it-page`) vs `education.html` (no such class).
 *
 * `to` values:
 *   "/path" or "/path#hash"  internal route (React Router)
 *   "#hash"                  section on the current page
 *   "https://…"              external or not-yet-migrated page
 */
import { EDUCATION_PRODUCT_LINKS } from "./education";
import type { Division } from "../routes";
import { COMPANY, LEGACY_LINKS, SOCIAL } from "./site";

export interface NavItem {
  label: string;
  to: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

const HEADER_NAV_IT: NavItem[] = [
  { label: "Capabilities", to: "/#capabilities" },
  { label: "Solutions", to: "/#solutions" },
  { label: "Our approach", to: "/#approach" },
  { label: "About", to: "/about" },
];

const HEADER_NAV_EDUCATION: NavItem[] = [
  { label: "Programs", to: "/education#programs" },
  { label: "Products", to: "/education#products" },
  { label: "Our approach", to: "/education#approach" },
  { label: "About", to: "/about" },
];

export function headerNavFor(division: Division): NavItem[] {
  return division === "education" ? HEADER_NAV_EDUCATION : HEADER_NAV_IT;
}

export function divisionSwitchFor(division: Division): (NavItem & { current: boolean })[] {
  return [
    { label: "IT", to: "/", current: division === "it" },
    { label: "Education", to: "/education", current: division === "education" },
  ];
}

/** Overlay menu: columns of groups, per division. */
const MENU_COLUMNS_IT: NavGroup[][] = [
  [
    {
      title: "Navigation",
      items: [
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "Products", to: "/#it-products" },
        { label: "Our approach", to: "/#approach" },
        { label: "About Ladder7", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ],
  [
    {
      title: "Engineering",
      items: [
        { label: "Digital experience", to: "/services#digital-experience" },
        { label: "Custom software", to: "/services#custom-development" },
        { label: "Technology strategy", to: "/services#technology-strategy" },
        { label: "Delivery pathway", to: "/services#delivery-steps" },
      ],
    },
    {
      title: "Intelligence",
      items: [
        { label: "Applied AI", to: "/services#applied-ai" },
        { label: "AI product suite", to: "/#it-products" },
        { label: "Corporate training", to: "/services#team-training" },
      ],
    },
  ],
  [
    {
      title: "Products",
      items: [
        { label: "Site 360", to: LEGACY_LINKS.product("site-360") },
        { label: "L7 Nexus", to: LEGACY_LINKS.product("l7-nexus") },
        { label: "L7 Insights", to: LEGACY_LINKS.product("l7-insights") },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "Insights", to: LEGACY_LINKS.blogs },
        { label: "Careers", to: LEGACY_LINKS.careers },
        { label: "Ladder7 Education", to: "/education" },
      ],
    },
  ],
];

const MENU_COLUMNS_EDUCATION: NavGroup[][] = [
  [
    {
      title: "Navigation",
      items: [
        { label: "Home", to: "/education" },
        { label: "Programs", to: "/education#programs" },
        { label: "Products", to: "/education#products" },
        { label: "Our framework", to: "/education#approach" },
        { label: "About Ladder7", to: "/about" },
        { label: "Services", to: "/services" },
        { label: "Contact", to: "/education#contact" },
      ],
    },
  ],
  [
    {
      title: "Learning",
      items: [
        { label: "Training & internships", to: "/education#programs" },
        { label: "Career guidance", to: "/education#programs" },
        { label: "Corporate training", to: "/education#team-training" },
      ],
    },
    {
      title: "Your next step",
      items: [
        { label: "AMIU · AI mentorship", to: "/education#amiu" },
        { label: "My Ladder", to: EDUCATION_PRODUCT_LINKS["my-ladder"]! },
        { label: "Mind Gym", to: EDUCATION_PRODUCT_LINKS["mind-gym"]! },
      ],
    },
  ],
  [
    {
      title: "Personal growth",
      items: [
        { label: "Mirror Me", to: EDUCATION_PRODUCT_LINKS["mirror-me"]! },
        { label: "Fill Dots", to: EDUCATION_PRODUCT_LINKS["fill-dots"]! },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "Insights", to: LEGACY_LINKS.blogs },
        { label: "Careers", to: LEGACY_LINKS.careers },
        { label: "Ladder7 IT", to: "/" },
      ],
    },
  ],
];

export function menuColumnsFor(division: Division): NavGroup[][] {
  return division === "education" ? MENU_COLUMNS_EDUCATION : MENU_COLUMNS_IT;
}

const FOOTER_NAV_IT: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Capabilities", to: "/#capabilities" },
      { label: "Solutions", to: "/#solutions" },
      { label: "Our approach", to: "/#approach" },
      { label: "Services", to: "/services" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Ladder7", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Insights", to: LEGACY_LINKS.blogs },
      { label: "Ladder7 Education", to: "/education" },
    ],
  },
  {
    title: "Connect",
    items: [
      ...SOCIAL.map((s) => ({ label: s.label, to: s.href })),
      { label: COMPANY.phone.display, to: COMPANY.phone.href },
      { label: COMPANY.email, to: `mailto:${COMPANY.email}` },
    ],
  },
];

const FOOTER_NAV_EDUCATION: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Programs", to: "/education#programs" },
      { label: "Products", to: "/education#products" },
      { label: "Our framework", to: "/education#approach" },
      { label: "About Ladder7", to: "/about" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "My Ladder", to: EDUCATION_PRODUCT_LINKS["my-ladder"]! },
      { label: "Mind Gym", to: EDUCATION_PRODUCT_LINKS["mind-gym"]! },
      { label: "Mirror Me", to: EDUCATION_PRODUCT_LINKS["mirror-me"]! },
      { label: "Fill Dots", to: EDUCATION_PRODUCT_LINKS["fill-dots"]! },
    ],
  },
  {
    title: "Connect",
    items: [
      ...SOCIAL.map((s) => ({ label: s.label, to: s.href })),
      { label: COMPANY.phone.display, to: COMPANY.phone.href },
      { label: "Ladder7 IT", to: "/" },
    ],
  },
];

export function footerNavFor(division: Division): NavGroup[] {
  return division === "education" ? FOOTER_NAV_EDUCATION : FOOTER_NAV_IT;
}
