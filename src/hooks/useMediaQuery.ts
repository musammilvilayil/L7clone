import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. Returns `false` during server rendering and
 * hydration (getServerSnapshot), then the real value — no hydration mismatch.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
export const MOBILE_QUERY = "(max-width: 700px)";

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION_QUERY);

/** Non-hook read for event handlers and effects. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
