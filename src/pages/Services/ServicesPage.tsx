import { useState } from "react";
import { Seo } from "../../components/common/Seo";
import { CapabilityList } from "../../components/sections/Capabilities/CapabilityList";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { FaqSection } from "../../components/sections/Faq/FaqSection";
import { PageHero } from "../../components/sections/PageHero/PageHero";
import { DeliverySteps } from "../../components/sections/Services/DeliverySteps";
import { ServiceDetail } from "../../components/sections/Services/ServiceDetail";
import { TrainingSection } from "../../components/sections/Training/TrainingSection";
import { Button } from "../../components/ui/Button";
import { CAPABILITIES } from "../../data/services";
import { PAGE_SEO } from "../../seo/pages";

/**
 * Services — every capability in full (no tabs), the seven delivery steps as
 * a readable list, corporate training, FAQ and contact. "Discuss …" buttons
 * pre-select the matching interest in the contact form.
 */
export default function ServicesPage() {
  const [interest, setInterest] = useState<string | undefined>(undefined);

  return (
    <>
      <Seo page="services" />
      <PageHero
        eyebrow="What we do"
        title={"Four capabilities.\nOne connected partner"}
        intro="From the first strategic question to the systems behind your business: intelligent websites, applied AI, technology strategy and custom software, connected around your next business goal."
        breadcrumb={PAGE_SEO.services.breadcrumb}
        actions={
          <>
            <Button to="#contact">Discuss your project</Button>
            <Button to="#delivery-steps" variant="outline" glass>
              See how we deliver
            </Button>
          </>
        }
      />

      <section className="section" aria-label="Capabilities overview">
        <CapabilityList items={CAPABILITIES} hrefFor={(capability) => `#${capability.id}`} headingLevel="h2" />
      </section>

      {CAPABILITIES.map((capability, index) => (
        <ServiceDetail key={capability.id} capability={capability} tone={index % 2 === 0 ? "paper" : "dark"} onEnquire={setInterest} />
      ))}

      <DeliverySteps />
      <TrainingSection />
      <FaqSection />
      <ContactSection interest={interest} />
    </>
  );
}
