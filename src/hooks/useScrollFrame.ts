import { useEffect, useRef } from "react";

/**
 * One shared, rAF-batched scroll/resize loop for every scroll-driven effect.
 *
 * Each subscriber is called once per frame with the viewport size. It should
 * only READ layout (getBoundingClientRect) and return a function that WRITES
 * (style.setProperty, classList). All reads run before all writes, so the
 * page never forces a synchronous layout between effects — the same
 * "one read phase, one write phase" rule the design's script used.
 *
 * Effects write CSS custom properties directly on DOM nodes: scrolling never
 * triggers a React re-render.
 */
export interface ScrollFrame {
  vw: number;
  vh: number;
}

type Reader = (frame: ScrollFrame) => (() => void) | void;

const readers = new Set<Reader>();
let queued = false;

function run() {
  queued = false;
  const frame = { vw: window.innerWidth, vh: window.innerHeight };
  const writes: (() => void)[] = [];
  readers.forEach((read) => {
    const write = read(frame);
    if (write) writes.push(write);
  });
  writes.forEach((write) => write());
}

export function requestScrollFrame() {
  if (queued || typeof window === "undefined") return;
  queued = true;
  window.requestAnimationFrame(run);
}

function subscribe(reader: Reader) {
  if (readers.size === 0) {
    window.addEventListener("scroll", requestScrollFrame, { passive: true });
    window.addEventListener("resize", requestScrollFrame);
  }
  readers.add(reader);
  requestScrollFrame();
  return () => {
    readers.delete(reader);
    if (readers.size === 0) {
      window.removeEventListener("scroll", requestScrollFrame);
      window.removeEventListener("resize", requestScrollFrame);
    }
  };
}

/**
 * Registers a scroll reader while `enabled`. The latest callback is always
 * used, so it may close over fresh props/state without resubscribing.
 */
export function useScrollFrame(reader: Reader, enabled = true) {
  const latest = useRef(reader);
  useEffect(() => {
    latest.current = reader;
  });
  useEffect(() => {
    if (!enabled) return;
    const unsubscribe = subscribe((frame) => latest.current(frame));
    // Fonts change section heights; re-measure once they are ready.
    document.fonts?.ready.then(requestScrollFrame).catch(() => {});
    return unsubscribe;
  }, [enabled]);
}
