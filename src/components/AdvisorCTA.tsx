import React from 'react';

export const AdvisorCTA: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0f1923]">
      <div
        className="max-w-5xl mx-auto rounded-3xl px-8 py-16 text-center relative overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'rgb(0, 86, 178)' }}
      >
        {/* Diagonal Stripe Background Texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgb(255, 255, 255) 0px, rgb(255, 255, 255) 1px, transparent 0px, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Your Website Should Be Generating Revenue Right Now.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Partner with Ladder7 to build an intelligent, connected, and scalable digital revenue system — engineered for your markets, your goals, and your growth.
          </p>

          <a
            href="mailto:info@ladder7.in"
            className="group relative bg-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2 sm:gap-3 mx-auto overflow-hidden hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20 text-[#0056b2]"
          >
            {/* Shimmer Light Bar */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none" />
            <span className="relative z-10">Start Your Revenue Engine Today</span>
            <span className="material-symbols-outlined relative z-10 transition-all duration-300 group-hover:translate-x-1">
              chevron_right
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
