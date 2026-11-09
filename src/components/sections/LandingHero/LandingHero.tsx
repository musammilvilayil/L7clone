import { useRef } from "react";
import { useLocation } from "react-router";
import type { ImageName } from "../../../data/images.generated";
import { websitePageContentForPath } from "../../../data/websiteContent";
import { cn } from "../../../utils/cn";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { Button } from "../../ui/Button";
import { ParticleField } from "../Hero/ParticleField";
import "./LandingHero.css";

export interface LandingHeroImage {
  name: ImageName;
  alt: string;
  caption: string;
}

export interface LandingHeroAction {
  label: string;
  to: string;
}

const DEFAULT_ACTIONS: [LandingHeroAction, LandingHeroAction] = [
  { label: "Let's talk", to: "#contact" },
  { label: "Explore the details", to: "#page-content" },
];

/**
 * Opening section for simple content pages (design: .landing-hero.wave-hero,
 * or .text-hero without a side image — FAQ, Careers, Portfolio and more).
 * Always ends in "Let's talk" (→ #contact) and "Explore the details"
 * (→ #page-content), over the shared particle terrain.
 */
export function LandingHero({
  eyebrow,
  title,
  description,
  image,
  facts,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** Omit for the text-only variant (design: .text-hero). */
  image?: LandingHeroImage;
  /** Quick facts under the actions, bullet-separated (design: .landing-facts). */
  facts?: string[];
  /** Override the two buttons (articles use "Read the story" / "All insights"). */
  actions?: [LandingHeroAction, LandingHeroAction];
}) {
  const ref = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const heroContent = websitePageContentForPath(pathname)?.sections[0];
  const pageTitle = heroContent?.section_heading?.replace(/\.$/, "") ?? title;
  const pageEyebrow = heroContent?.eyebrow || eyebrow;
  const pageDescription = heroContent?.description || description;
  const pageActions = heroContent?.cta_buttons
    ?.filter((action): action is typeof action & { url: string } => Boolean(action.url))
    .map((action) => ({ label: action.text, to: action.url }));
  const resolvedActions: [LandingHeroAction, LandingHeroAction] =
    actions ??
    (pageActions?.length === 2
      ? [pageActions[0]!, pageActions[1]!]
      : DEFAULT_ACTIONS);
  const [primary, secondary] = resolvedActions;

  return (
    <section ref={ref} className={cn("landing-hero", "wave-hero", !image && "landing-hero--text")} aria-labelledby="page-title">
      <ParticleField pointerTarget={ref} />
      <div className="landing-hero__copy">
        <p className="eyebrow eyebrow--live">{pageEyebrow}</p>
        <h1 id="page-title">
          {pageTitle}
          <span className="accent">.</span>
        </h1>
        <p>{pageDescription}</p>
        <div className="landing-hero__actions">
          <Button to={primary.to}>{primary.label}</Button>
          <Button variant="outline" glass to={secondary.to}>
            {secondary.label}
          </Button>
        </div>
        {facts && facts.length > 0 && (
          <ul className="landing-hero__facts">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        )}
      </div>
      {image && (
        <figure className="landing-hero__image">
          <ResponsiveImage name={image.name} alt={image.alt} sizes="(max-width: 700px) 100vw, 40vw" loading="eager" fetchPriority="high" />
          <figcaption>{image.caption}</figcaption>
        </figure>
      )}
    </section>
  );
}
