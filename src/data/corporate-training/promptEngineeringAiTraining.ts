import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** AI Training — content from corporate-training-kerala--prompt-engineering-ai-training.html. */
export const PROMPT_ENGINEERING_AI_TRAINING: TrainingCourse = {
  title: "AI Training",
  description: "AI Training training shaped around your team. 8–25 per batch. On-site or Virtual.",
  facts: [
    "LLMs & Advanced Prompting",
    "8–25 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-ai-prompt",
  program: [
    "Almost every team we walk into already has ChatGPT open in a browser tab somewhere. The problem is rarely access. It's that people write one vague prompt, get a mediocre answer, and conclude the tool isn't that useful for their work.",
    "This session fixes that gap directly. We cover how these models actually behave, the prompting techniques that reliably improve output, and where a chatbot genuinely saves time versus where it just adds a step.",
  ],
  curriculum: [
    { number: "01", title: "How LLMs Actually Work", description: "Just enough of the underlying mechanics to prompt them well, without the maths." },
    { number: "02", title: "Advanced Prompting Techniques", description: "Few-shot examples, chain-of-thought, role prompting, and when each one helps." },
    { number: "03", title: "ChatGPT vs Gemini", description: "Where these models differ in practice, and how to pick the right one for a task." },
    { number: "04", title: "Using LLMs Responsibly at Work", description: "What to keep out of a prompt, and how to sanity-check what comes back." },
  ],
  audience: [
    "Teams already using ChatGPT or Gemini but getting inconsistent results",
    "Non-technical staff who want AI tools to actually save them time",
    "Managers deciding how AI tools fit into existing workflows",
  ],
  outcomes: [
    "A personal prompt library built during the session",
    "Noticeably faster, more reliable output from tools you already pay for",
    "A realistic view of where LLMs help and where they don’t",
  ],
  faq: [
    {
      question: "Is this AI training suitable for non-technical employees?",
      answer: "Yes, it's designed for them. No coding is involved anywhere in the session; if your team writes emails, reports, analyses or content, they're the audience. Mixed technical/non-technical batches also work well.",
    },
    {
      question: "Which AI tools does the training cover?",
      answer: "ChatGPT and Gemini as the primary tools, with the techniques taught deliberately transferable to Copilot, Claude and whatever your company adopts next. If you've standardized on one platform, the exercises run on that one.",
    },
    {
      question: "What about data security?",
      answer: "Our staff shouldn't paste client data into chatbots. That concern is a module, not a footnote: what never goes into a prompt, how to use anonymized stand-ins, and what your company policy should cover. Teams leave more productive AND more careful.",
    },
    {
      question: "How long is the program?",
      answer: "Most teams run it as a 1 or 2 day intensive per batch. It's the fastest track we offer, and the most common first engagement for companies trying us out.",
    },
  ],
};
