import { COMPANY, LOCATIONS, mapsUrl } from "../../../data/site";
import { revealRef } from "../../../hooks/useReveal";
import { ArrowUpRight } from "../../common/Icons";
import { SmartLink } from "../../common/SmartLink";
import { SectionHeading } from "../../ui/SectionHeading";
import "./LocationsSection.css";

/** "Our bases. Your next step." — Cochin and Trivandrum with map search links. */
export function LocationsSection() {
  return (
    <section className="section section--lined locations" id="locations" aria-labelledby="locations-title">
      <SectionHeading
        eyebrow="Our bases. Your next step."
        title={"Cochin and\nTrivandrum"}
        titleId="locations-title"
        intro={"Technology. With purpose.\nFrom our bases in Kerala."}
      />
      <ul className="locations__list">
        {LOCATIONS.map((location) => (
          <li key={location.city} className="card locations__card reveal" ref={revealRef}>
            <h3>{location.city}</h3>
            <address>
              {location.place}
              <br />
              {location.region}, India
            </address>
            <SmartLink to={mapsUrl(location)} className="locations__map">
              Open in Google Maps
              <ArrowUpRight />
            </SmartLink>
          </li>
        ))}
        <li className="card locations__card reveal" ref={revealRef}>
          <h3>Write or call</h3>
          <address>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <br />
            <a href={COMPANY.phone.href}>{COMPANY.phone.display}</a>
          </address>
          <SmartLink to="#contact" className="locations__map">
            Send an enquiry
            <ArrowUpRight />
          </SmartLink>
        </li>
      </ul>
    </section>
  );
}
