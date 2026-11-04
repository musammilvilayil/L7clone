import React, { useEffect, useRef, useState } from 'react';
import {
  KEPT_MEDIA_ASSETS,
  BENTO_SERVICES,
} from '../catalog/freshContent';
import type { BriefPreset } from '../design-system/tokens';
import BlobButton from '../components/BlobButton';

interface SiteHeaderProps {
  onApplyPreset: (preset: BriefPreset) => void;
}

const NAV_ITEMS = [
  { id: 'vision', label: 'About', href: '#vision' },
  { id: 'services', label: 'Services', href: '#services', hasDropdown: true },
  { id: 'proof', label: 'Products', href: '#proof' },
  { id: 'methodology', label: 'How we work', href: '#methodology' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

const SERVICE_PLAIN_DESCRIPTIONS: Record<string, string> = {
  'service-composable-dx':
    'Fast React, Next.js, headless CMS, and Adobe Experience Manager websites.',
  'service-applied-ai':
    'Private internal knowledge search, custom chatbots, and automated workflows.',
  'service-cloud-strategy':
    'Solution architecture, cloud setup on AWS, Azure, and GCP, and project recovery.',
  'service-custom-software':
    'Tailored web software, billing tools, and two-way Salesforce or HubSpot sync.',
};

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onApplyPreset }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const servicesContainerRef = useRef<HTMLDivElement | null>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement | null>(null);
  const serviceItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileOverlayRef = useRef<HTMLDivElement | null>(null);
  const wasMobileMenuOpen = useRef(false);
  const suppressFocusOpenRef = useRef(false);

  // Scroll state (40px threshold for solid bar, hide on scroll down / show on scroll up)
  useEffect(() => {
    const updateScrollState = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 40);

      if (currentY <= 40) {
        setIsHidden(false);
      } else if (currentY > lastScrollY.current + 8 && !servicesOpen && !mobileMenuOpen) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - 6) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [servicesOpen, mobileMenuOpen]);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hook', 'vision', 'identity', 'services', 'proof', 'methodology', 'credibility', 'faq', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'hook') {
              setActiveSection('');
            } else if (id === 'identity') {
              setActiveSection('vision');
            } else if (id === 'credibility') {
              setActiveSection('methodology');
            } else {
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Outside click and Escape key handling for Services dropdown & Mobile menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (servicesOpen) {
          suppressFocusOpenRef.current = true;
          setServicesOpen(false);
          servicesTriggerRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      if (
        servicesOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
    };
  }, [servicesOpen, mobileMenuOpen]);

  // Body scroll lock and focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      wasMobileMenuOpen.current = true;
      document.body.style.overflow = 'hidden';
      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
      if (wasMobileMenuOpen.current) {
        wasMobileMenuOpen.current = false;
        menuButtonRef.current?.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Focus trap inside mobile menu overlay
  const handleMobileOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !mobileOverlayRef.current) return;
    const focusables = mobileOverlayRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Keyboard navigation on the Services trigger and items
  const handleServicesTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const next = !servicesOpen;
      setServicesOpen(next);
      if (next) {
        window.requestAnimationFrame(() => {
          serviceItemRefs.current[0]?.focus();
        });
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setServicesOpen(true);
      setActiveServiceIdx(0);
      window.requestAnimationFrame(() => {
        serviceItemRefs.current[0]?.focus();
      });
    }
  };

  const handleServiceItemKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    idx: number
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (idx + 1) % BENTO_SERVICES.length;
      setActiveServiceIdx(nextIdx);
      serviceItemRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (idx - 1 + BENTO_SERVICES.length) % BENTO_SERVICES.length;
      setActiveServiceIdx(prevIdx);
      serviceItemRefs.current[prevIdx]?.focus();
    }
  };

  // Close Services dropdown when keyboard focus leaves the Services container and panel
  const handleServicesBlur = (e: React.FocusEvent<HTMLElement>) => {
    const nextFocused = e.relatedTarget as Node | null;
    if (
      servicesContainerRef.current &&
      nextFocused &&
      servicesContainerRef.current.contains(nextFocused)
    ) {
      return;
    }
    setServicesOpen(false);
  };

  const showSolidBar = isScrolled || servicesOpen || mobileMenuOpen;
  const previewService = BENTO_SERVICES[activeServiceIdx] || BENTO_SERVICES[0];

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setServicesOpen(false)}
        className={`fixed top-0 inset-x-0 z-50 h-16 min-[900px]:h-20 border-b transition-transform duration-[250ms] ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          isHidden && !servicesOpen && !mobileMenuOpen
            ? '-translate-y-full'
            : 'translate-y-0'
        } ${
          showSolidBar
            ? 'bg-[#08090C]/85 backdrop-blur-md border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Skip link first in tab order */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-[6px] focus:bg-[#10B981] focus:text-[#08090C] focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <nav
          aria-label="Main navigation"
          className="mx-auto h-full max-w-[1380px] px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6"
        >
          {/* Left Zone: Light Logo (Clear, prominent branding) */}
          <a
            href="#hook"
            aria-label="Ladder7 Nextstep Solutions home"
            className="inline-flex items-center min-h-[48px] min-w-[48px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-4"
          >
            <img
              src={KEPT_MEDIA_ASSETS.logoWhiteTight}
              alt="Ladder7 Nextstep Solutions"
              width={712}
              height={172}
              className="h-10 min-[900px]:h-12 w-auto object-contain"
            />
          </a>

          {/* Center/Right Zone (Desktop >= 900px): 5 Plain Text Links + 1 Solid CTA */}
          <div className="hidden min-[900px]:flex items-center gap-8">
            <div className="flex items-center gap-7" ref={servicesContainerRef}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                if (item.hasDropdown) {
                  const isLineVisible = isActive || servicesOpen;
                  return (
                    <div
                      key={item.id}
                      className="relative flex items-center"
                      onMouseEnter={() => setServicesOpen(true)}
                      onBlur={handleServicesBlur}
                    >
                      <button
                        ref={servicesTriggerRef}
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="services-dropdown-panel"
                        onFocus={() => {
                          if (suppressFocusOpenRef.current) {
                            suppressFocusOpenRef.current = false;
                            return;
                          }
                          setServicesOpen(true);
                        }}
                        onClick={() => setServicesOpen((prev) => !prev)}
                        onKeyDown={handleServicesTriggerKeyDown}
                        className={`relative inline-flex items-center min-h-[44px] px-1 text-sm font-medium text-[#F4F5F8] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-4 after:content-[''] after:absolute after:left-1 after:right-1 after:bottom-2 after:h-px after:bg-[#F4F5F8] after:origin-left after:transition-transform after:duration-200 motion-reduce:after:transition-none ${
                          isLineVisible
                            ? 'after:scale-x-100'
                            : 'after:scale-x-0 hover:after:scale-x-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onMouseEnter={() => setServicesOpen(false)}
                    className={`relative inline-flex items-center min-h-[44px] px-1 text-sm font-medium text-[#F4F5F8] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-4 after:content-[''] after:absolute after:left-1 after:right-1 after:bottom-2 after:h-px after:bg-[#F4F5F8] after:origin-left after:transition-transform after:duration-200 motion-reduce:after:transition-none ${
                      isActive
                        ? 'after:scale-x-100'
                        : 'after:scale-x-0 hover:after:scale-x-100'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Right Zone: Solid CTA Button with Blobs Button Effect */}
            <BlobButton
              variant="solid"
              size="sm"
              href="#contact"
              onClick={() => {
                setServicesOpen(false);
                onApplyPreset({
                  serviceTrack: 'Websites, Headless CMS & Enterprise AEM',
                  contextLine: 'Starting a project conversation with Ladder7.',
                });
              }}
              className="min-h-[40px] px-4 rounded-[8px]"
            >
              Contact us
            </BlobButton>
          </div>

          {/* Mobile (< 900px): Plain "Menu" Text Button */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-overlay"
            onClick={() => setMobileMenuOpen(true)}
            className="min-[900px]:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-sm font-medium text-[#F4F5F8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-4"
          >
            Menu
          </button>
        </nav>

        {/* Flat Services Dropdown Panel Anchored Directly Below the Bar */}
        <div
          id="services-dropdown-panel"
          role="region"
          aria-label="Services menu"
          aria-hidden={!servicesOpen}
          onMouseEnter={() => setServicesOpen(true)}
          onBlur={handleServicesBlur}
          className={`hidden min-[900px]:block absolute top-full inset-x-0 bg-[#08090C] border-b border-white/10 transition-opacity duration-200 motion-reduce:transition-none ${
            servicesOpen
              ? 'opacity-100 visible pointer-events-auto'
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-12 gap-10 items-center">
            {/* Left Column: Services List (Title + One Plain Sentence Each) */}
            <div className="col-span-7 divide-y divide-white/10 border-y border-white/10">
              {BENTO_SERVICES.map((service, idx) => {
                const isHighlighted = idx === activeServiceIdx;
                return (
                  <a
                    key={service.id}
                    ref={(el) => {
                      serviceItemRefs.current[idx] = el;
                    }}
                    href="#services"
                    tabIndex={servicesOpen ? 0 : -1}
                    onMouseEnter={() => setActiveServiceIdx(idx)}
                    onFocus={() => setActiveServiceIdx(idx)}
                    onKeyDown={(e) => handleServiceItemKeyDown(e, idx)}
                    onClick={() => {
                      setServicesOpen(false);
                      onApplyPreset({
                        serviceTrack: service.title,
                        contextLine: `Project inquiry for ${service.title}.`,
                      });
                    }}
                    className={`block py-4 px-3 transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-2 ${
                      isHighlighted ? 'bg-[#0F1117]' : 'bg-transparent'
                    }`}
                  >
                    <div className="font-display text-base font-bold text-[#F4F5F8]">
                      {service.title}
                    </div>
                    <p className="mt-1 text-sm text-[#A3AAB8]">
                      {SERVICE_PLAIN_DESCRIPTIONS[service.id] || service.editorialBody}
                    </p>
                  </a>
                );
              })}
            </div>

            {/* Right Column: Large Preview Image Changing With Hovered Item */}
            <div className="col-span-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F1117] border border-white/10">
                <img
                  src={previewService.imageSrc}
                  alt={previewService.imageAlt}
                  width={640}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/75 to-transparent p-4">
                  <div className="text-xs font-medium text-[#34D399]">
                    {previewService.category}
                  </div>
                  <div className="font-display text-sm font-bold text-[#F4F5F8] mt-0.5">
                    {previewService.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay (Under 900px) */}
      <div
        id="mobile-navigation-overlay"
        ref={mobileOverlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation menu"
        aria-hidden={!mobileMenuOpen}
        onKeyDown={handleMobileOverlayKeyDown}
        className={`fixed inset-0 z-[60] min-[900px]:hidden bg-[#08090C] flex flex-col justify-between px-4 sm:px-6 pb-8 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 translate-y-3 invisible pointer-events-none'
        }`}
      >
        {/* Top Bar with Logo and Plain "Close" Button Top Right */}
        <div className="h-14 flex items-center justify-between border-b border-white/10">
          <a
            href="#hook"
            tabIndex={mobileMenuOpen ? 0 : -1}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Ladder7 Nextstep Solutions home"
            className="inline-flex items-center min-h-[44px] min-w-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-4"
          >
            <img
              src={KEPT_MEDIA_ASSETS.logoWhiteTight}
              alt="Ladder7 Nextstep Solutions"
              width={712}
              height={172}
              className="h-8 w-auto object-contain"
            />
          </a>

          <button
            ref={closeButtonRef}
            type="button"
            tabIndex={mobileMenuOpen ? 0 : -1}
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 text-sm font-medium text-[#F4F5F8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-4"
          >
            Close
          </button>
        </div>

        {/* Stacked Links in Very Large Type with Generous Spacing */}
        <nav aria-label="Mobile navigation" className="my-auto py-8">
          <ul className="space-y-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center min-h-[44px] font-display text-3xl sm:text-4xl font-bold text-[#F4F5F8] hover:text-[#34D399] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Solid CTA at the Bottom with Blobs Button Effect */}
        <div className="pt-6 border-t border-white/10">
          <BlobButton
            variant="solid"
            size="md"
            href="#contact"
            onClick={() => {
              setMobileMenuOpen(false);
              onApplyPreset({
                serviceTrack: 'Websites, Headless CMS & Enterprise AEM',
                contextLine: 'Starting a project conversation with Ladder7.',
              });
            }}
            className="w-full min-h-[48px] rounded-[10px]"
          >
            Contact us
          </BlobButton>
        </div>
      </div>
    </>
  );
};

