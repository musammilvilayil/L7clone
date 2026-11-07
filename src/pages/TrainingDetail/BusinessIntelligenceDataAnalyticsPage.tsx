import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { BUSINESS_INTELLIGENCE_DATA_ANALYTICS } from "../../data/corporate-training/businessIntelligenceDataAnalytics";

export default function BusinessIntelligenceDataAnalyticsPage() {
  return (
    <>
      <Seo page="trainingBusinessIntelligenceDataAnalytics" />
      <TrainingDetailTemplate course={BUSINESS_INTELLIGENCE_DATA_ANALYTICS} />
    </>
  );
}
