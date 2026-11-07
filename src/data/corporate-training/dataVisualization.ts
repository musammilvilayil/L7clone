import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Data Visualization — content from corporate-training-kerala--data-visualization.html. */
export const DATA_VISUALIZATION: TrainingCourse = {
  title: "Data Visualization",
  description: "Data Visualization training shaped around your team. 6–20 per batch. On-site or Virtual.",
  facts: [
    "Power BI / Excel / Tableau",
    "6–20 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-analytics-dashboard",
  program: [
    "There's usually nothing wrong with the data your team collects. The problem is that it lives in a spreadsheet nobody outside the team ever opens. This program is about presentation as much as it's about analysis.",
    "We work across Power BI, advanced Excel, PowerPoint and Tableau, and let your team pick whichever tool fits what leadership already expects to see. The exercises use your own data wherever possible, not sample files.",
  ],
  curriculum: [
    { number: "01", title: "Power BI", description: "Building interactive dashboards straight from your existing data sources." },
    { number: "02", title: "Advanced Excel", description: "Pivot tables, formulas and formatting that go well past basic spreadsheets." },
    { number: "03", title: "PowerPoint for Data", description: "Presenting numbers to people who won't read a spreadsheet, only a slide." },
    { number: "04", title: "Tableau", description: "For teams that need more visual flexibility than Excel or Power BI offer." },
  ],
  audience: [
    "Anyone who builds reports that get read by people outside their team",
    "Analysts moving from static spreadsheets to interactive dashboards",
    "Managers who want their team’s data to actually change decisions",
  ],
  outcomes: [
    "A live dashboard built from your own data during the session",
    "Reports people open instead of ignoring",
    "A shared visual language across teams reading the same numbers",
  ],
  faq: [
    {
      question: "Do we need Power BI or Tableau licenses before the training?",
      answer: "For Power BI, the free desktop version covers the whole program, so no upfront license cost. Tableau offers trial licenses that cover a training window. We'll confirm the exact setup checklist before day one.",
    },
    {
      question: "Can one batch cover both Power BI and Excel?",
      answer: "Yes, that's the most common pairing: Excel for the analysts' daily work, Power BI for what leadership sees. Adding Tableau too usually means extending the schedule rather than diluting all three.",
    },
    {
      question: "Will you work with our actual company data?",
      answer: "Wherever possible, yes, under NDA if required, because a dashboard built on your real numbers keeps getting used after the trainer leaves. Sanitised extracts work fine when live access isn't practical.",
    },
    {
      question: "Do you run Excel-only training for employees?",
      answer: "Yes. If your team's daily work lives in Excel, the program can run entirely as advanced Excel training for employees: pivot tables, formulas, data cleanup and report formatting, with the BI tools left out or added later.",
    },
  ],
};
