import { Seo } from "../../components/common/Seo";
import { TrainingDetailTemplate } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";
import { DIGITAL_CONTENT_CREATION } from "../../data/corporate-training/digitalContentCreation";

export default function DigitalContentCreationPage() {
  return (
    <>
      <Seo page="trainingDigitalContentCreation" />
      <TrainingDetailTemplate course={DIGITAL_CONTENT_CREATION} />
    </>
  );
}
