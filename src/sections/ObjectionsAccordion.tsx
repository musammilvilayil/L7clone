import React, { useState } from 'react';
import { Plus, Minus, MessageCircleQuestion, ArrowUpRight } from 'lucide-react';
import { OBJECTION_FAQS, CONTACT_DIRECTORY } from '../content/siteCatalog';
import { RevealOnScroll } from '../primitives/RevealOnScroll';

export const ObjectionsAccordion: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(OBJECTION_FAQS[0].id);

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 bg-[#090E1B] border-t border-slate-800/80"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Sticky Context Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#0B101E] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              <span>07 // Common Questions</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-100 leading-[1.06]">
              Clarity before commitment.
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Answers to key questions regarding our services, client fit across startups and enterprises, AI security standards, and proprietary product integrations.
            </p>

            <div className="rounded-bento border border-slate-800/80 bg-[#060911]/90 p-6 space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
                Have a custom technical question?
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Speak directly with our solutions architects in Cochin or Trivandrum via email or WhatsApp.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`mailto:${CONTACT_DIRECTORY.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0056B2] hover:bg-[#2563EB] px-4 py-2 rounded-pill transition-colors"
                >
                  <span>Email {CONTACT_DIRECTORY.email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={CONTACT_DIRECTORY.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 border border-slate-700 hover:border-[#38BDF8] px-4 py-2 rounded-pill transition-colors"
                >
                  <span>WhatsApp Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Disclosure Drawers */}
          <div className="lg:col-span-7 space-y-4">
            {OBJECTION_FAQS.map((faq, idx) => {
              const isOpen = expandedId === faq.id;
              return (
                <RevealOnScroll key={faq.id} delayMs={idx * 75}>
                  <div
                    className={`rounded-bento border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#38BDF8]/50 bg-[#0B101E] shadow-[0_16px_40px_rgba(2,6,23,0.7)]'
                        : 'border-slate-800/80 bg-[#060911]/80 hover:border-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5 font-mono text-xs text-[#38BDF8]">
                          <span>{faq.id}</span>
                          <span>•</span>
                          <span>{faq.tag}</span>
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-100">
                          {faq.question}
                        </h3>
                      </div>

                      <span
                        className={`h-9 w-9 rounded-full border flex items-center justify-center shrink-0 transition-colors mt-1 ${
                          isOpen
                            ? 'border-[#38BDF8] bg-[#0056B2] text-white'
                            : 'border-slate-700 bg-[#0B101E] text-slate-300'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
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
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-slate-800/70 text-sm sm:text-base text-slate-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
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

