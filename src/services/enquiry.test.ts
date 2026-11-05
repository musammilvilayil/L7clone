import { describe, expect, it } from "vitest";
import { CONTACT_INTERESTS } from "../data/company";
import { composeMessage, validateEnquiry, whatsappUrl } from "./enquiry";

const valid = {
  name: "Asha Menon",
  email: "asha@example.com",
  interest: CONTACT_INTERESTS[0]!,
  message: "We need a new website with CRM integration.",
};

describe("validateEnquiry", () => {
  it("accepts a fully filled, valid enquiry", () => {
    expect(validateEnquiry(valid, CONTACT_INTERESTS)).toEqual({});
  });

  it("flags every required field when empty", () => {
    const errors = validateEnquiry({ name: "", email: "", interest: "", message: "" }, CONTACT_INTERESTS);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
    expect(errors.interest).toBeDefined();
  });

  it("rejects an email without a domain", () => {
    const errors = validateEnquiry({ ...valid, email: "asha@" }, CONTACT_INTERESTS);
    expect(errors.email).toBeDefined();
  });

  it("rejects an interest outside the allowed list", () => {
    const errors = validateEnquiry({ ...valid, interest: "Not a real option" }, CONTACT_INTERESTS);
    expect(errors.interest).toBeDefined();
  });

  it("treats whitespace-only input as empty", () => {
    const errors = validateEnquiry({ ...valid, name: "   ", message: "  \n " }, CONTACT_INTERESTS);
    expect(errors.name).toBeDefined();
    expect(errors.message).toBeDefined();
  });
});

describe("composeMessage / whatsappUrl", () => {
  it("includes every field, trimmed, in the WhatsApp message", () => {
    const message = composeMessage({ ...valid, name: "  Asha Menon  " });
    expect(message).toContain("Asha Menon");
    expect(message).toContain(valid.email);
    expect(message).toContain(valid.interest);
    expect(message).toContain(valid.message);
  });

  it("builds a wa.me URL with the message URL-encoded", () => {
    const url = whatsappUrl(valid, "918137979401");
    expect(url).toBe(`https://wa.me/918137979401?text=${encodeURIComponent(composeMessage(valid))}`);
  });
});
