import { useRef, type ReactNode } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { MegaMenu } from "../components/navigation/MegaMenu";
import { useEnquiry } from "../context/EnquiryContext";

/**
 * Page shell shared by every route: skip link → header → overlay menu →
 * main → footer. While the overlay menu is open, <main> and <footer> are
 * `inert` (not focusable, hidden from assistive technology).
 */
export function MainLayout({ children }: { children: ReactNode }) {
  const { menuOpen } = useEnquiry();
  const headerRef = useRef<HTMLElement>(null);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header ref={headerRef} />
      <MegaMenu headerRef={headerRef} />
      <main id="main" tabIndex={-1} inert={menuOpen}>
        {children}
      </main>
      <Footer inert={menuOpen} />
    </>
  );
}
