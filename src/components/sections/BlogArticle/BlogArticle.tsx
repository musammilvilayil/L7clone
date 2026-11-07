import type { ReactNode } from "react";
import { BLOG_PATH, type BlogBlock, type BlogPostMeta } from "../../../data/blog";
import { Button } from "../../ui/Button";
import { ContactSection } from "../Contact/ContactSection";
import { LandingHero } from "../LandingHero/LandingHero";
import "./BlogArticle.css";

/** Light reading column shared by blog posts and long-form pages such as the privacy policy. */
export function ArticleColumn({ children }: { children: ReactNode }) {
  return (
    <div id="page-content">
      <article className="blog-article">
        <div className="blog-article__body">{children}</div>
      </article>
    </div>
  );
}

/**
 * Shared layout of the 7 blog posts (blogs--*.html): article hero, a light
 * reading column (lead, then h2/p blocks), a return link to the hub, and the
 * standard enquiry CTA.
 */
export function BlogArticle({ post, body }: { post: BlogPostMeta; body: BlogBlock[] }) {
  return (
    <>
      <LandingHero
        eyebrow="Article"
        title={post.title}
        description={post.description}
        image={{ name: post.image, alt: "", caption: "Ladder7 / Your next chapter" }}
        actions={[
          { label: "Read the story", to: "#page-content" },
          { label: "All insights", to: BLOG_PATH },
        ]}
      />
      <ArticleColumn>
        <p className="blog-article__lead">{post.description}</p>
        {body.map((block, index) => (block.kind === "h2" ? <h2 key={index}>{block.text}</h2> : <p key={index}>{block.text}</p>))}
        <div className="blog-article__return">
          <Button to={BLOG_PATH}>All insights</Button>
        </div>
      </ArticleColumn>
      <ContactSection headingLevel="h2" />
    </>
  );
}
