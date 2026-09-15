import React from 'react';

interface AudienceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const AUDIENCES: AudienceItem[] = [
  {
    id: 'established-brands',
    icon: 'domain',
    title: 'For Established Brands & Scaling Businesses',
    description:
      'We deliver robust, high-performance digital platforms with AI-powered personalisation, CRM integration, and analytics engineered for reliability, security, and global market reach across India, the Middle East, and Southeast Asia.',
  },
  {
    id: 'startups-smbs',
    icon: 'rocket_launch',
    title: 'For Fast-Growing Startups & SMBs',
    description:
      'We give ambitious businesses the same intelligent web systems, AI chatbots, and automated lead pipelines that larger organisations rely on so you convert more visitors, respond faster, and compete without limits.',
  },
];

export const JourneySection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
          Every Business. Every Market. One Goal — Revenue.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          We build intelligent digital systems for organisations ready to turn their online presence into their most powerful sales asset. At Ladder7 Nextstep Solutions, we believe every business — regardless of size — deserves a digital presence that actively generates revenue. We act as the strategic delivery partner for growth-focused organisations, translating digital ambition into measurable business outcomes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {AUDIENCES.map((item) => (
          <div
            key={item.id}
            className="glass-card group relative p-8 sm:p-10 rounded-2xl flex flex-col justify-between border-l-4 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            style={{ borderLeftColor: 'rgb(0, 86, 178)' }}
          >
            {/* Top animated line */}
            <div
              className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
              style={{ backgroundColor: 'rgb(0, 86, 178)' }}
            />
            {/* Ambient blur circle */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
              style={{ backgroundColor: 'rgb(0, 86, 178)' }}
            />
            {/* Bottom animated line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out delay-100"
              style={{ backgroundColor: 'rgb(0, 86, 178)' }}
            />

            <div>
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 86, 178, 0.133), rgba(0, 86, 178, 0.267))',
                  border: '1px solid rgba(0, 86, 178, 0.267)',
                  boxShadow: 'rgba(0, 86, 178, 0.133) 0px 4px 16px',
                }}
              >
                <span className="material-symbols-outlined text-3xl" style={{ color: 'rgb(0, 86, 178)' }}>
                  {item.icon}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-[#0056b2] dark:group-hover:text-blue-400">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-base leading-relaxed transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
