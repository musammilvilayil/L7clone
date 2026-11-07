import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { AEM_DIGITAL_EXPERIENCE } from "../../data/services-detail/aemDigitalExperience";

export default function AemDigitalExperiencePage() {
  return (
    <>
      <Seo page="serviceAemDigitalExperience" />
      <ServiceDetailTemplate content={AEM_DIGITAL_EXPERIENCE} />
    </>
  );
}
