import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { GREEN_RECOVERY } from "../../data/services-detail/greenRecovery";

export default function GreenRecoveryPage() {
  return (
    <>
      <Seo page="serviceGreenRecovery" />
      <ServiceDetailTemplate content={GREEN_RECOVERY} />
    </>
  );
}
