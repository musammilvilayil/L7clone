import { useEffect } from "react";
import { pageForPath, type PageKey } from "../../routes";

export type RouteImporters = Record<PageKey, () => Promise<unknown>>;

/**
 * Warms a route's lazy chunk when the visitor shows intent — hovering,
 * focusing or touching an internal link — so the page is cached before the
 * click (Whiteline's RoutePrefetch). Event delegation: links need no changes.
 * Does nothing on the server or without importers.
 */
export function RoutePrefetch({ importers }: { importers?: RouteImporters }) {
  useEffect(() => {
    if (!importers) return;
    const done = new Set<PageKey>();
    const onIntent = (event: Event) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      const page = pageForPath(href);
      if (done.has(page)) return;
      done.add(page);
      importers[page]().catch(() => done.delete(page));
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    document.addEventListener("touchstart", onIntent, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      document.removeEventListener("touchstart", onIntent);
    };
  }, [importers]);
  return null;
}
