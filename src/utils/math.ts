/** Clamps a number into [min, max] (defaults to 0..1). */
export const clamp = (n: number, min = 0, max = 1) => Math.max(min, Math.min(max, n));

/** Smoothstep easing for 0..1 progress values. */
export const smoothstep = (t: number) => t * t * (3 - 2 * t);
