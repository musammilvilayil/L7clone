import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BENTO_SERVICES } from '../catalog/freshContent';
import type { BriefPreset } from '../design-system/tokens';
import { ScrollReveal } from '../motion/ScrollReveal';
import DitherWave from '../components/DitherWave';
import BlobButton from '../components/BlobButton';

interface ServicesBentoGridProps {
  onApplyPreset: (preset: BriefPreset) => void;
}

export const ServicesBentoGrid: React.FC<ServicesBentoGridProps> = ({
  onApplyPreset,
}) => {
  return (
    <section
      id="services"
      aria-label="Ladder7 Engineering & AI Services"
      className="relative py-12 sm:py-16 lg:py-20 min-h-[100svh] lg:min-h-screen flex flex-col justify-center bg-[#08090C] overflow-hidden"
    >
      {/* 1. React Bits Pro Dither Wave 3D WebGL Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-auto z-0 overflow-hidden opacity-45"
      >
        <DitherWave
          primaryColor="#064e3b"
          secondaryColor="#34d399"
          tertiaryColor="#BEF264"
          speed={0.65}
          intensity={1.15}
          opacity={0.6}
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

      {/* 3. Radial Vignette for Content Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_90%_at_50%_40%,rgba(8,9,12,0.72)_0%,#08090C_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#34D399]">
              Services
            </p>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F8] leading-[1.12]">
              Websites, AI automation, consulting, and custom software.
            </h2>
          </div>

          <BlobButton
            variant="primary"
            size="sm"
            href="#contact"
            onClick={() =>
              onApplyPreset({
                serviceTrack: 'Websites, Headless CMS & Enterprise AEM',
                contextLine: 'Discussing Ladder7 engineering and consulting services.',
              })
            }
            className="self-start md:self-auto"
          >
            <span>Discuss a Project</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </BlobButton>
        </div>

        {/* Open Services Grid (Zero Card Boxes, Pure Architectural Dividers) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {BENTO_SERVICES.map((service, idx) => {
            const isFilledPanel = service.colSpan === 'span-8';
            const spanClass = isFilledPanel ? 'lg:col-span-8' : 'lg:col-span-4';

            return (
              <ScrollReveal key={service.id} delay={idx * 80} className={spanClass}>
                <div className="group h-full border-t border-white/15 hover:border-[#34D399] pt-7 pb-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5">
                  <div className="relative z-10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#BEF264]">
                      {service.category}
                    </span>

                    <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-[#F4F5F8] group-hover:text-[#34D399] transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-[#A3AAB8] leading-relaxed max-w-2xl">
                      {service.editorialBody}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <p className="text-xs text-[#D5DAE5] leading-relaxed">
                      {service.capabilities.join(' · ')}
                    </p>

                    <a
                      href="#contact"
                      onClick={() =>
                        onApplyPreset({
                          serviceTrack: service.title,
                          contextLine: `Project inquiry for ${service.title}.`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#34D399] hover:text-[#BEF264] shrink-0 transition-colors"
                    >
                      <span>Ask About This</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesBentoGrid;
