import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { ServiceCatalogue } from "../../components/sections/ServiceCatalogue/ServiceCatalogue";
import { ServiceFaq } from "../../components/sections/ServiceFaq/ServiceFaq";
import { ServiceHero } from "../../components/sections/ServiceHero/ServiceHero";

/**
 * Services — the hub page, rebuilt from the real design (services.html): the
 * laptop-mockup hero, the 14-service catalogue grouped by discipline, the
 * hub's own FAQ, and the standard enquiry CTA. Each catalogue row links to
 * its own full detail page (ServiceDetailTemplate).
 */
export default function ServicesPage() {
  return (
    <>
      <Seo page="services" />
      <ServiceHero />
      <ServiceCatalogue />
      <ServiceFaq />
      <ContactSection headingLevel="h2" />
    </>
  );
}
