/**
 * Navigation structure for the header, overlay menu and footer.
 *
 * `to` values:
 *   "/path" or "/path#hash"  internal route (React Router)
 *   "#hash"                  section on the current page
 *   "https://…"              external or not-yet-migrated page
 */
import { COMPANY, LEGACY_LINKS, SOCIAL } from "./site";

export interface NavItem {
  label: string;
  to: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const HEADER_NAV: NavItem[] = [
  { label: "Capabilities", to: "/#capabilities" },
  { label: "Solutions", to: "/#solutions" },
  { label: "Our approach", to: "/#approach" },
  { label: "About", to: "/about" },
];

export const DIVISIONS: (NavItem & { current: boolean })[] = [
  { label: "IT", to: "/", current: true },
  { label: "Education", to: LEGACY_LINKS.education, current: false },
];

/** Overlay menu: columns of groups. */
export const MENU_COLUMNS: NavGroup[][] = [
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
        { label: "Ladder7 Education", to: LEGACY_LINKS.education },
      ],
    },
  ],
];

export const FOOTER_NAV: NavGroup[] = [
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
      { label: "Ladder7 Education", to: LEGACY_LINKS.education },
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
