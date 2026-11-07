/**
 * Company facts shown across the site. Every value comes from the supplied
 * design; nothing here is invented. Update in one place.
 */
import { LEGACY_SITE_URL } from "../config/env";

export const COMPANY = {
  name: "Ladder7 NextStep Solutions",
  shortName: "Ladder7",
  division: "Ladder7 IT",
  tagline: "Build. Connect. Grow.",
  summary:
    "Ladder7 IT connects intelligent websites, applied AI, custom software and technology strategy around your next business goal.",
  email: "info@ladder7.in",
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
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ladder7-nextstep-solutions-llp/" },
  { label: "Instagram", href: "https://www.instagram.com/ladder7_nextstep_solutions_/" },
] as const;

/**
 * Pages that exist on the current ladder7.in site but are not part of this
 * redesign. Links point at LEGACY_SITE_URL (see SETUP_AND_DEPLOYMENT.md).
 */
const legacy = (path: string) => `${LEGACY_SITE_URL}${path}`;

export const LEGACY_LINKS = {
  blogs: legacy("/blogs"),
  itTrainingInternship: legacy("/it-training-internship-trivandrum"),
} as const;
