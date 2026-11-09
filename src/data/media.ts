/** Photo usage: film slides and the "possibilities" collage. */
import type { ImageName } from "./images.generated";

export const FILM = {
  poster: "photos/workspace-laptop" as ImageName,
  posterAlt: "A laptop showing code beside a stack of notebooks on a desk",
  durationMs: 20_000,
  slides: [
    { image: "photos/team-analytics-review" as ImageName, label: "01 / Strategy", title: "Start with\nthe outcome" },
    { image: "photos/ai-processor" as ImageName, label: "02 / Experience", title: "Connect with\nyour customers" },
    { image: "photos/code-editor" as ImageName, label: "03 / Engineering", title: "Build the\nright system" },
    { image: "photos/online-checkout" as ImageName, label: "04 / Evolve", title: "Move your\nbusiness forward" },
  ],
};

/** Three drifting columns with distinct photos, arranged as in the design. */
export const WALL_COLUMNS: ImageName[][] = [
  [
    "photos/team-collaboration",
    "photos/idea-lightbulb",
    "photos/ai-network-brain",
    "photos/product-dashboard-scan",
    "photos/product-dashboard-agents",
    "photos/product-dashboard-nocode",
  ],
  [
    "photos/team-whiteboard-session",
    "photos/team-collaboration-desks",
    "photos/team-workshop",
    "photos/product-outreach-dashboard",
    "photos/product-insights-dashboard",
    "photos/mirror-reflection-portrait",
  ],
  [
    "photos/students-laptop-group",
    "photos/training-laptop-code",
    "photos/training-python-code",
    "photos/training-analytics-dashboard",
    "photos/training-robot-ai",
    "photos/mentorship-interview",
  ],
];

export const STATUES = {
  before: {
    image: "why/statue-fractured" as ImageName,
    alt: "A heavily fractured ivory and gold Kathakali-inspired Kerala sculpture with missing crown, cheek and shoulder pieces, facing inward",
  },
  after: {
    image: "why/statue-restored" as ImageName,
    alt: "An intact ivory and gold Kathakali-inspired Kerala sculpture with an ornate crown, facing inward",
  },
};
