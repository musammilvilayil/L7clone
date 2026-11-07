import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { ProductCatalogue } from "../../components/sections/ProductCatalogue/ProductCatalogue";

/** Products — the hub page, rebuilt from products.html: hero, filterable catalogue, contact CTA. */
export default function ProductsPage() {
  return (
    <>
      <Seo page="products" />
      <LandingHero
        eyebrow="The Ladder7 toolkit"
        title="Tools for your next chapter"
        description="Ladder7 NextStep Solutions builds five AI products."
        image={{ name: "photos/team-analytics-review", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <ProductCatalogue />
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
