import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { LOCALIZATION_UIUX } from "../../data/services-detail/localizationUiux";

export default function LocalizationUiuxPage() {
  return (
    <>
      <Seo page="serviceLocalizationUiux" />
      <ServiceDetailTemplate content={LOCALIZATION_UIUX} />
    </>
  );
}
