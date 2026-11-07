import { Seo } from "../../components/common/Seo";
import { CatalogueGrid } from "../../components/sections/CatalogueGrid/CatalogueGrid";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailSection } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { TRAINING_CATALOGUE } from "../../data/corporateTraining";

const COURSES = TRAINING_CATALOGUE.map((course) => ({
  slug: course.slug,
  to: course.to,
  metaLabel: `Corporate course / ${course.number}`,
  title: course.title,
  description: course.summary,
  image: course.image,
}));

/** Corporate Training — the hub, rebuilt from corporate-training-kerala.html: hero, course grid, how it works, contact CTA. */
export default function CorporateTrainingPage() {
  return (
    <>
      <Seo page="corporateTraining" />
      <LandingHero
        eyebrow="Training index"
        title="Grow your team. Build what comes next"
        description="Ladder7 Nextstep Solutions is a corporate training company in Trivandrum, Kerala, delivering hands-on IT, data, cloud, AI and marketing training to company teams: on-site at your office (Trivandrum, Kochi and across Kerala) or fully virtual."
        image={{ name: "photos/team-collaboration", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Corporate training" title="Build the skills your team needs." light>
          <CatalogueGrid items={COURSES} />
        </DetailSection>
        <DetailSection eyebrow="Explore" title="How corporate training with Ladder7 works" light>
          <p>
            Most companies start with one team and one track, then bring in more once the first batch is done. Every program below can run
            standalone or as part of a bigger upskilling plan.
          </p>
          <p>
            Tell us your headcount, current stack and timeline, and we'll come back with a syllabus proposal, schedule options and a clear
            quote. A plan, not a sales pitch.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Explore" title="Tell us what your team needs to learn">
          <p>Share your headcount, current stack and timeline. We'll come back with a plan, not a sales pitch.</p>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
