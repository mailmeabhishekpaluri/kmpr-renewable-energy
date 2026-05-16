import type { Metadata } from "next";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import KwhJourney from "@/components/superpowers/KwhJourney";
import TariffTimeMachine from "@/components/superpowers/TariffTimeMachine";
import SankeyComparison from "@/components/SankeyComparison";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "How Open Access Solar Works in Andhra Pradesh",
  description: "Open access lets AP industries buy solar power directly at Rs. 4.30/unit, bypassing Discom. Here's exactly how — at 33 kV, with zero wheeling charges.",
  alternates:  { canonical: "https://kmprpower.in/how-it-works" },
  openGraph: {
    title:       "How Open Access Solar Works in Andhra Pradesh",
    description: "Open access lets AP industries buy solar power directly at Rs. 4.30/unit, bypassing Discom. Here's exactly how.",
    url:         "https://kmprpower.in/how-it-works",
    images: [{ url: "/api/og?title=How+open+access+solar+works&tag=How+It+Works", width: 1200, height: 630, alt: "How Open Access Solar Works" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "How Open Access Solar Works in Andhra Pradesh",
    description: "Open access lets AP industries buy solar power directly at Rs. 4.30/unit, bypassing Discom.",
    images:      ["/api/og?title=How+open+access+solar+works&tag=How+It+Works"],
  },
};

// ─── Static content ───────────────────────────────────────────────────────────

const REGULATORY_ADVANTAGES = [
  {
    title: "No Wheeling Charges at 33 kV",
    body: "At 33 kV connection voltage, AP open-access consumers are currently exempt from transmission and wheeling charges — saving Rs. 1.5–2/unit compared with lower-voltage connections.",
    icon: "⚡",
  },
  {
    title: "25-Year Fixed Tariff",
    body: "Your per-unit cost is contractually locked for the full PPA tenure. No annual escalation clause, no mid-term revision risk.",
    icon: "🔒",
  },
  {
    title: "Ownership Tax Benefits (BOOT)",
    body: "Under the BOOT model the plant qualifies for 9% GST input credit and 15% accelerated depreciation in the year of commissioning, improving your year-one cash flow materially.",
    icon: "📊",
  },
  {
    title: "Group & Cluster Connectivity",
    body: "Multiple facilities under the same entity, or industry clusters, can share a single open-access allocation — reducing per-unit administrative and scheduling costs.",
    icon: "🏭",
  },
];

const KMPR_HANDLES = [
  {
    title: "SLDC Scheduling",
    lines: [
      "We file daily energy schedules with the State Load Despatch Centre.",
      "Your allocation is correctly registered and injected every billing cycle.",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0120 9.414V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Surplus Unit Banking",
    lines: [
      "Excess generation is banked monthly with the Discom.",
      "We track your balance and optimise drawdowns to minimise grid reliance.",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: "Regulatory Compliance",
    lines: [
      "From APERC filings to inter-state wheeling exemptions, we manage the full stack.",
      "You never see a compliance notice or regulatory demand.",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const CONSUMER_CHECKLIST = [
  { label: "Location in AP", detail: "Your facility must be within Andhra Pradesh to access KMPR's open-access allocation." },
  { label: "Connected at 33 kV", detail: "Open-access eligibility and wheeling charge exemption apply at 33 kV HT connection." },
  { label: "Sanctioned load 2 MW+", detail: "APERC open-access regulations apply to consumers above 1 MW. KMPR's minimum is 2 MW." },
  { label: "OA-eligible status", detail: "You must not be in a contracted demand dispute or arrears with your existing Discom." },
];

const DEFAULT_FAQ: FaqItem[] = [
  {
    question: "What is open access?",
    answer:
      "Open access is a regulatory mechanism under CERC/APERC that allows industrial consumers above 1 MW to purchase electricity directly from a generator other than their state Discom. You use the existing grid for transmission but bypass the Discom for generation cost.",
  },
  {
    question: "What if I miss a payment?",
    answer:
      "Payments are governed by your PPA agreement. A grace period is specified; beyond that, supply may be curtailed per the contract terms. KMPR's team works proactively with clients ahead of any due date to prevent defaults.",
  },
  {
    question: "Can I exit before 25 years?",
    answer:
      "Early exit is possible but governed by the PPA exit clause. An exit penalty based on remaining tenure typically applies. We recommend reviewing and negotiating exit terms during the PPA signing stage.",
  },
  {
    question: "What happens if the plant produces less than I need?",
    answer:
      "Any shortfall in generation is automatically met by your existing Discom connection — you are never left without power. You only pay KMPR for the units we actually deliver.",
  },
  {
    question: "Is the Rs. 4.30 number guaranteed?",
    answer:
      "Yes. For PPA clients the tariff is contractually fixed at Rs. 4.30 per unit for the full 25-year tenure. There is no escalation clause — the number you sign for is the number you pay for life.",
  },
  {
    question: "What are wheeling charges?",
    answer:
      "Wheeling charges are fees levied for using the transmission grid to carry power from the plant to your facility. At 33 kV connection voltage, AP's current open-access regulations exempt industrial consumers from these charges — a saving of Rs. 1.5–2 per unit.",
  },
  {
    question: "How are surplus units banked?",
    answer:
      "Surplus generation beyond your consumption in a billing period is banked with the SLDC (State Load Despatch Centre). Banked units can be drawn in subsequent periods, subject to AP's monthly banking policy window. KMPR tracks and manages your banking balance automatically.",
  },
  {
    question: "What if AP regulations change?",
    answer:
      "Our PPAs include force majeure and regulatory change clauses. If government policy materially alters the economics of open access, both parties have defined remedies — including tariff renegotiation triggers and, in extreme cases, contract suspension provisions.",
  },
];

// ─── Sanity fetch ─────────────────────────────────────────────────────────────

async function getIndustryFaq(): Promise<FaqItem[]> {
  try {
    const results: { faq?: FaqItem[] }[] = await sanityClient.fetch(
      `*[_type == "industry"][0..0]{ faq[] { question, answer } }`
    );
    const items = results?.[0]?.faq ?? [];
    return items.length > 0 ? items : DEFAULT_FAQ;
  } catch {
    return DEFAULT_FAQ;
  }
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HowItWorksPage() {
  const faqItems = await getIndustryFaq();

  return (
    <>
      <FaqJsonLd items={faqItems} />

      {/* ── S1  Page Header ──────────────────────────────────────────────── */}
      <section className="bg-kmpr-navy pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li className="text-white/60">How It Works</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Open Access Solar · AP
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              How open access actually works
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              Open access is a regulation that lets industrial consumers in Andhra Pradesh
              buy power directly from a solar plant, bypassing the state Discom for generation
              cost entirely. In practice: KMPR's 40 MW Madakasira plant injects power into
              APTRANSCO's grid; your SLDC-registered allocation flows to your 33 kV meter at
              Rs.&nbsp;4.30/unit — fixed for 25 years, with zero wheeling surcharge.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── S2  kWh Journey ──────────────────────────────────────────────── */}
      <KwhJourney />

      {/* ── S3  Tariff Time Machine ───────────────────────────────────────── */}
      <TariffTimeMachine />

      {/* ── S4  Four Regulatory Advantages ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Regulatory Edge
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy max-w-lg">
              The four regulatory advantages of open access
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REGULATORY_ADVANTAGES.map((adv) => (
              <FadeInItem key={adv.title}>
                <div className="flex gap-5 bg-kmpr-soft-bg rounded-2xl p-7 h-full border border-kmpr-teal/10">
                  <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{adv.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-kmpr-navy mb-2">{adv.title}</h3>
                    <p className="text-kmpr-muted text-sm leading-relaxed">{adv.body}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── S5  Sankey Comparison ─────────────────────────────────────────── */}
      <SankeyComparison />

      {/* ── S6  What KMPR Handles ─────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Fully Managed
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-lg">
              What KMPR handles — so you don't have to
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KMPR_HANDLES.map((col) => (
              <FadeInItem key={col.title}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-kmpr-teal/15 flex items-center justify-center text-kmpr-teal mb-5">
                    {col.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{col.title}</h3>
                  <ul className="space-y-2">
                    {col.lines.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="text-kmpr-teal mt-0.5 shrink-0">–</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── S7  What the Consumer Needs ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Eligibility
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              What you need to qualify
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CONSUMER_CHECKLIST.map((item, i) => (
              <FadeInItem key={item.label}>
                <div className="flex gap-4 p-6 rounded-2xl border border-kmpr-teal/20 bg-kmpr-soft-bg">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-kmpr-teal flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-kmpr-navy mb-1">{item.label}</p>
                    <p className="text-kmpr-muted text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── S8  FAQ Accordion ─────────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-soft-bg" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Common questions
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="bg-white rounded-2xl px-6 sm:px-8 py-2 border border-kmpr-teal/10">
              <FaqAccordion items={faqItems} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── S9  Closing CTA ───────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-navy">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to see your number?
            </h2>
            <p className="text-white/55 text-sm mb-8">
              Upload a recent electricity bill and we'll calculate your exact saving in 60 seconds.
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
            >
              Upload your bill →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
