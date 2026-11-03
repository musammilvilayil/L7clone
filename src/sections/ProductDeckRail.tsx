import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Sparkles,
  Terminal,
  RefreshCw,
} from 'lucide-react';
import { PRODUCTS_DECK } from '../content/siteCatalog';
import type { InquiryContext } from '../tokens/designTokens';
import { RevealOnScroll } from '../primitives/RevealOnScroll';
import { MagneticAction } from '../primitives/MagneticAction';

interface ProductDeckRailProps {
  onSelectInquiry: (ctx: InquiryContext) => void;
}

const SITE_360_LENS_BADGES = [
  '01 Performance',
  '02 Accessibility',
  '03 Technical SEO',
  '04 AEO Readiness',
  '05 GEO AI Visibility',
  '06 Security Headers',
  '07 Core Web Vitals',
  '08 Structured Schema',
  '09 Crawl Integrity',
  '10 Mobile UX',
  '11 Content Authority',
  '12 Conversion Flow',
];

export const ProductDeckRail: React.FC<ProductDeckRailProps> = ({
  onSelectInquiry,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [domainProbe, setDomainProbe] = useState('yourcompany.com');
  const [probeScore, setProbeScore] = useState(94);
  const [probing, setProbing] = useState(false);

  const activeProduct = PRODUCTS_DECK[selectedIdx];

  const triggerQuickScan = () => {
    setProbing(true);
    window.setTimeout(() => {
      const seed = (domainProbe.trim() || 'ladder7.in')
        .split('')
        .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      setProbeScore(86 + (seed % 12));
      setProbing(false);
    }, 320);
  };

  return (
    <section id="products" className="relative py-24 sm:py-32 bg-[#060911] overflow-hidden">
      {/* Ambient Center Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full bg-[#0056B2]/15 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 // Proof — Proprietary Product Suite</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-100 leading-[1.06]">
            Intelligent products built to end in an action rather than a report.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From web performance and AI search visibility to omnichannel conversations, predictive telemetry, and enterprise RAG — explore our five production engines below.
          </p>
        </div>

        {/* Reinvented Horizontal Interactive Product Rail (Replaces legacy arrow carousel) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8"
          role="tablist"
          aria-label="Ladder7 product deck"
        >
          {PRODUCTS_DECK.map((prod, idx) => {
            const isActive = idx === selectedIdx;
            return (
              <button
                key={prod.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedIdx(idx)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'border-[#38BDF8] bg-gradient-to-b from-[#10182B] to-[#0B101E] shadow-[0_12px_36px_rgba(37,99,235,0.28)] -translate-y-1'
                    : 'border-slate-800/80 bg-[#0B101E]/60 hover:border-slate-700 hover:bg-[#0B101E]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                    <span className={isActive ? 'text-[#38BDF8] font-bold' : 'text-slate-500'}>
                      ENGINE {prod.index}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isActive ? 'bg-[#38BDF8]' : 'bg-slate-700'
                      }`}
                    />
                  </div>
                  <div className="font-display text-lg font-bold text-white">
                    {prod.name}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {prod.tagline}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-[#38BDF8] truncate">
                  {prod.liveMetricLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Product Deep-Dive Stage */}
        <RevealOnScroll key={activeProduct.id}>
          <div className="rounded-bento border border-slate-800/90 bg-[#0B101E]/95 p-6 sm:p-10 lg:p-12 shadow-bento-card grid lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Cols: Narrative, Features & Conversion Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-pill bg-[#0056B2]/25 border border-[#38BDF8]/30 px-3.5 py-1 font-mono text-xs text-[#38BDF8]">
                <span>
                  {activeProduct.index} // {activeProduct.liveMetricLabel}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {activeProduct.name}
                </h3>
                <p className="mt-2 font-display text-lg text-[#38BDF8] font-medium">
                  {activeProduct.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeProduct.summary}
              </p>

              {/* Key Outcome Bullets */}
              <ul className="space-y-3 pt-2">
                {activeProduct.bulletPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-xs sm:text-sm text-slate-100">
                    <span className="h-5 w-5 rounded-full bg-[#0056B2]/40 border border-[#38BDF8]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#38BDF8]">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Ecosystem Integrations */}
              <div className="pt-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2">
                  Connected Workflow Integrations
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.integrations.map((intg) => (
                    <span
                      key={intg}
                      className="px-3 py-1 rounded-pill bg-[#060911] border border-slate-800 font-mono text-xs text-slate-300"
                    >
                      {intg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <MagneticAction
                  href="#contact"
                  onClick={() =>
                    onSelectInquiry({
                      topic: `${activeProduct.name} Product Walkthrough`,
                      prefillMessage: `We want to schedule a live demo / audit with ${activeProduct.name} (${activeProduct.tagline}).`,
                    })
                  }
                  className="rounded-pill bg-gradient-to-r from-[#0056B2] to-[#2563EB] hover:from-[#2563EB] hover:to-[#38BDF8] text-white font-semibold text-xs sm:text-sm px-6 py-3.5 shadow-brand-glow gap-2 transition-all"
                >
                  <span>{activeProduct.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticAction>

                <a
                  href="#contact"
                  onClick={() =>
                    onSelectInquiry({
                      topic: `Book a Demo — ${activeProduct.name}`,
                      prefillMessage: `Requesting a product demonstration for ${activeProduct.name}.`,
                    })
                  }
                  className="rounded-pill border border-slate-700 hover:border-[#38BDF8] bg-[#060911] text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-6 py-3.5 inline-flex items-center gap-2 transition-colors"
                >
                  <span>Book a Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right 6 Cols: Real Repository Product Telemetry Asset + Interactive Overlay */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-slate-700/80 bg-[#060911] overflow-hidden shadow-2xl">
                {/* Real Product Image from Repository */}
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={activeProduct.assetPath}
                    alt={`${activeProduct.name} telemetry interface`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/35 to-transparent"
                  />

                  <div className="absolute top-3 left-3 rounded-pill bg-[#060911]/85 border border-white/15 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#38BDF8] flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" />
                    <span>{activeProduct.name} // {activeProduct.liveMetricValue}</span>
                  </div>
                </div>

                {/* Interactive Console Drawer Inside the Stage */}
                <div className="p-5 sm:p-6 bg-[#060911]/95 border-t border-slate-800/90">
                  {activeProduct.id === 'site-360' ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-mono text-xs text-[#38BDF8] font-semibold">
                          Interactive 12-Lens Diagnostic Preview
                        </span>
                        <span className="font-mono text-xs text-slate-300">
                          Simulated Score:{' '}
                          <strong className="text-white">{probeScore}/100</strong>
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={domainProbe}
                          onChange={(e) => setDomainProbe(e.target.value)}
                          aria-label="Enter domain for Site 360 preview"
                          placeholder="your-domain.com"
                          className="flex-1 rounded-xl border border-slate-800 bg-[#0B101E] px-3.5 py-2 font-mono text-xs text-white focus:border-[#38BDF8] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={triggerQuickScan}
                          className="rounded-xl bg-[#0056B2] hover:bg-[#2563EB] px-4 py-2 font-mono text-xs font-semibold text-white inline-flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${probing ? 'animate-spin' : ''}`} />
                          <span>{probing ? 'Scanning...' : 'Test 12 Lenses'}</span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {SITE_360_LENS_BADGES.map((lens) => (
                          <span
                            key={lens}
                            className="px-2 py-0.5 rounded-md bg-[#0B101E] border border-slate-800/90 font-mono text-[10px] text-slate-300"
                          >
                            {lens}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
                          Live Action Pipeline
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">
                          {activeProduct.name} connects directly to{' '}
                          {activeProduct.integrations.join(', ')} for immediate execution.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIdx((prev) => (prev + 1) % PRODUCTS_DECK.length)
                        }
                        className="px-3.5 py-2 rounded-pill border border-slate-700 hover:border-[#38BDF8] font-mono text-[11px] text-[#38BDF8] shrink-0 transition-colors"
                      >
                        Next Engine &rarr;
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

