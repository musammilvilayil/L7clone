import { Seo } from "../../components/common/Seo";
import { SmartLink } from "../../components/common/SmartLink";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailSection } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";
import { SITE_DIRECTORY } from "../../data/siteDirectory";
import { ROUTES } from "../../routes";
import "./SitemapPage.css";

const LIVE_PATHS = new Set(ROUTES.map((route) => route.path));
const PAGES = SITE_DIRECTORY.filter((page) => LIVE_PATHS.has(page.to));

/** HTML sitemap — every page in one list; rebuilt from sitemap.html. */
export default function SitemapPage() {
  return (
    <>
      <Seo page="sitemap" />
      <LandingHero
        eyebrow="Explore Ladder7"
        title="Every path. One place"
        description="Explore Ladder7’s technology, products, learning programs and company pages."
        image={{ name: "photos/team-collaboration", alt: "", caption: "Ladder7 / Your next chapter" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="All pages" title="Explore the whole site." light>
          <nav aria-label="All pages">
            <ul className="site-directory">
              {PAGES.map((page) => (
                <li key={page.to}>
                  <SmartLink to={page.to}>{page.label}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
