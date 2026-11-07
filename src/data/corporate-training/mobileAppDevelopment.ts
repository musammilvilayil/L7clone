import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Mobile Application Development — content from corporate-training-kerala--mobile-app-development.html. */
export const MOBILE_APP_DEVELOPMENT: TrainingCourse = {
  title: "Mobile Application Development",
  description: "Mobile Application Development training shaped around your team. 6–15 per batch. On-site or Virtual.",
  facts: [
    "Java / Kotlin / Android / Flutter",
    "6–15 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-mobile-phone",
  program: [
    "Companies usually come to us with one of two problems: they have web developers who need to pick up mobile, or they have a Flutter or native app that only one person on the team really understands. Either way, the fix is the same: get more people comfortable in the codebase.",
    "We split time between native Android (Java and Kotlin) and Flutter, so your team leaves knowing which approach actually fits a given project instead of defaulting to whatever was used last time.",
  ],
  curriculum: [
    { number: "01", title: "Native Android", description: "Java and Kotlin fundamentals through to a working, installable app." },
    { number: "02", title: "Flutter", description: "One codebase for Android and iOS both: useful for teams that need to move fast." },
    { number: "03", title: "APIs & State", description: "Connecting a mobile app to real backend services and keeping state manageable." },
    { number: "04", title: "Publishing", description: "What it actually takes to get an app through the Play Store review process." },
  ],
  audience: [
    "Web developers picking up mobile as a second platform",
    "Teams choosing between native and cross-platform for a new product",
    "QA and support staff who need to understand the codebase they’re testing",
  ],
  outcomes: [
    "A working Android app built and tested during training",
    "A clear view of when Flutter makes sense over native, and when it doesn’t",
    "Fewer dependencies on outside contractors for routine app updates",
  ],
  faq: [
    {
      question: "Can the training focus on our existing app's codebase?",
      answer: "Yes, where practical, and under NDA if required. Working inside (or on a sanitized copy of) your actual app is the fastest way to reduce the single-person dependency most teams come to us with.",
    },
    {
      question: "Do you cover iOS?",
      answer: "Natively, no; this track is Android-first. Flutter, which the program covers in depth, ships to both Android and iOS from one codebase, and for most teams that's the practical route to iOS.",
    },
    {
      question: "Our developers only know web (React/JS). How steep is the jump?",
      answer: "Manageable, and common: web developers are half our attendees. Flutter's widget model feels familiar to React developers, and the program is paced for exactly this transition.",
    },
  ],
};
