import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { BriefPreset } from '../design-system/tokens';
import { ArrowDownRight, ArrowUpRight, Check, Command, Sparkles } from 'lucide-react';
import BlobButton from '../components/BlobButton';

interface ProductsExpandingPanelsProps {
  onApplyPreset: (preset: BriefPreset) => void;
}

interface ProductDetail {
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  highlights: string[];
  proofLine: string;
  image: string;
  imageAlt: string;
  imageLabel: string;
}

const PRODUCTS: ProductDetail[] = [
  {
    id: 'l7-insights',
    name: 'L7 Insights',
    eyebrow: '01 / PRODUCT ANALYTICS',
    tagline: 'See the signals behind every business decision.',
    description:
      'Turn spreadsheet records, live analytics streams, and team metrics into clear, customizable dashboards. Track lead conversion, revenue distribution, and workforce performance in one place.',
    highlights: [
      'No-code KPI and chart widgets',
      'Live Google Sheets and database joins',
      'Custom analytics and metric filters',
      'Role-based access and audit logging',
    ],
    proofLine: 'Real-time sync · Multi-source data · Drag-and-drop dashboards',
    image: '/images/products/product-insights.webp',
    imageAlt:
      'L7 Insights dashboard with KPI cards, analytics charts, revenue distribution, and a lead details table',
    imageLabel: 'Analytics workspace',
  },
  {
    id: 'outreach',
    name: 'Outreach',
    eyebrow: '02 / B2B PIPELINE',
    tagline: 'Turn better-targeted outreach into a clearer pipeline.',
    description:
      'Bring email campaigns, lead tracking, and conversion funnels into one acquisition workspace. Monitor campaign activity, follow each stage of the funnel, and manage mailbox rotation and domain warmup.',
    highlights: [
      'Inbound and outbound mailbox management',
      'Stage-by-stage conversion funnel',
      'Live send and open-rate telemetry',
      'Automated domain warmup and rotation',
    ],
    proofLine: 'Campaign visibility · Funnel tracking · Mailbox management',
    image: '/images/products/product-outreach.webp',
    imageAlt:
      'Outreach pipeline dashboard showing email activity, lead totals, campaign trends, conversion funnel, and mailbox distribution',
    imageLabel: 'Campaign pipeline',
  },
  {
    id: 'infinite',
    name: 'Infinite',
    eyebrow: '03 / EXECUTIVE INTELLIGENCE',
    tagline: 'Make project performance easier to understand.',
    description:
      'Give leadership teams a consolidated view of active project budgets, revenue, and ROI. Bring critical alerts and strategic insights into the same workspace to support faster operational decisions.',
    highlights: [
      'Live spend, budget, and ROI tracking',
      'Critical alerts and project scoring',
      'Strategic insights and trend feeds',
      'Role-based enterprise administration',
    ],
    proofLine: 'Project visibility · ROI tracking · Operational alerts',
    image: '/images/products/product-infinite.webp',
    imageAlt:
      'Infinite executive dashboard showing project budgets, revenue and ROI, critical alerts, and strategic insights',
    imageLabel: 'Executive overview',
  },
  {
    id: 'l7-nexus',
    name: 'L7 Nexus',
    eyebrow: '04 / MULTI-AGENT ORCHESTRATION',
    tagline: 'Coordinate specialist AI agents with human oversight.',
    description:
      'Coordinate specialist agents through an executive-led workflow for knowledge discovery, software architecture, marketing, and customer operations. Keep people in the loop with governance and activity logs.',
    highlights: [
      'Hierarchical multi-agent architecture',
      'Chief of Staff coordination layer',
      'Specialists for technology, sales, and operations',
      'Human-in-the-loop governance and logs',
    ],
    proofLine: 'Specialist agents · Central coordination · Human oversight',
    image: '/images/products/product-nexus.webp',
    imageAlt:
      'L7 Nexus multi-agent hierarchy showing executive coordination and specialist agents across knowledge, technology, marketing, sales, and operations',
    imageLabel: 'Agent orchestration',
  },
];

