import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router";
import { useReducedMotion } from "../../../hooks/useMediaQuery";
import { ArrowUpRight } from "../../common/Icons";
import { Button } from "../../ui/Button";
import { ParticleField } from "./ParticleField";
import "./Hero.css";

export interface HeroStat {
  label: string;
  /** A plain number counts up from 0 on mount (Education); anything else renders as-is (IT's word + arrow). */
  value: number | ReactNode;
}

export interface HeroAction {
  to: string;
  label: string;
  variant?: "primary" | "outline";
}

export interface HeroContent {
  eyebrow: string;
  /** Exactly three words; the last gets the trailing red full stop. */
  words: [string, string, string];
  /** "\n" marks a desktop-only line break. */
  description: string;
  actions: HeroAction[];
  stats: HeroStat[];
  scrollTo: string;
  /** "\n" marks a line break hidden on phones (the design's `<br>` without a class — see Hero.css). */
  tagline: string;
}

const IT_CONTENT: HeroContent = {
  eyebrow: "Technology, built around you",
  words: ["Build.", "Connect.", "Grow"],
  description: "Intelligent websites. Applied AI. Custom software.\nConnected around your business, built for your next step.",
  actions: [
    { to: "#contact", label: "Discuss your project" },
    { to: "#capabilities", label: "Explore capabilities", variant: "outline" },
  ],
  stats: [
    {
      label: "Digital experience",
      value: (
        <>
          Build
          <ArrowUpRight />
        </>
      ),
    },
    {
      label: "Applied AI",
      value: (
        <>
          Automate
          <ArrowUpRight />
        </>
      ),
    },
    {
      label: "Custom software",
      value: (
        <>
          Connect
          <ArrowUpRight />
        </>
      ),
    },
  ],
  scrollTo: "#capabilities",
  tagline: "Engineering with purpose.\nBuilt around your business.",
};

/** Counts a <dd> from 0 to its target over 1.8s (cubic ease-out), skipped under reduced motion. */
function useCountUp(stats: HeroStat[], reduced: boolean) {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = [...el.querySelectorAll<HTMLElement>(".hero__stats dd")];
    const targets = stats.map((s) => (typeof s.value === "number" ? s.value : null));
    if (targets.every((t) => t === null)) return;
    if (reduced) {
      nodes.forEach((node, i) => {
        if (targets[i] !== null) node.textContent = String(targets[i]);
      });
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const frame = (now: number) => {
      start ??= now;
      const p = Math.min(1, (now - start) / 1800);
      const eased = 1 - (1 - p) ** 3;
      nodes.forEach((node, i) => {
        if (targets[i] !== null) node.textContent = String(Math.round(targets[i]! * eased));
      });
      if (p < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [stats, reduced]);

  return ref;
}

/** Home/Education hero: particle terrain, three-word headline, two CTAs and the stat strip. */
export function Hero({ content = IT_CONTENT, variant = "it" }: { content?: HeroContent; variant?: "it" | "education" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const statsRef = useCountUp(content.stats, reduced);
  const descriptionLines = content.description.split("\n");
  const taglineLines = content.tagline.split("\n");

  return (
    <section ref={sectionRef} className="hero" data-variant={variant} aria-labelledby="hero-title">
      <ParticleField pointerTarget={sectionRef} />

      <div className="hero__content">
        <p className="eyebrow eyebrow--live hero__eyebrow">{content.eyebrow}</p>
        <h1 id="hero-title" className="hero__title">
          {content.words.map((word, index) => (
            <span className="hero__word" key={word}>
              <span>
                {word}
                {index === content.words.length - 1 && <span className="accent">.</span>}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero__description">
          {descriptionLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <>
                  {" "}
                  <br className="br-desktop" />
                </>
              )}
              {line}
            </Fragment>
          ))}
        </p>
        <div className="hero__actions">
          {content.actions.map((action) =>
            action.variant === "outline" ? (
              <Button key={action.to} to={action.to} variant="outline" glass>
                {action.label}
              </Button>
            ) : (
              <Button key={action.to} to={action.to}>
                {action.label}
              </Button>
            ),
          )}
        </div>
      </div>

      <div className="hero__bottom">
        <dl className="hero__stats" ref={statsRef}>
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{typeof stat.value === "number" ? 0 : stat.value}</dd>
            </div>
          ))}
        </dl>
        <Link to={content.scrollTo} className="hero__scroll">
          Scroll
          <span aria-hidden="true" />
        </Link>
        <p className="hero__tagline">
          {taglineLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <>
                  {" "}
                  <br />
                </>
              )}
              {line}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
