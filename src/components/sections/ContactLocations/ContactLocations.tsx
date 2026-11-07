import { LOCATIONS } from "../../../data/site";
import "./ContactLocations.css";

/** Contact page's own bases section (design: .contact-locations) — light sheet below the hero. */
export function ContactLocations() {
  return (
    <section className="contact-locations" aria-labelledby="locations-title">
      <div>
        <p className="eyebrow">Our bases</p>
        <h2 id="locations-title">
          Rooted in Kerala.
          <br />
          Ready for your next step.
        </h2>
      </div>
      <div className="contact-location-list">
        {LOCATIONS.map((location, index) => (
          <article key={location.city}>
            <span>
              {String(index + 1).padStart(2, "0")} / {location.city.toUpperCase()}
            </span>
            <h3>{location.city}</h3>
            <address>
              {location.place.split(",")[0]}
              <br />
              {location.locality}, {location.region}
            </address>
          </article>
        ))}
      </div>
    </section>
  );
}
