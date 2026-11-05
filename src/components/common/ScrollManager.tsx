import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { prefersReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Scroll + focus behaviour for client-side navigation (pattern from
 * Whiteline's ScrollToTop / ScrollToHash, simplified for prerendered pages):
 *
 *  - new page without a hash → jump to top and move focus to <main> so
 *    screen readers start reading the new page;
 *  - URL with a hash → scroll to that section (smoothly on the same page,
 *    instantly after a page change) and move focus into it.
 *
 * The initial load is left to the browser: the HTML is prerendered, so native
 * anchor scrolling works before any JavaScript runs.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previous = useRef<{ pathname: string; key: string } | null>(null);

  useEffect(() => {
    const prev = previous.current;
    previous.current = { pathname, key };
    if (!prev || prev.key === key) return; // initial render

    const samePage = prev.pathname === pathname;
    if (!hash) {
      if (samePage) return;
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main")?.focus({ preventScroll: true });
      return;
    }

    let id = "";
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }

    let frame = 0;
    let attempts = 0;
    const scroll = () => {
      const target = document.getElementById(id);
      // Lazy route chunks may not have rendered yet: retry for ~2s.
      if (!target) {
        if (attempts++ < 120) frame = requestAnimationFrame(scroll);
        return;
      }
      const smooth = samePage && !prefersReducedMotion();
      target.scrollIntoView({ behavior: smooth ? "smooth" : "instant", block: "start" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
