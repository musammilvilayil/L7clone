/**
 * Page-level SEO — the only place titles and descriptions are written.
 *
 * Consumed by <Seo> (runtime), scripts/prerender.mjs (static <head>), the
 * sitemap and JSON-LD. The prerender step fails the build if a route in
 * src/routes.ts has no entry here.
 */
import type { PageKey } from "../routes";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  /** Visible H1 name used in breadcrumbs and WebPage.name. */
  name: string;
  /** Social card, relative to the site root. */
  image: string;
  imageAlt: string;
  indexable: boolean;
  /** Last meaningful content change (ISO date) — sitemap lastmod. */
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  /** Breadcrumb trail below Home; empty for the home page. */
  breadcrumb: { name: string; path: string }[];
}

const DEFAULT_IMAGE = "/og/ladder7-og.jpg";
const DEFAULT_IMAGE_ALT = "Ladder7 — Build. Connect. Grow. Websites, applied AI and custom software.";
const RELEASE_DATE = "2026-11-05";

export const PAGE_SEO: Record<PageKey, PageSeo> = {
  home: {
    path: "/",
    title: "Ladder7 IT — Build. Connect. Grow. | Web, AI & Custom Software",
    description:
      "Ladder7 IT connects intelligent websites, applied AI, custom software and technology strategy around your next business goal. Teams in Cochin and Trivandrum.",
    name: "Build. Connect. Grow.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "weekly",
    priority: 1,
    breadcrumb: [],
  },
  services: {
    path: "/services",
    title: "IT Services: Websites, Applied AI & Custom Software | Ladder7",
    description:
      "Digital experience, applied AI, technology strategy and custom software from Ladder7 — connected around your next business goal, from discovery to launch.",
    name: "Four capabilities. One connected partner.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    breadcrumb: [{ name: "Services", path: "/services" }],
  },
  about: {
    path: "/about",
    title: "About Ladder7 NextStep Solutions | Cochin & Trivandrum",
    description:
      "Ladder7 NextStep Solutions builds intelligent websites, applied AI and custom software around business goals, for established brands and startups in Kerala.",
    name: "Technology, built around you.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    breadcrumb: [{ name: "About", path: "/about" }],
  },
  contact: {
    path: "/contact",
    title: "Contact Ladder7 | Start Your Next Technology Project",
    description:
      "Talk to Ladder7 about a website, AI assistant, custom application or technology strategy. Email info@ladder7.in, call +91 8137979401 or send an enquiry.",
    name: "Let's talk about what's next.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "yearly",
    priority: 0.7,
    breadcrumb: [{ name: "Contact", path: "/contact" }],
  },
  education: {
    path: "/education",
    title: "Ladder7 Education | Learn. Build. Grow.",
    description:
      "Discover your next step with Ladder7 Education. Career-focused learning, practical internships and a framework for personal growth, from Cochin and Trivandrum.",
    name: "Learn. Build. Grow.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    breadcrumb: [{ name: "Education", path: "/education" }],
  },
  faq: {
    path: "/faq",
    title: "Good Questions. Clear Answers. | Ladder7 FAQ",
    description:
      "Find answers to common questions about Ladder7's digital engineering services, applied AI solutions, and skilling and virtual internship programs.",
    name: "Good questions.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [{ name: "FAQ", path: "/faq" }],
  },
  careers: {
    path: "/careers",
    title: "Careers at Ladder7 | Good People. Meaningful Work.",
    description:
      "Build intelligent ecosystems and next-generation digital platforms for Fortune 100 enterprises and high-growth innovators. Join the Ladder7 talent network.",
    name: "Good people. Meaningful work.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.5,
    breadcrumb: [{ name: "Careers", path: "/careers" }],
  },
  portfolio: {
    path: "/portfolio",
    title: "Ladder7 Portfolio | Work With Purpose. Ideas In Action.",
    description:
      "From AI-driven innovation to hyper-automation and experience-led transformation, we turn ambitious ideas into scalable digital experiences that move businesses forward.",
    name: "Work with purpose. Ideas in action.",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: true,
    lastModified: RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
    breadcrumb: [{ name: "Portfolio", path: "/portfolio" }],
  },
  notFound: {
    path: "/404",
    title: "Page Not Found | Ladder7",
    description: "The page you were looking for could not be found. Explore Ladder7's services, company and contact details.",
    name: "Page not found",
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    indexable: false,
    lastModified: RELEASE_DATE,
    changeFrequency: "yearly",
    priority: 0,
    breadcrumb: [],
  },
};
