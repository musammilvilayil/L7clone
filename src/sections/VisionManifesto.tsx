import React from 'react';
import { Sparkles, Check, ArrowDownRight } from 'lucide-react';
import { RevealOnScroll, WordStage } from '../primitives/RevealOnScroll';

const MANIFESTO_SHIFTS = [
  {
    axis: '01 / Digital Presence',
    before: 'Static brochure websites that look modern but fail to capture or qualify pipeline.',
    after: 'Intelligent, high-converting web platforms and AEM ecosystems wired directly to revenue.',
  },
  {
    axis: '02 / Customer Operations',
    before: 'Disconnected chat widgets and siloed inboxes that drop high-intent leads after hours.',
    after: 'Autonomous AI assistants, RAG engines, and L7 Nexus omnichannel routing running 24/7.',
  },
  {
    axis: '03 / Growth Decisions',
    before: 'Fragmented audit spreadsheets and lagging reports that never reach the engineering backlog.',
    after: 'Site 360 12-lens live diagnostics and L7 Insights telemetry that end in immediate action.',
  },
];

export const VisionManifesto: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative py-24 sm:py-32 bg-[#090E1B] border-y border-slate-800/80 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left 4 Cols: Sticky Editorial Index */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 // Why We Exist</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100 leading-tight">
              Every Business. Every Market. One Goal — Revenue.
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              At Ladder7 Nextstep Solutions, we believe every organisation — regardless of size — deserves a digital presence that actively generates revenue rather than sitting idle.
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#38BDF8]">
              <span>THE ARCHITECTURAL SHIFT</span>
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>

          {/* Right 8 Cols: Oversized Statement + Shift Ledger */}
          <div className="lg:col-span-8 space-y-12">
            <RevealOnScroll>
              <blockquote className="font-display text-3xl sm:text-5xl font-bold leading-[1.1] tracking-[-0.03em] text-slate-100">
                <WordStage
                  text="We build intelligent digital systems for organisations ready to turn their online presence into their most powerful sales asset — translating digital ambition into measurable business outcomes."
                  accentWords={['intelligent', 'digital', 'systems', 'measurable', 'outcomes.']}
                />
              </blockquote>
            </RevealOnScroll>

            {/* 3-Row Architectural Shift Ledger */}
            <div className="space-y-4">
              {MANIFESTO_SHIFTS.map((item, idx) => (
                <RevealOnScroll key={item.axis} delayMs={idx * 90}>
                  <div className="rounded-bento border border-slate-800/80 bg-[#060911]/90 p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center hover:border-[#38BDF8]/40 transition-colors">
                    <div className="md:col-span-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
                        {item.axis}
                      </span>
                    </div>

                    <div className="md:col-span-4 text-xs sm:text-sm text-slate-400 border-l border-slate-800 pl-4">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                        Conventional Approach
                      </div>
                      {item.before}
                    </div>

                    <div className="md:col-span-5 text-xs sm:text-sm text-slate-100 font-medium border-l-2 border-[#2563EB] pl-4 bg-[#0B101E]/90 py-3 pr-3 rounded-r-xl">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] mb-1 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Ladder7 Revenue Architecture</span>
                      </div>
                      {item.after}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

