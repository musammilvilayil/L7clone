import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { BUSINESS_ANALYTICS } from "../../data/corporate-training/businessAnalytics";

export default function BusinessAnalyticsPage() {
  return (
    <>
      <Seo page="trainingBusinessAnalytics" />
      <TrainingDetailTemplate course={BUSINESS_ANALYTICS} />
    </>
  );
}
