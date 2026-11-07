import { useRef, useState } from "react";
import { BLOG_FILTERS, BLOG_PATH, BLOG_POSTS, type BlogTopic } from "../../../data/blog";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { SmartLink } from "../../common/SmartLink";
import { Button } from "../../ui/Button";
import { ParticleField } from "../Hero/ParticleField";
import "./BlogIndex.css";

const MORE_LINKS = [
  { label: "Our work", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "Education", to: "/education" },
];

/**
 * Insights hub (design: blogs.html .blog-layout) — a sticky sidebar with
 * breadcrumb, topic filters and onward links, beside the intro and a
 * filterable 3-column story grid.
 */
export function BlogIndex() {
  const [topic, setTopic] = useState<BlogTopic | "all">("all");
  const introRef = useRef<HTMLDivElement>(null);
  const posts = topic === "all" ? BLOG_POSTS : BLOG_POSTS.filter((post) => post.topic === topic);

  return (
    <div className="blog-index">
      <aside className="blog-index__sidebar" aria-label="Explore insights">
        <p className="blog-index__breadcrumb">
          <SmartLink to="/">Home</SmartLink> / Insights
        </p>
        <div className="blog-index__filters" role="group" aria-label="Filter stories by topic">
          {BLOG_FILTERS.map((filter) => (
            <button key={filter.value} type="button" aria-pressed={topic === filter.value} onClick={() => setTopic(filter.value)}>
              {filter.label}
            </button>
          ))}
        </div>
        <p className="blog-index__count" role="status" aria-live="polite">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
        </p>
        <nav className="blog-index__more" aria-label="Explore more">
          <h2>Explore more</h2>
          {MORE_LINKS.map((link) => (
            <SmartLink key={link.to} to={link.to}>
              {link.label}
            </SmartLink>
          ))}
          <Button to="/contact" size="sm">
            Let's talk
          </Button>
        </nav>
      </aside>
      <div className="blog-index__main">
        <div ref={introRef} className="blog-index__intro">
          <ParticleField pointerTarget={introRef} />
          <h1 id="page-title">
            Ideas for your next step.
            <br />
            In technology, work and life<span className="accent">.</span>
          </h1>
          <p>
            Practical perspectives on AI and digital experiences.
            <br />
            Stories from the people behind Ladder7.
          </p>
        </div>
        <div className="blog-index__grid">
          {posts.map((post, index) => (
            <article key={post.slug} className="blog-index__story">
              <SmartLink to={`${BLOG_PATH}/${post.slug}`} className="blog-index__link">
                <span className="blog-index__art">
                  <ResponsiveImage
                    name={post.image}
                    alt=""
                    sizes="(max-width: 700px) 88vw, (max-width: 1000px) 34vw, 23vw"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </span>
                <span className="blog-index__meta">
                  <span>{post.topicLabel}</span>
                  <span>{post.readTime}</span>
                </span>
                <h2>{post.title}</h2>
                <span className="blog-index__author">
                  <span aria-hidden="true">L7</span>Ladder7 team
                </span>
              </SmartLink>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
