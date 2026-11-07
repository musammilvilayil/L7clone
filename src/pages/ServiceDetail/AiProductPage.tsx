import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { AI_PRODUCT } from "../../data/services-detail/aiProduct";

export default function AiProductPage() {
  return (
    <>
      <Seo page="serviceAiProduct" />
      <ServiceDetailTemplate content={AI_PRODUCT} />
    </>
  );
}
