import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { useLocation } from "react-router";
import type { EnquiryPrefill } from "../../context/EnquiryContext";
import { COMPANY } from "../../data/site";
import {
  LIMITS,
  composeMessage,
  recordEnquiry,
  recordsEnquiries,
  validateEnquiry,
  whatsappUrl,
  type Enquiry,
  type EnquiryErrors,
  type RecordResult,
} from "../../services/enquiry";
import { cn } from "../../utils/cn";
import { ArrowUpRight } from "../common/Icons";
import "./EnquiryForm.css";

export interface EnquiryFormProps {
  variant: "contact" | "menu";
  /** Analytics/source label sent with recorded enquiries. */
  source: string;
  heading: ReactNode;
  headingLevel?: "h2" | "h3";
  eyebrow?: string;
  intro?: string;
  interests: string[];
  labels: { name: string; email: string; message: string };
  placeholders?: { name?: string; email?: string; message?: string };
  messageRows?: number;
  submitLabel?: string;
  /** Interest chosen elsewhere on the page (e.g. the solutions tabs). */
  interest?: string;
  /** Prefill from useEnquiry().openEnquiry(); re-applied whenever its key changes. */
  prefill?: EnquiryPrefill | null;
  /** Called after a prefill is applied (the menu uses it to focus + scroll). */
  onPrefillApplied?: (nameInput: HTMLInputElement | null) => void;
}

type FieldName = keyof Enquiry;
type RecordState = RecordResult | "pending" | null;

/**
 * Enquiry form shared by the contact section and the overlay menu.
 *
 * Flow (from the design): validate → open WhatsApp with the message pre-filled
 * for the visitor to review and send. When VITE_ENQUIRY_ENDPOINT is set, a
 * copy is also POSTed (services/enquiry.ts). Validation runs on blur and on
 * submit; the submit button is never disabled, so errors are always explained.
 */
