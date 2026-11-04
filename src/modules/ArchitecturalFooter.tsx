import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import {
  KEPT_MEDIA_ASSETS,
  FACTUAL_COMPANY_DATA,
  PRODUCT_RAIL_ITEMS,
} from '../catalog/freshContent';
import BlobButton from '../components/BlobButton';

export const ArchitecturalFooter: React.FC = () => {
  return (
    <footer
      id="contact"
      className="relative bg-[#08090C] text-[#A3AAB8] overflow-hidden"
    >
      {/* Top Seamless Gradient Fade (Zero Harsh Cuts) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#08090C] to-transparent z-[2]"
      />
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-10">
        {/* Single Container in Footer: Final CTA Band */}
        <div className="rounded-2xl border border-white/10 bg-[#0F1117] p-6 sm:p-10 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm font-medium text-[#3B82F6]">
              Start a conversation
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F5F8]">
              Work with Ladder7 on your next website, custom software, or AI project.
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <BlobButton
              variant="solid"
              size="md"
              href={`mailto:${FACTUAL_COMPANY_DATA.email}`}
              className="rounded-full"
            >
              <span>Email {FACTUAL_COMPANY_DATA.email}</span>
              <ArrowUpRight className="w-4 h-4" />
            </BlobButton>
            <a
              href="#hook"
              aria-label="Back to top"
              className="h-11 w-11 rounded-full border border-white/15 hover:border-[#3B82F6] bg-[#08090C] text-[#F4F5F8] flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Open Link Columns & Socials (Zero Card Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/[0.08]">
          <div className="lg:col-span-4 space-y-6">
            <a href="#hook" className="inline-block">
              <img
                src={KEPT_MEDIA_ASSETS.logoBlackHighRes}
                alt="Ladder7 Nextstep Solutions logo"
                width={176}
                height={72}
                loading="lazy"
                className="h-12 sm:h-14 w-auto object-contain logo-dark-invert"
              />
            </a>

            <p className="text-xs sm:text-sm text-[#A3AAB8] leading-relaxed max-w-sm">
              Ladder7 Nextstep Solutions LLP builds websites, Adobe Experience Manager (AEM) platforms, AI workflow automation, in-house software products, and corporate cloud training programs.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              {FACTUAL_COMPANY_DATA.socialProfiles.map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ladder7 on ${soc.platform}`}
                  className="text-xs font-semibold text-[#F4F5F8] hover:text-[#3B82F6] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{soc.platform}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#3B82F6]" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-[#F4F5F8]">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-[#F4F5F8] transition-colors">
                  Websites &amp; Enterprise AEM
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4F5F8] transition-colors">
                  AI Chatbots &amp; Automation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4F5F8] transition-colors">
                  Consulting &amp; Project Recovery
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4F5F8] transition-colors">
                  Custom Software &amp; Billing Tools
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4F5F8] transition-colors">
                  Corporate Cloud &amp; DevOps Training
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-[#F4F5F8]">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {PRODUCT_RAIL_ITEMS.map((prod) => (
                <li key={prod.id}>
                  <a href="#proof" className="hover:text-[#F4F5F8] transition-colors">
                    {prod.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#methodology" className="hover:text-[#F4F5F8] transition-colors">
                  How we work
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F4F5F8] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-sm font-semibold text-[#F4F5F8]">
              Offices
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              {FACTUAL_COMPANY_DATA.offices.map((off) => (
                <div key={off.city}>
                  <div className="font-semibold text-[#F4F5F8]">{off.city}</div>
                  <div className="text-[#A3AAB8]">{off.venue}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-1.5 text-xs font-medium">
              <div>
                <a
                  href={FACTUAL_COMPANY_DATA.phoneUri}
                  className="text-[#F4F5F8] hover:text-[#3B82F6] transition-colors"
                >
                  {FACTUAL_COMPANY_DATA.phoneFormatted}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${FACTUAL_COMPANY_DATA.email}`}
                  className="text-[#93C5FD] hover:underline"
                >
                  {FACTUAL_COMPANY_DATA.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized Wordmark With Bottom Gradient Fade Blend */}
        <div
          aria-hidden="true"
          className="py-8 sm:py-10 text-center select-none overflow-hidden"
        >
          <div className="font-display text-[17vw] sm:text-[15vw] lg:text-[185px] font-extrabold leading-[0.84] tracking-[-0.05em] bg-gradient-to-b from-white/15 via-white/[0.05] to-transparent bg-clip-text text-transparent">
            LADDER7
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D8597]">
          <p>© {new Date().getFullYear()} {FACTUAL_COMPANY_DATA.legalEntity}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#contact" className="hover:text-[#3B82F6] transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-[#3B82F6] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
