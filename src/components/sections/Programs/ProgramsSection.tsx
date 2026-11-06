import { useCallback, useEffect, useRef, useState } from "react";
import { useEnquiry } from "../../../context/EnquiryContext";
import { PROGRAMS, PROGRAMS_CTA, PROGRAM_FILTERS, type Program, type ProgramType } from "../../../data/education";
import { FINE_POINTER_QUERY, useReducedMotion } from "../../../hooks/useMediaQuery";
import { revealRef } from "../../../hooks/useReveal";
import { cn } from "../../../utils/cn";
import { ArrowUpRight } from "../../common/Icons";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { Button } from "../../ui/Button";
import { SectionHeading } from "../../ui/SectionHeading";
import { ProgramDialog } from "./ProgramDialog";
import "./ProgramsSection.css";

/**
 * "Your next chapter." — a filterable grid of training programs. Each card
 * opens a detail dialog; "Talk to an advisor" there prefills the page's own
 * contact form and scrolls to it (see ContactSection's "contact"-target
 * prefill).
 */
export function ProgramsSection() {
  const [filter, setFilter] = useState<ProgramType | "all">("all");
  const [active, setActive] = useState<Program | null>(null);
  const { openEnquiry } = useEnquiry();
  const reduced = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);

  // A gently trailing "VIEW" cursor over program imagery (fine pointers only).
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || reduced || !window.matchMedia(FINE_POINTER_QUERY).matches) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const move = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = cursor.classList.contains("is-visible") ? requestAnimationFrame(move) : 0;
    };
    const onEnter = (event: PointerEvent) => {
      x = tx = event.clientX;
      y = ty = event.clientY;
      cursor.classList.add("is-visible");
      if (!raf) raf = requestAnimationFrame(move);
    };
    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };
    const onLeave = () => cursor.classList.remove("is-visible");
    const arts = document.querySelectorAll<HTMLElement>(".program-art");
    arts.forEach((art) => {
      art.addEventListener("pointerenter", onEnter);
      art.addEventListener("pointermove", onMove);
      art.addEventListener("pointerleave", onLeave);
      art.addEventListener("click", onLeave);
    });
    return () => {
      cancelAnimationFrame(raf);
      arts.forEach((art) => {
        art.removeEventListener("pointerenter", onEnter);
        art.removeEventListener("pointermove", onMove);
        art.removeEventListener("pointerleave", onLeave);
        art.removeEventListener("click", onLeave);
      });
    };
    // Cards never unmount (filtering only toggles `hidden`), so the listeners
    // stay valid across filter changes — no need to depend on `filter`.
  }, [reduced]);

  const applyFromDialog = useCallback(
    (program: Program) => {
      setActive(null);
      openEnquiry({
        target: "contact",
        interest: "Internships",
        message: `I'm interested in ${program.name}. Please share the program details and next steps.`,
      });
    },
    [openEnquiry],
  );

  return (
    <section className="section programs" id="programs" aria-labelledby="programs-title">
      <SectionHeading eyebrow="Learn by doing" title="Your next chapter" titleId="programs-title" intro={"Practical training. Hands-on projects.\nSkills you can take into the real world."} />

      <div className="programs__filters" role="group" aria-label="Filter programs">
        {PROGRAM_FILTERS.map((item) => (
          <button
            key={item.type}
            type="button"
            className={cn("programs__filter", filter === item.type && "is-active")}
            aria-pressed={filter === item.type}
            onClick={() => setFilter(item.type)}
          >
            {item.label}
            {item.type === "all" && <small>{String(PROGRAMS.length).padStart(2, "0")}</small>}
          </button>
        ))}
      </div>

      <div className={cn("program-grid", filter !== "all" && "is-filtered")}>
        {PROGRAMS.map((program) => {
          const hidden = filter !== "all" && program.type !== filter;
          return (
            <article key={program.id} className="program-card reveal" ref={revealRef} hidden={hidden}>
              <button type="button" className="program-art" aria-label={`View details: ${program.name}`} onClick={() => setActive(program)}>
                <ResponsiveImage name={program.image} alt={program.imageAlt} sizes="(max-width: 700px) 92vw, (max-width: 1000px) 46vw, 42vw" />
                <span className="program-art__label">{program.label}</span>
                <span className="program-art__type">
                  {program.art.split("\n").map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </span>
                <span className="program-art__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </button>
              <div className="program-card__info">
                <button type="button" className="program-card__title" onClick={() => setActive(program)}>
                  <h3>{program.name}</h3>
                  <p>
                    {program.duration} · {program.format}
                  </p>
                </button>
                <span className="program-card__number">{String(PROGRAMS.indexOf(program) + 1).padStart(2, "0")}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="program-footer program-footer--centered">
        <Button to={PROGRAMS_CTA.href}>{PROGRAMS_CTA.label}</Button>
      </div>

      <div className="view-cursor" ref={cursorRef} aria-hidden="true">
        View
      </div>

      <ProgramDialog program={active} onClose={() => setActive(null)} onApply={applyFromDialog} />
    </section>
  );
}
