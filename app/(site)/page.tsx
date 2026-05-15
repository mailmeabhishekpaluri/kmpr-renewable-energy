import Link from "next/link";
import { sanityClient } from "@/lib/sanity";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import LiveGenerationCounter from "@/components/superpowers/LiveGenerationCounter";
import QualifyTest from "@/components/superpowers/QualifyTest";
import FeasibilityForm from "@/components/FeasibilityForm";

// ─── Data ─────────────────────────────────────────────────────────────────────

type CaseStudy = {
  _id: string;
  clientName: string;
  sector: string;
  location: string;
  logoUrl?: string;
};

async function getPublicCaseStudies(): Promise<CaseStudy[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "caseStudy" && isPublic == true && status == "Active"]{
        _id, clientName, sector, location, logoUrl
      }`
    );
  } catch {
    return [];
  }
}

async function getPlantSinceISO(): Promise<string> {
  try {
    const data = await sanityClient.fetch<{ plantSinceISO?: string }>(
      `*[_type == "siteSettings"][0]{ plantSinceISO }`
    );
    return data?.plantSinceISO ?? "2024-01-01T00:00:00Z";
  } catch {
    return "2024-01-01T00:00:00Z";
  }
}

// ─── Static content ───────────────────────────────────────────────────────────

const KPI_TILES = [
  { number: "40 MW",    label: "Solar Capacity" },
  { number: "30 MW",    label: "Wind Capacity" },
  { number: "Rs. 4.30", label: "Per Unit Tariff" },
  { number: "25 Yrs",   label: "PPA Tenure" },
];

const PROBLEMS = [
  { stat: "Rs. 7–9 / unit", detail: "Average industrial tariff from Discom — nearly double what we charge." },
  { stat: "8–12% p.a.",     detail: "Annual tariff escalation baked in every regulatory cycle." },
  { stat: "Unreliable",     detail: "Voltage fluctuations and unplanned outages disrupt production schedules." },
  { stat: "No certainty",   detail: "Tariff can change any regulatory cycle — zero long-term visibility." },
];

const STEPS = [
  {
    n: "1", title: "Generation",
    body: "We own and operate the 40 MW Madakasira solar plant in Andhra Pradesh. Power is generated at the plant and injected into the state's transmission network at utility scale.",
  },
  {
    n: "2", title: "Transmission",
    body: "Under open-access regulations, your allocated units travel over the existing APTRANSCO grid to your nearest substation — no new infrastructure required at your end.",
  },
  {
    n: "3", title: "Delivery",
    body: "You receive clean solar power at your facility meter at Rs. 4.30/unit. We handle all regulatory filings, open-access banking, and balancing so your team focuses on production.",
  },
];

const PPA_TERMS  = ["No capital investment — zero CapEx", "Fixed tariff: Rs. 4.30 / unit for 25 years", "KMPR owns, operates, and maintains the plant"];
const BOOT_TERMS = ["KMPR builds and funds the plant on your behalf", "You operate at preferential rates during the agreement", "Full ownership transfers to you at end of term"];

const SECTORS = ["Steel", "Pharma", "Cement", "Food Processing", "Tyres", "Textiles", "Hospitals", "Industrial Clusters", "Government"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [caseStudies, plantSinceISO] = await Promise.all([
    getPublicCaseStudies(),
    getPlantSinceISO(),
  ]);

  return (
    <>
      {/* ── S1  Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-kmpr-navy flex items-center overflow-hidden">
        {/* Diagonal teal accent */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full"
          preserveAspectRatio="xMaxYMin slice"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1440 0 L1440 900 L600 0 Z"  fill="#1ABEC8" fillOpacity="0.07" />
          <path d="M1440 0 L1440 520 L900 0 Z"  fill="#1ABEC8" fillOpacity="0.06" />
          <circle cx="1320" cy="80"  r="180" fill="#1ABEC8" fillOpacity="0.04" />
          <circle cx="1400" cy="300" r="120" fill="#1ABEC8" fillOpacity="0.04" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-6">
              Open Access Solar · Andhra Pradesh
            </p>
            <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-6">
              Direct solar power for Andhra Pradesh industries —{" "}
              <span className="tabular text-kmpr-teal">Rs.&nbsp;4.30&nbsp;/&nbsp;unit</span>,
              locked for 25&nbsp;years.
            </h1>
            <p className="text-kmpr-teal text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              40 MW operational. Zero Discom dependency. Two ownership models.
              Investor-backed, not bank-financed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                Check My Feasibility
              </Link>
              <Link
                href="/how-it-works"
                className="border border-white/30 hover:border-white/60 text-white/80 hover:text-white font-medium px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                See how it works →
              </Link>
            </div>
          </FadeIn>

          {/* Right — 40 MW illustration placeholder */}
          <FadeIn delay={0.2} className="hidden lg:flex justify-center items-center">
            <div className="relative flex items-center justify-center">
              <div className="w-72 h-72 rounded-full border-2 border-kmpr-teal/30 bg-kmpr-teal/10 flex items-center justify-center">
                <div className="text-center">
                  <p className="tabular text-7xl font-bold text-kmpr-teal leading-none">40</p>
                  <p className="text-white/70 text-2xl font-light tracking-widest mt-1">MW</p>
                  <p className="text-white/40 text-xs mt-4 uppercase tracking-widest">Madakasira Plant</p>
                  <p className="text-white/30 text-xs">Fully Operational</p>
                </div>
              </div>
              <div className="absolute rounded-full border border-kmpr-teal/15 w-[22rem] h-[22rem]" />
              <div className="absolute rounded-full border border-kmpr-teal/08 w-[28rem] h-[28rem]" />
            </div>
          </FadeIn>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/25 select-none" aria-hidden="true">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 animate-bounce mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── S2  KPI Strip ────────────────────────────────────────────────── */}
      <section className="bg-kmpr-soft-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {KPI_TILES.map((tile) => (
              <FadeInItem key={tile.label}>
                <div className="text-center py-8 px-4 rounded-2xl bg-white/70 border border-kmpr-teal/10">
                  <p className="tabular text-4xl sm:text-5xl font-bold text-kmpr-navy leading-none">
                    {tile.number}
                  </p>
                  <p className="text-kmpr-muted text-sm mt-3 font-medium">{tile.label}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── S3  Live Generation Counter ──────────────────────────────────── */}
      <LiveGenerationCounter plantSinceISO={plantSinceISO} />

      {/* ── S4  The Problem ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              The Challenge
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy max-w-md">
              The problem with Discom power
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROBLEMS.map((p) => (
              <FadeInItem key={p.stat}>
                <div className="bg-kmpr-alert-bg border border-kmpr-alert-text/20 rounded-2xl p-6 h-full">
                  <p className="tabular text-2xl font-bold text-kmpr-alert-text mb-3">{p.stat}</p>
                  <p className="text-kmpr-alert-text/80 text-sm leading-relaxed">{p.detail}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── S5  Three Steps ──────────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Our Solution
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy max-w-sm">
              Solar power in three steps
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <FadeInItem key={step.n}>
                <div className="relative bg-white rounded-2xl p-8 h-full border border-kmpr-teal/10 overflow-hidden">
                  <span aria-hidden="true" className="absolute -top-6 -right-3 text-[9rem] font-bold text-kmpr-teal/6 leading-none select-none">
                    {step.n}
                  </span>
                  <div className="relative">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-kmpr-teal text-white font-bold text-lg mb-5">
                      {step.n}
                    </span>
                    <h3 className="text-xl font-bold text-kmpr-navy mb-3">{step.title}</h3>
                    <p className="text-kmpr-muted text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── S6  Two Ways to Buy ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Ownership Models
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Two ways to buy solar
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* PPA */}
            <FadeInItem>
              <div className="flex flex-col h-full border-2 border-kmpr-teal/25 rounded-2xl p-8 hover:border-kmpr-teal/60 transition-colors">
                <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">Model 1</p>
                <h3 className="text-2xl font-bold text-kmpr-navy mb-1">PPA Model</h3>
                <p className="text-kmpr-muted text-sm mb-6">Power Purchase Agreement</p>
                <ul className="space-y-3 flex-1">
                  {PPA_TERMS.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-kmpr-text">
                      <span className="text-kmpr-teal mt-0.5 shrink-0">✓</span>{t}
                    </li>
                  ))}
                </ul>
                <Link href="/models/ppa" className="mt-8 inline-flex items-center gap-1 text-kmpr-teal font-semibold text-sm hover:gap-2 transition-all">
                  Learn more →
                </Link>
              </div>
            </FadeInItem>

            {/* BOOT */}
            <FadeInItem>
              <div className="flex flex-col h-full bg-kmpr-navy rounded-2xl p-8">
                <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">Model 2</p>
                <h3 className="text-2xl font-bold text-white mb-1">BOOT Model</h3>
                <p className="text-white/50 text-sm mb-6">Build · Own · Operate · Transfer</p>
                <ul className="space-y-3 flex-1">
                  {BOOT_TERMS.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-white/80">
                      <span className="text-kmpr-teal mt-0.5 shrink-0">✓</span>{t}
                    </li>
                  ))}
                </ul>
                <Link href="/models/boot" className="mt-8 inline-flex items-center gap-1 text-kmpr-teal font-semibold text-sm hover:gap-2 transition-all">
                  Learn more →
                </Link>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ── S7  Trust Strip ──────────────────────────────────────────────── */}
      {caseStudies.length > 0 && (
        <section className="py-16 bg-kmpr-soft-bg border-y border-kmpr-teal/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <p className="text-center text-kmpr-muted text-xs font-semibold uppercase tracking-widest mb-10">
                Trusted by AP industries today
              </p>
            </FadeIn>
            <FadeInStagger className="flex flex-wrap justify-center gap-4">
              {caseStudies.map((cs) => (
                <FadeInItem key={cs._id}>
                  <div className="bg-white border border-kmpr-teal/10 rounded-xl px-6 py-4 text-center min-w-[160px]">
                    {cs.logoUrl
                      ? <img src={cs.logoUrl} alt={cs.clientName} className="h-8 object-contain mx-auto" />
                      : <p className="text-kmpr-navy font-semibold text-sm">{cs.clientName}</p>
                    }
                    <p className="text-kmpr-muted text-xs mt-1">{cs.sector} · {cs.location}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      {/* ── S8  Sectors ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">Industries We Serve</p>
            <h2 className="text-2xl font-bold text-kmpr-navy">Sectors served</h2>
          </FadeIn>
          <FadeInStagger className="flex flex-wrap justify-center gap-3">
            {SECTORS.map((s) => (
              <FadeInItem key={s}>
                <span className="bg-kmpr-soft-bg border border-kmpr-teal/20 text-kmpr-navy text-sm font-medium px-4 py-2 rounded-full">
                  {s}
                </span>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── S9  Qualify Test ─────────────────────────────────────────────── */}
      <QualifyTest />

      {/* ── S10 Closing CTA Band ─────────────────────────────────────────── */}
      <section className="bg-kmpr-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See if your facility qualifies — in 24 hours
            </h2>
            <p className="text-white/50 text-sm mb-10 max-w-md mx-auto">
              Leave your details and our team will run a preliminary feasibility assessment at no cost.
            </p>
            <FeasibilityForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
