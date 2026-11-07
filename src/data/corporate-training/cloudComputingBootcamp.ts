import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Cloud Computing Bootcamp — content from corporate-training-kerala--cloud-computing-bootcamp.html. */
export const CLOUD_COMPUTING_BOOTCAMP: TrainingCourse = {
  title: "Cloud Computing Bootcamp",
  description: "Cloud Computing Bootcamp training shaped around your team. 6–20 engineers per batch. On-site or Virtual.",
  facts: [
    "AWS / Azure / GCP + DevOps",
    "6–20 engineers per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-server-rack",
  program: [
    "Cloud training that never leaves the console tends to fall apart the first time something breaks in production. This bootcamp is built around actually deploying, monitoring and fixing a real application.",
    "We cover AWS, Azure and GCP at the level your projects need, and pair that with the DevOps habits (CI/CD, logging, alerting) that keep a deployment from becoming a 2am phone call.",
  ],
  curriculum: [
    { number: "01", title: "Core Cloud Services", description: "Compute, storage and networking basics across AWS, Azure and GCP." },
    { number: "02", title: "Hands-On Projects", description: "Deploying, and deliberately breaking, a real application rather than a toy demo." },
    { number: "03", title: "DevOps Practices", description: "CI/CD pipelines, monitoring and the habits that keep deployments boring." },
    { number: "04", title: "Cost & Security Basics", description: "Avoiding the two mistakes that get every team’s first cloud bill wrong." },
  ],
  audience: [
    "Teams migrating workloads to the cloud for the first time",
    "Developers who’ve used one cloud provider and need to learn another",
    "Ops teams standardizing on a DevOps workflow",
  ],
  outcomes: [
    "A deployed, working application your team can point to",
    "Working knowledge across at least two major cloud providers",
    "A CI/CD pipeline your team actually understands, not just copied",
  ],
  faq: [
    {
      question: "We only use AWS (or only Azure). Can the bootcamp go single-cloud?",
      answer: "Yes, and it should: depth on your provider beats breadth across three. The multi-cloud version exists for teams that genuinely run mixed estates or are choosing a provider.",
    },
    {
      question: "Does this prepare the team for AWS/Azure certifications?",
      answer: "It builds the working knowledge those certifications test, but the goal is engineers who can deploy and debug, not exam prep. If certification is the mandate, tell us and we'll align the syllabus toward it.",
    },
  ],
};
