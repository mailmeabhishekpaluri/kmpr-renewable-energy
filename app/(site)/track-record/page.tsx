import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { sanityClient } from "@/lib/sanity";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Track Record — Industrial Clients & Promoter Portfolio",
  description: "KMPR's active industrial clients and Mr. Prasad Raju Muppala's open-access portfolio spanning Strides Pharma, Nestle, Orient Cement, J&K Tyres, and 12+ other industrial consumers across South India.",
  alternates:  { canonical: "https://kmprpower.com/track-record" },
  openGraph: {
    title:       "Track Record — Real clients. Real savings.",
    description: "Strides Pharma, Orient Cement, Nestle, J&K Tyres and 12+ others on open access solar.",
    url:         "https://kmprpower.com/track-record",
    images: [{ url: "/api/og?title=Real+clients.+Real+savings.&tag=Track+Record", width: 1200, height: 630, alt: "KMPR Track Record" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Track Record — Real clients. Real savings.",
    description: "Strides Pharma, Orient Cement, Nestle, J&K Tyres and 12+ others on open access solar.",
    images:      ["/api/og?title=Real+clients.+Real+savings.&tag=Track+Record"],
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type CaseStudy = {
  _id: string;
  clientName: string;
  sector?: string;
  location?: string;
  status?: string;
};

// ─── Static content ───────────────────────────────────────────────────────────

const DEFAULT_CLIENTS: CaseStudy[] = [
  { _id: "default-1", clientName: "Hindupur Steels and Alloys Pvt Ltd", sector: "Steel",  location: "Hindupur, AP" },
  { _id: "default-2", clientName: "Kuber Steel",                         sector: "Steel",  location: "Andhra Pradesh" },
];

const PROMOTER_PORTFOLIO = [
  { client: "Strides Pharma Group",        sector: "Pharmaceuticals",        state: "Karnataka",       type: "Open Access Solar" },
  { client: "Syngene International",        sector: "Biotech & Life Sciences", state: "Karnataka",       type: "Open Access Solar" },
  { client: "Orient Cement",               sector: "Cement Manufacturing",   state: "Andhra Pradesh",  type: "Open Access Renewables" },
  { client: "Nestle India",                 sector: "FMCG & Food Processing", state: "Multiple States", type: "Open Access Solar" },
  { client: "J&K Tyres",                    sector: "Tyre Manufacturing",     state: "Multiple States", type: "Open Access Solar" },
  { client: "12+ other industrial clients", sector: "Various sectors",        state: "South India",     type: "Open Access Solar & Wind" },
];

const SECTORS = [
  "Steel",
  "Pharmaceuticals",
  "Cement",
  "Food Processing",
  "Tyres & Rubber",
  "Textiles",
  "Hospitals",
  "Industrial Clusters",
  "Government Bodies",
];

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getActiveClients(): Promise<CaseStudy[]> {
  try {
    const data = await sanityClient.fetch<CaseStudy[]>(
      `*[_type == "caseStudy" && status == "Active" && isPublic == true]{
        _id, clientName, sector, location, status
      }`
    );
    if (data?.length) return data;
    return DEFAULT_CLIENTS;
  } catch {
    return DEFAULT_CLIENTS;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TrackRecordPage() {
  const clients = await getActiveClients();

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
                <li className="text-white/60">Track Record</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Proof of Delivery
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Industrial consumers powered by KMPR — and by our founders before us.
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              From active KMPR plants to a 20-year open-access career, this is the record
              we stand on.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 1 — Active KMPR clients ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Currently Operational
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Active KMPR clients
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {clients.map((client) => (
              <FadeInItem key={client._id}>
                <div className="bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 p-6 h-full flex flex-col gap-4">
                  {/* Status pill */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-kmpr-navy text-base leading-snug mb-1">
                      {client.clientName}
                    </p>
                    {client.sector && (
                      <p className="text-kmpr-teal text-sm font-medium">{client.sector}</p>
                    )}
                  </div>

                  {client.location && (
                    <div className="flex items-center gap-1.5 text-kmpr-muted text-xs">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {client.location}
                    </div>
                  )}
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Section 2 — Promoter portfolio ───────────────────────────────── */}
      <section className="py-24 bg-kmpr-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Founders' Prior Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy mb-5">
              Promoter portfolio: Mr. Prasad Raju Muppala
            </h2>
            <p className="text-kmpr-muted text-sm leading-relaxed max-w-3xl">
              The projects below represent open access engagements where Mr. Prasad Raju Muppala
              served as technical lead and consultant prior to co-founding KMPR Power. They reflect
              the technical and regulatory expertise he brings to every KMPR engagement.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-2xl border border-kmpr-teal/15 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-4 bg-kmpr-navy px-6 py-4">
                {["Client", "Sector", "State / Region", "Engagement Type"].map((h) => (
                  <p key={h} className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                    {h}
                  </p>
                ))}
              </div>

              {/* Rows */}
              {PROMOTER_PORTFOLIO.map((row, i) => (
                <div
                  key={row.client}
                  className={`grid grid-cols-4 gap-2 px-6 py-4 border-t border-kmpr-teal/10 ${
                    i % 2 === 0 ? "bg-white" : "bg-kmpr-soft-bg/40"
                  }`}
                >
                  <p className={`text-sm font-semibold leading-snug ${
                    row.client.startsWith("12+") ? "text-kmpr-muted italic" : "text-kmpr-navy"
                  }`}>
                    {row.client}
                  </p>
                  <p className="text-kmpr-text text-sm">{row.sector}</p>
                  <p className="text-kmpr-text text-sm">{row.state}</p>
                  <p className="text-kmpr-teal text-sm font-medium">{row.type}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 3 — KGF Solar Plant ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Featured Project
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              3 MW KGF Solar Plant
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="rounded-2xl border border-kmpr-teal/15 overflow-hidden">
              <div className="bg-kmpr-navy px-8 py-6 flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="tabular text-3xl font-bold text-kmpr-teal leading-none">3 MW</p>
                  <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">Installed</p>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block" aria-hidden="true" />
                <div className="text-center">
                  <p className="tabular text-3xl font-bold text-white leading-none">Mar 2017</p>
                  <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">Operational since</p>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block" aria-hidden="true" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white leading-none">Karnataka</p>
                  <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">Location (KGF)</p>
                </div>
              </div>

              <div className="bg-kmpr-soft-bg px-8 py-7">
                <p className="text-kmpr-text text-sm leading-relaxed mb-5">
                  Operational since March 2017. Power supplied directly to the Government of
                  Karnataka under a long-term contract. Promoted, built, and managed end-to-end
                  by Mr. Prasad Raju Muppala — validating KMPR's complete project delivery
                  capability.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Government offtake contract",
                    "Long-term PPA",
                    "End-to-end delivery",
                    "7+ years continuous operation",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-kmpr-teal bg-white border border-kmpr-teal/20 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 4 — Sectors we serve ─────────────────────────────────── */}
      <section className="py-20 bg-kmpr-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Industries Served
            </p>
            <h2 className="text-3xl font-bold text-white">
              Sectors we serve
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap gap-3">
              {SECTORS.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center text-sm font-medium text-white/80 bg-white/8 border border-white/15 rounded-full px-4 py-2 hover:border-kmpr-teal/50 hover:text-white transition-colors"
                >
                  {sector}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-soft-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Verify Our Work
            </p>
            <h2 className="text-3xl font-bold text-kmpr-navy mb-4">
              Speak to an existing client — references available on request
            </h2>
            <p className="text-kmpr-muted text-sm mb-8 max-w-md mx-auto">
              We'll connect you directly with a current KMPR consumer in your sector so you
              can ask the questions that matter.
            </p>
            <Link
              href="/contact?reason=reference-check"
              className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
            >
              Request a client reference →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