export function EnquiryForm({
  variant,
  source,
  heading,
  headingLevel: Heading = "h3",
  eyebrow,
  intro,
  interests,
  labels,
  placeholders = {},
  messageRows = 3,
  submitLabel = "Continue on WhatsApp",
  interest,
  prefill,
  onPrefillApplied,
}: EnquiryFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const { pathname } = useLocation();

  const [values, setValues] = useState<Enquiry>({
    name: "",
    email: "",
    message: "",
    interest: interest && interests.includes(interest) ? interest : (interests[0] ?? ""),
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);
  const [record, setRecord] = useState<RecordState>(null);
  const [summary, setSummary] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // Interest selected elsewhere on the page (home: solutions tabs). Adjusted
  // during render (React's recommended pattern for syncing with a changed
  // prop) rather than in an effect, which would cause an extra render pass.
  const [syncedInterest, setSyncedInterest] = useState(interest);
  if (interest !== syncedInterest) {
    setSyncedInterest(interest);
    if (interest && interests.includes(interest)) {
      setValues((v) => ({ ...v, interest }));
    }
  }

  // Prefill from a "Plan your team's next step"-style button.
  const appliedPrefill = useRef<number | null>(null);
  useEffect(() => {
    if (!prefill || appliedPrefill.current === prefill.key) return;
    appliedPrefill.current = prefill.key;
    setHandoffUrl(null);
    setValues((v) => ({
      ...v,
      interest: prefill.interest && interests.includes(prefill.interest) ? prefill.interest : v.interest,
      message: prefill.message ?? v.message,
    }));
    onPrefillApplied?.(nameRef.current);
  }, [prefill, interests, onPrefillApplied]);

  const errors: EnquiryErrors = validateEnquiry(values, interests);
  const visibleError = (field: FieldName) => (touched[field] || attempted ? errors[field] : undefined);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName;
    setTouched((t) => (t[name] ? t : { ...t, [name]: true }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const invalid = (["name", "email", "message"] as const).filter((field) => errors[field]);
    if (invalid.length) {
      setSummary(`Please check ${invalid.length === 1 ? "1 field" : `${invalid.length} fields`}: ${invalid.map((f) => labels[f]).join(", ")}.`);
      const first = { name: nameRef, email: emailRef, message: messageRef }[invalid[0]!];
      first.current?.focus();
      return;
    }
    setSummary("");
    const url = whatsappUrl(values);
    // Must run synchronously inside the submit handler or pop-up blockers stop it.
    window.open(url, "_blank", "noopener,noreferrer");
    setHandoffUrl(url);
    if (recordsEnquiries) {
      setRecord("pending");
      recordEnquiry(values, { source, page: pathname }).then(setRecord);
    }
  };

  // Move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    if (handoffUrl) doneRef.current?.focus();
  }, [handoffUrl]);

  const edit = () => {
    setHandoffUrl(null);
    setRecord(null);
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const note = recordsEnquiries
    ? "We receive a copy of your enquiry, and WhatsApp opens for you to review and send your message."
    : "Your enquiry opens in WhatsApp for you to review and send.";

  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Enquiry: ${values.interest}`)}&body=${encodeURIComponent(composeMessage(values))}`;

  const describedBy = (field: FieldName) => (visibleError(field) ? id(`${field}-error`) : undefined);

  return (
    <div className={cn("enquiry", `enquiry--${variant}`)}>
      {handoffUrl ? (
        <div className="enquiry__done" ref={doneRef} tabIndex={-1} role="status" aria-live="polite">
          <p className="enquiry__done-kicker">Message ready</p>
          <Heading className="enquiry__title">Continue in WhatsApp.</Heading>
          <p className="enquiry__intro">
            We opened WhatsApp in a new tab with your message filled in. Review it there and press send.
          </p>
          {record === "pending" && <p className="enquiry__record">Saving a copy of your enquiry…</p>}
          {record === "sent" && <p className="enquiry__record">We've also received a copy of your enquiry.</p>}
          {record === "failed" && (
            <p className="enquiry__record enquiry__record--warn">
              We couldn't save a copy of your enquiry, but your WhatsApp message is ready to send.
            </p>
          )}
          <div className="enquiry__done-actions">
            <a className="btn btn--md enquiry__submit" href={handoffUrl} target="_blank" rel="noopener noreferrer">
              <span className="btn__label">WhatsApp didn't open? Open it</span>
              <span className="btn__disc" aria-hidden="true">
                <ArrowUpRight />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="enquiry__alt" href={mailto}>
              Send by email instead
            </a>
            <button type="button" className="enquiry__alt" onClick={edit}>
              Edit your message
            </button>
          </div>
        </div>
      ) : (
        <form className="enquiry__form" onSubmit={onSubmit} noValidate aria-labelledby={id("title")}>
          {eyebrow && <p className="enquiry__eyebrow">{eyebrow}</p>}
          <Heading id={id("title")} className="enquiry__title">
            {heading}
          </Heading>
          {intro && <p className="enquiry__intro">{intro}</p>}

          <fieldset className="enquiry__interests">
            <legend>I'm interested in</legend>
            <div className="chip-group">
              {interests.map((option) => (
                <label key={option} className="chip">
                  <input
                    type="radio"
                    name="interest"
                    value={option}
                    checked={values.interest === option}
                    onChange={onChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="enquiry__row">
            <div className="field">
              <label htmlFor={id("name")}>
                {labels.name}
                <span className="field__required" aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef}
                id={id("name")}
                className="field__control"
                name="name"
                autoComplete="name"
                required
                maxLength={LIMITS.name + 20}
                placeholder={placeholders.name}
                value={values.name}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(visibleError("name"))}
                aria-describedby={describedBy("name")}
              />
              {visibleError("name") && (
                <p id={id("name-error")} className="field__error">
                  {visibleError("name")}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor={id("email")}>
                {labels.email}
                <span className="field__required" aria-hidden="true">*</span>
              </label>
              <input
                ref={emailRef}
                id={id("email")}
                className="field__control"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                maxLength={LIMITS.email}
                placeholder={placeholders.email}
                value={values.email}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(visibleError("email"))}
                aria-describedby={describedBy("email")}
              />
              {visibleError("email") && (
                <p id={id("email-error")} className="field__error">
                  {visibleError("email")}
                </p>
              )}
            </div>
          </div>

          <div className="field enquiry__message">
            <label htmlFor={id("message")}>
              {labels.message}
              <span className="field__required" aria-hidden="true">*</span>
            </label>
            <textarea
              ref={messageRef}
              id={id("message")}
              className="field__control"
              name="message"
              rows={messageRows}
              required
              maxLength={LIMITS.message + 50}
              placeholder={placeholders.message}
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={Boolean(visibleError("message"))}
              aria-describedby={describedBy("message")}
            />
            {visibleError("message") && (
              <p id={id("message-error")} className="field__error">
                {visibleError("message")}
              </p>
            )}
          </div>

          <p className="enquiry__note">{note}</p>
          <p className="sr-only" role="alert">
            {summary}
          </p>

          <button type="submit" className={cn("btn", "enquiry__submit", variant === "menu" ? "btn--secondary" : "btn--primary btn--block")}>
            <span className="btn__label">{submitLabel}</span>
            <span className="btn__disc" aria-hidden="true">
              <ArrowUpRight />
            </span>
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </button>
        </form>
      )}
    </div>
  );
}
