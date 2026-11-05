import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab / Shift+Tab inside the given containers while `active`, closes on
 * Escape, and restores focus to the previously focused element afterwards.
 * Several containers are allowed because the overlay menu shares focus with
 * the header (which holds the close button).
 */
export function useFocusTrap(
  containers: RefObject<HTMLElement | null>[],
  active: boolean,
  onEscape: () => void,
  restoreFocus = true,
) {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;

    const focusables = () =>
      containers
        .flatMap((ref) => (ref.current ? [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)] : []))
        .filter((el) => el.getClientRects().length > 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const current = document.activeElement;
      const inside = items.includes(current as HTMLElement);
      if (event.shiftKey && (current === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (restoreFocus && previous?.isConnected) previous.focus({ preventScroll: true });
    };
    // containers are stable refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, onEscape, restoreFocus]);
}
