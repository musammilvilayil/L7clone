import { Link } from "react-router";
import { footerNav } from "../../data/navigation";
import { COMPANY, LOCATIONS, SOCIAL } from "../../data/site";
import { ArrowUpRight, Facebook, Instagram, LinkedIn, WhatsApp } from "../common/Icons";
import { SmartLink } from "../common/SmartLink";
import "./Footer.css";

/**
 * Footer (design: .footer.footer-compact) — a plain in-flow sheet, no
 * scroll-driven motion. Identical on every page; only the division switch
 * in the header varies by page.
 */
export function Footer({ inert }: { inert?: boolean }) {
  return (
    <footer className="site-footer footer-compact" id="footer" inert={inert}>
      <div className="site-footer__top">
        <Link to="/" className="site-footer__brand" aria-label="Ladder7 home">
          Ladder7<span className="accent">.</span>
        </Link>
        <div className="site-footer__action">
          <span className="site-footer__status">Your next chapter starts here</span>
          <Link to="/contact" className="site-footer__next">
            Let's find your next step
            <span aria-hidden="true">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>

      <div className="site-footer__main">
        <div className="site-footer__intro">
          <Link to="/" className="site-footer__intro-logo" aria-label="Ladder7 home">
            <img
              src="/images/brand/ladder7-logo-284.webp"
              srcSet="/images/brand/ladder7-logo-284.webp 284w, /images/brand/ladder7-logo-568.webp 568w"
              sizes="142px"
              width={142}
              height={58}
              alt="Ladder7 Nextstep Solutions"
              loading="lazy"
            />
          </Link>
          <div className="site-footer__social" aria-label="Ladder7 on social media">
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
                  className="site-footer__social-link"
                  aria-label={`Ladder7 on ${item.label} (opens in a new tab)`}
                >
                  <Icon className="site-footer__social-icon" />
                </a>
              );
            })}
          </div>
          <p>
            Technology with purpose.
            <br />
            Learning that moves you forward.
          </p>
          <a href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
            <span aria-hidden="true">
              <ArrowUpRight />
            </span>
          </a>
        </div>

        {footerNav().map((group) => (
          <nav key={group.title} aria-labelledby={`footer-${group.title.toLowerCase().replace(/\W+/g, "-")}`}>
            <h2 className="label-tiny" id={`footer-${group.title.toLowerCase().replace(/\W+/g, "-")}`}>
              {group.title}
            </h2>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  <SmartLink to={item.to}>{item.label}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="site-footer__powered">
          <h2 className="label-tiny">Powered by</h2>
          <div className="site-footer__powered-box">
            <img
              src="/images/brand/naventra-logo.png"
              alt="Naventra"
              className="site-footer__powered-logo"
              width={100}
              height={62}
              loading="lazy"
            />
            <span className="site-footer__powered-text">Powered by Naventra</span>
          </div>
        </div>
      </div>

      <div className="site-footer__locations">
        <p className="label-tiny">Our bases. Your next step.</p>
        {LOCATIONS.map((location) => (
          <address key={location.city}>
            <strong>{location.city}</strong>
            <span>{location.place}</span>
          </address>
        ))}
        <a className="site-footer__find" href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer">
          Find Ladder7
          <span aria-hidden="true">
            <ArrowUpRight />
          </span>
          <span className="sr-only"> on the map (opens in a new tab)</span>
        </a>
      </div>

      <div className="site-footer__bottom">
        <p>
          © {__BUILD_YEAR__} {COMPANY.name}. All rights reserved.
        </p>
        <Link to="/privacy">Privacy</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
