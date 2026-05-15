"use client";

import { useState } from "react";
import Link from "next/link";

type Answer = "yes" | "no" | null;

const QUESTIONS = [
  "Can you deploy 26% of plant capex upfront?",
  "Do you want the plant on your balance sheet at the end?",
  "Is your sanctioned load between 2 MW and 10 MW?",
];

type Rec = {
  label: string;
  href: string;
  rationale: string;
  variant: "teal" | "amber";
};

function getRecommendation(answers: Answer[]): Rec | null {
  const [q1, q2, q3] = answers;
  if (q1 === null || q2 === null || q3 === null) return null;

  if (q3 === "no") {
    return {
      label: "Contact Us",
      href: "/contact",
      rationale: "Your load falls outside our standard 2–10 MW range — contact us and we'll explore bespoke sizing.",
      variant: "amber",
    };
  }
  if (q1 === "no") {
    return {
      label: "BOOT Model",
      href: "/boot",
      rationale: "Zero upfront cost is a priority — BOOT finances 100% and transfers full ownership in 6 years.",
      variant: "teal",
    };
  }
  if (q2 === "yes") {
    return {
      label: "BOOT Model",
      href: "/boot",
      rationale: "You want the plant on your balance sheet — BOOT delivers full ownership in 6 years with zero upfront.",
      variant: "teal",
    };
  }
  return {
    label: "PPA Model",
    href: "/ppa",
    rationale: "You have capital to invest and prefer a long-term fixed tariff over full ownership — PPA is the right fit.",
    variant: "teal",
  };
}

export default function DecisionHelper() {
  const [answers, setAnswers] = useState<Answer[]>([null, null, null]);

  const set = (i: number, v: Answer) =>
    setAnswers((prev) => {
      const next = [...prev] as Answer[];
      next[i] = v;
      return next;
    });

  const rec = getRecommendation(answers);
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 p-8 space-y-5">
      {QUESTIONS.map((q, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-kmpr-navy font-medium text-sm flex-1 leading-snug">
            <span className="text-kmpr-teal font-bold mr-2">{i + 1}.</span>
            {q}
          </p>
          <div className="flex gap-2 shrink-0">
            {(["yes", "no"] as const).map((v) => (
              <button
                key={v}
                onClick={() => set(i, v)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  answers[i] === v
                    ? "bg-kmpr-teal text-white border-kmpr-teal"
                    : "bg-white text-kmpr-navy border-kmpr-teal/30 hover:border-kmpr-teal"
                }`}
              >
                {v === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      ))}

      {allAnswered && rec && (
        <div
          className={`rounded-xl border p-6 transition-all ${
            rec.variant === "teal"
              ? "bg-white border-kmpr-teal/25"
              : "bg-kmpr-alert-bg border-kmpr-alert-text/25"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
              rec.variant === "teal" ? "text-kmpr-teal" : "text-kmpr-alert-text"
            }`}
          >
            Our Recommendation
          </p>
          <p
            className={`text-xl font-bold mb-2 ${
              rec.variant === "teal" ? "text-kmpr-navy" : "text-kmpr-alert-text"
            }`}
          >
            {rec.label}
          </p>
          <p className="text-kmpr-muted text-sm leading-relaxed mb-4">{rec.rationale}</p>
          <Link
            href={rec.href}
            className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
              rec.variant === "teal"
                ? "text-kmpr-teal hover:text-kmpr-teal-dark"
                : "text-kmpr-alert-text hover:opacity-80"
            }`}
          >
            Learn more about the {rec.label} →
          </Link>
        </div>
      )}
    </div>
  );
}
