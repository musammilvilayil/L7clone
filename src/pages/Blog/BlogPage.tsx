import { Seo } from "../../components/common/Seo";
import { BlogIndex } from "../../components/sections/BlogIndex/BlogIndex";
import { ContactSection } from "../../components/sections/Contact/ContactSection";

/** Insights — the blog hub, rebuilt from blogs.html: sidebar + filterable story grid, then the enquiry CTA. */
export default function BlogPage() {
  return (
    <>
      <Seo page="blog" />
      <BlogIndex />
      <ContactSection headingLevel="h2" />
    </>
  );
}
