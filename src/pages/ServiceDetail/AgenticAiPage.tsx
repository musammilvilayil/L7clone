import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { AGENTIC_AI } from "../../data/services-detail/agenticAi";

export default function AgenticAiPage() {
  return (
    <>
      <Seo page="serviceAgenticAi" />
      <ServiceDetailTemplate content={AGENTIC_AI} />
    </>
  );
}
