"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// ─── Query param → pre-fill context ───────────────────────────────────────────

const REASON_MAP: Record<string, string> = {
  "plant-tour":       "I'd like to request a virtual plant tour of the Madakasira plant.",
  "reference-check":  "I'd like to speak to an existing KMPR client for a reference check.",
};

const WITH_MAP: Record<string, string> = {
  "pan-krishna":  "I'd like to book a meeting with Mr. PAN Krishna (Co-Founder & Director).",
  "prasad-raju":  "I'd like to book a meeting with Mr. Prasad Raju Muppala (Co-Founder & Technical Director).",
};

// ─── Field config ─────────────────────────────────────────────────────────────

type Field = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder: string;
  required?: boolean;
  options?: string[];
};

const FIELDS: Field[] = [
  { id: "company",       label: "Company / Organisation",  type: "text",     placeholder: "e.g. Hindupur Steels Pvt Ltd",       required: true },
  { id: "name",          label: "Your name",               type: "text",     placeholder: "Full name",                          required: true },
  { id: "phone",         label: "Phone",                   type: "tel",      placeholder: "+91 98765 43210",                    required: true },
  { id: "location",      label: "City / Location",         type: "text",     placeholder: "e.g. Hindupur, Andhra Pradesh",      required: true },
  { id: "load",          label: "Sanctioned load (MW)",    type: "select",   placeholder: "Select range",                       required: false,
    options: ["Under 2 MW", "2–3 MW", "3–5 MW", "5–10 MW", "10+ MW", "Not sure"] },
  { id: "message",       label: "How can we help?",        type: "textarea", placeholder: "Tell us about your energy situation…", required: false },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConversationalForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const reason = params.get("reason") ?? "";
    const withParam = params.get("with") ?? "";
    const prefill = REASON_MAP[reason] ?? WITH_MAP[withParam] ?? "";
    if (prefill) setValues((v) => ({ ...v, message: prefill }));
  }, [params]);

  const set = (id: string, val: string) => setValues((v) => ({ ...v, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-emerald-800 font-bold text-xl mb-2">Enquiry received</p>
        <p className="text-emerald-700 text-sm">We'll be in touch within 4 working hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {FIELDS.map((field) => {
        const baseInput =
          "w-full bg-white border border-kmpr-teal/20 rounded-xl px-4 py-3 text-kmpr-navy text-sm placeholder:text-kmpr-muted/60 focus:outline-none focus:ring-2 focus:ring-kmpr-teal/40 focus:border-kmpr-teal transition-colors";

        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-kmpr-navy font-medium text-sm mb-1.5">
              {field.label}
              {field.required && <span className="text-kmpr-teal ml-1">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                rows={4}
                placeholder={field.placeholder}
                value={values[field.id] ?? ""}
                onChange={(e) => set(field.id, e.target.value)}
                className={`${baseInput} resize-none`}
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                value={values[field.id] ?? ""}
                onChange={(e) => set(field.id, e.target.value)}
                className={`${baseInput} cursor-pointer`}
              >
                <option value="" disabled>{field.placeholder}</option>
                {field.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={values[field.id] ?? ""}
                onChange={(e) => set(field.id, e.target.value)}
                className={baseInput}
              />
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          Something went wrong — please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-kmpr-teal hover:bg-kmpr-teal-dark disabled:opacity-60 text-white font-semibold px-6 py-4 rounded-full transition-colors text-sm"
      >
        {status === "loading" ? "Sending…" : "Send feasibility enquiry →"}
      </button>

      <p className="text-kmpr-muted text-xs text-center">
        We respond within 4 working hours. No spam, ever.
      </p>
    </form>
  );
}
