import { useState } from "react";
import { PRODUCT_CATALOGUE, PRODUCT_FILTERS, type ProductCategory } from "../../../data/productCatalogue";
import { revealRef } from "../../../hooks/useReveal";
import { cn } from "../../../utils/cn";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { SmartLink } from "../../common/SmartLink";
import "./ProductCatalogue.css";

/** Products hub catalogue (design: .catalogue-section) — filterable grid of all 10 products. */
export function ProductCatalogue() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const items = filter === "all" ? PRODUCT_CATALOGUE : PRODUCT_CATALOGUE.filter((item) => item.category === filter);

  return (
    <section className="product-catalogue">
      <h2>Find your next useful tool.</h2>
      <div className="product-catalogue__filters" role="group" aria-label="Filter products">
        {PRODUCT_FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={cn(option.value === filter && "is-active")}
            aria-pressed={option.value === filter}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="product-catalogue__grid">
        {items.map((item) => (
          <SmartLink key={item.slug} to={item.to} className="product-catalogue__card reveal" ref={revealRef}>
            <div className="product-catalogue__image">
              <ResponsiveImage name={item.image} alt="" sizes="(max-width: 700px) 100vw, 46vw" />
              <span aria-hidden="true">↗</span>
            </div>
            <span className="product-catalogue__meta">{item.categoryLabel} / {item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}
