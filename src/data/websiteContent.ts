import pageContentData from "./website-pages.json";
import { pageForPath } from "../routes";

export interface WebsitePageSeoContent {
  title: string;
  description: string;
  h1: string;
}

export interface WebsiteContentItem {
  type: string;
  text: string;
}

export interface WebsiteContentCard {
  heading: string;
  text: string[];
  links: { text: string; href: string; type: string }[];
  images: { src: string; alt: string }[];
}

export interface WebsiteContentLink {
  text: string;
  url?: string | null;
}

export interface WebsiteContentSection {
  section_id: string;
  section_order: number;
  html_id?: string | null;
  section_name: string;
  section_heading?: string;
  heading_level?: string | null;
  eyebrow?: string;
  subheading?: string;
  description?: string;
  paragraphs?: string[];
  content?: WebsiteContentItem[];
  bullet_points?: string[];
  key_highlights?: { term: string; detail: string }[];
  cards?: WebsiteContentCard[];
  cta_buttons?: WebsiteContentLink[];
  images?: { src: string; alt: string }[];
  links?: { text: string; href: string; type: string }[];
  [key: string]: unknown;
}

export interface WebsitePageContent {
  page_key: string;
  page_url: string;
  document_title: string;
  seo: {
    meta_title: string;
    meta_description: string;
    h1: string;
  };
  sections: WebsiteContentSection[];
}

const websitePages = pageContentData as WebsitePageContent[];
const pagesByKey = new Map(websitePages.map((page) => [page.page_key, page]));

export function websitePageContent(pageKey: string): WebsitePageContent | undefined {
  return pagesByKey.get(pageKey);
}

export function websitePageSeo(pageKey: string): WebsitePageSeoContent | undefined {
  const page = websitePageContent(pageKey);
  return page
    ? {
        title: page.seo.meta_title,
        description: page.seo.meta_description,
        h1: page.seo.h1,
      }
    : undefined;
}

export function websitePageContentForPath(pathname: string): WebsitePageContent | undefined {
  return websitePageContent(pageForPath(pathname));
}

export function websiteSection(
  pageKey: string,
  sectionName: string,
): WebsiteContentSection | undefined {
  return websitePageContent(pageKey)?.sections.find(
    (section) => section.section_name === sectionName || section.section_id === sectionName,
  );
}

export function sectionTexts(
  section: WebsiteContentSection | undefined,
  type: string,
): string[] {
  return section?.content?.filter((item) => item.type === type).map((item) => item.text) ?? [];
}