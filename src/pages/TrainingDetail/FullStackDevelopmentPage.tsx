import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { FULL_STACK_DEVELOPMENT } from "../../data/corporate-training/fullStackDevelopment";

export default function FullStackDevelopmentPage() {
  return (
    <>
      <Seo page="trainingFullStackDevelopment" />
      <TrainingDetailTemplate course={FULL_STACK_DEVELOPMENT} />
    </>
  );
}
