import { Seo } from "../../components/common/Seo";
import { SmartLink } from "../../components/common/SmartLink";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import {
  DetailCards,
  DetailFaq,
  DetailList,
  DetailSection,
  type DetailCard,
} from "../../components/sections/DetailSection/DetailSection";
import { LandingHero, type LandingHeroAction } from "../../components/sections/LandingHero/LandingHero";
import {
  websitePageFaqs,
  websitePageSeo,
} from "../../data/websiteSeo";
import {
  type WebsitePageContent,
} from "../../data/websiteContent";
import { useLocation } from "react-router";
import { pageForPath } from "../../routes";

function cardLinks(cards: DetailCard[], source: { links: { text: string; href: string }[] }[]) {
  return source.flatMap((card, index) =>
    card.links.map((link) => ({
      key: `${cards[index]?.title ?? "card"}-${link.href}`,
      ...link,
    })),
  );
}

export function SeoLandingPage({ page }: { page: WebsitePageContent }) {
  const { pathname } = useLocation();
  const pageKey = pageForPath(pathname);
  if (page.page_key !== pageKey) throw new Error(`JSON content does not match route: ${pathname}`);

  const hero = page.sections.find((section) => section.section_name === "Hero");
  if (!hero) throw new Error(`Missing JSON hero section for route: ${pathname}`);

  const seo = websitePageSeo(pageKey);
  const heading = (seo?.h1 ?? hero.section_heading ?? page.document_title).replace(/[.!?]\s*$/, "");
  const heroDescription =
    hero.description ??
    hero.paragraphs?.find((paragraph) => paragraph !== hero.eyebrow) ??
    "";
  const heroActions = (hero.cta_buttons ?? [])
    .filter((action): action is { text: string; url: string } => Boolean(action.text && action.url))
    .slice(0, 2)
    .map((action) => ({ label: action.text, to: action.url })) as LandingHeroAction[];
  const heroFacts = (hero.key_highlights ?? []).map(({ term, detail }) =>
    detail ? `${term}: ${detail}` : term,
  );
  const faqs = websitePageFaqs(pageKey);

  return (
    <>
      <Seo page={pageKey} />
      <LandingHero
        eyebrow={hero.eyebrow ?? ""}
        title={heading}
        description={heroDescription}
        facts={heroFacts}
        actions={heroActions.length === 2 ? [heroActions[0]!, heroActions[1]!] : undefined}
      />
      <div id="page-content">
        {page.sections.map((section, index) => {
          if (["Hero", "Contact"].includes(section.section_name)) return null;

          const title = section.section_heading ?? section.section_name;
          const content = section.content ?? [];
          const paragraphs = content
            .filter((item) => item.type === "p" && item.text !== section.eyebrow)
            .map((item) => item.text);
          const bodyParagraphs =
            paragraphs.length > 0
              ? paragraphs
              : (section.paragraphs ?? []).filter((paragraph) => paragraph !== section.eyebrow);
          const cards = (section.cards ?? []).map((card, cardIndex) => ({
            number: String(cardIndex + 1).padStart(2, "0"),
            title: card.heading,
            description: card.text.join(" "),
          }));
          const links = (section.links ?? []).filter((link) => link.text && link.href);
          const relatedCardLinks = cardLinks(cards, section.cards ?? []);
          const contentBullets = content
            .filter((item) => item.type === "li")
            .map((item) => item.text);
          const bullets = contentBullets.length > 0 ? contentBullets : (section.bullet_points ?? []);
          const subheadings = content
            .filter((item) => item.type === "h3" && item.text !== title)
            .map((item) => item.text);

          return (
            <DetailSection
              key={section.section_id}
              eyebrow={section.eyebrow ?? ""}
              title={title}
              light={index % 2 === 0}
            >
              {section.section_name === "Faq" && faqs.length > 0 ? (
                <DetailFaq items={faqs} defaultOpen={-1} />
              ) : (
                <>
                  {bodyParagraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.section_id}-p-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                  {subheadings.map((subheading) => (
                    <h3 key={`${section.section_id}-${subheading}`}>{subheading}</h3>
                  ))}
                  {cards.length > 0 && <DetailCards items={cards} />}
                  {bullets.length > 0 && <DetailList items={bullets} />}
                  {(links.length > 0 || relatedCardLinks.length > 0) && (
                    <ul className="detail-list">
                      {[...links, ...relatedCardLinks].map((link) => (
                        <li key={`${section.section_id}-${link.href}`}>
                          <SmartLink to={link.href}>{link.text}</SmartLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </DetailSection>
          );
        })}
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
