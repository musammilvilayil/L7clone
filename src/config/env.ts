/**
 * Runtime configuration, read once from Vite environment variables.
 *
 * Every VITE_* value is compiled into the public bundle — never store secrets
 * here. Defaults keep a fresh checkout working; see .env.example.
 */

const env = import.meta.env;

const trimSlash = (value: string) => value.replace(/\/+$/, "");

/** Accepts only absolute http(s) URLs; falls back otherwise. */
function originFrom(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return fallback;
    return trimSlash(url.origin + url.pathname);
  } catch {
    return fallback;
  }
}

/** Canonical origin for canonical/OG URLs, JSON-LD and the sitemap. */
export const SITE_URL = originFrom(env.VITE_SITE_URL, "https://www.ladder7.in");

/**
 * Origin that still serves pages outside this release (products, blogs,
 * careers, Education, corporate training). See SETUP_AND_DEPLOYMENT.md.
 */
export const LEGACY_SITE_URL = originFrom(env.VITE_LEGACY_SITE_URL, "https://www.ladder7.in");

/** WhatsApp number used by enquiry forms (digits only, with country code). */
export const WHATSAPP_NUMBER = (env.VITE_WHATSAPP_NUMBER ?? "918137979401").replace(/\D/g, "") || "918137979401";

/** Optional endpoint that receives a JSON copy of each enquiry. */
export const ENQUIRY_ENDPOINT = (() => {
  const value = env.VITE_ENQUIRY_ENDPOINT?.trim();
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.hostname === "localhost" ? url.toString() : "";
  } catch {
    return "";
  }
})();

/** false on staging/preview builds: pages are noindex and robots.txt blocks crawling. */
export const ALLOW_INDEXING = env.VITE_ALLOW_INDEXING !== "false";
