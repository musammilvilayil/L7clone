import React from 'react';
import { CAPABILITIES } from '../data/capabilitiesData';

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 relative overflow-hidden bg-white dark:bg-[#0f1923]">
      {/* Background ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: 'rgb(0, 86, 178)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: 'rgb(124, 58, 237)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Strategic Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Our four core pillars of excellence designed to future-proof your digital operations.
            </p>
          </div>
          <a
            href="#capabilities"
            className="font-bold flex items-center gap-2 hover:underline text-[#0056b2] dark:text-blue-400"
          >
            <span>View Full Service Catalog</span>
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              open_in_new
            </span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="group relative rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer bg-white border border-slate-100 dark:bg-white/[0.04] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden"
            >
              {/* Bottom Glow Bar */}
              <div
                className="absolute bottom-0 inset-x-0 h-1.5 group-hover:h-2.5 rounded-b-2xl opacity-85 transition-all duration-300"
                style={{ background: cap.glowBarColor }}
              />
              {/* Glow Bloom */}
              <div
                className="absolute -bottom-8 inset-x-8 h-14 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-400 pointer-events-none"
                style={{ background: cap.glowBloomColor }}
              />

              {/* Icon Badge */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 bg-slate-50 border border-slate-200 dark:bg-white/[0.06] dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="material-symbols-outlined text-3xl" style={{ color: 'rgb(0, 86, 178)' }}>
                  {cap.icon}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold mb-4 relative z-10 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 min-h-[56px] flex items-center justify-center">
                {cap.title}
              </h4>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6 relative z-10 text-slate-600 dark:text-slate-300">
                {cap.description}
              </p>

              {/* Capability Tags */}
              <div className="flex flex-wrap justify-center gap-2 relative z-10 mt-auto">
                {cap.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-100 border border-slate-200 text-slate-600 dark:bg-white/[0.05] dark:border-white/[0.08] dark:text-slate-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
