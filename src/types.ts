export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  ctaPrimary: string;
  image: string;
}

export interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  glowBarColor: string;
  glowBloomColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
