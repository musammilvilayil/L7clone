import React, { useCallback, useRef, useState } from 'react';
import type { BriefPreset } from '../design-system/tokens';
import FlexCarousel from '../components/FlexCarousel';
import type {
  FlexCarouselHandle,
  FlexCarouselItem,
} from '../components/FlexCarousel.types';
import BlobButton from '../components/BlobButton';

interface ProductsExpandingPanelsProps {
  onApplyPreset: (preset: BriefPreset) => void;
}

interface ProductDetail {
  id: string;
  name: string;
  tagline: string;
  twoSentences: string;
  highlights: string[];
  metricsBadge: string;
  image: string;
  imageAlt: string;
}

const PRODUCTS: ProductDetail[] = [
  {
    id: 'l7-insights',
    name: 'L7 Insights',
    tagline: 'No-Code Dashboard CMS & Analytics Platform',
    twoSentences:
      'L7 Insights turns distributed spreadsheet records, live analytics streams, and team metrics into customizable real-time dashboards with drag-and-drop KPI widgets and automated data joins. It empowers growth and operations teams to monitor lead conversion, revenue distribution, and workforce metrics in a single unified view.',
    highlights: [
      'No-Code KPI & Chart Widgets',
      'Live Google Sheets & DB Joins',
      'Custom Analytics & Metric Filters',
      'Role-Based Access & Audit Logging',
    ],
    metricsBadge: 'Real-time Sync • Multi-Source Joins • Drag-and-Drop CMS',
    image: '/images/products/product-insights.webp',
    imageAlt:
      'L7 Insights no-code dashboard CMS with drag-and-drop KPI cards, leave analytics bar chart, revenue donut chart, and lead details table',
  },
  {
    id: 'outreach',
    name: 'Outreach',
    tagline: 'Multi-Channel Inbound & Outbound Pipeline Engine',
    twoSentences:
      'Outreach consolidates high-deliverability email campaigns, lead tracking, and conversion funnels into an automated pipeline dashboard. Built for acquisition teams, it monitors sends and opens trends, tracks stage-by-stage conversions, and manages mailbox rotation with automated domain warmup.',
    highlights: [
      'Multi-Mailbox Inbound & Outbound',
      'Stage-by-Stage Conversion Funnel',
      'Real-Time Sends & Opens Telemetry',
      'Automated Domain Warmup & Rotation',
    ],
    metricsBadge: 'Platform-Wide Leads • Mailbox Rotation • Instant Funnel Telemetry',
    image: '/images/products/product-outreach.webp',
    imageAlt:
      'Outreach pipeline dashboard with emails sent and opened stats, total leads, sends and opens trend, conversion funnel, and mailbox distribution',
  },
  {
    id: 'infinite',
    name: 'Infinite',
    tagline: 'Executive Project Intelligence & Strategic Action Center',
    twoSentences:
      'Infinite gives leadership teams real-time visibility into active project budgets, revenue yield, and ROI alongside AI-powered critical alerts. It surfaces predictive strategic insights and automated operational recommendations directly from cross-platform telemetry.',
    highlights: [
      'Live Spend, Budget & ROI Tracking',
      'Critical Automated Alerts & Scoring',
      'Strategic Insights & Trend Feeds',
      'Enterprise Role-Based Administration',
    ],
    metricsBadge: 'Live ROI Auditing • Predictive Alerts • Enterprise Governance',
    image: '/images/products/product-infinite.webp',
    imageAlt:
      'Infinite executive intelligence dashboard with active project budget and revenue ROI, critical alerts feed, and strategic insights analysis',
  },
  {
    id: 'l7-nexus',
    name: 'L7 Nexus',
    tagline: 'Autonomous Multi-Agent Enterprise Orchestration',
    twoSentences:
      'L7 Nexus orchestrates specialized autonomous AI agents under an executive coordination hierarchy to handle knowledge discovery, software architecture, marketing operations, and customer lifecycle. Every task is distributed across dedicated specialist agents with human-in-the-loop oversight and governance.',
    highlights: [
      'Hierarchical Multi-Agent Architecture',
      'Chief of Staff Coordination Office',
      'Domain Specialists (Tech, Sales, Ops)',
      'Human-in-the-Loop Governance & Logs',
    ],
    metricsBadge: 'Multi-Agent Mesh • Sub-Minute Orchestration • Audit-Ready Architecture',
    image: '/images/products/product-nexus.webp',
    imageAlt:
      'L7 Nexus autonomous multi-agent hierarchy showing Chief Executive Agent Ethan and coordinating Chief of Staff office across knowledge, technology, marketing, sales, and operations',
  },
];

