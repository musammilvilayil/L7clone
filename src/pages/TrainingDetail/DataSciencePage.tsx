import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { DATA_SCIENCE } from "../../data/corporate-training/dataScience";

export default function DataSciencePage() {
  return (
    <>
      <Seo page="trainingDataScience" />
      <TrainingDetailTemplate course={DATA_SCIENCE} />
    </>
  );
}
