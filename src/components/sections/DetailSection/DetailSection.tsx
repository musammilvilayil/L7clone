import { useState, type ReactNode, type SyntheticEvent } from "react";
import { cn } from "../../../utils/cn";
import { Button } from "../../ui/Button";
import "./DetailSection.css";

/**
 * One block of a simple content page's body (design: .detail-section,
 * alternating with .detail-light). Several usually follow a LandingHero
 * inside a shared #page-content wrapper.
 */
export function DetailSection({ eyebrow, title, light, children }: { eyebrow: string; title: ReactNode; light?: boolean; children: ReactNode }) {
  return (
    <section className={cn("detail-section", light && "detail-section--light")}>
      <div className="detail-section__head">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="detail-section__body">{children}</div>
    </section>
  );
}

export interface DetailCard {
  number: string;
  title: string;
  description: string;
}

/** A numbered card grid inside a DetailSection's body (design: .detail-cards). */
export function DetailCards({ items }: { items: DetailCard[] }) {
  return (
    <div className="detail-cards">
      {items.map((item) => (
        <article key={item.number}>
          <span className="detail-cards__number">{item.number}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

/** An arrow-bulleted list inside a DetailSection's body (design: .detail-list). */
export function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** A bordered callout card inside a DetailSection's body (design: .empty-state). */
export function EmptyState({ eyebrow, title, children, cta }: { eyebrow: string; title: string; children: ReactNode; cta: { label: string; to: string } }) {
  return (
    <div className="empty-state">
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{children}</p>
      <Button to={cta.to}>{cta.label}</Button>
    </div>
  );
}

export interface DetailFaqItem {
  question: string;
  answer: string;
}

/** One-open-at-a-time state for a list of <details>, as in the design's accordions. */
function useSingleOpen(defaultOpen: number) {
  const [open, setOpen] = useState(defaultOpen);
  const toggleProps = (index: number) => ({
    open: open === index,
    onToggle: (event: SyntheticEvent<HTMLDetailsElement>) => {
      const isOpen = event.currentTarget.open;
      setOpen((current) => (isOpen ? index : current === index ? -1 : current));
    },
  });
  return { open, toggleProps };
}

/**
 * Accordion inside a DetailSection's body (design: .detail-faq).
 * Opening one closes the others, as in the design. `defaultOpen` is the
 * index open on load (-1 for all closed).
 */
export function DetailFaq({ items, defaultOpen = 0 }: { items: DetailFaqItem[]; defaultOpen?: number }) {
  const { open, toggleProps } = useSingleOpen(defaultOpen);

  return (
    <div className="detail-faq">
      {items.map((item, index) => (
        <details key={item.question} {...toggleProps(index)}>
          <summary>
            {item.question}
            <span aria-hidden="true">{open === index ? "–" : "+"}</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export interface DetailCurriculumItem {
  number: string;
  title: string;
  description: string;
}

/**
 * Numbered accordion of modules inside a DetailSection's body (design:
 * .curriculum) — same behaviour as DetailFaq, first module open on load.
 */
export function DetailCurriculum({ items }: { items: DetailCurriculumItem[] }) {
  const { open, toggleProps } = useSingleOpen(0);

  return (
    <div className="detail-faq detail-curriculum">
      {items.map((item, index) => (
        <details key={item.number} {...toggleProps(index)}>
          <summary>
            <span className="detail-curriculum__number">{item.number}</span>
            <h3>{item.title}</h3>
            <span aria-hidden="true">{open === index ? "–" : "+"}</span>
          </summary>
          <p>{item.description}</p>
        </details>
      ))}
    </div>
  );
}
