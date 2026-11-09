import { Fragment, useRef, useState } from "react";
import { useLocation } from "react-router";
import { pageForPath } from "../../../routes";
import { websitePageFaqs } from "../../../data/websiteSeo";
import { useInView } from "../../../hooks/useInView";
import { revealRef } from "../../../hooks/useReveal";
import { Button } from "../../ui/Button";
import { ContactSection } from "../Contact/ContactSection";
import { DetailFaq, DetailSection } from "../DetailSection/DetailSection";
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
}

const PROCESS_STEPS = [
  { number: "01", title: "Understand", description: "Start with your customers, workflows and business priorities." },
  { number: "02", title: "Connect", description: "Map the experience, architecture and integrations." },
  { number: "03", title: "Engineer", description: "Build for the systems and people who will use it." },
  { number: "04", title: "Evolve", description: "Learn from real use and improve the next useful detail." },
];

/** The ring + progress-bar steps (design: .inner-process) — identical on every service page. */
function InnerProcess() {
  const ref = useRef<HTMLElement>(null);
  const [replayKey, setReplayKey] = useState(0);
  const inView = useInView(ref, "-100px");
  const active = inView && replayKey >= 0;

  return (
    <section className="inner-process" ref={ref} aria-labelledby="inner-process-title" data-active={active || undefined} key={replayKey}>
      <div className="inner-process__heading">
        <div className="reveal" ref={revealRef}>
          <p className="inner-label">From ambition to action</p>
          <h2 id="inner-process-title">
            One goal.
            <br />
            A connected approach<span className="accent">.</span>
          </h2>
        </div>
        <p className="reveal" ref={revealRef}>
          Start with the outcome.
          <br />
          Connect the thinking, the technology
          <br />
          and the people who will use it.
        </p>
      </div>
      <div className="inner-process__rings">
        {PROCESS_STEPS.map((step) => (
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
          {PROCESS_STEPS.map((step) => (
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
  const faqs = websitePageFaqs(pageForPath(useLocation().pathname));

  return (
    <div className="inner-service-page">
      <section ref={heroRef} className="inner-service-hero" aria-labelledby="service-hero-title">
        <ParticleField pointerTarget={heroRef} />
        <p className="eyebrow eyebrow--live">
          <a href="/services">Services</a> / {content.category}
        </p>
        <h1 id="service-hero-title">
          <span>
            <b>{content.lines[0]}</b>
          </span>
          <span>
            <b>
              {content.lines[1]}
              <span className="accent">.</span>
            </b>
          </span>
        </h1>
        <div className="inner-hero-bottom">
          <p>{content.intro}</p>
          <div className="inner-hero-actions">
            <Button to="#contact">Discuss your project</Button>
            <Button to="#capabilities" variant="outline" glass>
              Explore capabilities
            </Button>
          </div>
        </div>
        <dl className="inner-facts">
          <div>
            <dt>Focus areas</dt>
            <dd>
              {String(content.capabilityCloud.length).padStart(2, "0")}
              <span>.</span>
            </dd>
            <dd className="inner-facts__note">Within this service</dd>
          </div>
          <div>
            <dt>Specialist services</dt>
            <dd>
              14<span>.</span>
            </dd>
            <dd className="inner-facts__note">Connected around your goal</dd>
          </div>
          <div>
            <dt>Core disciplines</dt>
            <dd>
              3<span>.</span>
            </dd>
            <dd className="inner-facts__note">Experience, AI and strategy</dd>
          </div>
          <div>
            <dt>Kerala bases</dt>
            <dd>
              2<span>.</span>
            </dd>
            <dd className="inner-facts__note">Cochin · Trivandrum</dd>
          </div>
        </dl>
      </section>

      <section className="inner-capabilities" id="capabilities" aria-labelledby="capabilities-title">
        <h2 className="inner-label" id="capabilities-title">
          What we can build together
        </h2>
        <ul className="inner-capability-cloud">
          {content.capabilityCloud.map((tag, index) => (
            <li key={tag}>
              <span>{tag}</span>
              {index < content.capabilityCloud.length - 1 && <i aria-hidden="true">·</i>}
            </li>
          ))}
        </ul>
      </section>

      <InnerProcess />

      <section className="inner-about" aria-labelledby="inner-about-title">
        <p className="inner-label">About this service</p>
        <div className="inner-about__heading">
          <h2 id="inner-about-title" className="reveal" ref={revealRef}>
            {content.aboutHeading}
            <span className="accent">.</span>
          </h2>
          <div className="inner-about__copy reveal" ref={revealRef}>
            <p>{content.aboutIntro}</p>
          </div>
        </div>
        {content.aboutCards.length > 0 && (
          <div className="inner-about__cards">
            {content.aboutCards.map((card) => (
              <article key={card.number} className="reveal" ref={revealRef}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        )}
        {content.editorialRows.map((row) => (
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

      {content.deliverables.length > 0 && (
        <section className="inner-deliverables" aria-labelledby="deliverables-title">
          <p className="inner-label">The capabilities behind your next step</p>
          <h2 id="deliverables-title" className="reveal" ref={revealRef}>
            {content.deliverablesHeading.split("\n").map((line, index, lines) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
                {index === lines.length - 1 && <span className="accent">.</span>}
              </Fragment>
            ))}
          </h2>
          <div className="inner-deliverable-grid">
            {content.deliverables.map((card) => (
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
            Your starting point.
            <br />
            Our next conversation<span className="accent">.</span>
          </h2>
          <p className="reveal" ref={revealRef}>
            Bring your goal and your current situation.
            <br />
            We'll help connect it with a useful next step.
          </p>
        </div>
        <div className="inner-next__cards">
          <article className="reveal" ref={revealRef}>
            <h3>Tell us about</h3>
            <ul>
              <li>The business goal you want to achieve</li>
              <li>The people and workflows involved</li>
              <li>Your current systems and the challenge ahead</li>
            </ul>
          </article>
          <article className="reveal" ref={revealRef}>
            <h3>Let's explore</h3>
            <ul>
              <li>The capabilities that fit your priorities</li>
              <li>How the right services can work together</li>
              <li>A practical direction for your next step</li>
            </ul>
            <Button to="#contact">Talk to our team</Button>
          </article>
        </div>
      </section>

      {faqs.length > 0 && (
        <DetailSection eyebrow="Questions buyers ask" title="Frequently asked questions." light>
          <DetailFaq items={faqs} defaultOpen={-1} />
        </DetailSection>
      )}

      <div className="inner-contact-wrap">
        <ContactSection headingLevel="h2" />
      </div>
    </div>
  );
}
