import React from 'react';

interface FooterProps {
  darkMode: boolean;
}

interface FooterLink {
  label: string;
  href: string;
}

const SERVICES_LINKS: FooterLink[] = [
  { label: 'Digital Experience & Web Engineering', href: '#capabilities' },
  { label: 'AI & Intelligent Automation', href: '#capabilities' },
  { label: 'Strategy & Technology Consulting', href: '#capabilities' },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: 'Our Products', href: '#products' },
  { label: 'Blogs', href: '#about' },
  { label: 'Careers', href: '#about' },
  { label: 'Bootcamp', href: '#training' },
  { label: 'Portfolio', href: '#capabilities' },
  { label: 'Contact Form', href: '#contact' },
];

const LOCATIONS = [
  { city: 'Cochin', detail: 'WEE SPACES Ernakulam' },
  { city: 'Trivandrum', detail: 'Kinfra Film and IT Park Trivandrum' },
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ladder7-nextstep-solutions-llp',
    hoverColor: 'hover:text-blue-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ladder7_nextstep_solutions_?igsh=Mzd5cm5qbnpzam9p',
    hoverColor: 'hover:text-pink-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/13wyxrXYTv/?mibextid=LQQJ4d',
    hoverColor: 'hover:text-blue-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: "https://wa.me/918137979401?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Ladder7.",
    hoverColor: 'hover:text-green-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className="bg-slate-50 dark:bg-[#0b131e] text-slate-600 dark:text-slate-400 pt-12 pb-8 transition-colors duration-300 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 items-start">
          {/* Logo & Socials */}
          <div className="flex flex-col gap-5">
            <a className="flex items-center" href="#">
              <img
                src="/images/logos/logo-primary.webp"
                alt="Ladder7"
                width={200}
                height={80}
                className={`h-16 lg:h-18 w-auto object-contain ${darkMode ? 'hidden' : 'block'}`}
                loading="lazy"
              />
              <img
                src="/images/logos/logo-white.webp"
                alt="Ladder7"
                width={200}
                height={80}
                className={`h-16 lg:h-18 w-auto object-contain ${darkMode ? 'block' : 'hidden'}`}
                loading="lazy"
              />
            </a>

            <div className="flex gap-4 items-center">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ladder7 on ${item.name}`}
                  className={`w-9 h-9 rounded-full bg-slate-200/70 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 ${item.hoverColor} hover:scale-110 transition-all duration-300`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:pt-3">
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-base">Services</h3>
            <ul className="space-y-3 text-sm">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a className="transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:pt-3">
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-base">Company</h3>
            <ul className="space-y-3 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a className="transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="lg:pt-3">
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-base">Our Locations</h3>
            <div className="text-sm space-y-4">
              {LOCATIONS.map((loc) => (
                <div key={loc.city}>
                  <p className="font-bold text-slate-900 dark:text-white">{loc.city}</p>
                  <p className="text-slate-600 dark:text-slate-400">{loc.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:pt-3">
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-base">Contact Us</h3>
            <div className="text-sm space-y-3">
              <p>
                <a href="tel:+918137979401" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  +91 8137979401
                </a>
              </p>
              <p>
                <a href="mailto:info@ladder7.in" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  info@ladder7.in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400">
          <p>© 2026 Ladder7 NextStep Solutions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#contact" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
