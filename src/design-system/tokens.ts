export const TOKENS = {
  palette: {
    canvas: '#08090C',
    surface: '#0F1117',
    panel: '#151922',
    hover: '#1D222E',
    emerald: '#10B981',
    mint: '#34D399',
    lime: '#BEF264',
    inkHigh: '#F4F5F8',
    inkMid: '#A3AAB8',
    inkMuted: '#7D8597',
  },
} as const;

export interface MosaicPanelItem {
  id: string;
  label: string;
  headline: string;
  subline: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BentoServiceCard {
  id: string;
  category: string;
  title: string;
  editorialBody: string;
  capabilities: string[];
  colSpan: 'span-8' | 'span-4';
  imageSrc: string;
  imageAlt: string;
}

export interface ProductRailItem {
  id: string;
  category: string;
  name: string;
  positioning: string;
  narrative: string;
  highlights: string[];
  connectors: string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
}

export interface MethodStage {
  number: string;
  phase: string;
  headline: string;
  summary: string;
  deliverables: string[];
  outcome: string;
}

export interface FaqDrawerItem {
  id: string;
  category: string;
  question: string;
  response: string;
}

export interface BriefPreset {
  serviceTrack: string;
  contextLine: string;
}
