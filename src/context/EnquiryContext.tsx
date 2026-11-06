import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Overlay menu + enquiry prefill.
 *
 * The design's overlay menu doubles as a quick enquiry form, and a program's
 * detail dialog can instead prefill the page's own contact-section form
 * (`target: "contact"`) the way the design directly sets `#enquiry-form`'s
 * fields. Either way, the same pattern as Whiteline's BookingContext
 * (`openBooking("Invisalign")`): any button can request a prefill.
 *
 * @example
 *   const { openEnquiry } = useEnquiry();
 *   <button onClick={() => openEnquiry({ interest: "Corporate training" })}>…</button>  // opens the menu
 *   <button onClick={() => openEnquiry({ target: "contact", message: "…" })}>…</button>  // fills this page's own form
 */
export interface EnquiryPrefill {
  /** "menu" (default) opens the overlay menu; "contact" fills the page's own contact-section form in place. */
  target: "menu" | "contact";
  interest?: string;
  message?: string;
  /** Changes on every request so the form re-applies the same prefill. */
  key: number;
}

interface EnquiryContextValue {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  /** Requests a prefill; opens the overlay menu unless `target: "contact"`. */
  openEnquiry: (prefill: Omit<EnquiryPrefill, "key" | "target"> & { target?: EnquiryPrefill["target"] }) => void;
  prefill: EnquiryPrefill | null;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefill, setPrefill] = useState<EnquiryPrefill | null>(null);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const openEnquiry: EnquiryContextValue["openEnquiry"] = useCallback((next) => {
    const target = next.target ?? "menu";
    setPrefill({ ...next, target, key: Date.now() });
    if (target === "menu") setMenuOpen(true);
  }, []);

  const value = useMemo(
    () => ({ menuOpen, openMenu, closeMenu, toggleMenu, openEnquiry, prefill }),
    [menuOpen, openMenu, closeMenu, toggleMenu, openEnquiry, prefill],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}
