import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./RouteTransition.css";

/** Milliseconds the cover takes to close before the route actually changes (design: 780). */
const LEAVE_MS = 780;
/** Hold on the covered screen once the new page is mounted, before revealing it. */
const HOLD_MS = 220;
/** Reveal animation length before the overlay is fully reset. */
const REVEAL_MS = 1000;
/** Safety net: never leave the page covered or inert if a navigation stalls. */
const FALLBACK_MS = 4500;

const STATES = ["route-leaving", "route-arriving", "route-revealing"] as const;

/** The label shown on the cover while moving to a page (design: label()). */
function labelFor(url: URL, anchor: HTMLAnchorElement): string {
  const path = url.pathname.replace(/\/$/, "").toLowerCase() || "/";
  if (path === "/" || path === "/it") return "Home";
  if (path === "/about") return "About us";
  if (path === "/services" || path.startsWith("/services/")) return "Services";
  if (path === "/education") return "Education";
  if (path === "/blogs" || path.startsWith("/blogs/")) return "Insights";
  if (path === "/products") return "Products";
  if (path.startsWith("/products/")) return anchor.querySelector("h3")?.textContent?.trim() || "Products";
  if (path === "/contact") return "Contact us";
  const text = (anchor.getAttribute("data-transition-title") || anchor.querySelector("h3")?.textContent || anchor.textContent || "Ladder7")
    .replace(/[↗↑↓→]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 35 || text === "" ? "Ladder7" : text;
}

/**
 * Page-to-page loading animation from the design: a red then a dark panel
 * slide up over the page, the destination's name appears, the route changes
 * underneath, then both panels lift away. Intercepts same-origin link clicks
 * (in the capture phase, before React Router handles them) and hands the
 * navigation to React Router once the cover is closed. Skipped for reduced
 * motion, in-page anchors, same-page links, new-tab/download links and
 * modified clicks.
 */
export function RouteTransition() {
  const [label, setLabel] = useState("Ladder7");
  const navigate = useNavigate();
  // useNavigate's identity changes with every location, so keep the latest in a ref
  // and register the click listener once (re-registering would cancel a running transition).
  const navigateRef = useRef(navigate);
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);
  const { pathname, search } = useLocation();
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const reset = () => {
    busy.current = false;
    pending.current = null;
    clearTimers();
    const root = document.documentElement;
    root.classList.remove(...STATES);
    document.querySelector("main")?.removeAttribute("inert");
  };

  // Intercept internal link clicks.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (reduced.matches || busy.current) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("download") || anchor.hasAttribute("data-no-transition")) return;
      if (anchor.target && anchor.target !== "_self") return;
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (!["http:", "https:"].includes(url.protocol) || url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      event.preventDefault();
      event.stopPropagation();
      busy.current = true;
      const target = url.pathname + url.search + url.hash;
      pending.current = url.pathname + url.search;
      setLabel(labelFor(url, anchor));

      const root = document.documentElement;
      root.classList.remove("route-revealing");
      root.classList.add("route-leaving");
      document.querySelector("main")?.setAttribute("inert", "");
      later(() => navigateRef.current(target), LEAVE_MS);
      later(reset, FALLBACK_MS);
    };

    document.addEventListener("click", onClick, true);
    const onMotionChange = () => reduced.matches && reset();
    reduced.addEventListener("change", onMotionChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      reduced.removeEventListener("change", onMotionChange);
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handlers use refs and stable setters only
  }, []);

  // Once the new route is mounted, lift the cover.
  useEffect(() => {
    if (pending.current === null || pending.current !== pathname + search) return;
    const root = document.documentElement;
    root.classList.remove("route-leaving");
    root.classList.add("route-arriving");
    pending.current = null;
    clearTimers();
    // Wait for a lazy page chunk to finish (the loading placeholder disappears) before revealing.
    const started = Date.now();
    const reveal = () => {
      if (document.querySelector(".route-loading") && Date.now() - started < 3000) {
        later(reveal, 60);
        return;
      }
      root.classList.remove("route-arriving");
      root.classList.add("route-revealing");
      later(reset, REVEAL_MS);
    };
    later(reveal, HOLD_MS);
    later(reset, FALLBACK_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reacts to location changes only
  }, [pathname, search]);

  return (
    <div className="route-transition" aria-hidden="true">
      <div className="route-layer route-red" />
      <div className="route-layer route-dark">
        <div className={label.length > 25 ? "route-title is-long" : "route-title"}>
          <span>{label}</span>
          <b>.</b>
        </div>
      </div>
    </div>
  );
}
