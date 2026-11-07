import { revealRef } from "../../../hooks/useReveal";
import { SERVICE_GROUPS } from "../../../data/serviceCatalogue";
import { SmartLink } from "../../common/SmartLink";
import "./ServiceCatalogue.css";

/** The Services hub's catalogue of 14 services, grouped by discipline (design: .service-catalogue). */
export function ServiceCatalogue() {
  return (
    <div className="service-catalogue">
      {SERVICE_GROUPS.map((group) => (
        <section className="service-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
          <div className="service-group__intro">
            <h2 id={`${group.id}-title`}>
              {group.number} / {group.title}
            </h2>
            <p>{group.intro}</p>
          </div>
          <div className="service-group__rows">
            {group.rows.map((row) => (
              <SmartLink key={row.number} to={row.to} className="service-row reveal" ref={revealRef}>
                <span className="service-row__number">{row.number}</span>
                <div className="service-row__copy">
                  <h3>{row.title}</h3>
                  <p>{row.description}</p>
                  <div className="service-row__tags">
                    {row.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="service-row__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 18 18 6M6 6h12v12" />
                  </svg>
                </span>
              </SmartLink>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
