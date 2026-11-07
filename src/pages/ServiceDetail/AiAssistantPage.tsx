import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { AI_ASSISTANT } from "../../data/services-detail/aiAssistant";

export default function AiAssistantPage() {
  return (
    <>
      <Seo page="serviceAiAssistant" />
      <ServiceDetailTemplate content={AI_ASSISTANT} />
    </>
  );
}
