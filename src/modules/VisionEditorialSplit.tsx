import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { ScrollReveal } from '../motion/ScrollReveal';
import CipherReveal from '../components/CipherReveal';
import RingField from '../components/RingField';

const FOCUS_AREAS = [
  {
    title: 'Websites & Digital Platforms',
    problem: 'Slow brochure websites that are hard to update and do not bring in qualified leads.',
    approach: 'Fast React, Next.js, and Adobe Experience Manager websites built around clear user journeys.',
  },
  {
    title: 'AI & Workflow Automation',
    problem: 'Generic chat widgets that frustrate visitors and put internal company data at risk.',
    approach: 'Private internal knowledge search and automated workflows connected to your CRM.',
  },
  {
    title: 'Actionable Website & Product Analytics',
    problem: 'Static audit spreadsheets and scattered reports that never turn into engineering fixes.',
    approach: 'L7 Insights dashboards and L7 Nexus workflows that push prioritized tasks directly to your teams.',
  },
];

export const VisionEditorialSplit: React.FC = () => {
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
      id="vision"
      aria-label="About Ladder7 Vision & Architecture"
      className="relative py-12 sm:py-16 lg:py-20 min-h-[100svh] lg:h-screen lg:max-h-[960px] flex flex-col justify-center bg-[#08090C] overflow-hidden"
    >
      {/* 1. React Bits Pro Ring Field 3D WebGL Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-auto z-0 overflow-hidden opacity-55"
      >
        <RingField
          colors={['#059669', '#34D399']}
          backgroundColor="#08090C"
          rings={7}
          particles={28000}
          dust={0.35}
          flow="outward"
          flowSpeed={reducedMotion ? 0 : 0.45}
          turbulence={0.65}
          morphSpeed={reducedMotion ? 0 : 0.5}
          tilt={20}
          aspect={1.2}
          scale={1.15}
          glow={0.5}
          intensity={1.1}
          interactive={!reducedMotion}
          push={1.0}
          pulse={1.0}
          className="w-full h-full"
        />
      </div>

      {/* 2. Seamless Section Transition Fades (Zero Harsh Cuts) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#08090C] to-transparent z-[2]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#08090C] to-transparent z-[2]"
      />

      {/* 3. Architectural Vignette / Scrim for WCAG AAA Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_90%_at_50%_35%,rgba(8,9,12,0.72)_0%,#08090C_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#08090C] via-transparent to-[#08090C]"
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[#0B0D13]/80 backdrop-blur-md text-xs font-medium text-[#34D399] shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              About Ladder7
            </div>

            <div>
              <CipherReveal
                as="h2"
                text="Practical software that connects your website, team workflows, and analytics."
                className="font-display text-2xl sm:text-3xl font-bold text-[#F4F5F8] leading-snug"
                scrambleColor="#34D399"
                scrambleOpacity={0.55}
                trigger="view"
                order="left"
                from="blank"
                duration={1.2}
                scramble={0.35}
                rate={16}
                hover="trail"
              />
            </div>

            <p className="text-sm sm:text-base text-[#A3AAB8] leading-relaxed">
              Ladder7 Nextstep Solutions builds web platforms, AI tools, and custom software that work together so your marketing, sales, and support teams stay aligned.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-10 lg:space-y-12">
            <ScrollReveal>
              <div>
                <CipherReveal
                  as="p"
                  text="When your website, customer support tools, and analytics share the same data, visitors get faster answers and your team spends less time on manual work."
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.02em] text-[#F4F5F8]"
                  scrambleColor="#34D399"
                  scrambleOpacity={0.55}
                  trigger="view"
                  order="left"
                  from="scrambled"
                  duration={1.4}
                  scramble={0.4}
                  rate={16}
                  hover="trail"
                />
              </div>
            </ScrollReveal>

            {/* Open 3-Column Pillars with Top Dividers Only (Zero Card Boxes) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {FOCUS_AREAS.map((item, idx) => (
                <ScrollReveal key={item.title} delay={idx * 80}>
                  <div className="group border-t border-white/15 hover:border-[#34D399] pt-6 flex flex-col justify-between h-full space-y-5 transition-all duration-300 hover:-translate-y-0.5">
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#F4F5F8] group-hover:text-[#34D399] transition-colors">
                        {item.title}
                      </h3>

                      <div className="mt-3 text-xs sm:text-sm text-[#7D8597] leading-relaxed">
                        <span className="text-xs font-semibold block mb-1 text-[#A3AAB8]">
                          Common challenge
                        </span>
                        {item.problem}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-[#F4F5F8] leading-relaxed">
                      <span className="text-xs text-[#34D399] font-semibold flex items-center gap-1.5 mb-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Our approach
                      </span>
                      {item.approach}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionEditorialSplit;
