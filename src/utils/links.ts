/** Classifies a navigation target (see data/navigation.ts for the conventions). */
export type LinkKind = "route" | "hash" | "external" | "protocol";

export function linkKind(to: string): LinkKind {
  if (to.startsWith("#")) return "hash";
  if (/^(mailto|tel):/i.test(to)) return "protocol";
  if (/^https?:\/\//i.test(to)) return "external";
  return "route";
}

/** True for links that should open in a new tab (social / third-party sites). */
export function opensNewTab(to: string, siteOrigins: string[]): boolean {
  if (linkKind(to) !== "external") return false;
  try {
    const { origin } = new URL(to);
    return !siteOrigins.includes(origin);
  } catch {
    return false;
  }
}
