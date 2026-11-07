import { Seo } from "../../components/common/Seo";
import { CourseDetailTemplate } from "../../components/sections/CourseDetailTemplate/CourseDetailTemplate";
import { SHOPIFY } from "../../data/courses/shopify";

export default function ShopifyCoursePage() {
  return (
    <>
      <Seo page="courseShopify" />
      <CourseDetailTemplate course={SHOPIFY} />
    </>
  );
}
