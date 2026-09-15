import React from 'react';

export const WhyLadder7: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 100% 0%, rgb(0, 86, 178) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 px-2">
          Why Innovators Partner With Ladder7
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
          {/* Card 1 */}
          <div className="text-center max-w-sm">
            <div
              className="size-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(0, 86, 178, 0.2)' }}
            >
              <span className="material-symbols-outlined text-3xl" style={{ color: 'rgb(245, 245, 245)' }}>
                balance
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Revenue-First, Always</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We do not build technology for technology's sake. Every platform, AI system, and integration we deliver is tied to a clear business outcome — more leads, lower acquisition costs, faster market entry, or higher conversion rates.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center max-w-sm">
            <div
              className="size-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(0, 86, 178, 0.2)' }}
            >
              <span className="material-symbols-outlined text-3xl" style={{ color: 'rgb(245, 245, 245)' }}>
                security
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Global Delivery, Local Intelligence</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We are an active delivery partner across India, UAE, Saudi Arabia, Singapore, the UK, and North America. Our work is informed by the specific cultural, linguistic, and compliance requirements of each market — not applied generically.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center max-w-sm">
            <div
              className="size-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(0, 86, 178, 0.2)' }}
            >
              <span className="material-symbols-outlined text-3xl" style={{ color: 'rgb(245, 245, 245)' }}>
                query_stats
              </span>
            </div>
            <h3 className="text-xl font-bold mb-4">Security and Compliance Built In</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every website, AI model, and data integration we build is privacy-first by design — aligned with GDPR, India's DPDP Act, UAE AI Policy, and Singapore's PDPA — so your business is protected in every market you operate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
