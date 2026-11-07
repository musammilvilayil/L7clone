import { Seo } from "../../components/common/Seo";
import { CourseDetailTemplate } from "../../components/sections/CourseDetailTemplate/CourseDetailTemplate";
import { FULL_STACK } from "../../data/courses/fullStack";

export default function FullStackCoursePage() {
  return (
    <>
      <Seo page="courseFullStack" />
      <CourseDetailTemplate course={FULL_STACK} />
    </>
  );
}
