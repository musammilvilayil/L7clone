import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { CLOUD_COMPUTING_BOOTCAMP } from "../../data/corporate-training/cloudComputingBootcamp";

export default function CloudComputingBootcampPage() {
  return (
    <>
      <Seo page="trainingCloudComputingBootcamp" />
      <TrainingDetailTemplate course={CLOUD_COMPUTING_BOOTCAMP} />
    </>
  );
}
