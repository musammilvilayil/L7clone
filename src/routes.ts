/**
 * Route table — pure data, no React imports, so the prerender script, the
 * sitemap generator, the client router and the link prefetcher all read the
 * same list and can never drift apart.
 */
export type PageKey = "home" | "services" | "about" | "contact" | "notFound";

export interface RouteDef {
  path: string;
  page: Exclude<PageKey, "notFound">;
}

export const ROUTES: RouteDef[] = [
  { path: "/", page: "home" },
  { path: "/services", page: "services" },
  { path: "/about", page: "about" },
  { path: "/contact", page: "contact" },
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
