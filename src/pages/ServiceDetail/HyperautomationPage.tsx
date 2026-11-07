import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { HYPERAUTOMATION } from "../../data/services-detail/hyperautomation";

export default function HyperautomationPage() {
  return (
    <>
      <Seo page="serviceHyperautomation" />
      <ServiceDetailTemplate content={HYPERAUTOMATION} />
    </>
  );
}
