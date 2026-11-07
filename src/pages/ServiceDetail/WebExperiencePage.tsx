import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { WEB_EXPERIENCE } from "../../data/services-detail/webExperience";

export default function WebExperiencePage() {
  return (
    <>
      <Seo page="serviceWebExperience" />
      <ServiceDetailTemplate content={WEB_EXPERIENCE} />
    </>
  );
}
