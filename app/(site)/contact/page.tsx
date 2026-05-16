import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import ConversationalForm from "@/components/superpowers/ConversationalForm";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { sanityClient } from "@/lib/sanity";
import WhatsAppCTA from "@/components/superpowers/WhatsAppCTA";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Contact KMPR Power — Start Your Solar Feasibility Enquiry",
  description: "Talk to KMPR's founders about open access solar for your facility. We respond to all feasibility enquiries within 4 working hours.",
  alternates:  { canonical: "https://kmprpower.in/contact" },
  openGraph: {
    title:       "Check your eligibility — KMPR responds in 4 hours",
    description: "Talk to KMPR's founders. Feasibility review: zero cost, 48-hour turnaround.",
    url:         "https://kmprpower.in/contact",
    images: [{ url: "/api/og?title=Check+your+eligibility+in+4+hours&tag=Get+Started", width: 1200, height: 630, alt: "Contact KMPR Power" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Check your eligibility — KMPR responds in 4 hours",
    description: "Talk to KMPR's founders. Feasibility review: zero cost, 48-hour turnaround.",
    images:      ["/api/og?title=Check+your+eligibility+in+4+hours&tag=Get+Started"],
  },
};

// ─── Static content ───────────────────────────────────────────────────────────

const CONTACT_FAQS: FaqItem[] = [
  {
    question: "How long until supply starts?",
    answer:
      "For consumers connecting to our existing Madakasira plant, the typical timeline from signed agreement to first solar unit is 60–90 days — covering SLDC application, scheduling coordination, and metering. Greenfield BOOT plants take 9–12 months from agreement to commissioning.",
  },
  {
    question: "Do I need to switch off Discom?",
    answer:
      "No. Open access is additive — you continue to hold your Discom connection as a backup. Solar from KMPR is injected at your feeder substation and consumed first; Discom power fills any shortfall. Your existing infrastructure stays in place.",
  },
  {
    question: "Can I exit early?",
    answer:
      "PPA agreements carry a standard lock-in aligned to the 25-year term, with structured exit provisions after year 3. BOOT agreements transfer ownership to you at year 6 — after that you own the asset outright and there is nothing to exit. Speak to our team for the precise contractual terms for your situation.",
  },
];

// ─── Data fetching ────────────────────────────────────────────────────────────

type ContactInfo = {
  phoneNumbers: string[];
  whatsappNumber?: string;
};

async function getContactInfo(): Promise<ContactInfo> {
  try {
    const data = await sanityClient.fetch<ContactInfo>(
      `*[_type == "siteSettings"][0]{ phoneNumbers, whatsappNumber }`
    );
    return {
      phoneNumbers: data?.phoneNumbers?.length ? data.phoneNumbers : ["+91 98765 43210"],
      whatsappNumber: data?.whatsappNumber ?? "+91 98765 43210",
    };
  } catch {
    return { phoneNumbers: ["+91 98765 43210"], whatsappNumber: "+91 98765 43210" };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ContactPage() {
  const { phoneNumbers } = await getContactInfo();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-kmpr-navy pt-28 pb-16 overflow-hidden">
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
                <li className="text-white/60">Contact</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Start your solar feasibility enquiry
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              Tell us about your facility. We'll model your savings, check your
              regulatory eligibility, and get back to you within 4 working hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Two-column layout ────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-soft-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

            {/* ── Left column (60%) — Form ──────────────────────────────── */}
            <div className="w-full lg:w-[60%]">
              <FadeIn>
                <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-8 sm:p-10">
                  {/* ConversationalForm reads useSearchParams — must be in Suspense */}
                  <Suspense fallback={<FormSkeleton />}>
                    <ConversationalForm />
                  </Suspense>
                </div>
              </FadeIn>
            </div>

            {/* ── Right column (40%) — Sticky sidebar ──────────────────── */}
            <aside className="w-full lg:w-[40%] lg:sticky lg:top-24 space-y-5">
              <FadeIn>
                {/* Response time banner */}
                <div className="bg-kmpr-teal/10 border border-kmpr-teal/20 rounded-2xl px-5 py-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-kmpr-teal animate-pulse shrink-0" />
                  <p className="text-kmpr-teal text-sm font-medium">
                    We respond to feasibility enquiries within <strong>4 working hours.</strong>
                  </p>
                </div>

                {/* Phone numbers */}
                <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-6">
                  <p className="text-kmpr-muted text-xs font-semibold uppercase tracking-widest mb-4">
                    Call Us Directly
                  </p>
                  <div className="space-y-3">
                    {phoneNumbers.map((tel) => (
                      <a
                        key={tel}
                        href={`tel:${tel.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-kmpr-teal/10 flex items-center justify-center shrink-0 group-hover:bg-kmpr-teal/20 transition-colors">
                          <svg className="w-4 h-4 text-kmpr-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                          </svg>
                        </div>
                        <span className="text-kmpr-navy font-semibold text-sm group-hover:text-kmpr-teal transition-colors">
                          {tel}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-6">
                  <p className="text-kmpr-muted text-xs font-semibold uppercase tracking-widest mb-4">
                    Email
                  </p>
                  <a
                    href="mailto:info@kmprpower.in?subject=KMPR%20feasibility%20enquiry"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-kmpr-teal/10 flex items-center justify-center shrink-0 group-hover:bg-kmpr-teal/20 transition-colors">
                      <svg className="w-4 h-4 text-kmpr-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <span className="text-kmpr-navy font-semibold text-sm group-hover:text-kmpr-teal transition-colors break-all">
                      info@kmprpower.in
                    </span>
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-6">
                  <p className="text-kmpr-muted text-xs font-semibold uppercase tracking-widest mb-4">
                    WhatsApp
                  </p>
                  <p className="text-kmpr-muted text-xs mb-4 leading-snug">
                    On desktop a QR code appears — scan with your phone to start the conversation instantly.
                  </p>
                  <WhatsAppCTA context="Contacting from the KMPR enquiry page." />
                </div>

                {/* Office address */}
                <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-6">
                  <p className="text-kmpr-muted text-xs font-semibold uppercase tracking-widest mb-4">
                    Office
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-kmpr-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-kmpr-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <address className="not-italic text-kmpr-navy text-sm leading-relaxed font-medium">
                      #2112, 9th Main, D Block,<br />
                      Sahakaranagar,<br />
                      Bengaluru 560092
                    </address>
                  </div>
                </div>
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ accordion ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl font-bold text-kmpr-navy">
              Before you reach out
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 px-6 sm:px-8">
              <FaqAccordion items={CONTACT_FAQS} />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ─── Skeleton shown while ConversationalForm loads ────────────────────────────

function FormSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-32 bg-kmpr-soft-bg rounded mb-2" />
          <div className="h-11 w-full bg-kmpr-soft-bg rounded-xl" />
        </div>
      ))}
      <div className="h-24 w-full bg-kmpr-soft-bg rounded-xl" />
      <div className="h-12 w-full bg-kmpr-teal/20 rounded-full" />
    </div>
  );
}
