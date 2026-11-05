import type { CSSProperties } from "react";

/** Joins class names, skipping falsy values. (No Tailwind, so no merge logic needed.) */
export function cn(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(" ");
}

/** Typed inline CSS custom properties, e.g. style={cssVars({ "--reveal-delay": "90ms" })}. */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;
