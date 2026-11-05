import { forwardRef } from "react";
import { Link } from "react-router";
import { useEnquiry } from "../../context/EnquiryContext";
import { DIVISIONS, HEADER_NAV } from "../../data/navigation";
import { cn } from "../../utils/cn";
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

  return (
    <header ref={ref} className="site-header">
      <Link to="/" className="site-header__brand" aria-label="Ladder7 IT home" onClick={closeMenu}>
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
        {HEADER_NAV.map((item) => (
          <RollLink key={item.to} to={item.to} label={item.label} onClick={closeMenu} />
        ))}
      </nav>

      <nav className="division-switch" aria-label="Ladder7 divisions">
        {DIVISIONS.map((division) => (
          <SmartLink
            key={division.label}
            to={division.to}
            className={cn("division-switch__link", division.current && "is-selected")}
            aria-current={division.current ? "page" : undefined}
            onClick={closeMenu}
          >
            {division.label}
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
    </header>
  );
});
