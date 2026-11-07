import { Seo } from "../../components/common/Seo";
import { ContactHero } from "../../components/sections/ContactHero/ContactHero";
import { ContactLocations } from "../../components/sections/ContactLocations/ContactLocations";

/** Contact — the page's own hero (direct contacts + enquiry form), then bases. */
export default function ContactPage() {
  return (
    <>
      <Seo page="contact" />
      <ContactHero />
      <ContactLocations />
    </>
  );
}
