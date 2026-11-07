import { Seo } from "../../components/common/Seo";
import { CourseDetailTemplate } from "../../components/sections/CourseDetailTemplate/CourseDetailTemplate";
import { SOFTWARE_TESTING } from "../../data/courses/softwareTesting";

export default function SoftwareTestingCoursePage() {
  return (
    <>
      <Seo page="courseSoftwareTesting" />
      <CourseDetailTemplate course={SOFTWARE_TESTING} />
    </>
  );
}
