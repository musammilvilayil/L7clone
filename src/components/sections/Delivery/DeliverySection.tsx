import { Button } from "../../ui/Button";
import { SectionHeading } from "../../ui/SectionHeading";
import { PathwayBoard } from "./PathwayBoard";
import { ReadingCopy } from "./ReadingCopy";
import "./DeliverySection.css";

/** "From ambition to real-world impact." — reading copy + the seven-step pathway. */
export function DeliverySection() {
  return (
    <section
      className="section section--sheet section--overlap theme-dark delivery"
      id="delivery-pathway"
      aria-labelledby="delivery-title"
    >
      <SectionHeading
        eyebrow="Connected digital delivery"
        title={"From ambition\nto real-world impact"}
        titleId="delivery-title"
        intro={"A clearer direction for your business.\nA connected route from idea to delivery."}
        aside={
          <Button to="#contact" variant="outline" className="delivery__cta">
            Find your next business step
          </Button>
        }
      />
      <ReadingCopy />
      <PathwayBoard />
    </section>
  );
}
