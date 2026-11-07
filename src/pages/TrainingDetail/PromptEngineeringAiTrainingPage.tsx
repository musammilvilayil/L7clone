import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { PROMPT_ENGINEERING_AI_TRAINING } from "../../data/corporate-training/promptEngineeringAiTraining";

export default function PromptEngineeringAiTrainingPage() {
  return (
    <>
      <Seo page="trainingPromptEngineeringAiTraining" />
      <TrainingDetailTemplate course={PROMPT_ENGINEERING_AI_TRAINING} />
    </>
  );
}
