import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import PlantFlythrough from "@/components/PlantFlythrough";
import { sanityClient } from "@/lib/sanity";
import WhatsAppCTA from "@/components/superpowers/WhatsAppCTA";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Madakasira Solar Plant — 40 MW Open Access in Andhra Pradesh",
  description: "KMPR's 40 MW grid-connected solar plant in Madakasira, Anantapur District, Andhra Pradesh. Fully commissioned, 33 kV grid connection, 1,300+ acres reserved for 100–200 MW expansion.",
  alternates:  { canonical: "https://kmprpower.com/plant" },
  openGraph: {
    title:       "Madakasira Plant — 40 MW fully operational in AP",
    description: "40 MW grid-connected solar. 33 kV. 1,300+ acres for 100–200 MW Phase 2 expansion.",
    url:         "https://kmprpower.com/plant",
    images: [{ url: "/api/og?title=40+MW+fully+operational+in+AP&tag=Madakasira+Plant", width: 1200, height: 630, alt: "Madakasira 40 MW Solar Plant" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Madakasira Plant — 40 MW fully operational in AP",
    description: "40 MW grid-connected solar. 33 kV. 1,300+ acres for 100–200 MW Phase 2 expansion.",
    images:      ["/api/og?title=40+MW+fully+operational+in+AP&tag=Madakasira+Plant"],
  },
};

// ─── Static content ───────────────────────────────────────────────────────────

const KPI_STRIP = [
  { value: "40 MW",    label: "Installed Solar" },
  { value: "30 MW",    label: "Wind Available" },
  { value: "33 kV",    label: "Grid Connection" },
  { value: "1,300+",   label: "Acres Reserved" },
];

const DEFAULT_SPECS: { label: string; value: string }[] = [
  { label: "Plant Type",              value: "Grid-connected open access solar power plant" },
  { label: "Location",                value: "Madakasira, Anantapur District, Andhra Pradesh" },
  { label: "Operational Status",      value: "Fully commissioned, currently operational" },
  { label: "Grid Connectivity",       value: "33 kV feeder substation" },
  { label: "Applicable State",        value: "Andhra Pradesh (consumer must be in AP)" },
  { label: "Consumer Voltage",        value: "33 kV (input and output)" },
  { label: "Consumer Range",          value: "2–3 MW minimum per consumer; up to 10 MW" },
  { label: "Total Capacity",          value: "40 MW solar + 30 MW wind (multiple consumers)" },
  { label: "Funding",                 value: "Privately funded by Ananta Solar Company (no bank financing)" },
  { label: "Land Bank",               value: "1,300+ acres secured for future expansion" },
  { label: "Regulatory Management",   value: "AP SLDC scheduling, banking, and compliance — handled by KMPR" },
];

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getPlantSpecs() {
  try {
    const data = await sanityClient.fetch<{ plantSpecs?: { label: string; value: string }[] }>(
      `*[_type == "siteSettings"][0]{ plantSpecs }`
    );
    if (data?.plantSpecs?.length) return data.plantSpecs;
    return DEFAULT_SPECS;
  } catch {
    return DEFAULT_SPECS;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PlantPage() {
  const specs = await getPlantSpecs();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-kmpr-navy pt-28 pb-0 overflow-hidden">
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <FadeIn>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li className="text-white/60">The Plant</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Our Asset
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Madakasira Solar Plant
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              Anantapur District, Andhra Pradesh — fully commissioned and currently operational.
            </p>
          </FadeIn>
        </div>

        {/* KPI strip — sits at the bottom of the hero, bleeds into next section */}
        <FadeIn>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-kmpr-teal/10 border border-white/10 rounded-t-2xl overflow-hidden">
              {KPI_STRIP.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className={`px-6 py-7 text-center ${
                    i < KPI_STRIP.length - 1 ? "border-r border-white/10" : ""
                  } ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""}`}
                >
                  <p className="tabular text-3xl font-bold text-white leading-none mb-1">{kpi.value}</p>
                  <p className="text-white/50 text-xs uppercase tracking-widest">{kpi.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Plant Specifications ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Technical Specifications
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Plant overview
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-kmpr-teal/15">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 px-6 py-4 ${
                    i < specs.length - 1 ? "border-b border-kmpr-teal/10" : ""
                  } ${i % 2 === 0 ? "bg-white" : "bg-kmpr-soft-bg/60"}`}
                >
                  <p className="text-kmpr-muted text-sm font-medium">{spec.label}</p>
                  <p className="text-kmpr-navy text-sm font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 3D Plant Flythrough (placeholder) ────────────────────────────── */}
      <PlantFlythrough />

      {/* ── Expansion Pipeline ───────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              What's Next
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Expansion pipeline
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phase 2 card */}
            <FadeInItem>
              <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-kmpr-teal/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-kmpr-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <span className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest">Phase 2</span>
                </div>
                <h3 className="text-xl font-bold text-kmpr-navy mb-3 leading-snug">
                  100–200 MW Solar + Wind expansion
                </h3>
                <p className="text-kmpr-muted text-sm leading-relaxed flex-1">
                  KMPR has secured 1,300+ acres in AP for the next expansion phase. Once the
                  current 40 MW plant reaches full consumer subscription, we will pursue
                  100–200 MW of combined solar + wind capacity.
                </p>
                <div className="mt-6 pt-5 border-t border-kmpr-teal/10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-kmpr-teal">
                    <span className="w-1.5 h-1.5 rounded-full bg-kmpr-teal animate-pulse" />
                    Land secured · Awaiting full subscription of current plant
                  </span>
                </div>
              </div>
            </FadeInItem>

            {/* Stats card */}
            <FadeInItem>
              <div className="bg-kmpr-navy rounded-2xl border border-white/10 p-8 h-full flex flex-col justify-between">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-6">
                  Expansion at a glance
                </p>
                <div className="space-y-6">
                  {[
                    { v: "1,300+", l: "Acres secured in AP" },
                    { v: "100–200 MW", l: "Target next phase" },
                    { v: "Solar + Wind", l: "Hybrid generation mix" },
                  ].map((item) => (
                    <div key={item.l} className="flex items-end justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <p className="text-white/60 text-sm">{item.l}</p>
                      <p className="tabular text-xl font-bold text-kmpr-teal">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-navy">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              See It for Yourself
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Request a virtual plant tour with our Technical Director
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              Walk the plant floor remotely — panel layout, grid tie-in, metering infrastructure,
              and live generation data — in under 45 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?reason=plant-tour"
                className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
              >
                Book a virtual plant tour →
              </Link>
              <WhatsAppCTA context="I'd like to book a virtual plant tour." />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
