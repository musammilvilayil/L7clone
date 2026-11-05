/**
 * Scroll reveal.
 *
 * Usage: <div className="reveal" ref={revealRef}>…</div>
 *
 * One IntersectionObserver is shared by the whole page. When an element is
 * 8% visible it receives `.is-visible` (animations.css) and is no longer
 * observed. The `.reveal` class is in the server HTML, but it only hides
 * content once `.motion-ready` is on <html>, so crawlers and no-JS visitors
 * always see everything.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
    );
  }
  return observer;
}

/** Stable callback ref (React 19 cleanup-returning ref). */
export function revealRef(element: Element | null) {
  if (!element || typeof IntersectionObserver === "undefined") {
    element?.classList.add("is-visible");
    return;
  }
  const io = getObserver();
  io.observe(element);
  return () => io.unobserve(element);
}
