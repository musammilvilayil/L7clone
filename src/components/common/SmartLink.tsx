import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router";
import { LEGACY_SITE_URL, SITE_URL } from "../../config/env";
import { linkKind, opensNewTab } from "../../utils/links";

export interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Route ("/about", "/#solutions"), in-page hash ("#contact"), external URL, mailto: or tel:. */
  to: string;
  children: ReactNode;
}

const OWN_ORIGINS = [new URL(SITE_URL).origin, new URL(LEGACY_SITE_URL).origin];

/**
 * One link component for every destination:
 *  - routes and hashes go through React Router (client navigation, prefetch,
 *    smooth hash scrolling handled by <ScrollManager>);
 *  - third-party sites open in a new tab with rel="noopener noreferrer";
 *  - the company's own not-yet-migrated pages open in the same tab.
 */
export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(function SmartLink(
  { to, children, ...rest },
  ref,
) {
  const kind = linkKind(to);
  if (kind === "route" || kind === "hash") {
    return (
      <Link ref={ref} to={to} {...rest}>
        {children}
      </Link>
    );
  }
  const newTab = opensNewTab(to, OWN_ORIGINS);
  return (
    <a
      ref={ref}
      href={to}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
});
