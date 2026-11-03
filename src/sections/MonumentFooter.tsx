import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { BRAND_ASSETS, CONTACT_DIRECTORY, PRODUCTS_DECK } from '../content/siteCatalog';

export const MonumentFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#04070D] text-slate-300 border-t border-slate-800/80 overflow-hidden">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-10">
        {/* Final CTA Band */}
        <div className="rounded-bento border border-slate-800/90 bg-gradient-to-r from-[#0B101E] via-[#10182B] to-[#0B101E] p-6 sm:p-10 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
              Ready to take the right next step?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Transform your digital presence into an autonomous revenue system.
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${CONTACT_DIRECTORY.email}`}
              className="rounded-pill bg-[#0056B2] hover:bg-[#2563EB] text-white font-semibold text-xs sm:text-sm px-6 py-3.5 inline-flex items-center gap-2 shadow-brand-glow transition-colors"
            >
              <span>Email {CONTACT_DIRECTORY.email}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#hero"
              aria-label="Scroll back to top"
              className="h-11 w-11 rounded-full border border-slate-700 hover:border-[#38BDF8] bg-[#060911] text-slate-200 flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Organized 5-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          {/* Brand Logo & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#hero" className="inline-block">
              <img
                src={BRAND_ASSETS.logoWhite}
                alt="Ladder7 NextStep Solutions"
                width={176}
                height={70}
                loading="lazy"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Ladder7 NextStep Solutions architects composable web experiences, Applied AI automation, proprietary diagnostic products, and enterprise technology strategies across global markets.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {CONTACT_DIRECTORY.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ladder7 on ${soc.name}`}
                  className="px-3.5 py-2 rounded-pill border border-slate-800 bg-[#0B101E] hover:border-[#38BDF8] hover:text-white text-xs font-mono text-slate-300 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{soc.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
              Services &amp; Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Digital Experience &amp; Web Engineering
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  AI &amp; Intelligent Automation
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Strategy &amp; Technology Consulting
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Custom Software &amp; Billing Engines
                </a>
              </li>
              <li>
                <a href="#who-we-are" className="hover:text-white transition-colors">
                  Corporate Cloud &amp; DevOps Bootcamps
                </a>
              </li>
            </ul>
          </div>

          {/* Products & Company Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
              Products &amp; Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {PRODUCTS_DECK.map((prod) => (
                <li key={prod.id}>
                  <a href="#products" className="hover:text-white transition-colors">
                    {prod.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  How We Build
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Locations & Contact Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
              Our Locations &amp; Contact
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              {CONTACT_DIRECTORY.locations.map((loc) => (
                <div key={loc.city}>
                  <div className="font-semibold text-white">{loc.city}</div>
                  <div className="text-slate-400">{loc.hubName}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-1.5 font-mono text-xs">
              <div>
                <a
                  href={CONTACT_DIRECTORY.phoneHref}
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  {CONTACT_DIRECTORY.phoneDisplay}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${CONTACT_DIRECTORY.email}`}
                  className="text-[#38BDF8] hover:underline"
                >
                  {CONTACT_DIRECTORY.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized Editorial Brand Wordmark */}
        <div
          aria-hidden="true"
          className="py-8 sm:py-10 text-center select-none overflow-hidden"
        >
          <div className="font-display text-[17vw] sm:text-[15vw] lg:text-[185px] font-bold leading-[0.84] tracking-[-0.06em] bg-gradient-to-b from-slate-700/35 via-slate-800/20 to-transparent bg-clip-text text-transparent">
            LADDER7
          </div>
        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Ladder7 NextStep Solutions. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#contact" className="hover:text-[#38BDF8] transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-[#38BDF8] transition-colors">
              Terms of Engagement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

