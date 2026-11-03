import React from 'react';
import { ArrowUpRight, Globe, Bot, Compass, Code2 } from 'lucide-react';
import { CAPABILITIES_BENTO } from '../content/siteCatalog';
import type { InquiryContext } from '../tokens/designTokens';
import { RevealOnScroll } from '../primitives/RevealOnScroll';
import { SpotlightSurface } from '../primitives/SpotlightSurface';

interface CapabilitiesBentoProps {
  onSelectInquiry: (ctx: InquiryContext) => void;
}

const CAPABILITY_ICONS = [Globe, Bot, Compass, Code2];

export const CapabilitiesBento: React.FC<CapabilitiesBentoProps> = ({
  onSelectInquiry,
}) => {
  return (
    <section
      id="capabilities"
      className="relative py-24 sm:py-32 bg-[#090E1B] border-y border-slate-800/80 overflow-hidden"
    >
      {/* Subtle Top Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 w-[520px] h-[280px] rounded-full bg-[#0056B2]/15 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
              <span>03 // What We Do — Strategic Capabilities</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-100 leading-[1.05]">
              Four core pillars engineered to future-proof digital operations.
            </h2>
          </div>

          <a
            href="#contact"
            onClick={() =>
              onSelectInquiry({
                topic: 'Full Service Catalog Inquiry',
                prefillMessage:
                  'We would like to discuss how Ladder7 capabilities can support our roadmap.',
              })
            }
            className="inline-flex items-center gap-2 rounded-pill border border-slate-700/80 bg-[#0B101E] hover:border-[#38BDF8] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#38BDF8] transition-colors self-start md:self-auto"
          >
            <span>Request Capability Brief</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Asymmetrical 12-Column Bento Grid (7/5 + 5/7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {CAPABILITIES_BENTO.map((cap, idx) => {
            const Icon = CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];
            const spanClass =
              cap.bentoSpan === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <RevealOnScroll
                key={cap.id}
                delayMs={idx * 85}
                className={spanClass}
              >
                <SpotlightSurface className="group h-full p-7 sm:p-9 flex flex-col justify-between relative">
                  {/* Subtle Blended Asset Backdrop on Wide Bento Cells */}
                  {cap.assetPreview && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 top-0 w-3/5 h-full opacity-[0.11] group-hover:opacity-[0.18] transition-opacity duration-500 overflow-hidden"
                    >
                      <img
                        src={cap.assetPreview}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B101E] via-[#0B101E]/85 to-transparent" />
                    </div>
                  )}

                  {/* Top Ambient Gradient Wash */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${cap.accentGradient} opacity-60`}
                  />

                  <div className="relative z-10">
                    {/* Index & Icon Row */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-[#38BDF8] px-2.5 py-1 rounded-lg bg-[#060911]/80 border border-slate-800">
                          PILLAR {cap.index}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
                          {cap.architectureNote}
                        </span>
                      </div>

                      <div className="h-12 w-12 rounded-2xl bg-[#060911]/90 border border-slate-700/80 group-hover:border-[#38BDF8]/60 flex items-center justify-center text-[#38BDF8] transition-transform duration-300 group-hover:scale-105">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {cap.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                      {cap.summary}
                    </p>
                  </div>

                  {/* Deliverable Pills & Action Footer */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {cap.deliverablePills.map((pill) => (
                        <span
                          key={pill}
                          className="px-3 py-1 rounded-pill text-[11px] font-mono bg-[#060911]/90 border border-slate-800 text-slate-300 group-hover:border-slate-700"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      onClick={() =>
                        onSelectInquiry({
                          topic: cap.title,
                          prefillMessage: `Interested in ${cap.title} (${cap.deliverablePills.slice(0, 3).join(', ')}).`,
                        })
                      }
                      aria-label={`Scope ${cap.title}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#38BDF8] hover:text-white shrink-0 transition-colors"
                    >
                      <span>Scope Pillar</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
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

