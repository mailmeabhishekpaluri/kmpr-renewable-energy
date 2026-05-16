import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import WhatsAppCTA from "@/components/superpowers/WhatsAppCTA";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "PPA Model — 26% Co-Investment, Rs. 4.30/unit for 25 Years",
  description: "Become a 26% co-investor in KMPR's 40 MW solar plant. Recover equity in 9 months from bill savings. Fixed Rs. 4.30/unit tariff for 25 years in Andhra Pradesh.",
  alternates:  { canonical: "https://kmprpower.com/ppa" },
  openGraph: {
    title:       "PPA Model — 26% equity, 9-month payback, 25-year tariff lock",
    description: "Become a 26% co-investor in KMPR's 40 MW solar plant. Recover equity in 9 months.",
    url:         "https://kmprpower.com/ppa",
    images: [{ url: "/api/og?title=26%25+equity.+25-year+fixed+tariff.&tag=PPA+Model", width: 1200, height: 630, alt: "KMPR PPA Model" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "PPA Model — 26% equity, 9-month payback, 25-year tariff lock",
    description: "Become a 26% co-investor in KMPR's 40 MW solar plant. Recover equity in 9 months.",
    images:      ["/api/og?title=26%25+equity.+25-year+fixed+tariff.&tag=PPA+Model"],
  },
};

// ─── Static content ───────────────────────────────────────────────────────────

const TIMELINE_STEPS = [
  {
    n: "1",
    title: "Select your capacity",
    body: "Choose between 2 MW and 10 MW of dedicated solar allocation from KMPR's Madakasira plant.",
  },
  {
    n: "2",
    title: "Contribute 26% equity",
    body: "A one-time equity contribution of 26% of plant capex per MW — the only upfront cost you ever pay.",
  },
  {
    n: "3",
    title: "Sign the 25-year PPA",
    body: "Execute the Power Purchase Agreement at ~Rs. 4.30/unit at feeder substation. Tariff is fixed for the full tenure.",
  },
  {
    n: "4",
    title: "Recover equity in 9 months",
    body: "Bill savings from day one retire your equity contribution. Most consumers are cash-flow positive within 9 months.",
  },
  {
    n: "5",
    title: "25 years of stable power",
    body: "For the remaining tenure you pay only the locked tariff — no escalation, no Discom surprises.",
  },
];

const KEY_TERMS = [
  { label: "Tariff",              value: "~Rs. 4.30 / unit at feeder substation" },
  { label: "Equity",              value: "26% of plant capex per MW (one-time, recovered in 9 months)" },
  { label: "PPA Duration",        value: "25 years" },
  { label: "Min Commitment",      value: "2–3 MW per consumer" },
  { label: "Max per Consumer",    value: "Up to 10 MW" },
  { label: "Grid Voltage",        value: "33 kV input and output" },
  { label: "KMPR Co-Investment",  value: "Available for consumers meeting business surety criteria" },
  { label: "State",               value: "Andhra Pradesh" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PpaPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-kmpr-navy pt-28 pb-20 overflow-hidden">
        {/* Subtle teal accent */}
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
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li><Link href="/models/compare" className="hover:text-white/70 transition-colors">Models</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li className="text-white/60">PPA</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-5">
              Power Purchase Agreement
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Recover your equity in 9&nbsp;months.
              Lock <span className="tabular text-kmpr-teal">Rs.&nbsp;4.30&nbsp;/&nbsp;unit</span> for 25&nbsp;years.
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              The PPA model — become a 26% co-investor and get bankable, fixed-tariff solar
              for the next quarter-century.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 5-Step Timeline ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-16">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Five steps to 25 years of fixed-price solar
            </h2>
          </FadeIn>

          {/* Desktop horizontal / mobile vertical */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[2.6rem] left-[calc(10%+1.25rem)] right-[calc(10%+1.25rem)] h-px bg-kmpr-teal/20"
            />

            <FadeInStagger className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between">
              {TIMELINE_STEPS.map((step, i) => (
                <FadeInItem key={step.n} className="lg:w-1/5 lg:px-4">
                  <div className="flex lg:flex-col gap-5 lg:gap-0 lg:items-center">
                    {/* Step circle */}
                    <div className="relative shrink-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-kmpr-teal flex items-center justify-center text-white font-bold text-sm z-10">
                        {step.n}
                      </div>
                      {/* Mobile vertical connector */}
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="lg:hidden absolute top-10 left-1/2 -translate-x-1/2 w-px h-full min-h-[2rem] bg-kmpr-teal/20"
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="lg:text-center lg:mt-5">
                      <p className="font-bold text-kmpr-navy mb-1 text-sm">{step.title}</p>
                      <p className="text-kmpr-muted text-xs leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </section>

      {/* ── Key Terms ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Term Sheet
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Key terms at a glance
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-2xl border border-kmpr-teal/15 overflow-hidden">
              {KEY_TERMS.map((term, i) => (
                <div
                  key={term.label}
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 px-6 py-4 ${
                    i < KEY_TERMS.length - 1 ? "border-b border-kmpr-teal/10" : ""
                  } ${i % 2 === 0 ? "bg-white" : "bg-kmpr-soft-bg/50"}`}
                >
                  <p className="text-kmpr-muted text-sm font-medium">{term.label}</p>
                  <p className="text-kmpr-navy text-sm font-semibold">{term.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Co-investment callout */}
          <FadeIn className="mt-6">
            <div className="bg-kmpr-alert-bg border border-kmpr-alert-text/25 rounded-2xl p-6 flex gap-4 items-start">
              <span className="text-kmpr-alert-text text-xl shrink-0 mt-0.5" aria-hidden="true">💡</span>
              <div>
                <p className="text-kmpr-alert-text font-semibold mb-1">KMPR Co-Investment available</p>
                <p className="text-kmpr-alert-text/80 text-sm leading-relaxed">
                  We can fund all or part of your 26% if you meet our business surety criteria.{" "}
                  <Link href="/contact" className="underline underline-offset-2 hover:text-kmpr-alert-text transition-colors font-medium">
                    Ask us.
                  </Link>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-navy">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Run the Numbers
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              See your 25-year saving in 60 seconds
            </h2>
            <p className="text-white/50 text-sm mb-8">
              Upload a recent electricity bill and we'll model your exact PPA saving — payback period, cumulative saving, and carbon offset.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
              >
                Model my 25-year PPA savings →
              </Link>
              <WhatsAppCTA context="Interested in PPA model." />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
