import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { SKILLED_RESOURCE } from "../../data/services-detail/skilledResource";

export default function SkilledResourcePage() {
  return (
    <>
      <Seo page="serviceSkilledResource" />
      <ServiceDetailTemplate content={SKILLED_RESOURCE} />
    </>
  );
}
