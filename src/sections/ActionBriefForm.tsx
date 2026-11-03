import React, { useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { CONTACT_DIRECTORY } from '../content/siteCatalog';
import type { InquiryContext } from '../tokens/designTokens';
import { MagneticAction } from '../primitives/MagneticAction';

interface ActionBriefFormProps {
  inquiryContext: InquiryContext | null;
}

const TOPIC_OPTIONS = [
  'Digital Experience & Composable Platforms',
  'Applied AI Hyperautomation',
  'Site 360 / L7 Nexus / L7 Insights',
  'Technology Strategy & Consulting',
  'Custom Developments & Billing',
  'Corporate Cloud & DevOps Bootcamp',
];

interface FormValues {
  fullName: string;
  company: string;
  email: string;
  topic: string;
  details: string;
}

export const ActionBriefForm: React.FC<ActionBriefFormProps> = ({
  inquiryContext,
}) => {
  const [values, setValues] = useState<FormValues>(() => ({
    fullName: '',
    company: '',
    email: '',
    topic: inquiryContext?.topic || TOPIC_OPTIONS[0],
    details: inquiryContext?.prefillMessage || '',
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitted(false);
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.fullName.trim()) next.fullName = 'Please enter your name.';
    if (!values.company.trim()) next.company = 'Please enter your company or organisation.';
    if (!values.email.trim()) {
      next.email = 'Please provide your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.details.trim() || values.details.trim().length < 12) {
      next.details = 'Please share a brief overview of your goals (at least 12 characters).';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const composedBody = `Name: ${values.fullName}\nCompany: ${values.company}\nEmail: ${values.email}\nFocus Area: ${values.topic}\n\nProject Brief:\n${values.details}`;

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-[#060911] bg-radial-stage border-t border-slate-800/80 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="rounded-bento border border-slate-800/90 bg-[#0B101E]/90 p-6 sm:p-10 lg:p-14 shadow-bento-card grid lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Conversion Pitch & Direct Channels */}
          <div className="lg:col-span-5 space-y-7">
            <div className="inline-flex items-center gap-2 rounded-pill border border-[#38BDF8]/30 bg-[#060911] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
              <span>08 // Start Your Revenue Engine</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.05]">
              Your website should be generating revenue right now.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Partner with Ladder7 to build an intelligent, connected, and scalable digital revenue system — engineered for your markets, your goals, and your growth.
            </p>

            {/* Direct Contact Channels */}
            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${CONTACT_DIRECTORY.email}`}
                className="group rounded-2xl border border-slate-800/90 bg-[#060911]/85 hover:border-[#38BDF8]/60 p-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-[#0056B2]/25 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      Direct Email
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                      {CONTACT_DIRECTORY.email}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#38BDF8]" />
              </a>

              <a
                href={CONTACT_DIRECTORY.phoneHref}
                className="group rounded-2xl border border-slate-800/90 bg-[#060911]/85 hover:border-[#38BDF8]/60 p-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-[#0056B2]/25 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      Phone &amp; Consultations
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                      {CONTACT_DIRECTORY.phoneDisplay}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#38BDF8]" />
              </a>

              <a
                href={CONTACT_DIRECTORY.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-800/90 bg-[#060911]/85 hover:border-[#38BDF8]/60 p-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-[#0056B2]/25 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      Instant Messaging
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                      Chat on WhatsApp
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#38BDF8]" />
              </a>
            </div>

            {/* Locations */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs">
              {CONTACT_DIRECTORY.locations.map((loc) => (
                <div key={loc.city} className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{loc.city}</div>
                    <div className="text-slate-400">{loc.hubName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 7 Cols: Interactive Scoping Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#060911]/95 p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="space-y-6 py-4" role="status" aria-live="polite">
                <div className="inline-flex items-center gap-2 rounded-pill bg-[#0056B2]/30 border border-[#38BDF8]/50 px-4 py-1.5 font-mono text-xs text-[#38BDF8]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Brief Ready for Dispatch</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Thank you, {values.fullName}. Your project brief has been prepared.
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Review your summary below or click to send directly via your email client or WhatsApp to our solutions team.
                </p>

                <div className="rounded-xl border border-slate-800 bg-[#0B101E] p-4 font-mono text-xs text-slate-200 whitespace-pre-line">
                  {composedBody}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`mailto:${CONTACT_DIRECTORY.email}?subject=${encodeURIComponent(
                      `Ladder7 Project Inquiry: ${values.topic} (${values.company})`
                    )}&body=${encodeURIComponent(composedBody)}`}
                    className="rounded-pill bg-[#0056B2] hover:bg-[#2563EB] text-white font-semibold text-xs sm:text-sm px-6 py-3 inline-flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Dispatch via Email</span>
                  </a>

                  <a
                    href={`https://wa.me/918137979401?text=${encodeURIComponent(composedBody)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-pill border border-slate-700 hover:border-[#38BDF8] text-slate-100 font-semibold text-xs sm:text-sm px-6 py-3 inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-slate-400 hover:text-white px-3 py-2"
                  >
                    Edit Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-2.5">
                    Select Focus Area
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TOPIC_OPTIONS.map((topic) => {
                      const isSelected = values.topic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => updateField('topic', topic)}
                          className={`px-3.5 py-1.5 rounded-pill text-xs font-medium border transition-all ${
                            isSelected
                              ? 'border-[#38BDF8] bg-[#0056B2] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                              : 'border-slate-800 bg-[#0B101E] text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={values.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-slate-800 bg-[#0B101E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#38BDF8] focus:outline-none"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-[#38BDF8] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Company / Organisation *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={values.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="Organisation name"
                      className="w-full rounded-xl border border-slate-800 bg-[#0B101E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#38BDF8] focus:outline-none"
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-[#38BDF8] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={values.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-800 bg-[#0B101E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#38BDF8] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-[#38BDF8] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-details"
                    className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Project Brief &amp; Objectives *
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    value={values.details}
                    onChange={(e) => updateField('details', e.target.value)}
                    placeholder="Tell us about the digital platform, AI system, Site 360 audit, or bootcamp you want to explore..."
                    className="w-full rounded-xl border border-slate-800 bg-[#0B101E] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#38BDF8] focus:outline-none"
                  />
                  {errors.details && (
                    <p className="mt-1.5 text-xs text-[#38BDF8] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.details}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <MagneticAction
                    type="submit"
                    className="rounded-pill bg-gradient-to-r from-[#0056B2] to-[#2563EB] hover:from-[#2563EB] hover:to-[#38BDF8] text-white font-semibold text-sm px-8 py-4 shadow-brand-glow gap-2 transition-all"
                  >
                    <span>Start Your Revenue Engine Today</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </MagneticAction>

                  <span className="font-mono text-[11px] text-slate-400">
                    Privacy-First • NDA Protected
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

