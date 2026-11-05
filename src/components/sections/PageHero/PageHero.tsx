import { useRef, type ReactNode } from "react";
import { Link } from "react-router";
import { cssVars } from "../../../utils/cn";
import { Lines } from "../../common/Lines";
import { ParticleField } from "../Hero/ParticleField";
import "./PageHero.css";

/**
 * Opening section for inner pages: breadcrumb, eyebrow, H1, intro and
 * actions over the same particle terrain as the home hero (shorter).
 * Entrance uses CSS only, so it never waits for JavaScript.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  breadcrumb,
}: {
  eyebrow: string;
  /** "\n" = desktop line break; a red full stop is appended. */
  title: string;
  intro: string;
  actions?: ReactNode;
  breadcrumb: { name: string; path: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  const trail = [{ name: "Home", path: "/" }, ...breadcrumb];

  return (
    <section ref={ref} className="page-hero" aria-labelledby="page-title">
      <ParticleField pointerTarget={ref} />
      <div className="page-hero__content">
        <nav aria-label="Breadcrumb" className="page-hero__breadcrumb fade-rise">
          <ol>
            {trail.map((crumb, index) => (
              <li key={crumb.path}>
                {index === trail.length - 1 ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link to={crumb.path}>{crumb.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow eyebrow--live fade-rise" style={cssVars({ "--fade-delay": "0.08s" })}>
          {eyebrow}
        </p>
        <h1 id="page-title" className="fade-rise" style={cssVars({ "--fade-delay": "0.16s" })}>
          <Lines text={title} accent />
        </h1>
        <p className="page-hero__intro fade-rise" style={cssVars({ "--fade-delay": "0.3s" })}>
          {intro}
        </p>
        {actions && (
          <div className="page-hero__actions fade-rise" style={cssVars({ "--fade-delay": "0.42s" })}>
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
