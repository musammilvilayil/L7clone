import { Seo } from "../../components/common/Seo";
import { SmartLink } from "../../components/common/SmartLink";
import { Button } from "../../components/ui/Button";
import { LEGACY_LINKS } from "../../data/site";
import { cssVars } from "../../utils/cn";
import "./NotFoundPage.css";

const LINKS = [
  { label: "Services", to: "/services" },
  { label: "About Ladder7", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Insights", to: LEGACY_LINKS.blogs },
];

/**
 * 404. The production server answers unknown URLs with this page and a real
 * HTTP 404 status (server.mjs), and the page is noindex.
 */
export default function NotFoundPage() {
  return (
    <>
      <Seo page="notFound" />
      <section className="not-found" aria-labelledby="page-title">
        <p className="not-found__code fade-rise" aria-hidden="true">
          404
        </p>
        <p className="eyebrow fade-rise" style={cssVars({ "--fade-delay": "0.1s" })}>
          Page not found
        </p>
        <h1 id="page-title" className="fade-rise" style={cssVars({ "--fade-delay": "0.18s" })}>
          This step doesn't exist<span className="accent">.</span>
        </h1>
        <p className="not-found__text fade-rise" style={cssVars({ "--fade-delay": "0.3s" })}>
          The page you were looking for may have moved, or the address may be mistyped.
        </p>
        <div className="not-found__actions fade-rise" style={cssVars({ "--fade-delay": "0.4s" })}>
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="outline">
            Contact Ladder7
          </Button>
        </div>
        <nav aria-label="Popular pages" className="not-found__links fade-rise" style={cssVars({ "--fade-delay": "0.5s" })}>
          {LINKS.map((link) => (
            <SmartLink key={link.label} to={link.to}>
              {link.label}
            </SmartLink>
          ))}
        </nav>
      </section>
    </>
  );
}
