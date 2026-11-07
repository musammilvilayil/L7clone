/**
 * Route table — pure data, no React imports, so the prerender script, the
 * sitemap generator, the client router and the link prefetcher all read the
 * same list and can never drift apart.
 */
export type PageKey = "home" | "services" | "about" | "contact" | "education" | "faq" | "careers" | "portfolio" | "notFound";

export interface RouteDef {
  path: string;
  page: Exclude<PageKey, "notFound">;
}

export const ROUTES: RouteDef[] = [
  { path: "/", page: "home" },
  { path: "/services", page: "services" },
  { path: "/about", page: "about" },
  { path: "/contact", page: "contact" },
  { path: "/education", page: "education" },
  { path: "/faq", page: "faq" },
  { path: "/careers", page: "careers" },
  { path: "/portfolio", page: "portfolio" },
];

/** Normalises a pathname (no trailing slash except root, lower-case). */
export function normalisePath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0] ?? "/";
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return (trimmed || "/").toLowerCase();
}

export function pageForPath(pathname: string): PageKey {
  const path = normalisePath(pathname);
  return ROUTES.find((route) => route.path === path)?.page ?? "notFound";
}

export type Division = "it" | "education";

/**
 * Ladder7 has two divisions (the design's own `it-page` body class vs its
 * absence). Education is its own division; every other page — including the
 * shared About/Services/Contact pages — presents as IT, matching the
 * `about.html`/`services.html` design files (both carry `it-page`).
 */
export function divisionForPath(pathname: string): Division {
  return normalisePath(pathname).startsWith("/education") ? "education" : "it";
}
