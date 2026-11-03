import React, { useState } from 'react';
import {
  Building2,
  Rocket,
  Cloud,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import {
  AUDIENCE_SEGMENTS,
  CORPORATE_TRAINING_HIGHLIGHT,
  CONTACT_DIRECTORY,
} from '../content/siteCatalog';
import type { InquiryContext } from '../tokens/designTokens';
import { RevealOnScroll } from '../primitives/RevealOnScroll';
import { SpotlightSurface } from '../primitives/SpotlightSurface';

interface AudienceArchitectureProps {
  onSelectInquiry: (ctx: InquiryContext) => void;
}

export const AudienceArchitecture: React.FC<AudienceArchitectureProps> = ({
  onSelectInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'commercial' | 'enablement'>('commercial');

  return (
    <section id="who-we-are" className="relative py-24 sm:py-32 bg-[#060911] bg-dark-grid">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Header + Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
              <span>02 // Who We Are &amp; Who We Serve</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-100 leading-[1.06]">
              Strategic delivery partner for growth-focused organisations.
            </h2>
          </div>

          {/* Interactive Division Switcher (IT Delivery vs Corporate Enablement) */}
          <div
            className="inline-flex rounded-pill border border-slate-800 bg-[#0B101E] p-1.5 self-start lg:self-auto"
            role="tablist"
            aria-label="Ladder7 practice focus"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'commercial'}
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 rounded-pill text-xs font-semibold transition-all ${
                activeTab === 'commercial'
                  ? 'bg-[#0056B2] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Commercial Engineering
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'enablement'}
              onClick={() => setActiveTab('enablement')}
              className={`px-4 py-2 rounded-pill text-xs font-semibold transition-all ${
                activeTab === 'enablement'
                  ? 'bg-[#0056B2] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Corporate Cloud Bootcamps
            </button>
          </div>
        </div>

        {/* Asymmetric Dual Audience Showcase */}
        {activeTab === 'commercial' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {AUDIENCE_SEGMENTS.map((segment, index) => {
              const Icon = index === 0 ? Building2 : Rocket;
              return (
                <RevealOnScroll key={segment.id} delayMs={index * 110}>
                  <SpotlightSurface className="p-8 sm:p-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
                          {segment.eyebrow}
                        </span>
                        <div className="h-12 w-12 rounded-2xl bg-[#0056B2]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                        {segment.title}
                      </h3>

                      <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                        {segment.summary}
                      </p>

                      <ul className="mt-6 space-y-3 border-t border-slate-800/80 pt-6">
                        {segment.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-xs sm:text-sm text-slate-200"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="font-mono text-[11px] text-slate-400">
                        {segment.regions}
                      </span>

                      <a
                        href="#contact"
                        onClick={() =>
                          onSelectInquiry({
                            topic: segment.title,
                            prefillMessage: `Inquiry regarding ${segment.title}.`,
                          })
                        }
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors"
                      >
                        <span>{segment.ctaLabel}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </SpotlightSurface>
                </RevealOnScroll>
              );
            })}
          </div>
        ) : (
          /* Corporate Training & Bootcamps Spotlight (#training) */
          <RevealOnScroll>
            <SpotlightSurface className="p-8 sm:p-12">
              <div id="training" className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-pill bg-[#0056B2]/25 border border-[#38BDF8]/30 px-3.5 py-1 font-mono text-xs text-[#38BDF8]">
                    <Cloud className="w-4 h-4" />
                    <span>{CORPORATE_TRAINING_HIGHLIGHT.eyebrow}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                    {CORPORATE_TRAINING_HIGHLIGHT.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {CORPORATE_TRAINING_HIGHLIGHT.summary}
                  </p>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={() =>
                        onSelectInquiry({
                          topic: 'Corporate Cloud & DevOps Bootcamp',
                          prefillMessage:
                            'We want to explore hands-on AWS / Azure / GCP & DevOps corporate training for our engineering team.',
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-pill bg-[#0056B2] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 transition-colors"
                    >
                      <span>Schedule Corporate Cohort</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <div className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2">
                    Hands-On Engineering Modules
                  </div>
                  {CORPORATE_TRAINING_HIGHLIGHT.tracks.map((track, idx) => (
                    <div
                      key={track}
                      className="rounded-2xl border border-slate-800 bg-[#060911]/90 p-4 flex items-center gap-4"
                    >
                      <span className="h-8 w-8 rounded-lg bg-[#0056B2]/30 text-[#38BDF8] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-100">
                        {track}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightSurface>
          </RevealOnScroll>
        )}

        {/* Engineering Hubs & Global Reach Bar */}
        <div className="mt-8 rounded-bento border border-slate-800/80 bg-[#0B101E]/70 p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
              Engineering Delivery Centers
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Anchored in Kerala’s technology corridors with active client delivery across six international markets.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {CONTACT_DIRECTORY.locations.map((loc) => (
              <div
                key={loc.city}
                className="rounded-2xl border border-slate-800/90 bg-[#060911]/80 p-4 flex items-start gap-3.5"
              >
                <div className="h-9 w-9 rounded-xl bg-[#0056B2]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-white">
                    {loc.city}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">{loc.hubName}</div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {loc.region}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

