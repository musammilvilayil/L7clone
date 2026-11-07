import type { ImageName } from "../../../data/images.generated";
import { ContactSection } from "../Contact/ContactSection";
import {
  DetailCards,
  DetailCurriculum,
  DetailFaq,
  DetailList,
  DetailSection,
  type DetailCard,
  type DetailCurriculumItem,
  type DetailFaqItem,
} from "../DetailSection/DetailSection";
import { LandingHero } from "../LandingHero/LandingHero";

/** Everything that varies between the individual training & internship course pages. */
export interface CourseContent {
  title: string;
  description: string;
  facts: string[];
  image: ImageName;
  programTitle: string;
  program: string[];
  curriculumTitle: string;
  curriculum: DetailCurriculumItem[];
  /** Pace options (1-month / 3-month) — absent on single-format workshops. */
  tracks?: DetailCard[];
  audienceTitle: string;
  audience: string[];
  audienceNote?: string;
  outcomesTitle: string;
  outcomes: string[];
  faq: DetailFaqItem[];
}

/**
 * Shared layout of the training & internship course pages
 * (full-stack-developer-course-trivandrum.html and siblings): hero with quick
 * facts, then program, curriculum, optional pace tracks, audience, outcomes
 * and FAQ. Section order and styling are fixed; titles and content are data.
 */
export function CourseDetailTemplate({ course }: { course: CourseContent }) {
  return (
    <>
      <LandingHero
        eyebrow="Training & internship"
        title={course.title}
        description={course.description}
        facts={course.facts}
        image={{ name: course.image, alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="The program" title={course.programTitle} light>
          {course.program.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </DetailSection>
        <DetailSection eyebrow="The curriculum" title={course.curriculumTitle}>
          <DetailCurriculum items={course.curriculum} />
        </DetailSection>
        {course.tracks && (
          <DetailSection eyebrow="Your track" title="Choose your pace." light>
            <DetailCards items={course.tracks} />
          </DetailSection>
        )}
        <DetailSection eyebrow="Who it’s for" title={course.audienceTitle}>
          <DetailList items={course.audience} />
          {course.audienceNote && <p>{course.audienceNote}</p>}
        </DetailSection>
        <DetailSection eyebrow="Your next chapter" title={course.outcomesTitle} light>
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
