import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Digital Content Creation — content from corporate-training-kerala--digital-content-creation.html. */
export const DIGITAL_CONTENT_CREATION: TrainingCourse = {
  title: "Digital Content Creation",
  description: "Digital Content Creation training shaped around your team. 6–15 per batch. On-site or Virtual.",
  facts: [
    "Writing / Design / Video / Social",
    "6–15 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-video-editing",
  program: [
    "Smaller marketing teams end up outsourcing content because nobody in-house has the full toolkit: writing, design and video usually sit with three different people, or three different vendors.",
    "This program is meant to close that gap for one or two people on your team, not turn everyone into a full-time designer. By the end, your team should be able to take a piece of content from idea to published post without waiting on an agency.",
  ],
  curriculum: [
    { number: "01", title: "Content Writing", description: "Writing for the web, not a brochure: structure, tone and SEO basics." },
    { number: "02", title: "Graphic Design", description: "Practical design fundamentals using tools your team can actually license." },
    { number: "03", title: "Video Editing", description: "Cutting, pacing and exporting video content that doesn't need an agency." },
    { number: "04", title: "Social Media Marketing", description: "Planning and posting content that fits how each platform actually works." },
  ],
  audience: [
    "Marketing teams currently outsourcing most of their content",
    "Small teams that need one person to cover writing, design and video",
    "Founders and comms leads who want more control over their own output",
  ],
  outcomes: [
    "A small content calendar built and ready to publish",
    "Comfort using at least one design and one video tool end to end",
    "Less dependency on outside agencies for routine content",
  ],
  faq: [
    {
      question: "Which design and video tools does the training use?",
      answer: "Tools your team can realistically license or use free (for example Canva-class design tools and accessible video editors), configured around what you already have. If you're on Adobe, we train on Adobe.",
    },
    {
      question: "Does this cover using AI tools for content?",
      answer: "Where they genuinely help, yes: drafting, repurposing and ideation are covered honestly, including where AI output needs human editing before it's publishable. For a deeper AI-at-work program, see the Prompt Engineering track.",
    },
    {
      question: "Our whole marketing team is two people. Is that too small a batch?",
      answer: "No; this track exists for exactly that team. Small batches run as intensive working sessions built around your actual upcoming content calendar.",
    },
    {
      question: "Can we book just the social media module as standalone training for employees?",
      answer: "Yes. Social media training for employees runs well as a standalone session (planning, platform-fit content and posting workflow); many teams start there and add writing, design or video later.",
    },
  ],
};
