/**
 * Inline SVG icons. The design uses one arrow glyph (a CSS mask) across every
 * button; inline SVG keeps it crisp, inherits currentColor and needs no icon
 * library. All icons are decorative: the parent control carries the label.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  className: props.className ? `icon ${props.className}` : "icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

/** ↗ — the design's universal "go" arrow. */
export const ArrowUpRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 18 18 6M6 6h12v12" />
  </svg>
);

export const ArrowLeft = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ArrowRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUp = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const Close = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Plus = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Play = (props: IconProps) => (
  <svg {...base(props)} fill="currentColor" stroke="none">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const Restart = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" />
  </svg>
);
