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
