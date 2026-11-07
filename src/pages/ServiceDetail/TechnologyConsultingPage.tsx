import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { TECHNOLOGY_CONSULTING } from "../../data/services-detail/technology";

export default function TechnologyConsultingPage() {
  return (
    <>
      <Seo page="serviceTechnology" />
      <ServiceDetailTemplate content={TECHNOLOGY_CONSULTING} />
    </>
  );
}
