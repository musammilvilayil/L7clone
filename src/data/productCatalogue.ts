import type { ImageName } from "./images.generated";

export type ProductCategory = "business-product" | "education-product";

export interface ProductCatalogueItem {
  slug: string;
  to: string;
  category: ProductCategory;
  categoryLabel: string;
  number: string;
  title: string;
  description: string;
  image: ImageName;
}

/** The Products hub's catalogue (design: .catalogue-grid) — copy verbatim from products.html. */
export const PRODUCT_CATALOGUE: ProductCatalogueItem[] = [
  {
    slug: "site-360",
    to: "/products/site-360",
    category: "business-product",
    categoryLabel: "Business product",
    number: "01",
    title: "Site 360",
    description:
      "Site 360 is a website-intelligence platform. It runs live checks against your actual site across twelve lenses, including performance, accessibility,…",
    image: "photos/product-dashboard-agents",
  },
  {
    slug: "l7-nexus",
    to: "/products/l7-nexus",
    category: "business-product",
    categoryLabel: "Business product",
    number: "02",
    title: "L7 Nexus",
    description:
      "L7 Nexus is a leased AI executive team for businesses of any size. It reads your website, builds a permanent company brain you own as plain markdown…",
    image: "photos/product-dashboard-nocode",
  },
  {
    slug: "outreach-engine",
    to: "/products/outreach-engine",
    category: "business-product",
    categoryLabel: "Business product",
    number: "03",
    title: "Outreach Engine",
    description:
      "Outreach Engine is a B2B email outreach platform. It researches each prospect, writes a single email for that person rather than filling a template,…",
    image: "photos/product-outreach-dashboard",
  },
  {
    slug: "l7-insights",
    to: "/products/l7-insights",
    category: "business-product",
    categoryLabel: "Business product",
    number: "04",
    title: "L7 Insights",
    description:
      "L7 Insights turns data you already have into dashboards. Connect Google Sheets, BigQuery, Snowflake, Zoho, SharePoint, SAP or a CSV, and each source…",
    image: "photos/team-whiteboard-session",
  },
  {
    slug: "infinite-insights",
    to: "/products/infinite-insights",
    category: "business-product",
    categoryLabel: "Business product",
    number: "05",
    title: "Infinite Insights",
    description:
      "Infinite Insights is an AI-powered marketing analytics platform. It unifies Meta, Google Ads, LinkedIn and GA4 into a single dashboard, then reports…",
    image: "photos/product-insights-dashboard",
  },
  {
    slug: "my-ladder",
    to: "/myladder",
    category: "education-product",
    categoryLabel: "Education product",
    number: "06",
    title: "My Ladder",
    description:
      "Take control of your professional journey with MyLadder. A dedicated platform for structured career planning, skill tracking, and continuous personal…",
    image: "photos/idea-lightbulb",
  },
  {
    slug: "mind-gym",
    to: "/mindgym",
    category: "education-product",
    categoryLabel: "Education product",
    number: "07",
    title: "Mind Gym",
    description:
      "Train your brain for success. MyndGym offers interactive exercises and assessments designed to enhance cognitive skills, focus, and analytical…",
    image: "photos/ai-network-brain",
  },
  {
    slug: "mirror-me",
    to: "/mirrorme",
    category: "education-product",
    categoryLabel: "Education product",
    number: "08",
    title: "Mirror Me",
    description:
      "Discover your true potential. Mirror Me provides deep psychometric and behavioral assessments to help youth and professionals align with the right…",
    image: "photos/mirror-reflection-portrait",
  },
  {
    slug: "fill-dots",
    to: "/filldots",
    category: "education-product",
    categoryLabel: "Education product",
    number: "09",
    title: "Fill Dots",
    description:
      "Connect the dots between where you are and where you want to be. Fill Dots provides customized learning pathways to bridge educational and…",
    image: "photos/mountain-climb",
  },
  {
    slug: "amiu",
    to: "/amiu",
    category: "education-product",
    categoryLabel: "Education product",
    number: "10",
    title: "AMIU",
    description:
      "Make the right career choices early. amiu is an AI mentor that aligns your skills, interests, and personality with future-ready educational and…",
    image: "photos/students-laptop-group",
  },
];

export const PRODUCT_FILTERS: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All products", value: "all" },
  { label: "For business", value: "business-product" },
  { label: "For personal growth", value: "education-product" },
];
