import { useRef } from "react";
import { WALL_COLUMNS } from "../../../data/media";
import { revealRef } from "../../../hooks/useReveal";
import { useInView } from "../../../hooks/useInView";
import type { ImageName } from "../../../data/images.generated";
import { Lines } from "../../common/Lines";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { Button } from "../../ui/Button";
import "./PossibilitiesWall.css";

export interface PossibilitiesContent {
  eyebrow: string;
  /** "\n" marks a desktop-only line break; no trailing accent (the design never adds one here). */
  title: string;
  text: string;
  buttonLabel: string;
  buttonTo: string;
  /** Three columns of three images each; each column is shown twice for a seamless loop. */
  columns: ImageName[][];
}

const IT_CONTENT: PossibilitiesContent = {
  eyebrow: "The possibilities",
  title: "One ambition.\nConnected possibilities.",
  text: "From a better customer experience to a more connected workflow. Build the next step around your business.",
  buttonLabel: "Explore our capabilities",
  buttonTo: "/#capabilities",
  columns: WALL_COLUMNS,
};

/**
 * "One ambition. Connected possibilities." — red sheet with a tilted collage
 * of three slowly drifting image columns. The drift pauses while off-screen.
 */
export function PossibilitiesWall({ content = IT_CONTENT }: { content?: PossibilitiesContent }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, "200px");

  return (
    <section ref={ref} className="section section--sheet theme-brand wall" aria-labelledby="wall-title" data-animating={inView || undefined}>
      <div className="wall__copy reveal" ref={revealRef}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="wall-title">
          <Lines text={content.title} />
        </h2>
        <p className="wall__text">{content.text}</p>
        <Button to={content.buttonTo} onBrand>
          {content.buttonLabel}
        </Button>
      </div>
      <div className="wall__collage" aria-hidden="true">
        {content.columns.map((column, c) => (
          <div className="wall__column" key={c}>
            {[...column, ...column].map((image, i) => (
              <ResponsiveImage key={i} name={image} alt="" sizes="(max-width: 700px) 48vw, 24vw" />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
