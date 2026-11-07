import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** CRM & Automation Training — content from corporate-training-kerala--marketing-automation-crm.html. */
export const MARKETING_AUTOMATION_CRM: TrainingCourse = {
  title: "CRM & Automation Training",
  description: "CRM & Automation Training training shaped around your team. 6–20 per batch. On-site or Virtual.",
  facts: [
    "Automation Tools & CRM",
    "6–20 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-analytics-meeting",
  program: [
    "It's a common pattern: a company buys a CRM, uses it properly for a month, and then it slowly turns into a half-updated contact list. This program is about fixing that, not selling you on a new tool.",
    "We work inside whatever CRM and marketing automation platform you already have, cleaning up the setup and building the automations your team keeps meaning to get around to.",
  ],
  curriculum: [
    { number: "01", title: "Marketing Automation Tools", description: "Setting up sequences and triggers instead of sending one-off campaigns." },
    { number: "02", title: "CRM Software", description: "Keeping contact and deal data clean enough that reports mean something." },
    { number: "03", title: "Sales Force Automation", description: "Automating the repetitive parts of a sales pipeline so reps sell more and type less." },
    { number: "04", title: "Connecting Marketing and Sales Data", description: "Making sure both teams are looking at the same numbers." },
  ],
  audience: [
    "Sales teams with a CRM that’s mostly full of stale data",
    "Marketing teams sending campaigns manually that could be automated",
    "Founders trying to get sales and marketing to agree on the pipeline",
  ],
  outcomes: [
    "A cleaned-up, actually-used CRM setup",
    "At least one automated campaign live by the end of training",
    "Sales and marketing looking at the same numbers, finally",
  ],
  faq: [
    {
      question: "Which CRM platforms do you support?",
      answer: "The ones you already run: HubSpot, Zoho, Salesforce and comparable platforms. The training happens inside your live instance, or a sandbox copy if you'd rather, because that's where the stale data and the wins both live.",
    },
    {
      question: "Is this training or consulting? You're touching our live setup.",
      answer: "Both, deliberately: your team learns by cleaning and automating their own system with a practitioner alongside, so the improvements and the skills stay after we leave. Pure lecture-style CRM training is why the last attempt didn't stick.",
    },
    {
      question: "Should sales and marketing attend together?",
      answer: "Yes, at least for the shared-data sessions; half the value is both teams agreeing on the same pipeline definitions in the same room. Function-specific sessions then split where useful.",
    },
  ],
};
