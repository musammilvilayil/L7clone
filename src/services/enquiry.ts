/**
 * Enquiry integration layer.
 *
 * The design's forms hand the enquiry to WhatsApp: the visitor reviews the
 * pre-filled message and sends it themselves. That behaviour is kept here and
 * is the primary path.
 *
 * Optionally, VITE_ENQUIRY_ENDPOINT can point at an HTTPS endpoint (CRM
 * webhook, form service, serverless function). When it is set, a JSON copy of
 * each enquiry is POSTed there as well. No endpoint ships with this project;
 * see SETUP_AND_DEPLOYMENT.md for the expected contract.
 */
import { ENQUIRY_ENDPOINT, WHATSAPP_NUMBER } from "../config/env";

export interface Enquiry {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export const LIMITS = { name: 100, email: 254, message: 2000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validates an enquiry. Returns an empty object when valid. */
export function validateEnquiry(values: Enquiry, interests: readonly string[]): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL.test(email)) errors.email = "Please enter a valid email address, like you@company.com.";

  if (!message) errors.message = "Please tell us a little about your project.";
  else if (message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  if (!interests.includes(values.interest)) errors.interest = "Please choose what you're interested in.";

  return errors;
}

/**
 * The message text the visitor will see in WhatsApp (format from the design).
 *
 * The overlay menu's form — shared by every page — names the division
 * ("Hi Ladder7 IT!" / "Hi Ladder7 Education!") since the visitor could be
 * enquiring from either. Each page's own contact-section form omits it
 * (`division` left undefined): the division is already obvious from context.
 */
export function composeMessage(values: Enquiry, division?: "IT" | "Education"): string {
  return [
    `Hi Ladder7${division ? ` ${division}` : ""}! I'm ${values.name.trim()}.`,
    `Email: ${values.email.trim()}`,
    `Interested in: ${values.interest}`,
    "",
    values.message.trim(),
  ].join("\n");
}

export function whatsappUrl(values: Enquiry, division?: "IT" | "Education", number = WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(composeMessage(values, division))}`;
}

/** Whether a copy of the enquiry is also sent to an endpoint. */
export const recordsEnquiries = Boolean(ENQUIRY_ENDPOINT);

export type RecordResult = "sent" | "skipped" | "failed";

/**
 * Sends a JSON copy of the enquiry to VITE_ENQUIRY_ENDPOINT, if configured.
 * Uses `keepalive` so the request survives the visitor switching to WhatsApp.
 */
export async function recordEnquiry(
  values: Enquiry,
  context: { source: string; page: string },
  endpoint = ENQUIRY_ENDPOINT,
): Promise<RecordResult> {
  if (!endpoint) return "skipped";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        interest: values.interest,
        message: values.message.trim(),
        source: context.source,
        page: context.page,
        submittedAt: new Date().toISOString(),
      }),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
