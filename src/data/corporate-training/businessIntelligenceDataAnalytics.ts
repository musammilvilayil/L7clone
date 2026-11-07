import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Business Intelligence & Data Analytics — content from corporate-training-kerala--business-intelligence-data-analytics.html. */
export const BUSINESS_INTELLIGENCE_DATA_ANALYTICS: TrainingCourse = {
  title: "Business Intelligence & Data Analytics",
  description: "Business Intelligence & Data Analytics training shaped around your team. 6–20 per batch. On-site or Virtual.",
  facts: [
    "BI Tools & Data-Driven Decisions",
    "6–20 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-analytics-dashboard",
  program: [
    "Plenty of companies already have a BI tool sitting somewhere in their stack that nobody quite uses properly: a dashboard someone built two years ago that's since gone stale. This program is as much about fixing that habit as it is about the tooling itself.",
    "We'll connect your actual data sources, rebuild the dashboards that matter, and spend real time on how to read them critically instead of taking every chart at face value.",
  ],
  curriculum: [
    { number: "01", title: "BI Tooling", description: "Setting up and maintaining dashboards that stay useful after the training ends." },
    { number: "02", title: "Data Analysis", description: "Reading BI output critically instead of taking every chart at face value." },
    { number: "03", title: "Connecting Data Sources", description: "Getting data from where it lives into a dashboard people actually check." },
    { number: "04", title: "Data-Driven Decision Making", description: "Building the habit of checking the dashboard before the meeting, not after." },
  ],
  audience: [
    "Teams with a BI tool already in place that nobody quite uses well",
    "Managers who want decisions backed by a dashboard, not a hunch",
    "Analysts responsible for keeping reporting accurate and current",
  ],
  outcomes: [
    "A working BI dashboard built on your own data",
    "A clearer sense of which metrics actually matter for your team",
    "Fewer decisions made purely on gut feeling",
  ],
  faq: [
    {
      question: "Which BI tools do you train on?",
      answer: "Whichever you already own: Power BI, Tableau or comparable platforms. The point of this track is making YOUR existing tool earn its license, not selling you a new one.",
    },
    {
      question: "How is this different from the Data Visualization track?",
      answer: "Data Visualization teaches individuals to build better reports and dashboards. This track is organizational: connecting live data sources, keeping dashboards current, and changing how the team uses them in decisions. They pair well, run in either order.",
    },
    {
      question: "Our dashboards go stale within months. Does training fix that?",
      answer: "That staleness is usually an ownership and habit problem, not a tooling one, and it's addressed head-on: who maintains what, refresh workflows, and making the dashboard the meeting's starting point.",
    },
  ],
};
