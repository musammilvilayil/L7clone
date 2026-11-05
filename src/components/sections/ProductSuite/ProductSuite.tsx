import { useCallback, useState } from "react";
import { PRODUCTS } from "../../../data/products";
import { MOBILE_QUERY, prefersReducedMotion, useMediaQuery } from "../../../hooks/useMediaQuery";
import { useRovingTabs } from "../../../hooks/useRovingTabs";
import { ArrowUpRight } from "../../common/Icons";
import { SectionHeading } from "../../ui/SectionHeading";
import { ProductArt } from "./ProductArt";
import "./ProductSuite.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "From insight to your next action." — five products as WAI-ARIA tabs:
 * vertical list on desktop, horizontally scrolling strip on phones. Every
 * panel is in the HTML (inactive ones `hidden`), so all product copy is
 * crawlable.
 */
export function ProductSuite() {
  const [selected, setSelected] = useState(0);
  const mobile = useMediaQuery(MOBILE_QUERY);

  const select = useCallback(
    (index: number, fromKeyboard: boolean) => {
      setSelected(index);
      if (fromKeyboard && mobile) {
        document
          .getElementById(`suite-tab-${index}`)
          ?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: prefersReducedMotion() ? "instant" : "smooth" });
      }
    },
    [mobile],
  );

  const { getTabProps } = useRovingTabs({
    count: PRODUCTS.length,
    selected,
    onSelect: select,
    orientation: mobile ? "horizontal" : "vertical",
  });

  return (
    <section className="section product-suite" id="it-products" aria-labelledby="it-products-title">
      <SectionHeading
        eyebrow="Built by Ladder7"
        title={"From insight\nto your next action"}
        titleId="it-products-title"
        intro={"Five focused products for the work\nbehind a growing business."}
      />

      <div className="product-suite__showcase">
        <div className="product-suite__nav">
          <p className="product-suite__intro">
            The Ladder7 product suite <span className="badge">{pad(PRODUCTS.length)}</span>
          </p>
          <div
            className="product-suite__tabs"
            role="tablist"
            aria-label="Explore Ladder7 products"
            aria-orientation={mobile ? "horizontal" : "vertical"}
          >
            {PRODUCTS.map((product, index) => (
              <button
                key={product.slug}
                type="button"
                id={`suite-tab-${index}`}
                aria-controls={`suite-panel-${index}`}
                className="product-suite__tab"
                {...getTabProps(index)}
              >
                <span className="product-suite__tab-number">{pad(index + 1)}</span>
                <span className="product-suite__tab-name">
                  {product.name}
                  <small>{product.category}</small>
                </span>
                <ArrowUpRight className="product-suite__tab-arrow" />
              </button>
            ))}
          </div>
          <p className="product-suite__note">Built for the way your business works.</p>
        </div>

        <div className="product-suite__panels">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.slug}
              className="product-suite__panel"
              role="tabpanel"
              id={`suite-panel-${index}`}
              aria-labelledby={`suite-tab-${index}`}
              tabIndex={0}
              hidden={index !== selected}
            >
              <div className={`product-art product-art--${product.art}`} aria-hidden="true">
                <span className="product-art__caption">{product.artCaption}</span>
                <ProductArt kind={product.art} />
                <span className="product-art__footnote">Product concept / illustrative</span>
                <span className="product-art__index">
                  {pad(index + 1)} / {pad(PRODUCTS.length)}
                </span>
              </div>
              <div className="product-suite__copy">
                <div>
                  <span className="product-suite__label">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="product-suite__tagline">{product.tagline}</p>
                  <p className="product-suite__description">{product.description}</p>
                </div>
                <a className="product-suite__cta" href={product.href}>
                  <span>
                    Explore product<span className="sr-only">: {product.name}</span>
                  </span>
                  <i aria-hidden="true">
                    <ArrowUpRight />
                  </i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="product-suite__footer-note">
        Each product works independently. Explore its details and availability on Ladder7.
      </p>
    </section>
  );
}
