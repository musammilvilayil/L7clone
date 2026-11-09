import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { ArrowUpRight } from "../common/Icons";
import { SmartLink } from "../common/SmartLink";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text";
export type ButtonSize = "lg" | "md" | "sm";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Frosted background (outline variant over the hero). */
  glass?: boolean;
  /** Dark hover fill for buttons placed on a red section. */
  onBrand?: boolean;
  /** Full-width button. */
  block?: boolean;
  /** Show the circular arrow (default for filled variants). */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type AsLink = BaseProps & { to: string; onClick?: () => void; "aria-label"?: string };
type AsButton = BaseProps & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AsLink | AsButton;

/**
 * The design-system button. Renders a link when `to` is given (route, hash
 * or URL — see SmartLink), otherwise a <button>.
 *
 * @example
 *   <Button to="#contact">Discuss your project</Button>
 *   <Button variant="outline" glass to="/#capabilities">Explore capabilities</Button>
 *   <Button variant="secondary" type="submit">Submit</Button>
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", glass, onBrand, block, arrow, className, children } = props;
  const showArrow = arrow ?? variant !== "text";
  // The text variant is a link style, not a pill: it must not get the .btn base.
  const classes = cn(
    variant !== "text" && "btn",
    `btn--${variant}`,
    variant !== "text" && `btn--${size}`,
    glass && "btn--glass",
    onBrand && "btn--on-brand",
    block && "btn--block",
    className,
  );
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {showArrow &&
        (variant === "text" ? (
          <ArrowUpRight />
        ) : (
          <span className="btn__disc" aria-hidden="true">
            <ArrowUpRight />
          </span>
        ))}
    </>
  );

  if (props.to !== undefined) {
    return (
      <SmartLink to={props.to} className={classes} onClick={props.onClick} aria-label={props["aria-label"]}>
        {content}
      </SmartLink>
    );
  }

  const {
    variant: _v,
    size: _s,
    glass: _g,
    onBrand: _o,
    block: _b,
    arrow: _a,
    className: _c,
    children: _ch,
    to: _to,
    type = "button",
    ...buttonProps
  } = props as AsButton;
  void [_v, _s, _g, _o, _b, _a, _c, _ch, _to];
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
