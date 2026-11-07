import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** WebOps & AI/ML Training — content from corporate-training-kerala--webops-ai-ml.html. */
export const WEBOPS_AI_ML: TrainingCourse = {
  title: "WebOps & AI/ML Training",
  description: "WebOps & AI/ML Training training shaped around your team. 6–15 per batch. On-site or Virtual.",
  facts: [
    "WebOps + AI/ML",
    "6–15 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-robot-ai",
  program: [
    "Ops teams keep getting asked to 'add some AI' to their monitoring and workflows, usually without much guidance on what that actually means in practice. This program covers both halves of that request together, rather than treating them as separate courses.",
    "Half the time goes to the operational fundamentals (deployment, monitoring, incident response) and the other half to practical AI/ML skills your team can plug into that same workflow.",
  ],
  curriculum: [
    { number: "01", title: "Web Operations", description: "Monitoring, deployment and incident response for production web systems." },
    { number: "02", title: "AI/ML Fundamentals", description: "Practical machine learning basics, taught alongside the ops work, not separately." },
    { number: "03", title: "Automating Ops with AI", description: "Where AI genuinely helps with monitoring and triage, and where it just adds noise." },
    { number: "04", title: "Reliability Practices", description: "The unglamorous habits (logging, alerting, runbooks) that prevent 2am pages." },
  ],
  audience: [
    "Ops and infrastructure teams curious about applying AI to their own workflows",
    "Engineers who handle both deployment and a bit of everything else",
    "Teams that want one program covering both reliability and AI basics",
  ],
  outcomes: [
    "A more reliable deployment and monitoring setup",
    "A working AI-assisted tool built during training",
    "A team that can tell the difference between AI hype and AI that helps",
  ],
  faq: [
    {
      question: "How does this differ from the Cloud Computing Bootcamp?",
      answer: "The Cloud Bootcamp teaches cloud platforms and DevOps from the ground up. WebOps & AI/ML assumes your team already runs production systems and adds two things: sharper reliability practice and applied AI on top of it. Cloud-first teams often run the Bootcamp first.",
    },
    {
      question: "Can the training run against our actual infrastructure?",
      answer: "Against a staging or sandboxed mirror of it, yes, under NDA if required, which is where the monitoring and incident-response exercises get real. We don't run break-and-fix drills on live production, for obvious reasons.",
    },
    {
      question: "What does \"a working AI-assisted tool\" actually mean?",
      answer: "Something small and genuinely yours: for example a log-triage assistant or an alert summarizer wired into your stack during the sessions. The point is your team shipping one real AI-assisted improvement, not a slide about possibilities.",
    },
  ],
};
