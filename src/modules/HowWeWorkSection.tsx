import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { EXECUTION_METHOD_STAGES } from '../catalog/freshContent';
import { ScrollReveal } from '../motion/ScrollReveal';
import BinaryOrbits from '../components/BinaryOrbits';

export const HowWeWorkSection: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="methodology"
      aria-label="How Ladder7 Works Methodology"
      className="relative py-12 sm:py-16 lg:py-20 min-h-[100svh] lg:min-h-screen flex flex-col justify-center bg-[#08090C] overflow-hidden"
    >
      {/* 1. React Bits Pro Binary Orbits 3D WebGL Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-auto z-0 overflow-hidden opacity-60"
      >
        <BinaryOrbits
          colors={['#059669', '#34D399']}
          backgroundColor="#08090C"
          stars={32000}
          tilt={-26}
          roll={20}
          speed={reducedMotion ? 0 : 0.75}
          twist={0.85}
          armStrength={0.65}
          dust={0.35}
          glow={0.5}
          intensity={1.15}
          interactive={!reducedMotion}
          hoverWake={true}
          clickRipple={true}
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

      {/* 3. Radial & Gradient Scrim for WCAG AAA Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_90%_at_50%_50%,rgba(8,9,12,0.72)_0%,#08090C_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#08090C] via-transparent to-[#08090C]"
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-end mb-10 sm:mb-14 lg:mb-16">
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#34D399]">
              How we work
            </p>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F8] leading-[1.12]">
              Four clear steps from initial audit to launch and team handover.
            </h2>
          </div>

          <div className="lg:col-span-5 text-xs sm:text-sm md:text-base text-[#A3AAB8] leading-relaxed">
            Every project follows a clear sequence so your team always knows what is being planned, built, tested, and handed over.
          </div>
        </div>

        {/* 4-Step Process: Responsive Connected Timeline on Mobile, Open 4-Column on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-8 lg:gap-10">
          {EXECUTION_METHOD_STAGES.map((stage, idx) => (
            <ScrollReveal key={stage.number} delay={idx * 80}>
              <div className="group relative pl-7 sm:pl-0 border-l sm:border-l-0 sm:border-t border-white/15 hover:border-[#34D399] pb-8 sm:pb-0 pt-0 sm:pt-7 h-full flex flex-col justify-between transition-all duration-300 sm:hover:-translate-y-0.5 last:border-l-transparent sm:last:border-l-0">
                {/* Mobile Glowing Timeline Node */}
                <span
                  aria-hidden="true"
                  className="sm:hidden absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#34D399] ring-4 ring-[#08090C] group-hover:scale-125 transition-transform"
                />

                {/* Top Block: Number, Phase Badge, Headline & Summary */}
                <div className="flex-1 flex flex-col justify-start mb-6">
                  <div className="flex items-baseline justify-between gap-2 mb-3 sm:mb-4">
                    <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#34D399] tracking-tight">
                      {stage.number}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#BEF264] px-2 py-0.5 rounded border border-[#BEF264]/20 bg-[#BEF264]/5">
                      {stage.phase}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-[#F4F5F8] leading-snug group-hover:text-[#34D399] transition-colors">
                    {stage.headline}
                  </h3>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#A3AAB8] leading-relaxed">
                    {stage.summary}
                  </p>
                </div>

                {/* Bottom Block: Deliverables List & Outcome Result */}
                <div className="pt-4 sm:pt-5 border-t border-white/10 space-y-3">
                  <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#A3AAB8]">
                    Deliverables
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5 min-h-[90px] sm:min-h-[110px]">
                    {stage.deliverables.map((deliv) => (
                      <li
                        key={deliv}
                        className="flex items-start gap-2 sm:gap-2.5 text-xs text-[#E2E6EF]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{deliv}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-3 border-t border-white/[0.08] text-xs text-[#A3AAB8] leading-relaxed">
                    <span className="text-[#BEF264] font-semibold mr-1.5 uppercase text-[10px] tracking-wider">
                      Result:
                    </span>
                    <span className="text-[#F4F5F8] font-medium">{stage.outcome}</span>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;