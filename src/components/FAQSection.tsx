import React, { useState } from 'react';
import { FAQS } from '../data/faqData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('01');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0f1923] relative overflow-hidden border-t border-slate-200/60 dark:border-white/5">
      {/* Background Ambient Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-72 h-72 rounded-full blur-[100px] opacity-[0.06]"
          style={{ backgroundColor: 'rgb(0, 86, 178)' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full blur-[100px] opacity-[0.06]"
          style={{ backgroundColor: 'rgb(124, 58, 237)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            FAQ
          </h2>
          <div
            className="mt-2 sm:mt-3 h-1 w-12 sm:w-16 mx-auto rounded-full"
            style={{ background: 'linear-gradient(to right, rgb(0, 86, 178), rgb(124, 58, 237))' }}
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item rounded-xl cursor-pointer ${isOpen ? 'faq-open' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="faq-number flex-shrink-0">{faq.id}</span>
                  <span className="faq-question flex-1 font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span
                    className={`faq-icon flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center material-symbols-outlined text-slate-600 dark:text-slate-400 text-xl ${
                      isOpen ? 'faq-icon-open' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                <div className={`faq-answer ${isOpen ? 'faq-answer-open' : ''}`}>
                  <div className="faq-answer-inner">
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 pl-10 sm:pl-16 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 sm:pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
