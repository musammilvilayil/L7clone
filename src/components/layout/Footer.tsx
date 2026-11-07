import { Link } from "react-router";
import { footerNav } from "../../data/navigation";
import { COMPANY, LOCATIONS } from "../../data/site";
import { ArrowUpRight } from "../common/Icons";
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
      </div>

      <div className="site-footer__locations">
        <p className="label-tiny">Our bases. Your next step.</p>
        {LOCATIONS.map((location) => (
          <address key={location.city}>
            <strong>{location.city}</strong>
            <span>{location.place}</span>
          </address>
        ))}
        <Link to="/contact" className="site-footer__find">
          Find Ladder7
          <span aria-hidden="true">
            <ArrowUpRight />
          </span>
        </Link>
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
