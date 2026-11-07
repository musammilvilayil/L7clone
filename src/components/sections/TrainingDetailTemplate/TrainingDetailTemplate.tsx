import type { ImageName } from "../../../data/images.generated";
import { ContactSection } from "../Contact/ContactSection";
import {
  DetailCurriculum,
  DetailFaq,
  DetailList,
  DetailSection,
  type DetailCurriculumItem,
  type DetailFaqItem,
} from "../DetailSection/DetailSection";
import { LandingHero } from "../LandingHero/LandingHero";

/** Everything that varies between corporate-training course pages. */
export interface TrainingCourse {
  title: string;
  description: string;
  /** Quick facts under the hero actions (stack, batch size, delivery mode). */
  facts: string[];
  image: ImageName;
  program: string[];
  curriculum: DetailCurriculumItem[];
  audience: string[];
  outcomes: string[];
  faq: DetailFaqItem[];
}

/**
 * Shared layout of the 11 corporate-training course pages
 * (corporate-training-kerala--*.html): hero with quick facts, then the same
 * five sections — program, curriculum, audience, outcomes, FAQ — whose
 * headings are identical on every course; only the content differs.
 */
export function TrainingDetailTemplate({ course }: { course: TrainingCourse }) {
  return (
    <>
      <LandingHero
        eyebrow="Corporate course"
        title={course.title}
        description={course.description}
        facts={course.facts}
        image={{ name: course.image, alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="The program" title="Practical learning. A clearer next step." light>
          {course.program.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </DetailSection>
        <DetailSection eyebrow="The curriculum" title="What your team will explore.">
          <DetailCurriculum items={course.curriculum} />
        </DetailSection>
        <DetailSection eyebrow="Who it’s for" title="Built for people like you.">
          <DetailList items={course.audience} />
        </DetailSection>
        <DetailSection eyebrow="Your next chapter" title="Take the learning into your work." light>
          <DetailList items={course.outcomes} />
        </DetailSection>
        <DetailSection eyebrow="A little more clarity" title="Good questions.">
          <DetailFaq items={course.faq} defaultOpen={-1} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
