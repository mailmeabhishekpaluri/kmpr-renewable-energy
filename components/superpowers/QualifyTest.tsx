"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Answer = true | false | null;

type State = {
  inAP:       Answer;
  load2MW:    Answer;
  voltage33kV: Answer;
};

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS: { key: keyof State; label: string }[] = [
  { key: "inAP",        label: "My facility is in Andhra Pradesh." },
  { key: "load2MW",     label: "My sanctioned load is 2 MW or more." },
  { key: "voltage33kV", label: "I am connected at (or can move to) 33 kV." },
];

// ─── Fail-specific explainers ─────────────────────────────────────────────────

const FAIL_COPY: Record<keyof State, { heading: string; body: string }> = {
  inAP: {
    heading: "Currently AP-only",
    body: "Our plant is in Andhra Pradesh and open access is state-specific. We're evaluating expansion to Karnataka and Telangana — drop your email and we'll reach out when we go live in your state.",
  },
  load2MW: {
    heading: "Below our current threshold",
    body: "Our standard consumer minimum is 2 MW. We'll have a smaller-consumer cluster product in 2027 that pools sub-2 MW loads. Drop your email and we'll come back.",
  },
  voltage33kV: {
    heading: "Voltage upgrade required",
    body: "Open access consumers need a 33 kV connection. Many facilities qualify for a Discom-funded upgrade — our team can walk you through eligibility. Leave your email and we'll follow up.",
  },
};

// ─── Future cluster email form ────────────────────────────────────────────────

function FutureClusterForm({ failKey }: { failKey: keyof State }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag: "future-cluster", reason: failKey }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="text-emerald-700 text-sm font-medium mt-4">
        ✓ Got it — we'll reach out when it's ready.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2 mt-4">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white border border-kmpr-teal/25 rounded-xl px-4 py-2.5 text-kmpr-navy text-sm placeholder:text-kmpr-muted/60 focus:outline-none focus:ring-2 focus:ring-kmpr-teal/40 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-kmpr-teal hover:bg-kmpr-teal-dark disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
      >
        {status === "loading" ? "…" : "Notify me"}
      </button>
    </form>
  );
}

// ─── Result panel ─────────────────────────────────────────────────────────────

function ResultPanel({ state }: { state: State }) {
  const vals = Object.values(state) as Answer[];
  const allAnswered = vals.every((v) => v !== null);

  if (!allAnswered) {
    return (
      <div className="mt-8 rounded-xl bg-kmpr-soft-bg border border-kmpr-teal/15 px-6 py-5 text-center">
        <p className="text-kmpr-muted text-sm">Answer all three to see your result.</p>
      </div>
    );
  }

  // Find first failing key (in priority order)
  const failKey = (Object.keys(state) as (keyof State)[]).find((k) => state[k] === false);

  if (!failKey) {
    // All yes — qualified
    return (
      <div className="mt-8 rounded-xl bg-kmpr-teal px-8 py-7 text-center">
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-2">
          You qualify
        </p>
        <p className="text-white font-bold text-xl mb-5">
          Open access solar is available for your facility.
        </p>
        <Link
          href="/contact?qualified=true"
          className="inline-flex items-center gap-2 bg-white text-kmpr-teal font-bold px-7 py-3 rounded-full text-sm hover:bg-kmpr-soft-bg transition-colors"
        >
          Talk to our Director today →
        </Link>
      </div>
    );
  }

  // At least one No
  const { heading, body } = FAIL_COPY[failKey];
  return (
    <div className="mt-8 rounded-xl bg-kmpr-alert-bg border border-kmpr-alert-text/20 px-7 py-6">
      <p className="text-kmpr-alert-text font-bold text-base mb-2">{heading}</p>
      <p className="text-kmpr-alert-text/80 text-sm leading-relaxed">{body}</p>
      <FutureClusterForm failKey={failKey} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QualifyTest() {
  const [state, setState] = useState<State>({
    inAP:        null,
    load2MW:     null,
    voltage33kV: null,
  });

  const setAnswer = (key: keyof State, value: boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));

    // Fire-and-forget telemetry — no await, no error UI
    fetch("/api/qualify-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: key, value }),
    }).catch(() => {});
  };

  return (
    <section className="bg-kmpr-soft-bg py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
          10-Second Qualification Test
        </p>
        <h2 className="text-3xl font-bold text-kmpr-navy mb-8">
          Will open access work for you?
        </h2>

        <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-7 sm:p-8 space-y-6">
          {QUESTIONS.map(({ key, label }) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              {/* Label */}
              <p className="flex-1 text-kmpr-navy font-medium text-sm leading-snug">
                {label}
              </p>

              {/* Yes / No buttons */}
              <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setAnswer(key, true)}
                  aria-pressed={state[key] === true}
                  className={`flex-1 sm:flex-none min-h-[44px] px-5 rounded-full text-sm font-semibold border transition-colors ${
                    state[key] === true
                      ? "bg-kmpr-teal text-white border-kmpr-teal"
                      : "bg-white text-kmpr-navy border-kmpr-teal/30 hover:border-kmpr-teal"
                  }`}
                >
                  ✓ Yes
                </button>
                <button
                  onClick={() => setAnswer(key, false)}
                  aria-pressed={state[key] === false}
                  className={`flex-1 sm:flex-none min-h-[44px] px-5 rounded-full text-sm font-semibold border transition-colors ${
                    state[key] === false
                      ? "bg-kmpr-alert-text text-white border-kmpr-alert-text"
                      : "bg-white text-kmpr-navy border-kmpr-teal/30 hover:border-kmpr-teal"
                  }`}
                >
                  ✗ No
                </button>
              </div>
            </div>
          ))}

          <ResultPanel state={state} />
        </div>
      </div>
    </section>
  );
}
