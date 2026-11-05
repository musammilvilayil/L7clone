import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type MouseEvent } from "react";
import { FILM } from "../../../data/media";
import { Close } from "../../common/Icons";
import { Lines } from "../../common/Lines";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import "./FilmDialog.css";

export interface FilmDialogHandle {
  open: () => void;
}

const SLIDE_MS = FILM.durationMs / FILM.slides.length;
const seconds = (ms: number) => `0:${String(Math.floor(ms / 1000)).padStart(2, "0")}`;

/**
 * Twenty-second visual overview (four cross-fading slides) in a native modal
 * <dialog>: focus is contained by the browser, Escape closes, the backdrop
 * click closes, and Pause/Replay meets WCAG 2.2.2. Slide images are only
 * requested the first time the film is opened.
 */
export const FilmDialog = forwardRef<FilmDialogHandle>(function FilmDialog(_props, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [slide, setSlide] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);

  const time = useRef(0);
  const last = useRef(0);
  const raf = useRef(0);
  const pausedRef = useRef(false);

  const paint = useCallback(() => {
    const t = time.current;
    setSlide(Math.min(FILM.slides.length - 1, Math.floor(t / SLIDE_MS)));
    setElapsed(Math.floor(t / 1000) * 1000);
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, t / FILM.durationMs)})`;
  }, []);

  const tick = useCallback(
    (now: number) => {
      const dialog = dialogRef.current;
      if (!dialog?.open) {
        raf.current = 0;
        return;
      }
      if (!pausedRef.current && !document.hidden) time.current = Math.min(FILM.durationMs, time.current + Math.min(now - last.current, 100));
      last.current = now;
      paint();
      if (time.current >= FILM.durationMs) {
        pausedRef.current = true;
        setPaused(true);
      }
      raf.current = requestAnimationFrame(tick);
    },
    [paint],
  );

  const restart = useCallback(() => {
    time.current = 0;
    last.current = performance.now();
    pausedRef.current = false;
    setPaused(false);
    paint();
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  }, [paint, tick]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setLoaded(true);
      dialogRef.current?.showModal();
      restart();
    },
  }));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("close", onClose);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const finished = elapsed >= FILM.durationMs;
  const togglePause = () => {
    if (time.current >= FILM.durationMs) {
      restart();
      return;
    }
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  // Clicking the backdrop (outside the dialog box) closes it.
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) event.currentTarget.close();
  };

  return (
    <dialog ref={dialogRef} className="film-dialog" aria-label="Ladder7 digital overview" onClick={onDialogClick}>
      <button type="button" className="film-dialog__close" aria-label="Close digital overview" onClick={() => dialogRef.current?.close()}>
        <Close />
      </button>
      <div className="film-dialog__slides">
        {FILM.slides.map((item, index) => (
          <div
            key={item.label}
            className={index === slide ? "film-dialog__slide is-current" : "film-dialog__slide"}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${FILM.slides.length}`}
            aria-hidden={index !== slide}
          >
            {loaded && <ResponsiveImage name={item.image} alt="" sizes="(max-width: 1100px) 94vw, 1100px" />}
            <span>{item.label}</span>
            <h2>
              <Lines text={item.title} accent />
            </h2>
          </div>
        ))}
      </div>
      <div className="film-dialog__controls">
        <button type="button" onClick={togglePause} aria-label={finished ? "Replay overview" : paused ? "Play overview" : "Pause overview"}>
          {finished ? "Replay" : paused ? "Play" : "Pause"}
        </button>
        <div className="film-dialog__progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
        <span className="film-dialog__time">
          {seconds(elapsed)} / {seconds(FILM.durationMs)}
        </span>
        <button type="button" onClick={restart}>
          Restart ↺
        </button>
      </div>
    </dialog>
  );
});
