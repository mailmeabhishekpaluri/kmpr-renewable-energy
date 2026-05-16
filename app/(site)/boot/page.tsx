import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import WhatsAppCTA from "@/components/superpowers/WhatsAppCTA";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "BOOT Model — Own Your Solar Plant in 6 Years",
  description: "KMPR builds and finances your solar plant. Pay your current electricity bill to us for 6 years, then own the asset outright. 20+ years of near-free clean power after transfer.",
  alternates:  { canonical: "https://kmprpower.com/boot" },
  openGraph: {
    title:       "BOOT Model — Own your solar plant in 6 years",
    description: "KMPR builds and finances your plant. Pay your current bill for 6 years, then own the asset outright.",
    url:         "https://kmprpower.com/boot",
    images: [{ url: "/api/og?title=Own+your+solar+plant+in+6+years&tag=BOOT+Model", width: 1200, height: 630, alt: "KMPR BOOT Model" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "BOOT Model — Own your solar plant in 6 years",
    description: "KMPR builds and finances your plant. Pay your current bill for 6 years, then own the asset outright.",
    images:      ["/api/og?title=Own+your+solar+plant+in+6+years&tag=BOOT+Model"],
  },
};

// ─── Static content ───────────────────────────────────────────────────────────

const TIMELINE_STEPS = [
  {
    period: "Today",
    title: "You commit — KMPR builds",
    body: "Zero upfront payment. KMPR finances 100% of plant construction. You sign the Build, Own, Operate, Transfer agreement.",
    highlight: true,
  },
  {
    period: "Years 1–6",
    title: "Keep paying your current bill",
    body: "Your monthly energy payments go to KMPR instead of Discom — same amount, clean solar source. The payments retire the plant cost.",
    highlight: false,
  },
  {
    period: "Year 6",
    title: "Ownership transfers to you",
    body: "Once payments are complete, full legal ownership of the plant transfers to your entity — land, panels, inverters, and all.",
    highlight: true,
  },
  {
    period: "Years 7+",
    title: "20+ years of near-free power",
    body: "You own the asset outright. Pay only O&M costs — typically Rs. 0.30–0.50/unit — for the remaining productive life of the plant.",
    highlight: false,
  },
];

const WHO_ITS_FOR = [
  "Industrial consumers with stable demand of 2–10 MW",
  "Businesses currently paying Rs. 6–9 per unit or more to Discom",
  "Companies that want to own a renewable asset on their books",
  "Hospital groups or industrial clusters with multi-facility footprints",
  "Entities seeking 15% accelerated depreciation and 9% GST benefit on plant ownership",
  "Energy-intensive sectors: steel, textile, pharma, cement, food processing",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BootPage() {
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
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li><Link href="/models/compare" className="hover:text-white/70 transition-colors">Models</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li className="text-white/60">BOOT</li>
              </ol>
            </nav>

            {/* Eyebrow — expand the acronym on first reference */}
            <p className="text-kmpr-teal text-sm font-semibold tracking-wide mb-4">
              BOOT = Build&nbsp;•&nbsp;Own&nbsp;•&nbsp;Operate&nbsp;•&nbsp;Transfer
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Rs.&nbsp;0 upfront. Own the plant in 6&nbsp;years.
              20+ years of near-free power after that.
            </h1>

            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              We build and finance the plant. You pay your current electricity bill — to us
              instead of Discom — for 6&nbsp;years. Then the asset transfers to you, fully paid.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 4-Step Timeline ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-16">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              From zero investment to plant ownership in 6 years
            </h2>
          </FadeIn>

          {/* Desktop horizontal / mobile vertical */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[3.25rem] left-[calc(12.5%+1.25rem)] right-[calc(12.5%+1.25rem)] h-px bg-kmpr-teal/20"
            />

            <FadeInStagger className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between">
              {TIMELINE_STEPS.map((step, i) => (
                <FadeInItem key={step.period} className="lg:w-1/4 lg:px-5">
                  <div className="flex lg:flex-col gap-5 lg:gap-0 lg:items-center">
                    {/* Period badge + circle */}
                    <div className="relative shrink-0 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-kmpr-teal whitespace-nowrap">
                        {step.period}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors ${
                          step.highlight
                            ? "bg-kmpr-teal text-white"
                            : "bg-kmpr-soft-bg border-2 border-kmpr-teal/40 text-kmpr-teal"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {/* Mobile vertical connector */}
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="lg:hidden w-px flex-1 min-h-[1.5rem] bg-kmpr-teal/20 mt-1"
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="lg:text-center lg:mt-5">
                      <p className="font-bold text-kmpr-navy mb-1 text-sm leading-snug">{step.title}</p>
                      <p className="text-kmpr-muted text-xs leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </section>

      {/* ── Who This Is For ──────────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Is This Model for You?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Who the Build, Own, Operate, Transfer model suits
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHO_ITS_FOR.map((item) => (
              <FadeInItem key={item}>
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-5">
                  <span className="text-kmpr-teal mt-0.5 shrink-0 text-base">✓</span>
                  <p className="text-white/80 text-sm leading-relaxed">{item}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Tax-Benefit Panel ────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-soft-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-8 sm:p-10">
              <div className="flex gap-4 items-start">
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">📊</span>
                <div>
                  <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">
                    Tax Advantages (BOOT Owners)
                  </p>
                  <h3 className="text-xl font-bold text-kmpr-navy mb-4">
                    9% GST benefit + 15% accelerated depreciation
                  </h3>
                  <p className="text-kmpr-text text-sm leading-relaxed mb-5">
                    Once you own the plant under the Build, Own, Operate, Transfer agreement,
                    you may be eligible for a 9% GST benefit and 15% accelerated depreciation
                    in the year of commissioning — improving your year-one P&amp;L materially.
                  </p>
                  <div className="flex gap-6 flex-wrap">
                    <div className="text-center">
                      <p className="tabular text-3xl font-bold text-kmpr-teal leading-none">9%</p>
                      <p className="text-kmpr-muted text-xs mt-1">GST benefit</p>
                    </div>
                    <div className="w-px bg-kmpr-teal/15 self-stretch" aria-hidden="true" />
                    <div className="text-center">
                      <p className="tabular text-3xl font-bold text-kmpr-teal leading-none">15%</p>
                      <p className="text-kmpr-muted text-xs mt-1">Accelerated depreciation</p>
                    </div>
                  </div>
                  <p className="text-kmpr-muted text-xs mt-6 leading-relaxed border-t border-kmpr-teal/10 pt-4">
                    * Confirm exact applicability with your chartered accountant. Tax treatment depends on your entity structure and applicable AY rules.
                  </p>
                </div>
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
              Get Started
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              A Build, Own, Operate, Transfer plant built for your facility
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              Every BOOT engagement is sized and structured to your load profile.
              Let's start with a 30-minute feasibility call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
              >
                Talk to us about a BOOT plant for my facility →
              </Link>
              <WhatsAppCTA context="Interested in BOOT model." />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
