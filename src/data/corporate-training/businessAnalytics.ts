import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Business Analytics — content from corporate-training-kerala--business-analytics.html. */
export const BUSINESS_ANALYTICS: TrainingCourse = {
  title: "Business Analytics",
  description: "Business Analytics training shaped around your team. 6–20 per batch. On-site or Virtual.",
  facts: [
    "Data Analysis & Statistical Modeling",
    "6–20 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-analytics-meeting",
  program: [
    "A lot of business analysis stops at 'sales went up' or 'sales went down' without asking why, or whether the change is even real. This program pushes one level deeper: into the statistics behind the number, not just the number itself.",
    "We work in Excel, Python or R depending on where your team already sits, using questions pulled from your own business wherever we can, rather than generic case studies.",
  ],
  curriculum: [
    { number: "01", title: "Data Analysis Fundamentals", description: "Cleaning, exploring and summarizing data before jumping to conclusions." },
    { number: "02", title: "Statistical Modeling", description: "Enough statistics to know when a result is meaningful and when it’s noise." },
    { number: "03", title: "Visualization", description: "Presenting the analysis using Excel, Python or R, depending on your team." },
    { number: "04", title: "Turning Analysis Into Decisions", description: "Framing findings so they actually change what happens next." },
  ],
  audience: [
    "Teams that collect a lot of data but rarely act on it",
    "Analysts who want a firmer grounding in statistics",
    "Managers who want their team’s recommendations backed by numbers",
  ],
  outcomes: [
    "A completed analysis of a real business question your team brought in",
    "More confidence separating a real trend from random variation",
    "A consistent process for turning data into a recommendation",
  ],
  faq: [
    {
      question: "How is this different from your Data Science track?",
      answer: "Business Analytics is decision-focused: statistics, analysis and communication for business questions, comfortable entirely in Excel if that's your team. Data Science goes further into building ML models in Python or R. Teams often run this first.",
    },
    {
      question: "Can our team stay in Excel for the whole program?",
      answer: "Yes. Excel carries the full syllabus for most business teams; Python or R come in only if your team wants them. The statistics matter more than the tool.",
    },
    {
      question: "What does \"questions from our own business\" mean in practice?",
      answer: "Before training, we ask for 2–3 real questions your team keeps circling (\"did the price change actually move sales?\"). Those become the working examples, using sanitized data if needed, so the final analysis is genuinely useful, not homework.",
    },
  ],
};
