export const DESIGN_TOKENS = {
  colors: {
    base: '#060911',
    elevated: '#0B101E',
    card: '#10182B',
    hover: '#16213A',
    brandPrimary: '#0056B2',
    brandElectric: '#2563EB',
    brandSky: '#38BDF8',
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
  },
  layout: {
    maxWidth: 'max-w-[1380px]',
    sectionPadding: 'py-24 sm:py-32',
    containerPadding: 'px-4 sm:px-6 lg:px-10',
  },
} as const;

export interface HeroShowcaseFrame {
  id: string;
  tag: string;
  headline: string;
  accentPhrase: string;
  summary: string;
  primaryAction: string;
  secondaryAction: string;
  assetPath: string;
  assetAlt: string;
  telemetryLabel: string;
  telemetryValue: string;
}

export interface AudienceSegment {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  highlights: string[];
  regions: string;
  ctaLabel: string;
}

export interface CapabilityBentoItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  deliverablePills: string[];
  bentoSpan: 'wide' | 'narrow';
  accentGradient: string;
  architectureNote: string;
  assetPreview?: string;
}

export interface ProductDeckEntry {
  id: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  bulletPoints: string[];
  ctaText: string;
  assetPath: string;
  liveMetricLabel: string;
  liveMetricValue: string;
  integrations: string[];
}

export interface BuildProcessStage {
  stepNumber: string;
  phaseTag: string;
  title: string;
  narrative: string;
  outputs: string[];
  gateMetric: string;
}

export interface TrustPillarItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  proofBadges: string[];
}

export interface ObjectionFAQ {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export interface InquiryContext {
  topic: string;
  prefillMessage: string;
}

