import type { Capability } from "../../../data/services";
import { revealRef } from "../../../hooks/useReveal";
import { ArrowUpRight } from "../../common/Icons";
import { SmartLink } from "../../common/SmartLink";
import { TagList } from "../../ui/TagList";
import "./CapabilityList.css";

/**
 * Large numbered rows (design: .product-row). Each row is one link; on hover
 * a fill rises, the title slides right behind a red dot and the arrow turns.
 */
export function CapabilityList({
  items,
  hrefFor,
  onSelect,
  headingLevel: Heading = "h3",
}: {
  items: Capability[];
  hrefFor: (capability: Capability) => string;
  onSelect?: (capability: Capability) => void;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="capability-list">
      {items.map((capability) => (
        <li key={capability.id}>
          <SmartLink
            to={hrefFor(capability)}
            className="capability-row reveal"
            ref={revealRef}
            onClick={() => onSelect?.(capability)}
          >
            <span className="capability-row__number">{capability.number}</span>
            <div>
              <Heading className="capability-row__title">{capability.title}</Heading>
              <p className="capability-row__subtitle">{capability.subtitle}</p>
            </div>
            <TagList tags={capability.tags} className="capability-row__tags" />
            <span className="capability-row__arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
