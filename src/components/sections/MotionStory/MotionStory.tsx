import { useRef, type PointerEvent } from "react";
import { FILM } from "../../../data/media";
import { FINE_POINTER_QUERY, useReducedMotion } from "../../../hooks/useMediaQuery";
import { revealRef } from "../../../hooks/useReveal";
import { useScrollFrame } from "../../../hooks/useScrollFrame";
import { clamp } from "../../../utils/math";
import { Play } from "../../common/Icons";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { FilmDialog, type FilmDialogHandle } from "./FilmDialog";
import "./MotionStory.css";

/** "See the bigger picture." — a film card that scales up on scroll and opens the overview. */
export function MotionStory() {
  const launchRef = useRef<HTMLButtonElement>(null);
  const filmRef = useRef<FilmDialogHandle>(null);
  const reduced = useReducedMotion();

  useScrollFrame(({ vh }) => {
    const el = launchRef.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    const scale = 0.87 + clamp((vh - rect.top) / (vh * 0.85)) * 0.13;
    return () => el.style.setProperty("--film-scale", scale.toFixed(4));
  });

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduced || !window.matchMedia(FINE_POINTER_QUERY).matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--play-x", `${(event.clientX - rect.left - rect.width / 2) * 0.3}px`);
    event.currentTarget.style.setProperty("--play-y", `${(event.clientY - rect.top - rect.height / 2) * 0.3}px`);
  };
  const onPointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--play-x", "0px");
    event.currentTarget.style.setProperty("--play-y", "0px");
  };

  return (
    <section className="section motion-story" aria-labelledby="motion-title">
      <p className="eyebrow reveal" ref={revealRef}>
        Your business · in motion
      </p>
      <h2 id="motion-title" className="reveal" ref={revealRef}>
        See the bigger picture<span className="accent">.</span>
      </h2>
      <button
        ref={launchRef}
        type="button"
        className="film-launch"
        aria-haspopup="dialog"
        onClick={() => filmRef.current?.open()}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <ResponsiveImage name={FILM.poster} alt="" sizes="(max-width: 700px) 90vw, 80vw" />
        <span className="film-launch__wordmark" aria-hidden="true">
          Ladder7<span className="accent">.</span>
        </span>
        <span className="film-launch__play" aria-hidden="true">
          <Play />
          Play
        </span>
        <span className="film-launch__duration">Strategy. Engineering. Growth. / 0:20</span>
        <span className="sr-only">Play the 20-second Ladder7 digital overview</span>
      </button>
      <p className="film-caption">A visual introduction to strategy, intelligent systems and your next business step.</p>
      <FilmDialog ref={filmRef} />
    </section>
  );
}
