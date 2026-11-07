import type { ImageName } from "../../../data/images.generated";
import { revealRef } from "../../../hooks/useReveal";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { SmartLink } from "../../common/SmartLink";
import "./CatalogueGrid.css";

export interface CatalogueItem {
  slug: string;
  to: string;
  metaLabel: string;
  title: string;
  description: string;
  image: ImageName;
}

/**
 * A 2-column grid of image cards linking to detail pages (design:
 * .catalogue-grid / .catalogue-card) — the Products hub (with filtering) and
 * the Corporate Training hub (plain) both use this.
 */
export function CatalogueGrid({ items }: { items: CatalogueItem[] }) {
  return (
    <div className="catalogue-grid">
      {items.map((item) => (
        <SmartLink key={item.slug} to={item.to} className="catalogue-grid__card reveal" ref={revealRef}>
          <div className="catalogue-grid__image">
            <ResponsiveImage name={item.image} alt="" sizes="(max-width: 700px) 100vw, 46vw" />
            <span aria-hidden="true">↗</span>
          </div>
          <span className="catalogue-grid__meta">{item.metaLabel}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </SmartLink>
      ))}
    </div>
  );
}
