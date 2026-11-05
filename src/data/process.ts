/** How Ladder7 works: the four-phase journey and the seven delivery steps (design copy). */

export interface Phase {
  number: string;
  title: string;
  description: string;
}

export const JOURNEY_PHASES: Phase[] = [
  {
    number: "01",
    title: "Understand",
    description: "Start with your customers, workflows and business priorities. Define what needs to change.",
  },
  {
    number: "02",
    title: "Connect",
    description: "Map the experience, integrations and architecture around a practical path to delivery.",
  },
  {
    number: "03",
    title: "Engineer",
    description: "Bring together software engineering, applied AI and the platforms your business relies on.",
  },
  {
    number: "04",
    title: "Evolve",
    description: "Use feedback and operational insight to inform the next useful improvement.",
  },
];

export interface DeliveryStep {
  title: string;
  kicker: string;
  description: string;
  question: string;
}

export const DELIVERY_STEPS: DeliveryStep[] = [
  {
    title: "Discovery",
    kicker: "Understand the real need",
    description:
      "Look at your customers, existing systems and the work your team does every day. Identify the problem worth solving first.",
    question: "Where does your current digital experience create the most friction?",
  },
  {
    title: "Define the outcome",
    kicker: "Give the work a clear direction",
    description: "Agree on a practical business goal, the project scope and what a useful outcome should look like.",
    question: "What should customers or your team be able to do better?",
  },
  {
    title: "Design the experience",
    kicker: "Make the next action clear",
    description: "Map the customer journey, content and interactions around the task people need to complete.",
    question: "What is the clearest next step for the person using this?",
  },
  {
    title: "Plan the architecture",
    kicker: "Connect the right foundations",
    description: "Choose the platforms, data flows and integrations that fit the needs of the business.",
    question: "Which systems need to work together, and what needs to stay secure?",
  },
  {
    title: "Build & integrate",
    kicker: "Turn the plan into working software",
    description:
      "Bring the experience, application logic and connected services together through focused engineering.",
    question: "What is the smallest useful version we can put into practice?",
  },
  {
    title: "Test & refine",
    kicker: "Check the details that matter",
    description:
      "Review real workflows, accessibility, performance and reliability. Use feedback to improve the experience.",
    question: "Does this work clearly and reliably for the people who need it?",
  },
  {
    title: "Launch & evolve",
    kicker: "Build on what you learn",
    description:
      "Put the solution to work, learn from how people use it and choose the next useful improvement.",
    question: "What should we learn from this release before taking the next step?",
  },
];

/** "What digital progress can look like" — separated by red bullets. */
export const PROGRESS_PHRASES = [
  "Clearer strategy",
  "Useful digital experiences",
  "Connected systems",
  "Practical AI",
  "Less friction",
  "Better decisions",
  "Your next stage",
];
