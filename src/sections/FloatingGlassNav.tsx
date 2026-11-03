import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { BRAND_ASSETS, CONTACT_DIRECTORY } from '../content/siteCatalog';
import type { InquiryContext } from '../tokens/designTokens';
import { MagneticAction } from '../primitives/MagneticAction';

interface FloatingGlassNavProps {
  onSelectInquiry: (ctx: InquiryContext) => void;
}

const SECTION_LINKS = [
  { id: 'vision', label: 'Vision', href: '#vision' },
  { id: 'who-we-are', label: 'Who We Are', href: '#who-we-are' },
  { id: 'capabilities', label: 'What We Do', href: '#capabilities' },
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'trust', label: 'Why Us', href: '#trust' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

export const FloatingGlassNav: React.FC<FloatingGlassNavProps> = ({
  onSelectInquiry,
}) => {
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');
  const [mobileOverlayOpen, setMobileOverlayOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + 10 && !mobileOverlayOpen) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 8) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOverlayOpen]);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', ...SECTION_LINKS.map((l) => l.id), 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-28% 0px -55% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll and listen for Escape when full-screen mobile menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOverlayOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !mobileOverlayOpen ? '-translate-y-28' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label="Primary site navigation"
          className="mx-auto max-w-[1280px] rounded-pill border border-slate-800/80 bg-[#0B101E]/80 backdrop-blur-xl px-4 sm:px-6 py-2.5 shadow-glass-pill flex items-center justify-between gap-4"
        >
          {/* Unaltered Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 shrink-0 focus:outline-none"
            aria-label="Ladder7 Home"
          >
            <img
              src={BRAND_ASSETS.logoWhite}
              alt="Ladder7 Nextstep Solutions"
              width={136}
              height={56}
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Desktop Scroll-Spy Pill Links */}
          <div className="hidden lg:flex items-center gap-1 rounded-pill bg-[#060911]/70 border border-slate-800/70 p-1">
            {SECTION_LINKS.map((item) => {
              const isCurrent = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`px-3.5 py-1.5 rounded-pill text-xs font-medium transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#0056B2] text-white shadow-[0_0_20px_rgba(37,99,235,0.45)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Single Clear Magnetic CTA + Mobile Trigger */}
          <div className="flex items-center gap-2.5">
            <MagneticAction
              href="#contact"
              onClick={() =>
                onSelectInquiry({
                  topic: 'Digital Experience & AI Revenue Engine',
                  prefillMessage:
                    'We would like to discuss building a connected digital experience / AI revenue system with Ladder7.',
                })
              }
              className="rounded-pill bg-gradient-to-r from-[#0056B2] to-[#2563EB] hover:from-[#2563EB] hover:to-[#38BDF8] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 shadow-brand-glow transition-all duration-300 gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticAction>

            <button
              type="button"
              onClick={() => setMobileOverlayOpen((prev) => !prev)}
              aria-expanded={mobileOverlayOpen}
              aria-label={mobileOverlayOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden h-10 w-10 rounded-full border border-slate-700/80 bg-[#10182B] text-slate-100 flex items-center justify-center hover:border-[#38BDF8] transition-colors"
            >
              {mobileOverlayOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Animated Mobile Menu Overlay */}
      <div
        aria-hidden={!mobileOverlayOpen}
        className={`fixed inset-0 z-40 lg:hidden bg-[#060911]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between px-6 pt-28 pb-10 overflow-y-auto ${
          mobileOverlayOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#38BDF8] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Navigation Directory</span>
          </div>
          {SECTION_LINKS.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileOverlayOpen(false)}
              className="flex items-center justify-between py-3.5 border-b border-slate-800/80 font-display text-2xl sm:text-3xl font-bold text-slate-100 hover:text-[#38BDF8] transition-colors"
            >
              <span className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#38BDF8]">0{idx + 1}</span>
                <span>{item.label}</span>
              </span>
              <ArrowUpRight className="w-5 h-5 text-[#38BDF8]" />
            </a>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4">
          <a
            href="#contact"
            onClick={() => {
              setMobileOverlayOpen(false);
              onSelectInquiry({
                topic: 'Strategic Consultation',
                prefillMessage: 'Requesting a consultation with the Ladder7 engineering team.',
              });
            }}
            className="w-full py-4 rounded-pill bg-gradient-to-r from-[#0056B2] to-[#2563EB] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-brand-glow"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <a href={`mailto:${CONTACT_DIRECTORY.email}`} className="hover:text-[#38BDF8]">
              {CONTACT_DIRECTORY.email}
            </a>
            <a href={CONTACT_DIRECTORY.phoneHref} className="hover:text-[#38BDF8]">
              {CONTACT_DIRECTORY.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

