"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useSearchParams } from "next/navigation";
import type { ExtractedBill } from "@/app/api/extract-bill/route";

// ─── Constants ────────────────────────────────────────────────────────────────

const KMPR_RATE  = 4.30;
const ESCALATION = 0.10;
const MAX_BYTES  = 10 * 1024 * 1024;

const LOADING_MSGS = [
  "Reading your bill…",
  "Extracting tariff data…",
  "Modelling 25 years of savings…",
];

const rupeeFmt = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
});

// ─── Savings maths ────────────────────────────────────────────────────────────

function computeSavings(kwhPerMonth: number, currentRate: number) {
  const monthly = (currentRate - KMPR_RATE) * kwhPerMonth;
  const cumulative25yr = Array.from({ length: 25 }, (_, i) =>
    (currentRate * Math.pow(1 + ESCALATION, i) - KMPR_RATE) * 12 * kwhPerMonth
  ).reduce((a, b) => a + b, 0);
  return { monthly, annual: monthly * 12, cumulative25yr };
}

// ─── Status type ──────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "editing" | "computed" | "error";

// ─── Editable form values ─────────────────────────────────────────────────────

type FormVals = {
  kwh_per_month:       number;
  tariff_per_unit:     number;
  sanctioned_load_kva: number | null;
  billing_period:      string;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function LoadingScreen({ msgIdx }: { msgIdx: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-kmpr-teal/20" />
        <div className="absolute inset-0 rounded-full border-4 border-t-kmpr-teal animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-kmpr-teal font-semibold text-sm transition-all duration-500 min-h-[1.5rem]">
          {LOADING_MSGS[msgIdx]}
        </p>
        <p className="text-kmpr-muted text-xs mt-1">This usually takes 5–10 seconds</p>
      </div>
      {/* Step dots */}
      <div className="flex gap-2">
        {LOADING_MSGS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              i <= msgIdx ? "bg-kmpr-teal" : "bg-kmpr-teal/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function EditingForm({
  vals,
  onChange,
  onConfirm,
}: {
  vals: FormVals;
  onChange: (v: Partial<FormVals>) => void;
  onConfirm: () => void;
}) {
  const fields = [
    { id: "kwh_per_month",       label: "Monthly consumption (kWh)",    type: "number", step: 1000,  min: 1 },
    { id: "tariff_per_unit",     label: "Current tariff (Rs/unit)",      type: "number", step: 0.10,  min: 0.1 },
    { id: "sanctioned_load_kva", label: "Sanctioned load (kVA)",         type: "number", step: 100,   min: 0 },
    { id: "billing_period",      label: "Billing period",                type: "text",   step: undefined, min: undefined },
  ] as const;

  return (
    <div>
      <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">
        Extracted from your bill
      </p>
      <h3 className="text-xl font-bold text-kmpr-navy mb-1">
        Confirm the details
      </h3>
      <p className="text-kmpr-muted text-sm mb-6">
        We've read your bill — correct anything that looks off before computing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {fields.map(({ id, label, type, step, min }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-kmpr-navy text-sm font-medium mb-1.5">
              {label}
            </label>
            <input
              id={id}
              type={type}
              step={step}
              min={min}
              value={(vals as Record<string, unknown>)[id] as string | number ?? ""}
              onChange={(e) =>
                onChange({
                  [id]: type === "number"
                    ? (e.target.value === "" ? null : Number(e.target.value))
                    : e.target.value,
                } as Partial<FormVals>)
              }
              className="w-full bg-kmpr-soft-bg border border-kmpr-teal/20 rounded-xl px-4 py-3 text-kmpr-navy text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-kmpr-teal/40 transition-colors"
            />
          </div>
        ))}
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-bold px-6 py-4 rounded-full transition-colors text-sm"
      >
        Compute my savings →
      </button>
    </div>
  );
}

type ProposalStatus = "idle" | "collecting" | "generating" | "done" | "error";

