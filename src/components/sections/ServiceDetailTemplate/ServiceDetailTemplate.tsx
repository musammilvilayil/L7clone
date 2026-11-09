import { Fragment, useRef, useState } from "react";
import { useLocation } from "react-router";
import { pageForPath } from "../../../routes";
import {
  sectionTexts,
  websiteSection,
} from "../../../data/websiteContent";
import { useInView } from "../../../hooks/useInView";
import { revealRef } from "../../../hooks/useReveal";
import { Button } from "../../ui/Button";
import { ContactSection } from "../Contact/ContactSection";
import { ParticleField } from "../Hero/ParticleField";
import "./ServiceDetailTemplate.css";

export interface ServiceCard {
  number: string;
  title: string;
  description: string;
}

export interface ServiceEditorialRow {
  title: string;
  paragraphs: string[];
}

export interface ServiceDetailContent {
  /** Breadcrumb category, e.g. "Digital Experience" (shown as "SERVICES / …"). */
  category: string;
  /** The two-line H1. A red full stop is appended to the second line. */
  lines: [string, string];
  intro: string;
  /** Tag-cloud of this service's focus areas (also the "FOCUS AREAS" fact). */
  capabilityCloud: string[];
  aboutHeading: string;
  aboutIntro: string;
  aboutCards: ServiceCard[];
  editorialRows: ServiceEditorialRow[];
  deliverablesHeading: string;
  deliverables: ServiceCard[];
  processHeading?: string;
  processIntro?: string;
  processSteps?: ServiceCard[];
  nextHeading?: string;
  nextIntro?: string;
  nextCards?: { title: string; items: string[] }[];
  heroActions?: { label: string; to: string }[];
  heroFacts?: { term: string; value: string; note: string }[];
  capabilitiesHeading?: string;
}

const PROCESS_STEPS: ServiceCard[] = [
  { number: "01", title: "Understand", description: "Start with your customers, workflows and business priorities." },
  { number: "02", title: "Connect", description: "Map the experience, architecture and integrations." },
  { number: "03", title: "Engineer", description: "Build for the systems and people who will use it." },
  { number: "04", title: "Evolve", description: "Learn from real use and improve the next useful detail." },
];

function splitHeading(value: string, fallback: [string, string]): [string, string] {
  const lines = value.split("\n").map((line) => line.replace(/\.$/, "").trim()).filter(Boolean);
  if (lines.length === 2) return [lines[0]!, lines[1]!];
  const words = value.replace(/\.$/, "").trim().split(/\s+/);
  if (words.length < 2) return fallback;
  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(" "), words.slice(middle).join(" ")];
}

function serviceCopyFromPage(
  fallback: ServiceDetailContent,
  pageKey: string,
): ServiceDetailContent {
  const hero = websiteSection(pageKey, "Service Hero");
  const capabilities = websiteSection(pageKey, "Capabilities");
  const process = websiteSection(pageKey, "Inner Process");
  const about = websiteSection(pageKey, "Inner About");
  const deliverables = websiteSection(pageKey, "Deliverables");
  const next = websiteSection(pageKey, "Inner Next");

  const heroParagraphs = sectionTexts(hero, "p");
  const aboutCards = (about?.cards ?? []).slice(0, 4);
  const editorialRows = (about?.cards ?? []).slice(4);
  const processCards = (process?.cards ?? []).slice(0, 4);
  const nextCards = next?.cards ?? [];
  const heroFacts: NonNullable<ServiceDetailContent["heroFacts"]> = [];
  let currentFact: { term: string; value: string; note: string } | undefined;
  for (const item of hero?.content ?? []) {
    if (item.type === "dt") {
      if (currentFact) heroFacts.push(currentFact);
      currentFact = { term: item.text, value: "", note: "" };
    } else if (item.type === "dd" && currentFact) {
      if (!currentFact.value) currentFact.value = item.text.replace(/\.$/, "");
      else if (!currentFact.note) currentFact.note = item.text;
    }
  }
  if (currentFact) heroFacts.push(currentFact);

  const parsedActions = hero?.cta_buttons
    ?.filter((action): action is typeof action & { url: string } => Boolean(action.url))
    .map((action) => ({ label: action.text, to: action.url }));

  return {
    ...fallback,
    category: hero?.eyebrow?.split("/").slice(1).join("/").trim() || fallback.category,
    lines: hero?.section_heading ? splitHeading(hero.section_heading, fallback.lines) : fallback.lines,
    intro: heroParagraphs.find((paragraph) => !paragraph.startsWith("Services /")) || fallback.intro,
    capabilityCloud:
      capabilities?.bullet_points?.map((item) => item.replace(/\s*·\s*$/, "")) ??
      fallback.capabilityCloud,
    capabilitiesHeading: capabilities?.section_heading || fallback.capabilitiesHeading,
    aboutHeading: about?.section_heading?.replace(/\.$/, "") || fallback.aboutHeading,
    aboutIntro:
      sectionTexts(about, "p").find((paragraph) => paragraph !== "About this service") ??
      fallback.aboutIntro,
    aboutCards: aboutCards.length
      ? aboutCards.map((card, index) => ({
          number: card.text[0] ?? String(index + 1).padStart(2, "0"),
          title: card.heading,
          description: card.text[1] ?? "",
        }))
      : fallback.aboutCards,
    editorialRows: editorialRows.length
      ? editorialRows.map((card) => ({
          title: card.heading,
          paragraphs: card.text,
        }))
      : fallback.editorialRows,
    deliverablesHeading: deliverables?.section_heading || fallback.deliverablesHeading,
    deliverables: deliverables?.cards?.length
      ? deliverables.cards.map((card, index) => ({
          number: card.text[0] ?? String(index + 1).padStart(2, "0"),
          title: card.heading,
          description: card.text[1] ?? "",
        }))
      : fallback.deliverables,
    processHeading: process?.section_heading || fallback.processHeading,
    processIntro: sectionTexts(process, "p")[1] || fallback.processIntro,
    processSteps: processCards.length
      ? processCards.map((card, index) => ({
          number: card.text[0] ?? String(index + 1).padStart(2, "0"),
          title: card.heading.replace(/^\d+\s*\/\s*/, ""),
          description: card.text[1] ?? "",
        }))
      : fallback.processSteps,
    nextHeading: next?.section_heading || fallback.nextHeading,
    nextIntro: sectionTexts(next, "p")[0] || fallback.nextIntro,
    nextCards: nextCards.length
      ? nextCards.map((card) => ({ title: card.heading, items: card.text }))
      : fallback.nextCards,
    heroActions: parsedActions?.length ? parsedActions : fallback.heroActions,
    heroFacts: heroFacts.length ? heroFacts : fallback.heroFacts,
  };
}

