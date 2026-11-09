import pageSeoData from "./website-page-seo.json";
import pageSchemaData from "./website-page-schemas.json";

export interface WebsitePageSeoContent {
  page_key: string;
  title: string;
  description: string;
  h1: string;
  canonical_url?: string;
  robots?: string;
  og_type?: string;
  og_locale?: string;
  og_image?: string;
  og_image_alt?: string;
  twitter_card?: string;
  breadcrumb?: { name: string; path: string }[];
}

type JsonRecord = Record<string, unknown>;

interface WebsitePageSchemaData {
  common: { organization: JsonRecord; website: JsonRecord };
  pages: Record<string, JsonRecord[]>;
}

const pageSeoByKey = new Map(
  (pageSeoData as WebsitePageSeoContent[]).map((page) => [page.page_key, page]),
);
const pageSchemas = pageSchemaData as WebsitePageSchemaData;

export function websitePageSeo(pageKey: string): WebsitePageSeoContent | undefined {
  return pageSeoByKey.get(pageKey);
}

export function websiteCommonSchema() {
  return pageSchemas.common;
}

export function websitePageSchema(pageKey: string): JsonRecord[] {
  return pageSchemas.pages[pageKey] ?? [];
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function websitePageFaqs(pageKey: string): { question: string; answer: string }[] {
  const faqSchema = websitePageSchema(pageKey).find((schema) => schema["@type"] === "FAQPage");
  const entities = faqSchema?.mainEntity;
  if (!Array.isArray(entities)) return [];

  return entities.flatMap((entity: unknown) => {
    if (!isRecord(entity) || typeof entity.name !== "string" || !isRecord(entity.acceptedAnswer)) return [];
    const answer = entity.acceptedAnswer.text;
    return typeof answer === "string" ? [{ question: entity.name, answer }] : [];
  });
}
