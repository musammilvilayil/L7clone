import { Seo } from "../../components/common/Seo";
import { CatalogueGrid } from "../../components/sections/CatalogueGrid/CatalogueGrid";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailSection } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { COURSE_CATALOGUE } from "../../data/courses/catalogue";

const COURSES = COURSE_CATALOGUE.map((course, index) => ({
  slug: course.slug,
  to: course.to,
  metaLabel: `course / ${String(index + 1).padStart(2, "0")}`,
  title: course.title,
  description: course.summary,
  image: course.image,
}));

/** Training & Internships — the hub, rebuilt from it-training-internship-trivandrum.html. */
export default function TrainingInternshipPage() {
  return (
    <>
      <Seo page="trainingInternship" />
      <LandingHero
        eyebrow="Training index"
        title="Learn by doing. Grow with direction"
        description="Ladder7 Nextstep Solutions is an IT training institute in Trivandrum, Kerala offering live, mentor-led courses in MERN full stack development, Python & AI development, software testing, and Shopify e-commerce with hands-on projects, internship support, and certification, at affordable, student-friendly fees."
        image={{ name: "photos/team-collaboration", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Training & internships" title="Choose your next learning step." light>
          <CatalogueGrid items={COURSES} />
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Which course is right for you?" light>
          <p>
            Each of our 5 programs is a complete, standalone course you enrol directly in the one that fits your goal, with no prerequisites
            or bundled tracks. Choose based on where you are in your career journey from in-depth technical training to a 5-day workshop or
            a quick career-direction session. Not sure which fits? Our Career Goal Finding session exists exactly for that.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Ready to start? Talk to a course advisor — free.">
          <p>
            Tell us your background and goals, and we'll recommend the right program, share the full syllabus and fees, and book you into a
            free demo class. No pressure, no spam.
          </p>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
