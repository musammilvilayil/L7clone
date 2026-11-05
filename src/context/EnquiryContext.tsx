import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Overlay menu + enquiry prefill.
 *
 * The design's overlay menu doubles as the quick enquiry form. Any button can
 * open it with a pre-selected interest and starter message — the same pattern
 * as Whiteline's BookingContext (`openBooking("Invisalign")`).
 *
 * @example
 *   const { openEnquiry } = useEnquiry();
 *   <button onClick={() => openEnquiry({ interest: "Corporate training" })}>…</button>
 */
export interface EnquiryPrefill {
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
  /** Opens the menu with the enquiry form pre-filled and focused. */
  openEnquiry: (prefill: Omit<EnquiryPrefill, "key">) => void;
  prefill: EnquiryPrefill | null;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefill, setPrefill] = useState<EnquiryPrefill | null>(null);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const openEnquiry = useCallback((next: Omit<EnquiryPrefill, "key">) => {
    setPrefill({ ...next, key: Date.now() });
    setMenuOpen(true);
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
