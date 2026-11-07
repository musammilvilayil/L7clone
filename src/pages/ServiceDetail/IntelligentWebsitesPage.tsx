import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { INTELLIGENT_WEBSITES } from "../../data/services-detail/intelligentWebsites";

export default function IntelligentWebsitesPage() {
  return (
    <>
      <Seo page="serviceIntelligentWebsites" />
      <ServiceDetailTemplate content={INTELLIGENT_WEBSITES} />
    </>
  );
}
