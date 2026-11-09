import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useLocation } from "react-router";
import { useEnquiry } from "../../context/EnquiryContext";
import { EDUCATION_INTERESTS, IT_INTERESTS } from "../../data/company";
import { menuColumns, MENU_FORM } from "../../data/navigation";
import { COMPANY } from "../../data/site";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { prefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../utils/cn";
import { contactDivisionForPath, normalisePath } from "../../routes";
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
  const division = contactDivisionForPath(location.pathname);
  const isEducation = division === "education";

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

  const focusForm = useCallback(({ name }: { name: HTMLInputElement | null; message: HTMLTextAreaElement | null }) => {
    requestAnimationFrame(() => {
      name?.focus({ preventScroll: true });
      name?.closest(".enquiry")?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "instant" : "smooth" });
    });
  }, []);

  // Only the overlay menu's own form reacts to a "menu"-targeted prefill
  // (a program dialog's "Talk to an advisor" targets "contact" instead —
  // see ContactSection).
  const menuPrefill = prefill?.target === "menu" ? prefill : null;

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
            eyebrow={MENU_FORM.eyebrow}
            heading={MENU_FORM.heading}
            headingLevel="h2"
            interests={isEducation ? EDUCATION_INTERESTS : IT_INTERESTS}
            labels={{
              name: "Your name",
              email: "Email",
              message: "Tell us about your next step",
            }}
            messageRows={2}
            division={isEducation ? "Education" : "IT"}
            prefill={menuPrefill}
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
          {menuColumns().map((column, columnIndex) => (
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
