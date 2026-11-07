import type { ImageName } from "./images.generated";

/** One block of an article body (design: .article-body h2 / p). */
export interface BlogBlock {
  kind: "h2" | "p";
  text: string;
}

export type BlogTopic = "ai" | "web" | "culture";

/** Topic filters on the Insights hub (design: .blog-topic-filters). */
export const BLOG_FILTERS: { label: string; value: BlogTopic | "all" }[] = [
  { label: "All topics", value: "all" },
  { label: "AI", value: "ai" },
  { label: "Web engineering", value: "web" },
  { label: "Life at Ladder7", value: "culture" },
];

export interface BlogPostMeta {
  slug: string;
  topic: BlogTopic;
  topicLabel: string;
  readTime: string;
  title: string;
  /** Hero standfirst — also the article's lead paragraph (identical in the design). */
  description: string;
  image: ImageName;
}

export const BLOG_PATH = "/blogs";

/** All posts, in the hub's order (blogs.html). Bodies live in ./blog-posts/ so the hub does not load them. */
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "ai-personalize-web-experince",
    topic: "ai",
    topicLabel: "AI",
    readTime: "2 min read",
    title: "The Role of AI in Personalizing Web Experiences",
    description:
      "Discover how Artificial Intelligence and machine learning are revolutionizing web design through predictive personalization and dynamic content delivery.",
    image: "photos/blog-ai-personalization",
  },
  {
    slug: "ai-tools-web-development-team",
    topic: "ai",
    topicLabel: "AI",
    readTime: "4 min read",
    title: "AI Tools for Web Development Teams: How to Build Intelligent Websites That Convert",
    description:
      "How web development teams can use AI tools to build intelligent websites that improve collaboration, automate repetitive work, and support conversion-focused digital experiences.",
    image: "photos/blog-ai-tools-web-teams",
  },
  {
    slug: "conversational-ai-customer-experience",
    topic: "ai",
    topicLabel: "AI",
    readTime: "3 min read",
    title: "Conversational AI for Customer Experience: When Chatbots Need to Do More",
    description:
      "How enterprise teams can use conversational AI, private knowledge, workflow orchestration, and analytics to improve customer experience beyond scripted chatbots.",
    image: "photos/blog-conversational-ai",
  },
  {
    slug: "why-website-checks-need-to-go-beyond-performance-scores",
    topic: "web",
    topicLabel: "Web engineering",
    readTime: "3 min read",
    title: "Why Website Checks Need to Go Beyond Performance Scores",
    description:
      "A fast site can still fail if buyers, search engines and AI systems cannot understand it or act on it.",
    image: "photos/blog-website-checks",
  },
  {
    slug: "festive-onam-ladder7",
    topic: "culture",
    topicLabel: "Life at Ladder7",
    readTime: "2 min read",
    title: "Festive Moments and Lasting Memories: Ladder7’s Grand Onam Celebration",
    description:
      "Tradition meets tech at Ladder7! Experience the vibrant colors, festive feasts, and lasting memories from our grand Onam celebration in Kerala.",
    image: "photos/blog-onam-celebration",
  },
  {
    slug: "magical-christmas-celebration",
    topic: "culture",
    topicLabel: "Life at Ladder7",
    readTime: "3 min read",
    title: "Lux Noel: A Magical Christmas Celebration",
    description:
      "Explore the festive spirit at Ladder7! Read about \"Lux Noel,\" our magical Christmas celebration filled with team bonding, joy, and holiday cheer.",
    image: "photos/blog-christmas-celebration",
  },
  {
    slug: "independence-day-ladder7",
    topic: "culture",
    topicLabel: "Life at Ladder7",
    readTime: "3 min read",
    title: "Celebrating Unity and Responsibility: Independence Day at Ladder7",
    description:
      "Get an inside look at Ladder7's company culture as we celebrate Independence Day with a focus on unity, corporate social responsibility, and national pride.",
    image: "photos/blog-independence-day",
  },
];

export function blogPost(slug: string): BlogPostMeta {
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) throw new Error(`Unknown blog post: ${slug}`);
  return post;
}
