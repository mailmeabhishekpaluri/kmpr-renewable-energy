import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

// ─── Types ────────────────────────────────────────────────────────────────────

type FaqEntry = { _key: string; question: string; answer: string };

type IndustryDoc = {
  _id: string;
  label: string;
  slug: { current: string };
  hero: { headline: string; subheadline: string };
  headlineStat?: string;
  featuredCaseStudy?: {
    clientName: string;
    sector?: string;
    location?: string;
    summary?: string;
  };
  faq: FaqEntry[];
};

// ─── Known slugs (for static generation) ─────────────────────────────────────

const KNOWN_SLUGS = ["steel", "pharma", "cement", "textile", "hospital"];

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getIndustry(slug: string): Promise<IndustryDoc | null> {
  try {
    return await sanityClient.fetch<IndustryDoc | null>(
      `*[_type == "industry" && slug.current == $slug][0]{
        _id, label, slug, hero, headlineStat,
        "featuredCaseStudy": featuredCaseStudy->{
          clientName, sector, location, summary
        },
        faq
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  return KNOWN_SLUGS.map((slug) => ({ industry: slug }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const doc = await getIndustry(slug);

  if (!doc) return { title: "Industry | KMPR Power" };

  const title       = `Solar PPA for ${doc.label} in Andhra Pradesh`;
  const description = doc.hero.subheadline;
  const canonical   = `https://kmprpower.in/${slug}`;
  const ogTitle     = `Solar power for ${doc.label} in AP`;
  const ogImageUrl  = `/api/og?title=${encodeURIComponent(ogTitle)}&tag=${encodeURIComponent(doc.label)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [ogImageUrl],
    },
  };
}

// ─── Static content ───────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    n: "1",
    title: "Feasibility review",
    body: "KMPR checks your facility's load profile, HT connection voltage, and AP location. Zero-cost, 48-hour turnaround.",
  },
  {
    n: "2",
    title: "Open access application",
    body: "We file and track your SLDC open-access application. You sign nothing until the allocation is confirmed.",
  },
  {
    n: "3",
    title: "Solar injected at 33 kV",
    body: "Power flows from Madakasira directly into your feeder substation at your locked tariff from day one.",
  },
];

const MODELS = [
  {
    tag: "Most popular",
    name: "PPA — Power Purchase Agreement",
    tagline: "26% equity · 9-month payback · 25-year tariff lock",
    points: [
      "One-time 26% co-investment in plant capex",
      "Equity recovered from savings within ~9 months",
      "Fixed Rs. 4.30/unit at feeder substation",
      "No capital on your balance sheet",
    ],
    href: "/ppa",
    cta: "Explore PPA →",
    accent: true,
  },
  {
    tag: "Full ownership",
    name: "BOOT — Build, Own, Operate, Transfer",
    tagline: "100% ownership · GST credit · accelerated depreciation",
    points: [
      "KMPR builds, owns, and operates the plant",
      "Transfer of ownership at end of tenure",
      "9% GST input credit in year one",
      "15% accelerated depreciation benefit",
    ],
    href: "/boot",
    cta: "Explore BOOT →",
    accent: false,
  },
];

const TRUST_STATS = [
  { value: "40 MW", label: "Operational capacity" },
  { value: "Rs. 4.30", label: "Per unit — fixed 25 yr" },
  { value: "31 yrs", label: "Grid engineering experience" },
  { value: "33 kV", label: "Direct feeder injection" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const doc = await getIndustry(slug);
  if (!doc) notFound();

  const faqItems: FaqItem[] = (doc.faq ?? []).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  // Schema.org Service JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Open Access Solar PPA for ${doc.label} — KMPR Power`,
    description: doc.hero.subheadline,
    provider: {
      "@type": "Organization",
      name: "KMPR Power",
      url: "https://kmprpower.in",
    },
    areaServed: { "@type": "State", name: "Andhra Pradesh, India" },
    serviceType: "Solar Power Purchase Agreement",
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li>
                  <Link href="/track-record" className="hover:text-white/70 transition-colors">
                    Industries
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li className="text-white/60">{doc.label}</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Open Access Solar · Andhra Pradesh
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              {doc.hero.headline}
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              {doc.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href={`/contact?reason=industry-${slug}`}
                className="inline-flex items-center justify-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                Check my eligibility →
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-medium px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                Model my savings
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Headline stat ─────────────────────────────────────────────────── */}
      {doc.headlineStat && (
        <section className="bg-kmpr-teal py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white font-semibold text-lg leading-snug">
              {doc.headlineStat}
            </p>
          </div>
        </section>
      )}

      {/* ── Featured case study ───────────────────────────────────────────── */}
      {doc.featuredCaseStudy && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-10">
              <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
                Client story
              </p>
              <h2 className="text-3xl font-bold text-kmpr-navy">
                Real results in {doc.label.toLowerCase()}
              </h2>
            </FadeIn>

            <FadeIn>
              <div className="bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 p-8 flex flex-col sm:flex-row gap-8 items-start">
                {/* Logo placeholder */}
                <div className="shrink-0 w-16 h-16 rounded-xl bg-kmpr-teal/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-kmpr-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-kmpr-navy font-bold text-lg">
                      {doc.featuredCaseStudy.clientName}
                    </h3>
                    {doc.featuredCaseStudy.sector && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-kmpr-teal/10 text-kmpr-teal">
                        {doc.featuredCaseStudy.sector}
                      </span>
                    )}
                    {doc.featuredCaseStudy.location && (
                      <span className="text-xs text-kmpr-muted">
                        📍 {doc.featuredCaseStudy.location}
                      </span>
                    )}
                  </div>
                  {doc.featuredCaseStudy.summary && (
                    <p className="text-kmpr-muted text-sm leading-relaxed">
                      {doc.featuredCaseStudy.summary}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-soft-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-16">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              From enquiry to first unit — 3 steps
            </h2>
          </FadeIn>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[2.6rem] left-[calc(16.67%+1.25rem)] right-[calc(16.67%+1.25rem)] h-px bg-kmpr-teal/20"
            />
            <FadeInStagger className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between">
              {HOW_IT_WORKS.map((step, i) => (
                <FadeInItem key={step.n} className="lg:w-1/3 lg:px-8">
                  <div className="flex lg:flex-col gap-5 lg:gap-0 lg:items-center">
                    <div className="relative shrink-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-kmpr-teal flex items-center justify-center text-white font-bold text-sm z-10">
                        {step.n}
                      </div>
                      {i < HOW_IT_WORKS.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="lg:hidden absolute top-10 left-1/2 -translate-x-1/2 w-px h-full min-h-[2rem] bg-kmpr-teal/20"
                        />
                      )}
                    </div>
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

      {/* ── Models ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Commercial models
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Two ways to buy solar from KMPR
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MODELS.map((model) => (
              <FadeInItem key={model.name}>
                <div
                  className={`h-full rounded-2xl border p-8 flex flex-col ${
                    model.accent
                      ? "border-kmpr-teal bg-kmpr-teal/5"
                      : "border-kmpr-teal/15 bg-kmpr-soft-bg"
                  }`}
                >
                  <span
                    className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                      model.accent
                        ? "bg-kmpr-teal text-white"
                        : "bg-kmpr-navy/10 text-kmpr-navy"
                    }`}
                  >
                    {model.tag}
                  </span>
                  <h3 className="text-kmpr-navy font-bold text-lg mb-1">{model.name}</h3>
                  <p className="text-kmpr-muted text-xs mb-5">{model.tagline}</p>
                  <ul className="flex-1 space-y-2 mb-7">
                    {model.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-kmpr-muted">
                        <span className="text-kmpr-teal mt-0.5 shrink-0">✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={model.href}
                    className={`self-start text-sm font-semibold transition-colors ${
                      model.accent
                        ? "text-kmpr-teal hover:text-kmpr-teal-dark"
                        : "text-kmpr-navy hover:text-kmpr-teal"
                    }`}
                  >
                    {model.cta}
                  </Link>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-kmpr-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {TRUST_STATS.map((s) => (
              <FadeInItem key={s.label}>
                <p className="text-kmpr-teal font-bold text-3xl mb-1">{s.value}</p>
                <p className="text-white/50 text-xs leading-snug">{s.label}</p>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Industry FAQ ──────────────────────────────────────────────────── */}
      {faqItems.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-10">
              <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
                Questions specific to {doc.label.toLowerCase()}
              </p>
              <h2 className="text-3xl font-bold text-kmpr-navy">Frequently asked questions</h2>
            </FadeIn>
            <FadeIn>
              <FaqAccordion items={faqItems} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-soft-bg border-t border-kmpr-teal/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Get started
            </p>
            <h2 className="text-3xl font-bold text-kmpr-navy mb-4">
              Ready to cut your {doc.label.toLowerCase()} energy bill?
            </h2>
            <p className="text-kmpr-muted text-sm mb-8 leading-relaxed">
              Upload your last electricity bill — our AI models your exact saving in 60 seconds.
              Or speak to KMPR directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
              >
                Upload bill and model savings →
              </Link>
              <Link
                href={`/contact?reason=industry-${slug}`}
                className="inline-flex items-center justify-center gap-2 border border-kmpr-navy/20 hover:border-kmpr-navy/40 text-kmpr-navy font-medium px-8 py-4 rounded-full transition-colors text-sm"
              >
                Talk to KMPR
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
