import React from 'react';
import { CheckCircle2, Workflow } from 'lucide-react';
import { BUILD_PROCESS_STAGES } from '../content/siteCatalog';
import { RevealOnScroll } from '../primitives/RevealOnScroll';

export const ProcessTimeline: React.FC = () => {
  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 bg-[#090E1B] border-y border-slate-800/80 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
            <Workflow className="w-3.5 h-3.5" />
            <span>05 // How We Build — Execution Model</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-100 leading-[1.06]">
            From forensic audit to 24/7 autonomous growth.
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every engagement follows a disciplined four-stage delivery protocol connecting commercial strategy, composable engineering, and AI automation.
          </p>
        </div>

        {/* Vertical Illuminated Spine with Alternating Staggered Cards */}
        <div className="relative">
          {/* Center Spine on Desktop / Left Spine on Mobile */}
          <div
            aria-hidden="true"
            className="absolute left-5 lg:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#38BDF8] via-[#2563EB] to-slate-800"
          />

          <div className="space-y-10 lg:space-y-14">
            {BUILD_PROCESS_STAGES.map((stage, index) => {
              const isEven = index % 2 === 0;
              return (
                <RevealOnScroll key={stage.stepNumber} delayMs={index * 95}>
                  <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10 pl-14 lg:pl-0">
                    {/* Illuminated Node on the Spine */}
                    <div
                      aria-hidden="true"
                      className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-6 lg:top-1/2 lg:-translate-y-1/2 h-10 w-10 rounded-full border-2 border-[#38BDF8] bg-[#060911] shadow-[0_0_24px_rgba(56,189,248,0.5)] flex items-center justify-center font-mono text-xs font-bold text-[#38BDF8] z-10"
                    >
                      {stage.stepNumber}
                    </div>

                    {/* Left Slot (Populated on even steps on desktop) */}
                    <div
                      className={`lg:col-span-5 ${
                        isEven
                          ? 'lg:col-start-1 lg:text-right'
                          : 'lg:col-start-8 lg:row-start-1'
                      }`}
                    >
                      <div className="rounded-bento border border-slate-800/90 bg-[#060911]/95 p-6 sm:p-8 shadow-bento-card hover:border-[#38BDF8]/45 transition-colors text-left">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
                            STAGE {stage.stepNumber} // {stage.phaseTag}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-pill bg-[#0056B2]/25 border border-[#38BDF8]/30 font-mono text-[10px] text-slate-200">
                            {stage.gateMetric}
                          </span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                          {stage.title}
                        </h3>

                        <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {stage.narrative}
                        </p>

                        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                          {stage.outputs.map((out) => (
                            <span
                              key={out}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B101E] border border-slate-800 text-[11px] font-mono text-slate-300"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#38BDF8]" />
                              <span>{out}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Opposite Side Metadata Callout on Desktop */}
                    <div
                      className={`hidden lg:flex lg:col-span-5 flex-col ${
                        isEven
                          ? 'lg:col-start-8 items-start pl-4'
                          : 'lg:col-start-1 lg:row-start-1 items-end pr-4 text-right'
                      }`}
                    >
                      <span className="font-display text-6xl font-bold text-slate-800/60 select-none">
                        /{stage.stepNumber}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-slate-400 mt-1">
                        {stage.phaseTag}
                      </span>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

