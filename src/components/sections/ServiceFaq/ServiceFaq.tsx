import { useState } from "react";
import { SERVICE_FAQS } from "../../../data/serviceCatalogue";
import { revealRef } from "../../../hooks/useReveal";
import "./ServiceFaq.css";

/** Services hub FAQ (design: .service-faq) — its own 4 questions, not the generic FAQS. */
export function ServiceFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="service-faq" aria-labelledby="service-faq-title">
      <div className="reveal" ref={revealRef}>
        <p className="eyebrow eyebrow--live">A little more clarity</p>
        <h2 id="service-faq-title">
          Good
          <br />
          questions<span className="accent">.</span>
        </h2>
      </div>
      <div className="service-faq__list">
        {SERVICE_FAQS.map((faq, index) => (
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
              <span aria-hidden="true">+</span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
