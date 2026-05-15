"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

// ─── Step definitions ─────────────────────────────────────────────────────────

type StepType = "text" | "email" | "tel" | "number" | "choice";

type Step = {
  id: string;
  type: StepType;
  question: string;
  placeholder?: string;
  note?: string;
  choices?: string[];
  ack: (val: string) => string;
};

const STEPS: Step[] = [
  {
    id: "company",
    type: "text",
    question: "What's your company name?",
    placeholder: "e.g. Hindupur Steels Pvt Ltd",
    ack: (v) => `Got it — we'll tailor the proposal for ${v}.`,
  },
  {
    id: "district",
    type: "text",
    question: "Which AP district is your plant in?",
    placeholder: "e.g. Anantapur, Kurnool, Guntur…",
    note: "We currently serve Andhra Pradesh only.",
    ack: (v) => `${v} — noted. Let's check your load next.`,
  },
  {
    id: "load",
    type: "number",
    question: "Sanctioned load in MW?",
    placeholder: "e.g. 5",
    ack: (v) => `${v} MW — that's within our standard consumer range.`,
  },
  {
    id: "email",
    type: "email",
    question: "Work email?",
    placeholder: "you@company.com",
    ack: (v) => `We'll send the savings model to ${v}.`,
  },
  {
    id: "phone",
    type: "tel",
    question: "Mobile number?",
    placeholder: "+91 98765 43210",
    ack: (v) => `Perfect — we'll reach you at ${v}.`,
  },
  {
    id: "model",
    type: "choice",
    question: "Prefer PPA or BOOT, or not sure yet?",
    choices: ["PPA", "BOOT", "Not sure"],
    ack: (v) =>
      v === "Not sure"
        ? "No problem — we'll walk you through both options."
        : `${v} is a great fit for many AP industrial consumers.`,
  },
];

const TOTAL = STEPS.length;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(step: Step, value: string): string | null {
  if (!value.trim()) return "Please fill this in to continue.";
  if (step.type === "number") {
    const n = parseFloat(value);
    if (isNaN(n) || n < 1) return "Please enter a load of 1 MW or more.";
  }
  if (step.type === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email address.";
  }
  if (step.type === "tel") {
    const cleaned = value.replace(/[\s\-()]/g, "");
    if (!/^(\+91)?[6-9]\d{9}$/.test(cleaned))
      return "Please enter a valid Indian mobile number (+91 followed by 10 digits).";
  }
  return null;
}

// ─── Slide animation variants ─────────────────────────────────────────────────

const variants = {
  enter:  { x: 56, opacity: 0 },
  center: { x: 0,  opacity: 1 },
  exit:   { x: -56, opacity: 0 },
};

const transition = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

// ─── Thank-you screen ─────────────────────────────────────────────────────────