const CAROUSEL_ITEMS: FlexCarouselItem[] = PRODUCTS.map((p) => ({
  src: p.image,
  alt: p.imageAlt,
  title: p.name,
  subtitle: p.tagline,
}));

export const ProductsExpandingPanels: React.FC<ProductsExpandingPanelsProps> = ({
  onApplyPreset,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselHandleRef = useRef<FlexCarouselHandle | null>(null);

  const handleSelectProduct = useCallback((index: number) => {
    setActiveIndex(index);
    carouselHandleRef.current?.goTo(index);
  }, []);

  const activeProduct = PRODUCTS[activeIndex] || PRODUCTS[0];

  return (
    <section
      id="proof"
      aria-labelledby="products-heading"
      className="relative py-8 sm:py-10 lg:py-12 min-h-[100svh] lg:h-screen lg:max-h-[980px] flex flex-col justify-center bg-[#08090C] overflow-hidden"
    >
      {/* Top and Bottom Seamless Gradient Fades (Zero Harsh Cuts) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-[#08090C] to-transparent z-[2]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-t from-[#08090C] to-transparent z-[2]"
      />
      <div className="mx-auto max-w-[1380px] w-full px-4 sm:px-6 lg:px-10">
        {/* Header & Subtext */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 lg:mb-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-1.5 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-medium text-[#A3AAB8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              In-House Platforms
            </div>
            <h2
              id="products-heading"
              className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-[#F4F5F8] leading-[1.1] text-balance"
            >
              Four in-house software platforms built by Ladder7.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#A3AAB8] leading-normal max-w-[62ch]">
              Interactive 3D showcase powered by WebGL. Drag to bend and rotate the cards, click any card to inspect full-screen, or select a platform below.
            </p>
          </div>

          {/* Quick Platform Switcher Pills */}
          <div
            role="tablist"
            aria-label="Select product"
            className="flex flex-wrap gap-1.5 lg:max-w-md lg:justify-end shrink-0"
          >
            {PRODUCTS.map((prod, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={prod.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectProduct(idx)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] ${
                    isSelected
                      ? 'bg-[#34D399] text-[#08090C] shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'bg-white/[0.04] text-[#A3AAB8] hover:text-[#F4F5F8] hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  <span className="opacity-60 mr-1.5">0{idx + 1}</span>
                  {prod.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D FlexCarousel Stage (Directly on OG Background, Zero Container Box) */}
        <div className="w-full relative overflow-hidden">
          {/* Subtle Stage Ambient Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(52,211,153,0.06),transparent_70%)]"
          />

          <div
            style={{
              width: '100%',
              position: 'relative',
            }}
            className="h-[250px] sm:h-[290px] lg:h-[330px]"
          >
            <FlexCarousel
              items={CAROUSEL_ITEMS}
              preset="liquid"
              intro="rise"
              cardHeight={0.68}
              gap={14}
              squeeze={0.18}
              focusOnClick
              captions
              onReady={(handle: FlexCarouselHandle | null) => {
                carouselHandleRef.current = handle;
              }}
              onChange={(index: number) => setActiveIndex(index)}
              onSelect={(index: number) => setActiveIndex(index)}
            />
          </div>
        </div>

        {/* Product Description Directly Below Image on OG Background (No Separate Container) */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            {/* Left 8 cols: Platform summary, narrative & capabilities */}
            <div className="lg:col-span-8 space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-[#34D399]/15 text-[#34D399] text-[11px] font-bold tracking-wide">
                  Platform 0{activeIndex + 1}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#F4F5F8]">
                  {activeProduct.tagline}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#C4C9D4] leading-[1.55] max-w-[72ch]">
                {activeProduct.twoSentences}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {activeProduct.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-medium bg-white/[0.04] text-[#E2E6EF] border border-white/10"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#34D399] mr-1.5" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 4 cols: Action buttons */}
            <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-6 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
              <BlobButton
                variant="primary"
                size="sm"
                href="#contact"
                onClick={() => {
                  onApplyPreset({
                    serviceTrack: 'L7 Insights / Outreach / Infinite / L7 Nexus',
                    contextLine: `See how ${activeProduct.name} works for our team.`,
                  });
                }}
                className="w-full text-center"
              >
                See how {activeProduct.name} works →
              </BlobButton>

              <BlobButton
                variant="ghost"
                size="sm"
                href="#contact"
                onClick={() => {
                  onApplyPreset({
                    serviceTrack: 'L7 Insights / Outreach / Infinite / L7 Nexus',
                    contextLine: `Request a technical demo and architecture review for ${activeProduct.name}.`,
                  });
                }}
                className="w-full text-center"
              >
                Request Technical Demo
              </BlobButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsExpandingPanels;
