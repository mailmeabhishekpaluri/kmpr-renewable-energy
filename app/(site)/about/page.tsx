import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "About KMPR Power — Founded by a CA and a Chief Engineer",
  description: "KMPR Power owns and operates a 40 MW solar plant in Madakasira, AP. Founded by CA PAN Krishna and Chief Engineer Prasad Raju Muppala. Backed by Ananta Solar Company.",
  alternates:  { canonical: "https://kmprpower.com/about" },
  openGraph: {
    title:       "About KMPR — Founded by a CA and a Chief Engineer",
    description: "PAN Krishna (CA, 20+ yrs steel) and Prasad Raju Muppala (31 yrs APSEB, Chief Engineer). Backed by Ananta Solar.",
    url:         "https://kmprpower.com/about",
    images: [{ url: "/api/og?title=Founded+by+a+CA+and+a+Chief+Engineer&tag=About+KMPR", width: 1200, height: 630, alt: "About KMPR Power" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "About KMPR — Founded by a CA and a Chief Engineer",
    description: "PAN Krishna (CA, 20+ yrs steel) and Prasad Raju Muppala (31 yrs APSEB, Chief Engineer). Backed by Ananta Solar.",
    images:      ["/api/og?title=Founded+by+a+CA+and+a+Chief+Engineer&tag=About+KMPR"],
  },
};

// ─── Static content ───────────────────────────────────────────────────────────

const FOUNDERS = [
  {
    name: "PAN Krishna",
    initials: "PK",
    role: "Co-Founder & Director",
    credentials: [
      "Chartered Accountant (CA) by profession",
      "20+ years in steel manufacturing sector",
      "Strategic consultant to Hindupur Steels and Alloys Pvt Ltd",
      "Deep expertise in project finance, compliance, and business structuring",
      "Leads consumer acquisition and commercial negotiations for KMPR",
    ],
    contactSlug: "pan-krishna",
    contactLabel: "Book a meeting with PAN Krishna",
  },
  {
    name: "Prasad Raju Muppala",
    initials: "PM",
    role: "Co-Founder & Technical Director",
    credentials: [
      "B.Tech Electrical Engineering, NIT Graduate",
      "31-year career at A.P. State Electricity Board; retired as Chief Engineer",
      "Promoted own 3 MW solar plant at KGF, Karnataka (operational since Mar 2017)",
      "Plant supplies power to Government of Karnataka under long-term contract",
      "Expert in SLDC grid operations and Open Access",
    ],
    contactSlug: "prasad-raju",
    contactLabel: "Book a meeting with Prasad Raju Muppala",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
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
                <li className="text-white/60">About</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              The Company
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              About KMPR Power
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              A Bengaluru-based renewable energy company building the infrastructure for
              industrial consumers to escape Discom pricing — permanently.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 1 — Who We Are ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Utility-scale solar, delivered directly to industry
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="space-y-5 text-kmpr-text text-base leading-relaxed">
              <p>
                KMPR Power is a Bengaluru-based renewable energy company that owns and operates
                utility-scale solar generation in Andhra Pradesh. Our 40 MW plant at Madakasira,
                Anantapur District, is fully commissioned and currently delivering clean solar
                power to industrial consumers across AP — below prevailing Discom tariffs.
              </p>
              <p>
                We deliver energy directly to consumers through open access — bypassing the
                distribution company layer entirely. This means lower per-unit costs, fixed
                long-term tariffs, and zero exposure to future Discom rate hikes. Our consumers
                receive power at 33 kV directly at their feeder substation, with all SLDC
                scheduling, banking, and compliance managed by KMPR.
              </p>
              <p>
                Our model is designed to eliminate Discom dependency and create bankable,
                long-term energy security for energy-intensive industries: steel, pharma, cement,
                food processing, and more. Whether you choose the PPA model (fixed tariff, shared
                equity) or the BOOT model (zero upfront, full plant ownership in 6 years), you
                pay less per unit — for decades.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 2 — Leadership ───────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Leadership
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              The founders
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FOUNDERS.map((f) => (
              <FadeInItem key={f.name}>
                <div className="bg-white rounded-2xl border border-kmpr-teal/15 overflow-hidden flex flex-col h-full">
                  {/* Card header */}
                  <div className="bg-kmpr-navy px-8 py-8 flex items-center gap-5">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-kmpr-teal/20 border-2 border-kmpr-teal/40 flex items-center justify-center shrink-0">
                      <span className="text-kmpr-teal font-bold text-xl tracking-tight">
                        {f.initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-snug">Mr. {f.name}</p>
                      <p className="text-kmpr-teal text-sm font-medium mt-0.5">{f.role}</p>
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="px-8 py-7 flex-1">
                    <ul className="space-y-3">
                      {f.credentials.map((c) => (
                        <li key={c} className="flex items-start gap-3">
                          <span className="text-kmpr-teal mt-0.5 shrink-0 text-sm">✓</span>
                          <span className="text-kmpr-text text-sm leading-relaxed">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer CTA */}
                  <div className="px-8 py-5 border-t border-kmpr-teal/10">
                    <Link
                      href={`/contact?with=${f.contactSlug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-kmpr-teal hover:text-kmpr-teal-dark transition-colors"
                    >
                      {f.contactLabel} →
                    </Link>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Section 3 — Our Investor ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Backed By
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy">
              Our investor
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 p-8 sm:p-10">
              <div className="flex gap-4 items-start">
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">🏛️</span>
                <div>
                  <p className="text-kmpr-navy font-bold text-xl mb-3">Ananta Solar Company</p>
                  <p className="text-kmpr-text text-sm leading-relaxed">
                    Lead investor for the Madakasira 40 MW Solar Project. KMPR Power is not
                    bank-financed. The plant is backed by a committed private renewable energy
                    investor, giving consumers a stable, well-funded counterparty for their
                    long-term power agreements.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {["Private funding — no bank exposure", "Long-term committed capital", "Stable counterparty risk"].map((tag) => (
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
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 4 — Vision ───────────────────────────────────────────── */}
      <section className="py-24 bg-kmpr-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-8">
              Our Vision
            </p>
            <blockquote className="relative">
              <svg
                aria-hidden="true"
                className="absolute -top-2 -left-2 w-10 h-10 text-kmpr-teal/20"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="pl-8 text-xl sm:text-2xl font-semibold text-white leading-relaxed">
                To be the leading open access renewable energy partner for industrial consumers
                across Andhra Pradesh — delivering affordable, reliable, and clean solar and wind
                power directly to factories, hospitals, and industrial clusters while building a
                500+ MW generation portfolio over the next decade.
              </p>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 5 — Office ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Find Us
            </p>
            <h2 className="text-3xl font-bold text-kmpr-navy">Our office</h2>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
              {/* Address card */}
              <div className="lg:col-span-2 bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 p-8 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
                    Registered Office
                  </p>
                  <address className="not-italic text-kmpr-navy font-semibold text-base leading-relaxed">
                    #2112, 9th Main,<br />
                    D Block, Sahakaranagar,<br />
                    Bengaluru 560092<br />
                    <span className="text-kmpr-muted font-normal text-sm">Karnataka, India</span>
                  </address>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-kmpr-teal hover:text-kmpr-teal-dark transition-colors"
                >
                  Get in touch →
                </Link>
              </div>

              {/* Map embed */}
              <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-kmpr-teal/15 min-h-[300px]">
                <iframe
                  title="KMPR Power office — Sahakaranagar, Bengaluru"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.892!2d77.5936!3d13.0644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19d4b7c00001%3A0x1!2s2112%2C+9th+Main%2C+D+Block%2C+Sahakaranagar%2C+Bengaluru%2C+Karnataka+560092!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
              Work With Us
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Talk to the founders directly
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              No sales intermediaries. Your first call is with PAN Krishna or Prasad Raju
              Muppala — the people who will structure your agreement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm"
            >
              Schedule a founder call →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
