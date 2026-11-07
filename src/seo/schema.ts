/**
 * JSON-LD structured data. Only facts that appear on the site are stated
 * (no ratings, founding dates or price ranges that the design does not show).
 */
import { SITE_URL } from "../config/env";
import { BLOG_PATH, BLOG_POSTS } from "../data/blog";
import { FAQS } from "../data/company";
import { CAPABILITIES, SOLUTIONS } from "../data/services";
import { COMPANY, LOCATIONS, SOCIAL } from "../data/site";
import type { PageKey } from "../routes";
import { PAGE_SEO } from "./pages";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: COMPANY.name,
  alternateName: [COMPANY.shortName, COMPANY.division],
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icons/ladder7-logo-512.png`,
    width: 512,
    height: 512,
  },
  description: COMPANY.summary,
  slogan: COMPANY.tagline,
  email: COMPANY.email,
  telephone: COMPANY.phone.e164,
  address: LOCATIONS.map((location) => ({
    "@type": "PostalAddress",
    name: location.city,
    streetAddress: location.place.split(",")[0],
    addressLocality: location.locality,
    addressRegion: location.region,
    addressCountry: location.country,
  })),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: COMPANY.email,
    telephone: COMPANY.phone.e164,
  },
  sameAs: SOCIAL.map((s) => s.href),
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${SITE_URL}/`,
  name: COMPANY.division,
  alternateName: COMPANY.name,
  description: COMPANY.summary,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

function webPage(key: PageKey) {
  const page = PAGE_SEO[key];
  const url = absoluteUrl(page.path);
  const type = key === "about" ? "AboutPage" : key === "contact" ? "ContactPage" : "WebPage";
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${page.image}` },
    ...(page.breadcrumb.length ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

function breadcrumb(key: PageKey) {
  const page = PAGE_SEO[key];
  const url = absoluteUrl(page.path);
  const trail = [{ name: "Home", path: "/" }, ...page.breadcrumb];
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function services() {
  return CAPABILITIES.map((capability) => {
    const solution = capability.solution ? SOLUTIONS[capability.solution] : undefined;
    return {
      "@type": "Service",
      "@id": `${SITE_URL}/services#${capability.id}`,
      name: capability.title,
      serviceType: capability.tags.join(", "),
      description: solution
        ? solution.description
        : "Product ideation, architecture, research & development and solution design — a clearer route from idea to delivery.",
      provider: { "@id": ORG_ID },
      url: `${SITE_URL}/services#${capability.id}`,
    };
  });
}

function faqPage(key: PageKey) {
  const url = absoluteUrl(PAGE_SEO[key].path);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Pages that render the FAQ list (FAQPage markup must match visible content). */
const PAGES_WITH_FAQ: PageKey[] = ["home", "services", "contact"];

/** BlogPosting for a /blogs/* article — headline, standfirst and cover as shown on the page. */
function blogPosting(key: PageKey) {
  const page = PAGE_SEO[key];
  const post = BLOG_POSTS.find((item) => `${BLOG_PATH}/${item.slug}` === page.path);
  if (!post) return null;
  const url = absoluteUrl(page.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/images/${post.image}-1200.webp`,
    articleSection: post.topicLabel,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    inLanguage: "en",
  };
}

export function buildSchema(key: PageKey): object | null {
  if (key === "notFound") return null;
  const graph: object[] = [organization, website, webPage(key)];
  if (PAGE_SEO[key].breadcrumb.length) graph.push(breadcrumb(key));
  if (key === "services") graph.push(...services());
  if (PAGES_WITH_FAQ.includes(key)) graph.push(faqPage(key));
  const article = blogPosting(key);
  if (article) graph.push(article);
  return { "@context": "https://schema.org", "@graph": graph };
}
