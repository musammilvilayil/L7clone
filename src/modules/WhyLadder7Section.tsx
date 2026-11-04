import React from 'react';
import { Scale, Globe2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import RingField from '../components/RingField';
import BlobButton from '../components/BlobButton';

interface MarqueeImageItem {
  src: string;
  title: string;
  tag: string;
}

// 12 Production Images across Hero & Products, split into two opposite-scrolling columns
const MARQUEE_COLUMN_1: MarqueeImageItem[] = [
  {
    src: '/images/products/product-insights.webp',
    title: 'L7 Insights Dashboard',
    tag: 'Analytics CMS',
  },
  {
    src: '/images/hero/hero-ai-platform.webp',
    title: 'Enterprise AI Ecosystem',
    tag: 'Autonomous Mesh',
  },
  {
    src: '/images/products/product-infinite.webp',
    title: 'Infinite Executive Intelligence',
    tag: 'ROI & Alerts',
  },
  {
    src: '/images/hero/hero-cloud-architecture.webp',
    title: 'Cloud Infrastructure',
    tag: 'Sub-100ms',
  },
  {
    src: '/images/products/product-showcase.webp',
    title: 'Product Suite Architecture',
    tag: 'Full Stack',
  },
  {
    src: '/images/hero/Intelligent-AI.webp',
    title: 'Intelligent AI Workflows',
    tag: 'Private LLM',
  },
];

const MARQUEE_COLUMN_2: MarqueeImageItem[] = [
  {
    src: '/images/products/product-outreach.webp',
    title: 'Outreach Pipeline Engine',
    tag: 'Deliverability',
  },
  {
    src: '/images/hero/hero-digital-engineering.png',
    title: 'Digital Engineering Studio',
    tag: 'Next.js & AEM',
  },
  {
    src: '/images/products/product-nexus.webp',
    title: 'L7 Nexus Multi-Agent',
    tag: 'Autonomous Ops',
  },
  {
    src: '/images/hero/hero-intelligent-automation.webp',
    title: 'Intelligent Automation',
    tag: 'CRM & ERP',
  },
  {
    src: '/images/products/product-analytics-preview.webp',
    title: 'Real-Time Telemetry',
    tag: 'Live Pipelines',
  },
  {
    src: '/images/hero/Enterprise-Cloud-Strategy.webp',
    title: 'Enterprise Cloud Strategy',
    tag: 'Multi-Cloud',
  },
];

const CORE_PILLARS = [
  {
    category: 'Business Results',
    icon: Scale,
    title: 'Software built around real business goals',
    detail: 'Every website, AEM rollout, and workflow integration is built around clear outcomes: stronger conversion and automated speed.',
  },
  {
    category: 'Regional Experience',
    icon: Globe2,
    title: 'Global delivery from our Kerala offices',
    detail: 'From Cochin and Trivandrum engineering studios, supporting teams across India, the Middle East, Singapore, UK, and USA.',
  },
  {
    category: 'Data Protection',
    icon: ShieldCheck,
    title: 'Private AI setups & strict access controls',
    detail: 'Internal knowledge search and automations use private enterprise models with GDPR, DPDP Act, and UAE AI Policy compliance.',
  },
];

export const WhyLadder7Section: React.FC = () => {
  return (
    <section
      id="credibility"
      className="relative py-12 sm:py-16 lg:py-20 min-h-[100svh] lg:min-h-screen flex flex-col justify-center bg-[#08090C] overflow-hidden"
    >
      {/* 1. React Bits Pro Ring Field Ambient Interactive Background (Retained Unchanged) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-auto z-0 opacity-40 mix-blend-screen"
      >
        <RingField
          colors={['#1D4ED8', '#60A5FA']}
          backgroundColor="#08090C"
          rings={7}
          particles={42000}
          flow="outward"
          flowSpeed={0.06}
          thickness={0.32}
          dust={0.18}
          glow={0.5}
          fade={0.3}
          tilt={24}
          morph={0.12}
          sparkle={0.08}
          twinkle={0.35}
          interactive={true}
          className="w-full h-full"
        />
      </div>

      {/* 2. Top and Bottom Seamless Gradient Fades (Zero Harsh Cuts) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#08090C] to-transparent z-[2]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#08090C] to-transparent z-[2]"
      />

      {/* 3. Radial Scrim to maintain WCAG AAA Text Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_100%_80%_at_50%_50%,rgba(8,9,12,0.65)_0%,#08090C_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#08090C] via-transparent to-[#08090C]"
      />

      {/* 4. React Bits Pro "Features 3" Layout: Narrative & Opposite-Scrolling Marquees */}
      <div className="relative z-10 mx-auto max-w-[1380px] w-full px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative, Key Pillars & Action CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-[#3B82F6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                Why Ladder7
              </div>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-[#F4F5F8] leading-[1.1] text-balance">
                Built for teams that want reliable engineering and practical results.
              </h2>

              <p className="mt-3 text-xs sm:text-sm md:text-base text-[#A3AAB8] leading-relaxed max-w-[56ch]">
                From our Cochin and Trivandrum engineering studios, Ladder7 architects and builds software platforms, private enterprise AI setups, and high-throughput infrastructure for companies worldwide.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="space-y-4 pt-2">
              {CORE_PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.category}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#3B82F6]/40 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#93C5FD]">
                        {item.category}
                      </div>
                      <h3 className="text-sm font-bold text-[#F4F5F8]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#A3AAB8] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button with Blobs Button Effect */}
            <div className="pt-2">
              <BlobButton
                variant="primary"
                size="md"
                href="#contact"
              >
                <span>Discuss Your Next Project</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </BlobButton>
            </div>
          </div>

          {/* Right Column: React Bits Pro Features 3 Opposite-Scrolling Marquees */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[480px] lg:h-[540px] overflow-hidden rounded-2xl border border-white/10 bg-[#08090C]/60 backdrop-blur-sm">
            {/* Top and Bottom Gradient Fade Masks for Infinite Marquee Illusion */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-0 h-20 sm:h-24 bg-gradient-to-b from-[#08090C] via-[#08090C]/90 to-transparent z-20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-0 h-20 sm:h-24 bg-gradient-to-t from-[#08090C] via-[#08090C]/90 to-transparent z-20"
            />

            <div className="p-3 sm:p-4 grid grid-cols-2 gap-3 sm:gap-4 h-full overflow-hidden">
              {/* Marquee Column 1 (Scrolling UP) */}
              <div className="relative overflow-hidden h-full">
                <div className="flex flex-col gap-3 sm:gap-4 animate-marquee-up hover:[animation-play-state:paused] will-change-transform">
                  {[...MARQUEE_COLUMN_1, ...MARQUEE_COLUMN_1].map((item, idx) => (
                    <div
                      key={`col1-${item.title}-${idx}`}
                      className="group/card relative rounded-xl border border-white/10 hover:border-[#3B82F6]/60 bg-[#0C0E14] overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#060709]">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-2.5 bg-[#0C0E14] border-t border-white/[0.08]">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#3B82F6]">
                          {item.tag}
                        </div>
                        <div className="text-xs font-semibold text-[#F4F5F8] truncate">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marquee Column 2 (Scrolling DOWN - Opposite Direction!) */}
              <div className="relative overflow-hidden h-full">
                <div className="flex flex-col gap-3 sm:gap-4 animate-marquee-down hover:[animation-play-state:paused] will-change-transform">
                  {[...MARQUEE_COLUMN_2, ...MARQUEE_COLUMN_2].map((item, idx) => (
                    <div
                      key={`col2-${item.title}-${idx}`}
                      className="group/card relative rounded-xl border border-white/10 hover:border-[#3B82F6]/60 bg-[#0C0E14] overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#060709]">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-2.5 bg-[#0C0E14] border-t border-white/[0.08]">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#93C5FD]">
                          {item.tag}
                        </div>
                        <div className="text-xs font-semibold text-[#F4F5F8] truncate">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLadder7Section;
