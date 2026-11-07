import { Seo } from "../../components/common/Seo";
import { CourseDetailTemplate } from "../../components/sections/CourseDetailTemplate/CourseDetailTemplate";
import { AI_DATA_SCIENCE } from "../../data/courses/aiDataScience";

export default function AiDataScienceCoursePage() {
  return (
    <>
      <Seo page="courseAiDataScience" />
      <CourseDetailTemplate course={AI_DATA_SCIENCE} />
    </>
  );
}
