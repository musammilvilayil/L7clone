import type { ReactNode } from "react";
import { revealRef } from "../../hooks/useReveal";
import { cssVars } from "../../utils/cn";
import { Lines } from "../common/Lines";
import { Eyebrow } from "./Eyebrow";

export interface SectionHeadingProps {
  eyebrow: string;
  /** Heading copy; "\n" = desktop line break. A red full stop is appended. */
  title: string;
  titleId?: string;
  /** Muted intro on the right; "\n" = desktop line break. */
  intro?: string;
  /** Extra content under the intro (e.g. a button). */
  aside?: ReactNode;
  as?: "h1" | "h2";
  accent?: boolean;
}

/**
 * Standard section opener: eyebrow + heading on the left, intro on the right
 * (stacked on mobile). Both halves reveal on scroll, 90ms apart.
 */
export function SectionHeading({ eyebrow, title, titleId, intro, aside, as: Tag = "h2", accent = true }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="reveal" ref={revealRef}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Tag id={titleId}>
          <Lines text={title} accent={accent} />
        </Tag>
      </div>
      {(intro || aside) && (
        <div className="reveal" ref={revealRef} style={cssVars({ "--reveal-delay": "90ms" })}>
          {intro && (
            <p className="section-heading__intro">
              <Lines text={intro} />
            </p>
          )}
          {aside}
        </div>
      )}
    </div>
  );
}
