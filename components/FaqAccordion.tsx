"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-kmpr-teal/10">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className="text-kmpr-navy font-semibold text-base group-hover:text-kmpr-teal-dark transition-colors">
              {item.question}
            </span>
            <span
              className={`shrink-0 w-6 h-6 rounded-full border border-kmpr-teal/30 flex items-center justify-center text-kmpr-teal transition-transform duration-200 ${
                open === i ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-kmpr-muted text-sm leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