export const ProductsExpandingPanels: React.FC<ProductsExpandingPanelsProps> = ({
  onApplyPreset,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const navigationRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const sections = sectionRefs.current.filter(
      (section): section is HTMLElement => section !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = sections.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActiveIndex(index);
      },
      {
        root: null,
        rootMargin: '-18% 0px -48% 0px',
        threshold: [0.05, 0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateToProduct = useCallback((index: number) => {
    const target = sectionRefs.current[index];
    if (!target) return;
    setActiveIndex(index);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleNavigationKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (index + 1) % PRODUCTS.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIndex = (index - 1 + PRODUCTS.length) % PRODUCTS.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = PRODUCTS.length - 1;
      }

      if (nextIndex === null) return;
      event.preventDefault();
      navigationRefs.current[nextIndex]?.focus();
      navigateToProduct(nextIndex);
    },
    [navigateToProduct],
  );

  return (
    <section
      id="proof"
      aria-labelledby="products-heading"
      className="relative isolate bg-[#08090C] text-[#F4F5F8]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.09),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6EE7B7] sm:text-[11px]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Built in-house at Ladder7
          </div>
          <h2
            id="products-heading"
            className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.045em] text-[#F4F5F8] sm:text-4xl lg:text-5xl"
          >
            Four platforms.
            <span className="block text-[#34D399]">Purpose-built for progress.</span>
          </h2>
          <p className="mt-4 max-w-[62ch] text-sm leading-7 text-[#A3AAB8] sm:text-base">
            Explore the software platforms developed by Ladder7, each designed around a distinct business challenge.
          </p>
        </div>

        <div className="sticky top-16 z-30 -mx-5 mt-8 border-y border-white/[0.08] bg-[#08090C]/90 px-5 py-3 backdrop-blur-xl sm:top-20 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <nav
            aria-label="In-house platform navigation"
            className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto overscroll-x-contain scrollbar-none"
          >
            {PRODUCTS.map((product, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={product.id}
                  ref={(node) => {
                    navigationRefs.current[index] = node;
                  }}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={product.id}
                  onClick={() => navigateToProduct(index)}
                  onKeyDown={(event) => handleNavigationKeyDown(event, index)}
                  className={`group inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border px-3.5 text-xs font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] sm:px-4 sm:text-sm ${
                    isActive
                      ? 'border-[#34D399]/50 bg-[#34D399]/[0.12] text-[#F4F5F8] shadow-[0_0_24px_rgba(16,185,129,0.08)]'
                      : 'border-white/[0.08] bg-white/[0.025] text-[#8F98A8] hover:border-white/20 hover:bg-white/[0.06] hover:text-[#F4F5F8]'
                  }`}
                >
                  <span className={`font-mono text-[10px] tracking-wider ${
                    isActive ? 'text-[#6EE7B7]' : 'text-[#667080]'
                  }`}>
                    0{index + 1}
                  </span>
                  {product.name}
                  {isActive && (
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="divide-y divide-white/[0.08]">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              id={product.id}
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              aria-labelledby={`${product.id}-heading`}
              className="grid min-h-[88svh] scroll-mt-28 grid-cols-1 items-center gap-9 py-14 sm:gap-12 sm:py-16 lg:min-h-[88svh] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-12 lg:py-12 xl:gap-16"
            >
              <div className="relative z-10 order-2 lg:order-1">
                <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#6EE7B7] sm:text-[11px]">
                  <span className="h-px w-7 bg-[#34D399]/70" />
                  {product.eyebrow}
                </p>

                <h3
                  id={`${product.id}-heading`}
                  className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.055em] text-[#F4F5F8] sm:text-5xl xl:text-[4.25rem]"
                >
                  {product.name}
                </h3>

                <p className="mt-5 max-w-[17ch] text-xl font-semibold leading-snug tracking-[-0.025em] text-[#D9E0E8] sm:text-2xl">
                  {product.tagline}
                </p>

                <p className="mt-4 max-w-[54ch] text-sm leading-7 text-[#A3AAB8] sm:text-[15px]">
                  {product.description}
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {product.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-xs leading-5 text-[#D7DCE5] sm:text-[13px]"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#34D399]/30 bg-[#34D399]/[0.08] text-[#6EE7B7]">
                        <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <BlobButton
                    variant="primary"
                    size="md"
                    href="#contact"
                    onClick={() => {
                      onApplyPreset({
                        serviceTrack: product.name,
                        contextLine: `I'd like to explore ${product.name} and request a product walkthrough.`,
                      });
                    }}
                    className="min-h-11 justify-center px-5"
                  >
                    Explore {product.name}
                    <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </BlobButton>
                  <a
                    href="#contact"
                    onClick={() => {
                      onApplyPreset({
                        serviceTrack: product.name,
                        contextLine: `I'd like to discuss a technical demo of ${product.name}.`,
                      });
                    }}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold text-[#A3AAB8] transition-colors hover:text-[#6EE7B7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
                  >
                    Request a technical demo
                    <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-6 flex items-center gap-2 text-[10px] leading-5 text-[#778191] sm:text-[11px]">
                  <Command className="h-3.5 w-3.5 shrink-0 text-[#34D399]/80" aria-hidden="true" />
                  {product.proofLine}
                </p>
              </div>

              <div className="relative order-1 min-w-0 lg:order-2">
                <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_68%)] blur-2xl" />
                <div className="relative overflow-hidden rounded-xl border border-white/[0.13] bg-[#0D1016] shadow-[0_34px_90px_-35px_rgba(0,0,0,0.95),0_0_60px_-35px_rgba(16,185,129,0.28)]">
                  <div className="flex h-10 items-center justify-between border-b border-white/[0.08] bg-[#11151D] px-4 sm:h-11 sm:px-5">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/35" />
                      <span className="h-2 w-2 rounded-full bg-[#34D399]/80" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#737D8D] sm:text-[10px]">
                      LADDER7 / {product.imageLabel}
                    </span>
                    <span className="h-5 w-5 rounded-md border border-white/[0.08] bg-white/[0.03]" aria-hidden="true" />
                  </div>

                  <div className="flex min-h-[250px] items-center justify-center bg-[#090C11] p-3 sm:min-h-[320px] sm:p-5 lg:min-h-0 lg:p-4 xl:p-5">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="block h-auto max-h-[62svh] w-full object-contain object-center"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] bg-[#10141B] px-4 py-3 sm:px-5">
                    <span className="text-[10px] font-medium text-[#A3AAB8] sm:text-xs">
                      {product.name} <span className="text-[#596273]">/ Product preview</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6EE7B7] sm:text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                      Platform {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsExpandingPanels;