function ThankYou({ answers }: { answers: Record<string, string> }) {
  const [showCalendly, setShowCalendly] = useState(false);
  const company = answers.company ?? "your company";
  const waText  = encodeURIComponent(
    `Hi KMPR Power, I just submitted a feasibility enquiry for ${company}. Looking forward to hearing from you.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-4"
    >
      {/* Check mark */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">
        Received
      </p>
      <h2 className="text-2xl font-bold text-kmpr-navy mb-3">
        Your enquiry is with us
      </h2>
      <p className="text-kmpr-muted text-sm mb-8 max-w-xs mx-auto leading-relaxed">
        We'll model your savings for {company} and be in touch within 4 working hours.
      </p>

      {/* Three action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-6">
        {/* Portfolio PDF */}
        <a
          href="/KMPR_Power_Portfolio.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 bg-kmpr-soft-bg border border-kmpr-teal/15 rounded-xl p-5 hover:border-kmpr-teal/40 transition-colors group"
        >
          <span className="text-xl">📄</span>
          <p className="font-semibold text-kmpr-navy text-sm">Download portfolio</p>
          <p className="text-kmpr-muted text-xs leading-snug">Full plant specs, tariff comparison, and case studies</p>
          <span className="text-kmpr-teal text-xs font-semibold mt-auto group-hover:underline">Download PDF →</span>
        </a>

        {/* Calendly */}
        <button
          onClick={() => setShowCalendly((s) => !s)}
          className="flex flex-col gap-2 bg-kmpr-soft-bg border border-kmpr-teal/15 rounded-xl p-5 hover:border-kmpr-teal/40 transition-colors group text-left"
        >
          <span className="text-xl">📅</span>
          <p className="font-semibold text-kmpr-navy text-sm">Schedule a call</p>
          <p className="text-kmpr-muted text-xs leading-snug">Pick a time with our Director — 30 min</p>
          <span className="text-kmpr-teal text-xs font-semibold mt-auto">
            {showCalendly ? "Hide calendar ↑" : "Open calendar →"}
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/919876543210?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 bg-kmpr-soft-bg border border-kmpr-teal/15 rounded-xl p-5 hover:border-kmpr-teal/40 transition-colors group"
        >
          <span className="text-xl">💬</span>
          <p className="font-semibold text-kmpr-navy text-sm">WhatsApp us</p>
          <p className="text-kmpr-muted text-xs leading-snug">Message directly — we respond in hours</p>
          <span className="text-kmpr-teal text-xs font-semibold mt-auto group-hover:underline">Open WhatsApp →</span>
        </a>
      </div>

      {/* Inline Calendly iframe */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 640, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-2xl border border-kmpr-teal/15"
          >
            <iframe
              src="https://calendly.com/kmprpower/feasibility"
              width="100%"
              height="640"
              title="Schedule a call with KMPR Power"
              frameBorder="0"
              allow="clipboard-write"
              className="block"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ConversationalForm() {
  const searchParams = useSearchParams();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draft, setDraft]     = useState("");
  const [error, setError]     = useState<string | null>(null);
  const [ack, setAck]         = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const inputRef        = useRef<HTMLInputElement>(null);
  const answersRef      = useRef(answers);
  const submittedRef    = useRef(false);

  // Keep ref in sync for beacon closure
  useEffect(() => { answersRef.current = answers; }, [answers]);

  // Pre-fill message context from query params
  useEffect(() => {
    const reason = searchParams.get("reason") ?? "";
    const withParam = searchParams.get("with") ?? "";
    if (reason || withParam) {
      // Context info is available but this form collects structured data — nothing to pre-fill
    }
  }, [searchParams]);

  // Partial submit on unmount / page close
  useEffect(() => {
    const beacon = () => {
      if (submittedRef.current) return;
      const data = answersRef.current;
      if (Object.keys(data).length === 0) return;
      navigator.sendBeacon(
        "/api/lead",
        new Blob([JSON.stringify({ ...data, stage: "partial" })], { type: "application/json" })
      );
    };
    window.addEventListener("beforeunload", beacon);
    return () => {
      window.removeEventListener("beforeunload", beacon);
      beacon(); // SPA navigation
    };
  }, []);

  // Focus input when step changes
  useEffect(() => {
    setDraft("");
    setError(null);
    setAck(null);
    setTimeout(() => inputRef.current?.focus(), 320);
  }, [step]);

  const currentStep = STEPS[step];

  const advance = useCallback(
    async (value: string) => {
      const err = validate(currentStep, value);
      if (err) { setError(err); return; }

      const newAnswers = { ...answers, [currentStep.id]: value };
      setAnswers(newAnswers);
      setAck(currentStep.ack(value));

      if (step < TOTAL - 1) {
        setTimeout(() => setStep((s) => s + 1), 500);
      } else {
        // Final submit
        try {
          await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...newAnswers, stage: "complete" }),
          });
        } catch { /* non-blocking */ }
        submittedRef.current = true;
        setSubmitted(true);
      }
    },
    [answers, currentStep, step]
  );

  const handleChoice = (choice: string) => advance(choice);

  const handleNext = () => advance(draft);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep.type !== "choice") {
      e.preventDefault();
      handleNext();
    }
  };

  if (submitted) return <ThankYou answers={answers} />;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-kmpr-muted mb-2">
          <span>Step {step + 1} of {TOTAL}</span>
          <span>{Math.round(((step + 1) / TOTAL) * 100)}% complete</span>
        </div>
        <div className="h-1.5 w-full bg-kmpr-soft-bg rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-kmpr-teal rounded-full"
            animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Animated question screen */}
      <div className="relative overflow-hidden min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {/* Question */}
            <h2 className="text-[1.75rem] font-bold text-kmpr-navy leading-snug mb-6">
              {currentStep.question}
            </h2>

            {/* Note */}
            {currentStep.note && (
              <p className="text-kmpr-muted text-xs font-medium mb-3 flex items-center gap-1.5">
                <span className="text-kmpr-teal">ℹ</span>
                {currentStep.note}
              </p>
            )}

            {/* Input or Choices */}
            {currentStep.type === "choice" ? (
              <div className="flex flex-col sm:flex-row gap-3">
                {currentStep.choices?.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleChoice(c)}
                    className="flex-1 min-h-[56px] px-6 py-3 rounded-xl border-2 border-kmpr-teal/25 text-kmpr-navy font-semibold text-sm hover:border-kmpr-teal hover:bg-kmpr-soft-bg transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <input
                ref={inputRef}
                type={currentStep.type}
                placeholder={currentStep.placeholder}
                value={draft}
                onChange={(e) => { setDraft(e.target.value); setError(null); }}
                onKeyDown={handleKeyDown}
                className="w-full bg-white border-2 border-kmpr-teal/20 focus:border-kmpr-teal rounded-xl px-5 py-4 text-kmpr-navy text-lg font-medium placeholder:text-kmpr-muted/50 focus:outline-none transition-colors"
                inputMode={currentStep.type === "number" ? "decimal" : currentStep.type === "tel" ? "tel" : "text"}
              />
            )}

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs mt-2">{error}</p>
            )}

            {/* Ack line */}
            <AnimatePresence>
              {ack && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-kmpr-teal text-sm font-medium mt-3"
                >
                  ✓ {ack}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Next button */}
            {currentStep.type !== "choice" && (
              <button
                onClick={handleNext}
                className="mt-6 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
              >
                {step === TOTAL - 1 ? "See my proposal →" : "Next →"}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
