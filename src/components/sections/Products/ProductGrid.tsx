import { PRODUCTS } from "../../../data/products";
import { revealRef } from "../../../hooks/useReveal";
import { ArrowUpRight } from "../../common/Icons";
import { SectionHeading } from "../../ui/SectionHeading";
import "./ProductGrid.css";

/** The five products as cards (about page) — same data as the home product suite. */
export function ProductGrid() {
  return (
    <section className="section product-grid" id="products" aria-labelledby="product-grid-title">
      <SectionHeading
        eyebrow="Built by Ladder7"
        title={"From insight\nto your next action"}
        titleId="product-grid-title"
        intro={"Five focused products for the work\nbehind a growing business."}
      />
      <ul className="product-grid__list">
        {PRODUCTS.map((product) => (
          <li key={product.slug} className="card card--interactive product-grid__card reveal" ref={revealRef}>
            <span className="product-grid__label">{product.category}</span>
            <h3>{product.name}</h3>
            <p className="product-grid__tagline">{product.tagline}</p>
            <p className="product-grid__description">{product.description}</p>
            <a href={product.href} className="product-grid__link">
              Explore product<span className="sr-only">: {product.name}</span>
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>
      <p className="product-grid__note">Each product works independently. Explore its details and availability on Ladder7.</p>
    </section>
  );
}