/** The ring + progress-bar steps (design: .inner-process) — identical on every service page. */
function InnerProcess({
  heading,
  intro,
  steps,
}: {
  heading?: string;
  intro?: string;
  steps?: ServiceCard[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [replayKey, setReplayKey] = useState(0);
  const inView = useInView(ref, "-100px");
  const active = inView && replayKey >= 0;
  const processSteps = steps ?? PROCESS_STEPS;
  const headingLines = (heading ?? "One goal.\nA connected approach.").split("\n");
  const introLines = (intro ?? "Start with the outcome.\nConnect the thinking, the technology\nand the people who will use it.").split("\n");

  return (
    <section className="inner-process" ref={ref} aria-labelledby="inner-process-title" data-active={active || undefined} key={replayKey}>
      <div className="inner-process__heading">
        <div className="reveal" ref={revealRef}>
          <p className="inner-label">From ambition to action</p>
          <h2 id="inner-process-title">
            {headingLines[0]}
            <br />
            {headingLines.slice(1).join(" ")}<span className="accent">.</span>
          </h2>
        </div>
        <p className="reveal" ref={revealRef}>
          {introLines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      </div>
      <div className="inner-process__rings">
        {processSteps.map((step) => (
          <article key={step.number}>
            <div className="inner-process__ring" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" />
                <circle cx="60" cy="60" r="54" pathLength={100} />
              </svg>
              <span>{step.number}</span>
            </div>
            <h3>
              {step.number} / {step.title}
            </h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
      <div className="inner-process__panel">
        <div className="inner-process__panel-top">
          <span>Your next step / Connected from the start</span>
          <button type="button" className="inner-replay" onClick={() => setReplayKey((k) => k + 1)}>
            <span aria-hidden="true">↻</span> Replay
          </button>
        </div>
        <div className="inner-process__track" aria-hidden="true">
          <span />
        </div>
        <div className="inner-process__labels" aria-hidden="true">
          {processSteps.map((step) => (
            <span key={step.number}>{step.title}</span>
          ))}
        </div>
        <p className="inner-process__caption">A business goal becomes a practical plan. Build, learn and improve the next useful detail.</p>
      </div>
    </section>
  );
}

/** Shared template for every /services/:slug page (design: .inner-service-page). */
export function ServiceDetailTemplate({ content }: { content: ServiceDetailContent }) {
  const heroRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const pageContent = serviceCopyFromPage(content, pageForPath(pathname));

  return (
    <div className="inner-service-page">
      <section ref={heroRef} className="inner-service-hero" aria-labelledby="service-hero-title">
        <ParticleField pointerTarget={heroRef} />
        <p className="eyebrow eyebrow--live">
          <a href="/services">Services</a> / {pageContent.category}
        </p>
        <h1 id="service-hero-title">
          <span>
            <b>{pageContent.lines[0]}</b>
          </span>
          <span>
            <b>
              {pageContent.lines[1]}
              <span className="accent">.</span>
            </b>
          </span>
        </h1>
        <div className="inner-hero-bottom">
          <p>{pageContent.intro}</p>
          <div className="inner-hero-actions">
            {(pageContent.heroActions ?? [
              { label: "Discuss your project", to: "#contact" },
              { label: "Explore capabilities", to: "#capabilities" },
            ]).map((action, index) => (
              <Button key={action.label} to={action.to} variant={index ? "outline" : "primary"} glass={Boolean(index)}>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        <dl className="inner-facts">
          {(pageContent.heroFacts ?? [
            { term: "Focus areas", value: String(pageContent.capabilityCloud.length).padStart(2, "0"), note: "Within this service" },
            { term: "Specialist services", value: "14", note: "Connected around your goal" },
            { term: "Core disciplines", value: "3", note: "Experience, AI and strategy" },
            { term: "Kerala bases", value: "2", note: "Cochin · Trivandrum" },
          ]).map((fact) => (
            <div key={fact.term}>
              <dt>{fact.term}</dt>
              <dd>
                {fact.value}
                <span>.</span>
              </dd>
              <dd className="inner-facts__note">{fact.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="inner-capabilities" id="capabilities" aria-labelledby="capabilities-title">
        <h2 className="inner-label" id="capabilities-title">
          {pageContent.capabilitiesHeading || "What we can build together"}
        </h2>
        <ul className="inner-capability-cloud">
          {pageContent.capabilityCloud.map((tag, index) => (
            <li key={tag}>
              <span>{tag}</span>
              {index < pageContent.capabilityCloud.length - 1 && <i aria-hidden="true">·</i>}
            </li>
          ))}
        </ul>
      </section>

      <InnerProcess heading={pageContent.processHeading} intro={pageContent.processIntro} steps={pageContent.processSteps} />

      <section className="inner-about" aria-labelledby="inner-about-title">
        <p className="inner-label">About this service</p>
        <div className="inner-about__heading">
          <h2 id="inner-about-title" className="reveal" ref={revealRef}>
            {pageContent.aboutHeading}
            <span className="accent">.</span>
          </h2>
          <div className="inner-about__copy reveal" ref={revealRef}>
            <p>{pageContent.aboutIntro}</p>
          </div>
        </div>
        {pageContent.aboutCards.length > 0 && (
          <div className="inner-about__cards">
            {pageContent.aboutCards.map((card) => (
              <article key={card.number} className="reveal" ref={revealRef}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        )}
        {pageContent.editorialRows.map((row) => (
          <article className="inner-editorial-row" key={row.title}>
            <h3 className="reveal" ref={revealRef}>
              {row.title}
            </h3>
            <div className="reveal" ref={revealRef}>
              {row.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      {pageContent.deliverables.length > 0 && (
        <section className="inner-deliverables" aria-labelledby="deliverables-title">
          <p className="inner-label">The capabilities behind your next step</p>
          <h2 id="deliverables-title" className="reveal" ref={revealRef}>
            {pageContent.deliverablesHeading.split("\n").map((line, index, lines) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
                {index === lines.length - 1 && <span className="accent">.</span>}
              </Fragment>
            ))}
          </h2>
          <div className="inner-deliverable-grid">
            {pageContent.deliverables.map((card) => (
              <article key={card.number} className="reveal" ref={revealRef}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="inner-next" aria-labelledby="inner-next-title">
        <div className="inner-next__heading">
          <h2 id="inner-next-title" className="reveal" ref={revealRef}>
            {pageContent.nextHeading?.split("\n")[0] ?? "Your starting point."}
            <br />
            {pageContent.nextHeading?.split("\n").slice(1).join(" ") ?? "Our next conversation"}<span className="accent">.</span>
          </h2>
          <p className="reveal" ref={revealRef}>
            {pageContent.nextIntro ?? (
              <>
                Bring your goal and your current situation.
                <br />
                We'll help connect it with a useful next step.
              </>
            )}
          </p>
        </div>
        <div className="inner-next__cards">
          {(pageContent.nextCards ?? [
            { title: "Tell us about", items: ["The business goal you want to achieve", "The people and workflows involved", "Your current systems and the challenge ahead"] },
            { title: "Let's explore", items: ["The capabilities that fit your priorities", "How the right services can work together", "A practical direction for your next step"] },
          ]).map((card, index) => (
            <article key={card.title} className="reveal" ref={revealRef}>
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              {index === 1 && <Button to="#contact">Talk to our team</Button>}
            </article>
          ))}
        </div>
      </section>

      <div className="inner-contact-wrap">
        <ContactSection headingLevel="h2" />
      </div>
    </div>
  );
}
