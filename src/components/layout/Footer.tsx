import { useRef } from "react";
import { Link } from "react-router";
import { FOOTER_NAV } from "../../data/navigation";
import { COMPANY, LOCATIONS } from "../../data/site";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import { useScrollFrame } from "../../hooks/useScrollFrame";
import { clamp } from "../../utils/math";
import { ArrowUpRight } from "../common/Icons";
import { SmartLink } from "../common/SmartLink";
import "./Footer.css";

/**
 * Footer. As it scrolls into view the content and the giant wordmark drift
 * up, the ambient "7" drifts the other way and a red line draws across the
 * top rule — all via CSS variables written by the shared scroll loop.
 */
export function Footer({ inert }: { inert?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useScrollFrame(({ vh }) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > vh + 200) return;
    const p = clamp((vh - rect.top) / rect.height);
    return () => {
      el.style.setProperty("--footer-progress", p.toFixed(4));
      el.style.setProperty("--footer-content-y", reduced ? "0px" : `${((1 - p) * 42).toFixed(2)}px`);
      el.style.setProperty("--footer-brand-y", reduced ? "0px" : `${((1 - p) * 130).toFixed(2)}px`);
      el.style.setProperty("--footer-ambient-y", reduced ? "0px" : `${(-p * 170).toFixed(2)}px`);
    };
  });

  return (
    <footer ref={ref} className="site-footer" id="footer" inert={inert}>
      <div className="site-footer__ambient" aria-hidden="true">
        7
      </div>

      <div className="site-footer__topline">
        <span className="status">Your next chapter starts here</span>
        <Link to="#contact" className="site-footer__next">
          Let's find your next step
          <span aria-hidden="true">
            <ArrowUpRight />
          </span>
        </Link>
      </div>

      <div className="site-footer__grid">
        <div className="site-footer__intro">
          <p>
            Build smarter.
            <br />
            Grow further<span className="accent">.</span>
          </p>
          <span>
            Digital experiences that work harder.
            <br />
            Technology built around your business.
          </span>
          <a href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
            <ArrowUpRight />
          </a>
        </div>

        {FOOTER_NAV.map((group) => (
          <nav key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
            <h2 className="label-tiny" id={`footer-${group.title.toLowerCase()}`}>
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

      <div className="site-footer__brand-window">
        <div className="site-footer__brand-caption" aria-hidden="true">
          <span>Technology. With purpose.</span>
          <span>Cochin · Trivandrum</span>
        </div>
        <Link to="#top" className="site-footer__wordmark" aria-label="Ladder7 — back to top">
          <span aria-hidden="true">
            Ladder7<span className="accent">.</span>
          </span>
        </Link>
      </div>

      <div className="site-footer__bottom">
        <p>
          © {__BUILD_YEAR__} {COMPANY.name}. All rights reserved.
        </p>
        <span>Built around your next step.</span>
        <Link to="#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
