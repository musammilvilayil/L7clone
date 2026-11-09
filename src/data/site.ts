/**
 * Company facts shown across the site. Every value comes from the supplied
 * design; nothing here is invented. Update in one place.
 */
export const COMPANY = {
  name: "Ladder7 NextStep Solutions",
  shortName: "Ladder7",
  division: "Ladder7 IT",
  tagline: "Build. Connect. Grow.",
  summary:
    "Ladder7 NextStep Solutions is a custom software development company in Kochi and Trivandrum, India, building web applications, mobile apps, AI solutions and dedicated engineering teams for clients in the GCC, Europe and Africa.",
  email: "info@ladder7.in",
  mapUrl: "https://maps.app.goo.gl/ZugNAE6cHxEpPnzU8",
  phone: {
    display: "+91 8137979401",
    href: "tel:+918137979401",
    e164: "+918137979401",
  },
} as const;

export interface Location {
  city: string;
  place: string;
  locality: string;
  region: string;
  country: string;
}

export const LOCATIONS: Location[] = [
  { city: "Cochin", place: "WEE SPACES, Ernakulam", locality: "Ernakulam", region: "Kerala", country: "IN" },
  { city: "Trivandrum", place: "Kinfra Film and IT Park, Trivandrum", locality: "Trivandrum", region: "Kerala", country: "IN" },
];

/** Google Maps search link for a location (a search, not a guessed pin). */
export const mapsUrl = (location: Location) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.place}, ${location.region}`)}`;

export const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ladder7-nextstep-solutions-llp/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/ladder7_nextstep_solutions_/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/ladder7nextstep/", icon: "facebook" },
  { label: "WhatsApp", href: "https://wa.me/918137979401", icon: "whatsapp" },
] as const;
