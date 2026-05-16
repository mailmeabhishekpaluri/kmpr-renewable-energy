import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import DecisionHelper from "@/components/DecisionHelper";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "PPA vs BOOT — Compare Solar Models",
  description: "Compare KMPR's PPA (26% equity, fixed Rs. 4.30/unit for 25 years) and BOOT (zero upfront, full ownership in 6 years) models to find the right fit for your business.",
  alternates:  { canonical: "https://kmprpower.in/compare" },
  openGraph: {
    title:       "PPA vs BOOT — Find the right model for your plant",
    description: "26% equity + 25-year tariff lock vs. full ownership in 6 years. Compare side by side.",
    url:         "https://kmprpower.in/compare",
    images: [{ url: "/api/og?title=Find+the+right+model+for+your+plant&tag=PPA+vs+BOOT", width: 1200, height: 630, alt: "PPA vs BOOT Comparison" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "PPA vs BOOT — Find the right model for your plant",
    description: "26% equity + 25-year tariff lock vs. full ownership in 6 years. Compare side by side.",
    images:      ["/api/og?title=Find+the+right+model+for+your+plant&tag=PPA+vs+BOOT"],
  },
};

// ─── Static content ───────────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  { feature: "Upfront investment",       ppa: "26% equity per MW",                  boot: "Zero" },
  { feature: "Investment recovery",      ppa: "9 months via bill savings",           boot: "No investment to recover" },
  { feature: "Tariff rate",              ppa: "~Rs. 4.30/unit, fixed 25 yrs",        boot: "Current bill rate for 6 years" },
  { feature: "Plant ownership",          ppa: "Shared (26% equity stake)",           boot: "Full ownership at Year 6" },
  { feature: "Agreement duration",       ppa: "25 years",                            boot: "6 years to full ownership" },
  { feature: "Post-6-year cost",         ppa: "Fixed PPA rate continues",            boot: "Near-free power for 20+ years" },
  { feature: "KMPR co-investment",       ppa: "Available on request",                boot: "KMPR funds 100%" },
  { feature: "Best suited for",          ppa: "Businesses with capital to invest",   boot: "Cash-conservative businesses" },
];

const COMMON_TERMS = [
  "Minimum capacity: 2–3 MW per consumer",
  "Maximum capacity: up to 10 MW (higher under PPA is negotiable)",
  "Grid voltage: 33 kV input and output",
  "State: Andhra Pradesh only",
  "SLDC scheduling, surplus banking, and compliance: fully managed by KMPR",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComparePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-kmpr-navy pt-28 pb-20 overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full"
          preserveAspectRatio="xMaxYMin slice"
          viewBox="0 0 1440 600"
          fill="none"
        >
          <path d="M1440 0 L1440 600 L700 0 Z" fill="#1ABEC8" fillOpacity="0.05" />
          <circle cx="1360" cy="60" r="160" fill="#1ABEC8" fillOpacity="0.04" />
        </svg>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li className="text-white/60">Compare Models</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Model Comparison
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              PPA vs BOOT — which fits your balance sheet?
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              Two models, one goal: cheaper clean power for your facility. The right choice
              depends on your capital position and whether you want to own the asset.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Comparison Table ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Side by Side
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              The key differences
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-kmpr-teal/15">
              {/* Header row */}
              <div className="grid grid-cols-3 bg-kmpr-navy">
                <div className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-widest">
                  Feature
                </div>
                <div className="px-6 py-5 border-l border-white/10">
                  <Link
                    href="/ppa"
                    className="text-kmpr-teal font-bold text-sm hover:text-white transition-colors"
                  >
                    PPA Model →
                  </Link>
                </div>
                <div className="px-6 py-5 border-l border-white/10">
                  <Link
                    href="/boot"
                    className="text-kmpr-teal font-bold text-sm hover:text-white transition-colors"
                  >
                    BOOT Model →
                  </Link>
                </div>
              </div>

              {/* Data rows */}
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 border-t border-kmpr-teal/10 ${
                    i % 2 === 0 ? "bg-white" : "bg-kmpr-soft-bg"
                  }`}
                >
                  <div className="px-6 py-4 text-kmpr-muted text-sm font-medium">
                    {row.feature}
                  </div>
                  <div className="px-6 py-4 border-l border-kmpr-teal/10 text-kmpr-text text-sm">
                    {row.ppa}
                  </div>
                  <div className="px-6 py-4 border-l border-kmpr-teal/10 text-kmpr-navy text-sm font-semibold">
                    {row.boot}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Common to Both ───────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Shared Terms
            </p>
            <h2 className="text-3xl font-bold text-kmpr-navy">
              Common to both models
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-8">
              <ul className="space-y-4">
                {COMMON_TERMS.map((term) => (
                  <li key={term} className="flex items-start gap-3">
                    <span className="text-kmpr-teal mt-0.5 shrink-0 text-base">✓</span>
                    <span className="text-kmpr-text text-sm leading-relaxed">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Decision Helper ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Decision Helper
            </p>
            <h2 className="text-3xl font-bold text-kmpr-navy">
              Not sure which model fits?
            </h2>
            <p className="text-kmpr-muted text-sm mt-3 leading-relaxed">
              Answer three questions and we'll point you in the right direction.
            </p>
          </FadeIn>

          <FadeIn>
            <DecisionHelper />
          </FadeIn>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-navy">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Still Deciding?
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Talk to us — we'll model both options for your facility
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              Every engagement is sized to your load profile. A 30-minute call is enough
              to know which model saves you more.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
            >
              Book a feasibility call →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
