import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { MARKETING_AUTOMATION_CRM } from "../../data/corporate-training/marketingAutomationCrm";

export default function MarketingAutomationCrmPage() {
  return (
    <>
      <Seo page="trainingMarketingAutomationCrm" />
      <TrainingDetailTemplate course={MARKETING_AUTOMATION_CRM} />
    </>
  );
}
