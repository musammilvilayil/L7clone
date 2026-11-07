import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { HEADLESS_CMS } from "../../data/services-detail/headlessCms";

export default function HeadlessCmsPage() {
  return (
    <>
      <Seo page="serviceHeadlessCms" />
      <ServiceDetailTemplate content={HEADLESS_CMS} />
    </>
  );
}
