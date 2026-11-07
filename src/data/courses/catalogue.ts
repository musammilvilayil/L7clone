import type { ImageName } from "../images.generated";

/** One course card on the Training & Internships hub (design: it-training-internship-trivandrum.html). */
export interface CourseCatalogueItem {
  slug: string;
  to: string;
  title: string;
  /** Card blurb — the design's own truncated course summary. */
  summary: string;
  image: ImageName;
}

export const TRAINING_INTERNSHIP_PATH = "/it-training-internship-trivandrum";

export const COURSE_CATALOGUE: CourseCatalogueItem[] = [
  {
    slug: "full-stack",
    to: "/full-stack-developer-course-trivandrum",
    title: "Full Stack Developer Course in Trivandrum, Kerala",
    summary:
      "This is a live, mentor-led full stack developer course in Trivandrum, Kerala that teaches you to build and deploy complete web applications with the…",
    image: "photos/training-laptop-code",
  },
  {
    slug: "ai-data-science",
    to: "/ai-data-science-course-trivandrum",
    title: "AI, Data Science & Analytics Course in Trivandrum, Kerala — Python Full Stack Training with Real Datasets",
    summary:
      "This is a live, mentor-led AI, data science and data analytics course in Trivandrum, Kerala that teaches you Python programming, web development, and…",
    image: "photos/training-robot-ai",
  },
  {
    slug: "software-testing",
    to: "/software-testing-course-trivandrum",
    title: "Software Testing Course in Trivandrum, Kerala with Placement Support: Manual + Automation Testing Training",
    summary:
      "This is a live, mentor-led software testing course in Trivandrum, Kerala covering manual testing and automation testing with Selenium, plus API…",
    image: "photos/course-software-testing",
  },
  {
    slug: "shopify",
    to: "/shopify-developer-course-workshop",
    title: "Shopify Course in Trivandrum, Kerala: 5-Day Workshop to Build Stores for Clients or Yourself",
    summary:
      "This is a focused, hands-on 5-day Shopify workshop in Trivandrum, Kerala that takes you from a blank account to a live, functioning online store:…",
    image: "photos/course-shopify",
  },
];
