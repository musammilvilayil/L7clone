import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailCards, DetailFaq, DetailSection, type DetailCard, type DetailFaqItem } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const WHAT_IT_CHECKS: DetailCard[] = [
  { number: "01", title: "Performance", description: "Core Web Vitals against Google's thresholds, plus which JavaScript files consume startup CPU, by file URL" },
  { number: "02", title: "Accessibility", description: "Automated WCAG 2.2 AA testing with the failing element named" },
  { number: "03", title: "SEO", description: "Crawlability, metadata, headings, internal structure and indexation" },
  { number: "04", title: "AEO", description: "Whether your pages answer the question a search engine can lift" },
  { number: "05", title: "GEO", description: "Whether generative engines can read, understand and cite you" },
  { number: "06", title: "AI readiness", description: "Schema coverage, robots and AI-crawler access, citation worthiness" },
  { number: "07", title: "AI shopping", description: "Product-page diagnostics for buying agents: structured pricing, availability, identifiers" },
  { number: "08", title: "Mobile readiness", description: "Real-device testing across a handset matrix, not one emulator" },
  { number: "09", title: "Security", description: "Headers, transport, exposure and configuration" },
  { number: "10", title: "Sentiment", description: "How the brand reads, benchmarked against tracked rivals" },
  { number: "11", title: "Content optimization", description: "Experience and expertise signals, freshness drift, topical gaps" },
  { number: "12", title: "Journey optimization", description: "Where intent leaks on the path to conversion, by device and step" },
];

const HOW_IT_WORKS: DetailCard[] = [
  { number: "01", title: "See why", description: "Twelve lenses run in one pass and return severity-weighted scores, with page-level intelligence on intent, audience and category." },
  { number: "02", title: "Fix smarter", description: "Every diagnosis ships with a proposed patch, a ticket and a confidence score, opened straight against your repo or CMS." },
  { number: "03", title: "Predict", description: "Each issue carries an estimated revenue exposure drawn from your own analytics, so a sprint gets allocated against dollars rather than a hunch." },
  { number: "04", title: "Monitor", description: "Per-release scoring and diffs, across geography, device and network, with alerts into Slack or Teams." },
  { number: "05", title: "Heal", description: "Known-safe regressions auto-merge inside the guardrails you set. Everything else queues with a recommendation." },
];

const FAQ: DetailFaqItem[] = [
  {
    question: "What is Site 360?",
    answer:
      "A website-intelligence platform from Ladder7 NextStep Solutions. It audits your live site across twelve lenses, including performance, accessibility, SEO, AEO, GEO, AI readiness and security, and unifies the results into a single Digital Health score with fixes ranked by impact.",
  },
  {
    question: "Does it run real checks or simulations?",
    answer:
      "Real checks against your actual live website, rather than estimates from cached or sampled data, so findings reflect how search engines, auditors and AI systems really read your site.",
  },
  {
    question: "What is the Digital Health score?",
    answer:
      "One number summarising your site's health across all twelve lenses, so teams track a single shared metric over time instead of a dozen disconnected ones.",
  },
  {
    question: "How does it decide what to fix first?",
    answer:
      "By impact. Findings are tied to traffic, conversion and revenue through your analytics connectors, so the ranking reflects what moves the numbers rather than the order a checklist happened to run in.",
  },
  {
    question: "Can it benchmark against competitors?",
    answer: "Yes. Name your rivals and they are scored on the same twelve lenses weekly, including share of voice and citation share on AI surfaces.",
  },
  {
    question: "Does it change my site without asking?",
    answer:
      "Only within limits you set. Patterns you have approved can auto-merge; everything else waits for review, every patch is editable, and rollback is one click.",
  },
  {
    question: "How do I get started?",
    answer: "Enter your URL to run a scan, or book a demo for a guided walkthrough on your own site.",
  },
];

/** Site 360 — the 12-lens website audit platform, then the standard enquiry CTA. */
export default function Site360Page() {
  return (
    <>
      <Seo page="productSite360" />
      <LandingHero
        eyebrow="Site 360"
        title="One website audit across twelve lenses"
        description="Audit your website across twelve lenses. Turn performance, accessibility, search, AI readiness and security findings into one Digital Health score and a prioritised plan."
        image={{ name: "photos/product-dashboard-agents", alt: "", caption: "Site 360" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="The Problem" title="Six tools, six verdicts, and nothing that ships the fix" light>
          <p>
            Your SEO platform does not know whether an answer engine can read the page. Your accessibility scanner does not know which pages
            carry revenue. Your performance tool grades a lab simulation rather than the site your customers load. Each one is confident, and
            no two agree on what to fix first.
          </p>
          <p className="detail-emphasis">The findings are saved as a PDF. The fix never reaches the backlog.</p>
        </DetailSection>
        <DetailSection eyebrow="What it checks" title="Twelve lenses, one scan">
          <DetailCards items={WHAT_IT_CHECKS} />
          <p>Every lens runs against your live site. No simulations, no sampled estimates, no cached approximations.</p>
        </DetailSection>
        <DetailSection eyebrow="How it works" title="Five steps, and the loop closes itself" light>
          <DetailCards items={HOW_IT_WORKS} />
        </DetailSection>
        <DetailSection eyebrow="The Supervisor" title="It decides what matters, then routes the work">
          <p>
            The Supervisor is the orchestration layer, not a thirteenth lens. It sequences the twelve module agents by effort, risk and
            revenue impact, auto-merges patterns you have already approved, queues the rest with a recommendation, and escalates to a named
            human owner whenever confidence drops below the threshold you set.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Your Stack" title="Data in, fixes out" light>
          <p>No copy-paste, and nothing that ends its life as an exported CSV.</p>
        </DetailSection>
        <DetailSection eyebrow="A LITTLE MORE CLARITY" title="Good questions.">
          <DetailFaq items={FAQ} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
