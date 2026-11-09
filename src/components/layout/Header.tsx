import { forwardRef } from "react";
import { Link, useLocation } from "react-router";
import { useEnquiry } from "../../context/EnquiryContext";
import { divisionSwitchFor, headerNav } from "../../data/navigation";
import { COMPANY, SOCIAL } from "../../data/site";
import { divisionForPath } from "../../routes";
import { cn } from "../../utils/cn";
import { Facebook, Instagram, LinkedIn, Mail, Phone, WhatsApp } from "../common/Icons";
import { SmartLink } from "../common/SmartLink";
import { Button } from "../ui/Button";
import "./Header.css";

/** Desktop link whose label rolls up to a duplicate on hover (design: .nav-roll). */
function RollLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <SmartLink to={to} className="desktop-nav__link" onClick={onClick}>
      <span className="sr-only">{label}</span>
      <span className="nav-roll" aria-hidden="true">
        <span>{label}</span>
        <span>{label}</span>
      </span>
    </SmartLink>
  );
}

export const Header = forwardRef<HTMLElement>(function Header(_props, ref) {
  const { menuOpen, toggleMenu, closeMenu } = useEnquiry();
  const division = divisionForPath(useLocation().pathname);
  const brandHome = division === "education" ? "/education" : "/";

  return (
    <header ref={ref} className={cn("site-header", menuOpen && "is-menu-open")}>
      <div className="site-topbar">
        <div className="site-topbar__inner">
          <div className="site-topbar__contact">
            <a href={COMPANY.phone.href} className="site-topbar__link">
              <Phone className="site-topbar__icon" />
              <span>{COMPANY.phone.display}</span>
            </a>
            <span className="site-topbar__sep" aria-hidden="true">•</span>
            <a href={`mailto:${COMPANY.email}`} className="site-topbar__link">
              <Mail className="site-topbar__icon" />
              <span>{COMPANY.email}</span>
            </a>
          </div>

          <div className="site-topbar__social" aria-label="Social media links">
            {SOCIAL.map((item) => {
              const Icon =
                item.icon === "linkedin"
                  ? LinkedIn
                  : item.icon === "instagram"
                    ? Instagram
                    : item.icon === "facebook"
                      ? Facebook
                      : WhatsApp;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-topbar__social-link"
                  aria-label={`Ladder7 on ${item.label} (opens in a new tab)`}
                >
                  <Icon className="site-topbar__social-icon" />
                  <span className="site-topbar__social-text">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="site-header__main">
        <Link
          to={brandHome}
          className="site-header__brand"
          aria-label={division === "education" ? "Ladder7 Education home" : "Ladder7 IT home"}
          onClick={closeMenu}
        >
          <img
            src="/images/brand/ladder7-logo-284.webp"
            srcSet="/images/brand/ladder7-logo-284.webp 284w, /images/brand/ladder7-logo-568.webp 568w"
            sizes="142px"
            width={142}
            height={58}
            alt="Ladder7 Nextstep Solutions"
            fetchPriority="high"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {headerNav().map((item) => (
            <RollLink key={item.to} to={item.to} label={item.label} onClick={closeMenu} />
          ))}
        </nav>

        <nav className="division-switch" aria-label="Ladder7 divisions">
          {divisionSwitchFor(division).map((item) => (
            <SmartLink
              key={item.label}
              to={item.to}
              className={cn("division-switch__link", item.current && "is-selected")}
              aria-current={item.current ? "page" : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </SmartLink>
          ))}
        </nav>

        <Button to="#contact" size="sm" className="site-header__cta btn--brand-disc" onClick={closeMenu}>
          Let's talk
        </Button>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={toggleMenu}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
});
