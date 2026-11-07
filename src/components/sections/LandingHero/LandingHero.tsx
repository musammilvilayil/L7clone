import { useRef } from "react";
import type { ImageName } from "../../../data/images.generated";
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
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** Omit for the text-only variant (design: .text-hero). */
  image?: LandingHeroImage;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className={cn("landing-hero", "wave-hero", !image && "landing-hero--text")} aria-labelledby="page-title">
      <ParticleField pointerTarget={ref} />
      <div className="landing-hero__copy">
        <p className="eyebrow eyebrow--live">{eyebrow}</p>
        <h1 id="page-title">
          {title}
          <span className="accent">.</span>
        </h1>
        <p>{description}</p>
        <div className="landing-hero__actions">
          <Button to="#contact">Let's talk</Button>
          <Button variant="outline" glass to="#page-content">
            Explore the details
          </Button>
        </div>
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