function SavingsPanel({
  vals,
  proposalCompany,
  proposalDistrict,
  proposalModel,
  onReset,
}: {
  vals: FormVals;
  proposalCompany: string;
  proposalDistrict: string;
  proposalModel: string;
  onReset: () => void;
}) {
  const { monthly, annual, cumulative25yr } = computeSavings(vals.kwh_per_month, vals.tariff_per_unit);
  const [pStatus, setPStatus] = useState<ProposalStatus>("idle");
  const [email, setEmail]     = useState("");
  const [pError, setPError]   = useState<string | null>(null);

  const rows = [
    { label: "Monthly saving",      value: rupeeFmt.format(Math.round(monthly)),        highlight: false },
    { label: "Annual saving",       value: rupeeFmt.format(Math.round(annual)),         highlight: false },
    { label: "25-year cumulative",  value: rupeeFmt.format(Math.round(cumulative25yr)), highlight: true  },
  ];

  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setPStatus("generating");
    setPError(null);
    try {
      const res = await fetch("/api/generate-proposal", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company:        proposalCompany || "Your Company",
          district:       proposalDistrict || "Anantapur",
          kwhPerMonth:    vals.kwh_per_month,
          currentTariff:  vals.tariff_per_unit,
          preferredModel: (proposalModel as "PPA" | "BOOT" | "Not sure") || "Not sure",
          email,
        }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const blob     = await res.blob();
      const url      = URL.createObjectURL(blob);
      const a        = document.createElement("a");
      a.href         = url;
      a.download     = `KMPR_Proposal_${proposalCompany || "Facility"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setPStatus("done");
    } catch {
      setPError("Failed to generate the proposal. Please try again or contact us directly.");
      setPStatus("error");
    }
  };

  return (
    <div>
      <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">
        Your Savings Projection
      </p>
      <h3 className="text-xl font-bold text-kmpr-navy mb-6">
        Based on ₹{vals.tariff_per_unit.toFixed(2)}/unit current vs ₹{KMPR_RATE.toFixed(2)} KMPR
      </h3>

      {/* Comparison bar */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-center">
          <p className="tabular text-2xl font-bold text-red-700">₹{vals.tariff_per_unit.toFixed(2)}</p>
          <p className="text-red-500 text-xs mt-1 font-medium">Current Discom rate</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 text-center">
          <p className="tabular text-2xl font-bold text-emerald-700">₹{KMPR_RATE.toFixed(2)}</p>
          <p className="text-emerald-600 text-xs mt-1 font-medium">KMPR fixed rate</p>
        </div>
      </div>

      {/* Savings rows */}
      <div className="bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 overflow-hidden mb-6">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-6 py-4 ${
              i < rows.length - 1 ? "border-b border-kmpr-teal/10" : ""
            } ${row.highlight ? "bg-kmpr-teal/10" : ""}`}
          >
            <p className="text-kmpr-muted text-sm font-medium">{row.label}</p>
            <p className={`tabular text-lg font-bold ${row.highlight ? "text-kmpr-teal" : "text-kmpr-navy"}`}>
              {row.value}
            </p>
          </div>
        ))}
      </div>

      <p className="text-kmpr-muted text-xs mb-6 leading-relaxed">
        * 25-year projection assumes 10%/year Discom escalation. KMPR tariff is contractually fixed at ₹{KMPR_RATE}/unit.
      </p>

      {/* Proposal section */}
      <div className="bg-kmpr-navy rounded-2xl p-6 mb-4">
        {pStatus === "idle" && (
          <>
            <p className="text-white font-bold text-base mb-1">
              Want this as a branded proposal you can send to your CFO?
            </p>
            <p className="text-white/50 text-xs mb-4">
              12-page PDF with your facility's numbers, KMPR's credentials, term sheet, and 25-year savings table.
            </p>
            <button
              onClick={() => setPStatus("collecting")}
              className="bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Generate my CFO proposal →
            </button>
          </>
        )}

        {pStatus === "collecting" && (
          <form onSubmit={handleGenerateProposal}>
            <p className="text-white font-bold text-sm mb-3">
              Where should we send the proposal?
            </p>
            <input
              type="email"
              required
              placeholder="your@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-kmpr-teal transition-colors mb-3"
            />
            <p className="text-white/40 text-xs mb-4">
              We'll email the PDF to you and to sales@kmprpower.in for follow-up.
            </p>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors"
              >
                Generate & download PDF →
              </button>
              <button
                type="button"
                onClick={() => setPStatus("idle")}
                className="px-4 py-3 text-white/50 hover:text-white text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {pStatus === "generating" && (
          <div className="text-center py-4">
            <div className="w-10 h-10 rounded-full border-2 border-kmpr-teal border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-white text-sm font-medium">Generating your 12-page proposal…</p>
            <p className="text-white/40 text-xs mt-1">Usually takes 10–20 seconds</p>
          </div>
        )}

        {pStatus === "done" && (
          <div className="text-center py-2">
            <p className="text-emerald-400 font-bold text-sm mb-1">✓ Proposal downloaded</p>
            <p className="text-white/60 text-xs">We've also sent a copy to your email.</p>
          </div>
        )}

        {pStatus === "error" && (
          <div>
            <p className="text-red-400 text-sm mb-3">{pError}</p>
            <button
              onClick={() => setPStatus("collecting")}
              className="text-kmpr-teal text-xs hover:underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full text-kmpr-muted text-xs hover:text-kmpr-navy transition-colors py-2"
      >
        ← Upload a different bill
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BillUploadCalculator() {
  const params = useSearchParams();
  const [status, setStatus]     = useState<Status>("idle");
  const [msgIdx, setMsgIdx]     = useState(0);
  const [error, setError]       = useState<string | null>(null);
  const [propCompany, setPropCompany]   = useState(() => params.get("company") ?? "");
  const [propDistrict, setPropDistrict] = useState(() => params.get("district") ?? "");
  const [propModel, setPropModel]       = useState(() => params.get("model") ?? "Not sure");
  const [vals, setVals]         = useState<FormVals>({
    kwh_per_month:       100_000,
    tariff_per_unit:     8.00,
    sanctioned_load_kva: null,
    billing_period:      "",
  });

  // Cycle loading messages
  useEffect(() => {
    if (status !== "loading") return;
    const t = setInterval(() => setMsgIdx((i) => Math.min(i + 1, LOADING_MSGS.length - 1)), 1200);
    return () => clearInterval(t);
  }, [status]);

  const handleDrop = useCallback(async (accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;

    setStatus("loading");
    setMsgIdx(0);
    setError(null);
    const t0 = Date.now();

    try {
      const form = new FormData();
      form.append("bill", file);
      const res  = await fetch("/api/extract-bill", { method: "POST", body: form });
      const data = await res.json() as { ok: boolean; extracted?: ExtractedBill; error?: string };

      // Enforce 3-second minimum for perceived-effort UX
      const elapsed = Date.now() - t0;
      if (elapsed < 3000) await new Promise((r) => setTimeout(r, 3000 - elapsed));

      if (data.ok && data.extracted) {
        const ex = data.extracted;
        setVals({
          kwh_per_month:       ex.kwh_per_month       ?? 100_000,
          tariff_per_unit:     ex.tariff_per_unit      ?? 8.00,
          sanctioned_load_kva: ex.sanctioned_load_kva ?? null,
          billing_period:      ex.billing_period       ?? "",
        });
        setStatus("editing");
      } else {
        setError(data.error ?? "Could not read the bill. Please try a clearer scan.");
        setStatus("error");
      }
    } catch {
      const elapsed = Date.now() - t0;
      if (elapsed < 3000) await new Promise((r) => setTimeout(r, 3000 - elapsed));
      setError("Upload failed. Please check your connection and try again.");
      setStatus("error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg":      [".jpg", ".jpeg"],
      "image/png":       [".png"],
    },
    maxSize:  MAX_BYTES,
    maxFiles: 1,
    onDrop:   handleDrop,
    disabled: status === "loading",
  });

  const rejectionMsg = fileRejections[0]?.errors[0]?.message ?? null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-8 sm:p-10">
        {/* ── Idle / Drop zone ─────────────────────────────────────────── */}
        {status === "idle" && (
          <div>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-2">
              Bill Upload Calculator
            </p>
            <h2 className="text-2xl font-bold text-kmpr-navy mb-2">
              Upload your electricity bill
            </h2>
            <p className="text-kmpr-muted text-sm mb-7 leading-relaxed">
              We'll extract your tariff, load, and usage — then model 25 years of savings in seconds.
            </p>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-kmpr-teal bg-kmpr-teal/5"
                  : "border-kmpr-teal/25 hover:border-kmpr-teal hover:bg-kmpr-soft-bg"
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-14 h-14 rounded-full bg-kmpr-teal/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-kmpr-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p className="text-kmpr-navy font-semibold text-sm mb-1">
                {isDragActive ? "Drop your bill here" : "Drag & drop your bill here"}
              </p>
              <p className="text-kmpr-muted text-xs">
                PDF, JPG, or PNG · Max 10 MB
              </p>
              <button className="mt-4 text-xs font-semibold text-kmpr-teal hover:text-kmpr-teal-dark transition-colors">
                or browse to upload
              </button>
            </div>

            {rejectionMsg && (
              <p className="text-red-500 text-xs mt-3 text-center">{rejectionMsg}</p>
            )}
          </div>
        )}

        {/* ── Loading ───────────────────────────────────────────────────── */}
        {status === "loading" && <LoadingScreen msgIdx={msgIdx} />}

        {/* ── Editing ───────────────────────────────────────────────────── */}
        {status === "editing" && (
          <EditingForm
            vals={vals}
            onChange={(v) => setVals((prev) => ({ ...prev, ...v }))}
            onConfirm={() => setStatus("computed")}
          />
        )}

        {/* ── Computed ──────────────────────────────────────────────────── */}
        {status === "computed" && (
          <SavingsPanel
            vals={vals}
            proposalCompany={propCompany}
            proposalDistrict={propDistrict}
            proposalModel={propModel}
            onReset={() => setStatus("idle")}
          />
        )}

        {/* ── Error ─────────────────────────────────────────────────────── */}
        {status === "error" && (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <p className="text-kmpr-navy font-bold mb-2">Extraction failed</p>
            <p className="text-kmpr-muted text-sm mb-6 max-w-sm mx-auto">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-3 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold rounded-full text-sm transition-colors"
              >
                Try again
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 border border-kmpr-teal/30 text-kmpr-teal font-semibold rounded-full text-sm hover:border-kmpr-teal transition-colors"
              >
                Talk to us instead
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Privacy note */}
      <p className="text-kmpr-muted text-xs text-center mt-4 flex items-center justify-center gap-1.5">
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        Your bill is processed in memory and never stored on our servers.
      </p>
    </div>
  );
}
