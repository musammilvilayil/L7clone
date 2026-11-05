import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { FaqSection } from "../../components/sections/Faq/FaqSection";
import { LocationsSection } from "../../components/sections/Locations/LocationsSection";

/** Contact — the enquiry form first, then locations and common questions. */
export default function ContactPage() {
  return (
    <>
      <Seo page="contact" />
      <ContactSection headingLevel="h1" first />
      <LocationsSection />
      <FaqSection />
    </>
  );
}
