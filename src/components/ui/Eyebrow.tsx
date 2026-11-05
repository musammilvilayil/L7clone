import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

/** Uppercase kicker with a red dot. `live` makes the dot pulse. */
export function Eyebrow({
  children,
  live = false,
  className,
  id,
}: {
  children: ReactNode;
  live?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <p id={id} className={cn("eyebrow", live && "eyebrow--live", className)}>
      {children}
    </p>
  );
}
