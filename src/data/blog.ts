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
  categoryTag?: string;
  date?: string;
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
    categoryTag: "Technical Insights",
    date: "Oct 24, 2023",
    readTime: "8 min read",
    title: "The Role of AI in Personalizing Web User Experiences",
    description:
      "In today’s fast-evolving digital landscape, personalization has become a cornerstone of customer engagement. With users constantly expecting tailored, relevant, and seamless interactions, businesses must leverage cutting-edge technologies to meet these demands.",
    image: "photos/blog-ai-personalization",
  },
  {
    slug: "magical-christmas-celebration",
    topic: "culture",
    topicLabel: "Life at Ladder7",
    categoryTag: "Events",
    date: "Dec 20, 2024",
    readTime: "15 min read",
    title: "Lux Noel: A Magical Christmas Celebration of Togetherness and Festivity",
    description:
      "On December 19, 2024, Ladder7's highly anticipated Christmas celebration, Lux Noel, elevated the festive spirit to a whole new level filled with team bonding, joy, and holiday cheer.",
    image: "photos/blog-christmas-celebration",
  },
  {
    slug: "ai-tools-web-development-team",
    topic: "ai",
    topicLabel: "AI",
    categoryTag: "Web Development",
    date: "Oct 18, 2023",
    readTime: "10 min read",
    title: "AI Tools for Web Development Teams: How to Build Intelligent Websites That Convert",
    description:
      "Learn how web development teams can use AI tools to build intelligent websites that improve collaboration, automate repetitive work, protect quality, and support conversion-focused digital experiences.",
    image: "photos/blog-ai-tools-web-teams",
  },
  {
    slug: "conversational-ai-customer-experience",
    topic: "ai",
    topicLabel: "AI",
    categoryTag: "Conversational AI",
    date: "Oct 26, 2023",
    readTime: "7 min read",
    title: "Conversational AI for Customer Experience: When Chatbots Need to Do More",
    description:
      "Learn how conversational AI can use private knowledge, workflow orchestration, omnichannel context, and analytics to improve customer experience beyond scripted chatbots.",
    image: "photos/blog-conversational-ai",
  },
  {
    slug: "why-website-checks-need-to-go-beyond-performance-scores",
    topic: "web",
    topicLabel: "Web engineering",
    categoryTag: "Website Revenue Checks",
    date: "Nov 2, 2023",
    readTime: "6 min read",
    title: "Why Website Checks Need to Go Beyond Performance Scores",
    description:
      "A practical revenue check for B2B websites: performance matters, but so do SEO, AEO, GEO, accessibility, AI readiness and the path to enquiry.",
    image: "photos/blog-website-checks",
  },
  {
    slug: "festive-onam-ladder7",
    topic: "culture",
    topicLabel: "Life at Ladder7",
    categoryTag: "Events",
    date: "Oct 15, 2023",
    readTime: "6 min read",
    title: "Festive Moments and Lasting Memories: Ladder7’s Grand Onam Celebration",
    description:
      "Onam, the festival of joy, unity, and prosperity, brings people together to celebrate Kerala's rich traditions. At Ladder7 Next Step Solution, this year's Onam celebration was filled with vibrant colors, floral pookalams, and festive feasts.",
    image: "photos/blog-onam-celebration",
  },
  {
    slug: "independence-day-ladder7",
    topic: "culture",
    topicLabel: "Life at Ladder7",
    categoryTag: "Events",
    date: "Aug 16, 2023",
    readTime: "5 min read",
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
