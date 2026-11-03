import React from 'react';
import { Scale, Globe2, ShieldCheck } from 'lucide-react';
import { TRUST_METRICS, TRUST_PILLARS } from '../content/siteCatalog';
import { RevealOnScroll } from '../primitives/RevealOnScroll';
import { SpotlightSurface } from '../primitives/SpotlightSurface';

const PILLAR_ICONS = [Scale, Globe2, ShieldCheck];

export const TrustMetricsMatrix: React.FC = () => {
  return (
    <section id="trust" className="relative py-24 sm:py-32 bg-[#060911] bg-dark-grid">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
            <span>06 // Why Innovators Partner With Ladder7</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-100 leading-[1.06]">
            Engineered for commercial outcomes, global reach, and privacy-first security.
          </h2>
        </div>

        {/* Architectural Telemetry Wall (4 Oversized Counters) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {TRUST_METRICS.map((metric, idx) => (
            <RevealOnScroll key={metric.suffix} delayMs={idx * 70}>
              <div className="rounded-bento border border-slate-800/90 bg-[#0B101E]/85 p-6 sm:p-7 h-full flex flex-col justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
                    {metric.value}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
                    {metric.suffix}
                  </span>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {metric.label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            return (
              <RevealOnScroll key={pillar.id} delayMs={idx * 100}>
                <SpotlightSurface className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                      <div className="h-11 w-11 rounded-2xl bg-[#0056B2]/25 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-wrap gap-2">
                    {pillar.proofBadges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3 py-1 rounded-pill bg-[#060911] border border-slate-800 font-mono text-[11px] text-slate-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </SpotlightSurface>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

