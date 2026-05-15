"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SlotProps = { filled: number; total: number };

// ─── Color logic ──────────────────────────────────────────────────────────────

function pillStyle(filled: number, total: number) {
  if (filled >= total)       return { bg: "bg-red-600",         text: "text-white",       dot: "#DC2626" };
  if (filled / total >= 0.5) return { bg: "bg-amber-100",       text: "text-amber-700",   dot: "#F59E0B" };
  return                            { bg: "bg-kmpr-teal/10",     text: "text-kmpr-teal",   dot: "#1ABEC8" };
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function SlotModal({ filled, total, onClose }: SlotProps & { onClose: () => void }) {
  const isFull    = filled >= total;
  const remaining = Math.max(0, total - filled);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">
          Phase 1 — Madakasira 40 MW
        </p>
        <h2 className="text-kmpr-navy font-bold text-xl mb-3">Consumer slot availability</h2>

        <p className="text-kmpr-muted text-sm leading-relaxed mb-5">
          KMPR's Phase 1 plant is <strong className="text-kmpr-navy">40 MW</strong>. Each open-access
          consumer draws a 5–7 MW sanctioned load, giving a total capacity of{" "}
          <strong className="text-kmpr-navy">3–7 consumer slots</strong>.
        </p>

        {/* Slot bar */}
        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`flex-1 h-3 rounded-full ${
                i < filled
                  ? isFull
                    ? "bg-red-500"
                    : filled / total >= 0.5
                    ? "bg-amber-400"
                    : "bg-kmpr-teal"
                  : "bg-kmpr-soft-bg border border-kmpr-teal/20"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-kmpr-muted mb-6">
          {filled} of {total} slots committed
          {remaining > 0 ? ` · ${remaining} remaining` : " · Phase 1 full"}
        </p>

        {isFull ? (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-semibold text-sm mb-1">Phase 1 is full</p>
              <p className="text-amber-700 text-xs leading-snug">
                Phase 2 (100–200 MW) is slated for <strong>Q1 2027</strong>. Join the waitlist
                now to secure early-access pricing.
              </p>
            </div>
            <Link
              href="/contact?reason=phase2-waitlist"
              onClick={onClose}
              className="block w-full text-center bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Join the Phase 2 Waitlist →
            </Link>
          </div>
        ) : (
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full text-center bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
          >
            Check my eligibility before slots fill →
          </Link>
        )}

        <button
          onClick={onClose}
          className="mt-4 block mx-auto text-kmpr-muted text-xs hover:text-kmpr-navy transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─── Pill (for header) ────────────────────────────────────────────────────────

export function SlotIndicatorPill({ filled, total }: SlotProps) {
  const [open, setOpen] = useState(false);
  const { bg, text, dot } = pillStyle(filled, total);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`hidden md:inline-flex items-center gap-1.5 ${bg} ${text} text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity`}
        aria-label="View Phase 1 slot availability"
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
          style={{ backgroundColor: dot }}
        />
        Phase&nbsp;1:&nbsp;{filled}&nbsp;of&nbsp;{total}&nbsp;slots&nbsp;filled
      </button>

      {open && (
        <SlotModal filled={filled} total={total} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

// ─── Header CTA (replaces "Check My Feasibility" when full) ──────────────────

export function SlotCTA({ filled, total }: SlotProps) {
  const isFull = filled >= total;

  if (isFull) {
    return (
      <Link
        href="/contact?reason=phase2-waitlist"
        className="hidden md:inline-flex flex-col items-center bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-full transition-colors leading-tight"
      >
        <span className="text-xs">Join Phase 2 Waitlist</span>
        <span className="text-white/70 font-normal" style={{ fontSize: "9px" }}>
          Slated for Q1&nbsp;2027
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/contact"
      className="hidden md:inline-flex items-center bg-kmpr-teal hover:bg-kmpr-teal-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
    >
      Check My Feasibility
    </Link>
  );
}

// ─── Mobile drawer CTA ────────────────────────────────────────────────────────

export function SlotMobileCTA({
  filled,
  total,
  onClick,
}: SlotProps & { onClick?: () => void }) {
  const isFull = filled >= total;

  if (isFull) {
    return (
      <Link
        href="/contact?reason=phase2-waitlist"
        onClick={onClick}
        className="block text-center bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors"
      >
        Join Phase 2 Waitlist
      </Link>
    );
  }

  return (
    <Link
      href="/contact"
      onClick={onClick}
      className="block text-center bg-kmpr-teal hover:bg-kmpr-teal-dark text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors"
    >
      Check My Feasibility
    </Link>
  );
}
