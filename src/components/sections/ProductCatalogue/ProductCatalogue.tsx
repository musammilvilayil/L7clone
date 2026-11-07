import { useState } from "react";
import { PRODUCT_CATALOGUE, PRODUCT_FILTERS, type ProductCategory } from "../../../data/productCatalogue";
import { cn } from "../../../utils/cn";
import { CatalogueGrid } from "../CatalogueGrid/CatalogueGrid";
import "./ProductCatalogue.css";

/** Products hub catalogue (design: .catalogue-section) — filterable grid of all 10 products. */
export function ProductCatalogue() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const items = (filter === "all" ? PRODUCT_CATALOGUE : PRODUCT_CATALOGUE.filter((item) => item.category === filter)).map((item) => ({
    slug: item.slug,
    to: item.to,
    metaLabel: `${item.categoryLabel} / ${item.number}`,
    title: item.title,
    description: item.description,
    image: item.image,
  }));

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
      <CatalogueGrid items={items} />
    </section>
  );
}
