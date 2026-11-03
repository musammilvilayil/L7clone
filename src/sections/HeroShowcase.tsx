import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Layers, ShieldCheck, Globe2, Activity } from 'lucide-react';
import { HERO_FRAMES, CONTACT_DIRECTORY } from '../content/siteCatalog';
import type { InquiryContext } from '../tokens/designTokens';
import { WordStage } from '../primitives/RevealOnScroll';
import { MagneticAction } from '../primitives/MagneticAction';

interface HeroShowcaseProps {
  onSelectInquiry: (ctx: InquiryContext) => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  onSelectInquiry,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Subtle ambient rotation through the 4 stacked visual frames unless user interacts or prefers-reduced-motion
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_FRAMES.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, []);

  const currentFrame = HERO_FRAMES[activeIndex];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#060911] bg-radial-stage bg-noise-subtle overflow-hidden flex flex-col justify-between"
    >
      {/* Ambient Radial Glow Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full bg-[#0056B2]/20 blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Main Editorial Split Stage */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left 7 Columns: Oversized Editorial Typography + Dual CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Interactive Domain Focus Selector Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E]/90 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#38BDF8]">
                {currentFrame.tag}
              </span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-[11px] text-slate-300">
                {currentFrame.telemetryValue}
              </span>
            </div>

            {/* Strong Outcome Headline */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-[68px] font-bold leading-[1.03] tracking-[-0.04em] text-[#F8FAFC]">
              <WordStage
                key={currentFrame.id}
                text={`${currentFrame.headline} ${currentFrame.accentPhrase}`}
                accentWords={currentFrame.accentPhrase.split(' ')}
              />
            </h1>

            {/* Short Subtext */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              {currentFrame.summary}
            </p>

            {/* Two Clear CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <MagneticAction
                href="#contact"
                onClick={() =>
                  onSelectInquiry({
                    topic: currentFrame.tag,
                    prefillMessage: `${currentFrame.primaryAction} — Interested in ${currentFrame.tag}.`,
                  })
                }
                className="rounded-pill bg-gradient-to-r from-[#0056B2] via-[#2563EB] to-[#0056B2] bg-[length:200%_100%] hover:bg-right text-white font-semibold text-sm sm:text-base px-7 py-4 shadow-brand-glow transition-all duration-500 gap-2"
              >
                <span>{currentFrame.primaryAction}</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticAction>

              <MagneticAction
                href="#capabilities"
                className="rounded-pill border border-slate-700/90 bg-[#0B101E]/80 hover:border-[#38BDF8]/60 hover:bg-[#10182B] text-slate-100 font-semibold text-sm sm:text-base px-7 py-4 transition-all duration-300 gap-2"
              >
                <Layers className="w-4 h-4 text-[#38BDF8]" />
                <span>{currentFrame.secondaryAction}</span>
              </MagneticAction>
            </div>

            {/* Interactive Stage Switcher Rail (Replaces legacy dots slider) */}
            <div className="pt-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-3">
                Select Architecture Layer
              </div>
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                role="tablist"
                aria-label="Hero architecture layers"
              >
                {HERO_FRAMES.map((frame, index) => {
                  const isSelected = index === activeIndex;
                  return (
                    <button
                      key={frame.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveIndex(index)}
                      className={`text-left p-3 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? 'border-[#38BDF8]/60 bg-[#10182B] shadow-[0_0_25px_rgba(37,99,235,0.28)]'
                          : 'border-slate-800/80 bg-[#0B101E]/60 hover:border-slate-700 hover:bg-[#0B101E]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#38BDF8] mb-1">
                        <span>0{index + 1}</span>
                        {isSelected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                        )}
                      </div>
                      <div className="font-display text-xs font-semibold text-slate-100 truncate">
                        {frame.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Reinvented 3D Stacked Perspective Asset Stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none h-[390px] sm:h-[450px] flex items-center justify-center">
              {HERO_FRAMES.map((frame, index) => {
                const offset = (index - activeIndex + HERO_FRAMES.length) % HERO_FRAMES.length;
                const isFront = offset === 0;
                const isSecond = offset === 1;
                const isThird = offset === 2;

                const cardTransform = isFront
                  ? 'translate-y-0 scale-100 opacity-100 z-30'
                  : isSecond
                    ? 'translate-y-5 translate-x-3 sm:translate-x-5 scale-[0.94] opacity-65 z-20 cursor-pointer'
                    : isThird
                      ? 'translate-y-10 translate-x-6 sm:translate-x-10 scale-[0.88] opacity-35 z-10 cursor-pointer'
                      : 'translate-y-14 scale-[0.82] opacity-0 pointer-events-none z-0';

                return (
                  <div
                    key={frame.id}
                    onClick={() => {
                      if (!isFront) setActiveIndex(index);
                    }}
                    className={`absolute inset-x-0 top-2 bottom-6 rounded-bento border border-slate-700/70 bg-[#0B101E] overflow-hidden shadow-bento-card transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${cardTransform}`}
                  >
                    <img
                      src={frame.assetPath}
                      alt={frame.assetAlt}
                      fetchPriority={index === 0 ? 'high' : 'low'}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Dark Gradient Vignette Overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/45 to-transparent"
                    />

                    {/* Top Right Live Badge */}
                    <div className="absolute top-4 right-4 rounded-pill border border-white/15 bg-[#060911]/75 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#38BDF8]">
                      Layer 0{index + 1} // {frame.telemetryLabel}
                    </div>

                    {/* Bottom Glass Telemetry Overlay inside Active Asset Card */}
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-[#0B101E]/85 backdrop-blur-xl p-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
                          {frame.tag}
                        </div>
                        <div className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                          {frame.telemetryValue}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex((prev) => (prev + 1) % HERO_FRAMES.length);
                        }}
                        className="px-3 py-1.5 rounded-pill bg-[#0056B2]/80 hover:bg-[#2563EB] text-white font-mono text-[10px] uppercase tracking-wider transition-colors shrink-0"
                      >
                        Next Layer &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Trust & Telemetry Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-[#0056B2]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Global Delivery Footprint
              </div>
              <div className="text-sm font-semibold text-slate-100">
                {CONTACT_DIRECTORY.markets.join(' · ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-[#0056B2]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Privacy &amp; Compliance Built In
              </div>
              <div className="text-sm font-semibold text-slate-100">
                {CONTACT_DIRECTORY.complianceFrameworks.join(' · ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-[#0056B2]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Proprietary Product Suite
              </div>
              <div className="text-sm font-semibold text-slate-100">
                Site 360 · L7 Nexus · L7 Insights · Outreach · Infinite
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

