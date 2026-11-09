import { useState } from "react";
import { websitePageFaqs } from "../../../data/websiteSeo";
import { revealRef } from "../../../hooks/useReveal";
import { Plus } from "../../common/Icons";
import { Eyebrow } from "../../ui/Eyebrow";
import "./FaqSection.css";

/**
 * "Good questions." — native <details> accordion (keyboard and screen-reader
 * support for free; answers are in the HTML for crawlers). Opening one closes
 * the others, as in the design.
 */
export function FaqSection({ headingLevel: Heading = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const [open, setOpen] = useState(0);
  const faqs = websitePageFaqs("home");

  return (
    <section className="section section--lined split faq" id="faq" aria-labelledby="faq-title">
      <div className="reveal" ref={revealRef}>
        <Eyebrow>A little more clarity</Eyebrow>
        <Heading id="faq-title">
          Good questions<span className="accent">.</span>
        </Heading>
      </div>
      <div className="faq__list reveal" ref={revealRef}>
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            open={open === index}
            onToggle={(event) => {
              const isOpen = event.currentTarget.open;
              setOpen((current) => (isOpen ? index : current === index ? -1 : current));
            }}
          >
            <summary>
              {faq.question}
              <Plus />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
