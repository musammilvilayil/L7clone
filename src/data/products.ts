/** The Ladder7 product suite (copy from the design), each linking to its /products/* detail page. */

export type ProductArt = "audit" | "nexus" | "outreach" | "data" | "marketing";

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  artCaption: string;
  art: ProductArt;
  href: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "site-360",
    name: "Site 360",
    category: "Website intelligence",
    tagline: "Know your website. Prioritise your next move.",
    description:
      "Audit website health across performance, accessibility, search and security, with fixes prioritised for action.",
    artCaption: "A clearer view of your website",
    art: "audit",
    href: "/products/site-360",
  },
  {
    slug: "l7-nexus",
    name: "L7 Nexus",
    category: "Business intelligence",
    tagline: "Your company knowledge. A clearer perspective.",
    description: "AI executive support, grounded in a shared understanding of your company and its decisions.",
    artCaption: "Context for your next decision",
    art: "nexus",
    href: "/products/l7-nexus",
  },
  {
    slug: "outreach-engine",
    name: "Outreach Engine",
    category: "B2B outreach",
    tagline: "Make the first conversation count.",
    description: "Prospect research and individual email drafts, with a review step before sending.",
    artCaption: "From research to a considered introduction",
    art: "outreach",
    href: "/products/outreach-engine",
  },
  {
    slug: "l7-insights",
    name: "L7 Insights",
    category: "Connected data",
    tagline: "Connect the data. See the whole picture.",
    description: "Bring data from different systems into a joined view for clearer reporting and decisions.",
    artCaption: "Different sources. One connected view.",
    art: "data",
    href: "/products/l7-insights",
  },
  {
    slug: "infinite-insights",
    name: "Infinite Insights",
    category: "Marketing analytics",
    tagline: "See the connections behind your campaigns.",
    description:
      "Explore advertising and analytics data together to understand channel performance and budget opportunities.",
    artCaption: "A shared perspective on channel performance",
    art: "marketing",
    href: "/products/infinite-insights",
  },
];
