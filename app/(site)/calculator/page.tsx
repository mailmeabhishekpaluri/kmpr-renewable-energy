import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import BillUploadCalculator from "@/components/superpowers/BillUploadCalculator";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Solar Savings Calculator — Upload Your Electricity Bill | KMPR Power",
  description:
    "Upload your AP industrial electricity bill. KMPR's AI extracts your tariff and models 25 years of savings at Rs. 4.30/unit in seconds.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalculatorPage() {
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
              <ol className="flex items-center gap-2 text-xs text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/20">›</li>
                <li className="text-white/60">Calculator</li>
              </ol>
            </nav>

            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-4">
              25-Year Savings Model
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              See your savings in 60 seconds
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl mx-auto">
              Upload your last electricity bill. Our AI reads your tariff, load, and usage —
              then models exactly how much you save with KMPR.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Calculator ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-kmpr-soft-bg">
        <FadeIn>
          <BillUploadCalculator />
        </FadeIn>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-kmpr-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: "🔒", label: "Bill never stored", note: "Processed in memory only — deleted after extraction" },
                { icon: "⚡", label: "AI-powered reading", note: "Claude vision model reads any AP industrial bill format" },
                { icon: "📊", label: "25-year projection", note: "Accounts for 10%/yr Discom escalation vs fixed KMPR rate" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-kmpr-navy font-semibold text-sm">{item.label}</p>
                  <p className="text-kmpr-muted text-xs leading-snug">{item.note}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
