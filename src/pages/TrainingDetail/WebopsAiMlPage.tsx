import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { WEBOPS_AI_ML } from "../../data/corporate-training/webopsAiMl";

export default function WebopsAiMlPage() {
  return (
    <>
      <Seo page="trainingWebopsAiMl" />
      <TrainingDetailTemplate course={WEBOPS_AI_ML} />
    </>
  );
}
