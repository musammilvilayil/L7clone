import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { FAQ_DRAWER_ITEMS, FACTUAL_COMPANY_DATA } from '../catalog/freshContent';
import { ScrollReveal } from '../motion/ScrollReveal';

export const FaqSplitDrawer: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_DRAWER_ITEMS[0].id);

  return (
    <section
      id="faq"
      className="relative py-12 sm:py-16 lg:py-20 min-h-[100svh] lg:min-h-screen flex flex-col justify-center bg-[#08090C] overflow-hidden"
    >
      {/* Top and Bottom Seamless Gradient Fades (Zero Harsh Cuts) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#08090C] to-transparent z-[2]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#08090C] to-transparent z-[2]"
      />
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Open Left Prompt (Removed Extra Callout Card Box) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <p className="text-sm font-medium text-[#3B82F6]">FAQ</p>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[#F4F5F8] leading-[1.05]">
              Common questions about our work and products.
            </h2>

            <p className="text-sm sm:text-base text-[#A3AAB8] leading-relaxed">
              Answers about our services, how we work with enterprise and startup teams, data privacy, and product integrations.
            </p>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="font-display text-base font-bold text-[#F4F5F8]">
                Have another question?
              </div>
              <p className="text-xs sm:text-sm text-[#A3AAB8]">
                Reach out to our team in Cochin or Trivandrum by email or WhatsApp.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs font-bold">
                <a
                  href={`mailto:${FACTUAL_COMPANY_DATA.email}`}
                  className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-[#93C5FD] transition-colors"
                >
                  <span>Email {FACTUAL_COMPANY_DATA.email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={FACTUAL_COMPANY_DATA.whatsappUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#F4F5F8] hover:text-[#3B82F6] transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 4 Interactive FAQ Accordion Rows */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {FAQ_DRAWER_ITEMS.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <ScrollReveal key={faq.id} delay={idx * 60}>
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="group w-full py-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-[#3B82F6]">
                          {faq.category}
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F5F8] group-hover:text-[#3B82F6] transition-colors">
                          {faq.question}
                        </h3>
                      </div>

                      <span className="text-[#3B82F6] shrink-0 mt-1 transition-transform duration-200 group-hover:scale-110">
                        {isOpen ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-5 text-sm sm:text-base text-[#A3AAB8] leading-relaxed">
                          {faq.response}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
