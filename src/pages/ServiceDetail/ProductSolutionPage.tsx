import { Seo } from "../../components/common/Seo";
import { ServiceDetailTemplate } from "../../components/sections/ServiceDetailTemplate/ServiceDetailTemplate";
import { PRODUCT_SOLUTION } from "../../data/services-detail/productSolution";

export default function ProductSolutionPage() {
  return (
    <>
      <Seo page="serviceProductSolution" />
      <ServiceDetailTemplate content={PRODUCT_SOLUTION} />
    </>
  );
}
