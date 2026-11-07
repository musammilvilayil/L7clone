import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { ANALYTICS_EXPERIMENTATION } from "../../data/services-detail/analyticsExperimentation";

export default function AnalyticsExperimentationPage() {
  return (
    <>
      <Seo page="serviceAnalyticsExperimentation" />
      <ServiceDetailTemplate content={ANALYTICS_EXPERIMENTATION} />
    </>
  );
}
