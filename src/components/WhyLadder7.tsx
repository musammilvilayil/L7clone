import React from 'react';

interface ValuePillar {
  icon: string;
  title: string;
  description: string;
}

const VALUE_PILLARS: ValuePillar[] = [
  {
    icon: 'balance',
    title: 'Revenue-First, Always',
    description:
      "We do not build technology for technology's sake. Every platform, AI system, and integration we deliver is tied to a clear business outcome — more leads, lower acquisition costs, faster market entry, or higher conversion rates.",
  },
  {
    icon: 'security',
    title: 'Global Delivery, Local Intelligence',
    description:
      'We are an active delivery partner across India, UAE, Saudi Arabia, Singapore, the UK, and North America. Our work is informed by the specific cultural, linguistic, and compliance requirements of each market — not applied generically.',
  },
  {
    icon: 'query_stats',
    title: 'Security and Compliance Built In',
    description:
      "Every website, AI model, and data integration we build is privacy-first by design — aligned with GDPR, India's DPDP Act, UAE AI Policy, and Singapore's PDPA — so your business is protected in every market you operate.",
  },
];

export const WhyLadder7: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
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
          {VALUE_PILLARS.map((pillar) => (
            <div key={pillar.title} className="text-center max-w-sm">
              <div
                className="size-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(0, 86, 178, 0.2)' }}
              >
                <span className="material-symbols-outlined text-3xl" style={{ color: 'rgb(245, 245, 245)' }}>
                  {pillar.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
