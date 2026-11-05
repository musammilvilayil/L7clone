import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useLocation } from "react-router";
import { useEnquiry } from "../../context/EnquiryContext";
import { MENU_INTERESTS } from "../../data/company";
import { MENU_COLUMNS } from "../../data/navigation";
import { COMPANY } from "../../data/site";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { prefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../utils/cn";
import { normalisePath } from "../../routes";
import { SmartLink } from "../common/SmartLink";
import { EnquiryForm } from "../forms/EnquiryForm";
import "./MegaMenu.css";

/**
 * Overlay menu (design: .mega-menu): quick enquiry form + site map.
 *
 * Accessibility: page content behind it is `inert` (MainLayout), focus is
 * trapped between the header and the menu, Escape closes and focus returns
 * to where it was. It closes on any navigation.
 */
export function MegaMenu({ headerRef }: { headerRef: RefObject<HTMLElement | null> }) {
  const { menuOpen, closeMenu, prefill } = useEnquiry();
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const current = normalisePath(location.pathname);

  useFocusTrap([headerRef, menuRef], menuOpen, closeMenu);

  // Lock page scroll and reset the menu's own scroll position when opening.
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (menuOpen && menuRef.current) menuRef.current.scrollTop = 0;
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Any navigation closes the menu.
  useEffect(() => {
    closeMenu();
  }, [location.key, closeMenu]);

  const focusForm = useCallback((nameInput: HTMLInputElement | null) => {
    requestAnimationFrame(() => {
      nameInput?.focus({ preventScroll: true });
      nameInput?.closest(".enquiry")?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "instant" : "smooth" });
    });
  }, []);

  return (
    <div
      ref={menuRef}
      id="menu"
      className="mega-menu"
      role="region"
      aria-label="Expanded navigation and enquiry"
      hidden={!menuOpen}
    >
      <div className="mega-menu__layout">
        <div className="mega-menu__contact">
          <EnquiryForm
            variant="menu"
            source="menu"
            eyebrow="Let's work together"
            heading="Have a project in mind?"
            headingLevel="h2"
            interests={MENU_INTERESTS}
            labels={{ name: "Your name", email: "Email", message: "Tell us about your project" }}
            messageRows={2}
            prefill={prefill}
            onPrefillApplied={focusForm}
          />
          <p className="mega-menu__email">
            Prefer email?{" "}
            <a href={`mailto:${COMPANY.email}`} onClick={closeMenu}>
              {COMPANY.email}
            </a>
            <span aria-hidden="true">·</span>
            <a href={COMPANY.phone.href} className="mega-menu__call" onClick={closeMenu}>
              Book a call ↗
            </a>
          </p>
        </div>

        <nav className="mega-menu__nav" aria-label="Expanded navigation">
          {MENU_COLUMNS.map((column, columnIndex) => (
            <div className="mega-menu__column" key={columnIndex}>
              {column.map((group) => (
                <div className="mega-menu__group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => {
                      const isCurrent = item.to === current;
                      return (
                        <li key={item.label}>
                          <SmartLink
                            to={item.to}
                            className={cn("mega-menu__link", isCurrent && "is-current")}
                            aria-current={isCurrent ? "page" : undefined}
                            onClick={closeMenu}
                          >
                            {item.label}
                          </SmartLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
