/** Photo usage: film slides and the "possibilities" collage (as arranged in the design). */
import type { ImageName } from "./images.generated";

export const FILM = {
  poster: "photos/workspace-laptop" as ImageName,
  posterAlt: "A laptop showing code beside a stack of notebooks on a desk",
  durationMs: 20_000,
  slides: [
    { image: "photos/workspace-laptop" as ImageName, label: "01 / Strategy", title: "Start with\nthe outcome" },
    { image: "photos/ai-processor" as ImageName, label: "02 / Experience", title: "Connect with\nyour customers" },
    { image: "photos/workspace-laptop" as ImageName, label: "03 / Engineering", title: "Build the\nright system" },
    { image: "photos/online-checkout" as ImageName, label: "04 / Evolve", title: "Move your\nbusiness forward" },
  ],
};

/** Three drifting columns; each lists three images, rendered twice for a seamless loop. */
export const WALL_COLUMNS: ImageName[][] = [
  ["photos/workspace-laptop", "photos/ai-processor", "photos/code-editor"],
  ["photos/workspace-laptop", "photos/online-checkout", "photos/team-workshop"],
  ["photos/ai-processor", "photos/code-editor", "photos/online-checkout"],
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
