import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { MOBILE_APP_DEVELOPMENT } from "../../data/corporate-training/mobileAppDevelopment";

export default function MobileAppDevelopmentPage() {
  return (
    <>
      <Seo page="trainingMobileAppDevelopment" />
      <TrainingDetailTemplate course={MOBILE_APP_DEVELOPMENT} />
    </>
  );
}
