import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { DATA_VISUALIZATION } from "../../data/corporate-training/dataVisualization";

export default function DataVisualizationPage() {
  return (
    <>
      <Seo page="trainingDataVisualization" />
      <TrainingDetailTemplate course={DATA_VISUALIZATION} />
    </>
  );
}
