import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

interface NavItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { label: 'Who we are', href: '#about' },
  { label: 'What we think', href: '#products' },
  { label: 'Corporate Training', href: '#training' },
  { label: 'Contact Us', href: '#contact' },
];

const SERVICE_ITEMS = [
  {
    title: 'Digital Experience',
    desc: 'Modern composable platforms & web apps',
    href: '#capabilities',
  },
  {
    title: 'Applied AI Hyperautomation',
    desc: 'Autonomous agents & LLM workflows',
    href: '#capabilities',
  },
  {
    title: 'Technology Strategy',
    desc: 'Architecture consulting & roadmaps',
    href: '#capabilities',
  },
  {
    title: 'Custom Developments',
    desc: 'Tailored business software solutions',
    href: '#capabilities',
  },
];

interface PortalSwitcherProps {
  activeSegment: 'education' | 'it';
  onSelect: (val: 'education' | 'it') => void;
  isMobile?: boolean;
}

const PortalSwitcher: React.FC<PortalSwitcherProps> = ({
  activeSegment,
  onSelect,
  isMobile = false,
}) => {
  const isIt = activeSegment === 'it';
  return (
    <div
      className={
        isMobile
          ? 'flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl relative w-full h-12 items-center border border-slate-200 dark:border-slate-700/50'
          : 'hidden lg:flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full relative w-40 h-8 items-center border border-slate-300/30 dark:border-slate-700/30'
      }
      role="tablist"
      aria-label={isMobile ? 'Mobile portal switcher' : 'Portal switcher'}
    >
      <div
        className={`absolute rounded-${isMobile ? 'lg' : 'full'} bg-white dark:bg-slate-700 shadow-sm transition-all duration-300 ease-out pointer-events-none`}
        style={{
          height: isMobile ? '2.5rem' : '1.5rem',
          width: 'calc(50% - 4px)',
          left: isIt ? 'calc(50%)' : '4px',
        }}
      />
      {(['education', 'it'] as const).map((segment) => {
        const isSelected = activeSegment === segment;
        return (
          <button
            key={segment}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(segment)}
            className={`flex-1 text-center font-bold uppercase tracking-widest relative z-10 transition-colors duration-200 h-full flex items-center justify-center ${
              isMobile ? 'text-xs' : 'text-[9px]'
            } ${
              isSelected
                ? isMobile
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-primary dark:text-white'
                : isMobile
                  ? 'text-slate-500 dark:text-slate-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {segment === 'education' ? 'Education' : 'IT'}
          </button>
        );
      })}
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState<'education' | 'it'>('it');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col transition-all duration-300">
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-[#0f1923]/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-white/10'
            : 'bg-transparent backdrop-blur-none border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/images/logos/logo-primary.webp"
              alt="Ladder7"
              width={146}
              height={60}
              className={`h-12 sm:h-14 w-auto object-contain transition-opacity duration-300 ${
                darkMode ? 'hidden' : 'block'
              }`}
            />
            <img
              src="/images/logos/logo-white.webp"
              alt="Ladder7"
              width={146}
              height={60}
              className={`h-12 sm:h-14 w-auto object-contain transition-opacity duration-300 ${
                darkMode ? 'block' : 'hidden'
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors py-1.5"
            >
              Who we are
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWhatWeDoOpen(true)}
              onMouseLeave={() => setWhatWeDoOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors py-1.5 focus:outline-none"
                onClick={() => setWhatWeDoOpen(!whatWeDoOpen)}
              >
                <span>What we do</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    whatWeDoOpen ? 'rotate-180 text-primary dark:text-blue-400' : ''
                  }`}
                />
              </button>

              {whatWeDoOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-3 bg-white dark:bg-[#131f2c] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 animate-fadeInDown z-50">
                  <div className="space-y-1">
                    {SERVICE_ITEMS.map((service) => (
                      <a
                        key={service.title}
                        href={service.href}
                        className="block p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400">
                          {service.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {service.desc}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {NAV_LINKS.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors py-1.5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <PortalSwitcher
              activeSegment={activeSegment}
              onSelect={setActiveSegment}
            />

            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200/40 dark:border-purple-800/40"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="h-16 w-full" aria-hidden="true" />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-40 bg-white dark:bg-[#0f1923] border-b border-slate-200 dark:border-white/10 shadow-2xl p-6 flex flex-col gap-3 animate-fadeInDown max-h-[calc(100vh-64px)] overflow-y-auto">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="p-3 rounded-xl font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            Who we are
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="p-3 rounded-xl font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            What we do (Services)
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="p-3 rounded-xl font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            What we think (Products)
          </a>
          <a
            href="#training"
            onClick={() => setMobileMenuOpen(false)}
            className="p-3 rounded-xl font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            Corporate Training
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 rounded-xl text-center font-bold text-white bg-[#0056b2] hover:bg-[#004494] shadow-md transition-colors my-2"
          >
            Contact Us
          </a>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
            <PortalSwitcher
              activeSegment={activeSegment}
              onSelect={setActiveSegment}
              isMobile
            />
          </div>
        </div>
      )}
    </header>
  );
};
