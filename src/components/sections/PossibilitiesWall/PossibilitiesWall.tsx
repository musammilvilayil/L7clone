import { useRef } from "react";
import { WALL_COLUMNS } from "../../../data/media";
import { revealRef } from "../../../hooks/useReveal";
import { useInView } from "../../../hooks/useInView";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { Button } from "../../ui/Button";
import "./PossibilitiesWall.css";

/**
 * "One ambition. Connected possibilities." — red sheet with a tilted collage
 * of three slowly drifting image columns. The drift pauses while off-screen.
 */
export function PossibilitiesWall() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, "200px");

  return (
    <section ref={ref} className="section section--sheet theme-brand wall" aria-labelledby="wall-title" data-animating={inView || undefined}>
      <div className="wall__copy reveal" ref={revealRef}>
        <p className="eyebrow">The possibilities</p>
        <h2 id="wall-title">
          One ambition.
          <br />
          Connected possibilities.
        </h2>
        <p className="wall__text">
          From a better customer experience to a more connected workflow. Build the next step around your business.
        </p>
        <Button to="/#capabilities" onBrand>
          Explore our capabilities
        </Button>
      </div>
      <div className="wall__collage" aria-hidden="true">
        {WALL_COLUMNS.map((column, c) => (
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
