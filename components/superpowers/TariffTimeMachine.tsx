"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// ─── Constants ────────────────────────────────────────────────────────────────

const START_YEAR = 2026;
const END_YEAR   = 2051;
const KMPR_RATE  = 4.30;

const rupeeFmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const numFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

// ─── URL hash sync ────────────────────────────────────────────────────────────

function readHash(): Partial<Record<string, string>> {
  if (typeof window === "undefined") return {};
  const hash = window.location.hash.slice(1);
  return Object.fromEntries(new URLSearchParams(hash));
}

function writeHash(params: Record<string, string | number>) {
  const sp = new URLSearchParams(
    Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
  );
  history.replaceState(null, "", `#${sp.toString()}`);
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-kmpr-teal/20 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-bold text-kmpr-navy mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">
          {p.name}: ₹{Number(p.value).toFixed(2)}/unit
        </p>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TariffTimeMachine() {
  // Read URL hash on first render
  const init = useMemo(() => {
    const h = readHash();
    return {
      year:        Number(h.year)        || 2046,
      discomStart: Number(h.discomStart) || 8.00,
      escalation:  Number(h.escalation)  || 0.10,
      kWhPerMonth: Number(h.kWhPerMonth) || 100_000,
    };
  }, []);

  const [year,        setYear]        = useState(init.year);
  const [discomStart, setDiscomStart] = useState(init.discomStart);
  const [escalation,  setEscalation]  = useState(init.escalation);
  const [kWhPerMonth, setKWhPerMonth] = useState(init.kWhPerMonth);
  const [showCustom,  setShowCustom]  = useState(false);

  // Sync to URL hash
  useEffect(() => {
    writeHash({ year, discomStart, escalation, kWhPerMonth });
  }, [year, discomStart, escalation, kWhPerMonth]);

  // Chart series — 26 points 2026-2051
  const series = useMemo(() => {
    return Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => ({
      year:   START_YEAR + i,
      Discom: parseFloat((discomStart * Math.pow(1 + escalation, i)).toFixed(2)),
      KMPR:   KMPR_RATE,
    }));
  }, [discomStart, escalation]);

  // Cumulative savings up to selected year
  const cumulativeSavings = useMemo(() => {
    return series
      .filter((p) => p.year <= year)
      .reduce((acc, p) => acc + (p.Discom - p.KMPR) * 12 * kWhPerMonth, 0);
  }, [series, year, kWhPerMonth]);

  const discomAtYear = series.find((p) => p.year === year)?.Discom ?? discomStart;

  const handlePreset = useCallback((y: number) => setYear(y), []);

  return (
    <section className="py-24 bg-kmpr-soft-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
          Tariff Time Machine
        </p>

        {/* Dynamic heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-kmpr-navy mb-2 leading-tight">
          How much you save by year{" "}
          <span className="text-kmpr-teal tabular">{year}</span>
        </h2>

        {/* Big savings number */}
        <div className="mt-4 mb-8 flex flex-wrap items-baseline gap-3">
          <span className="text-5xl sm:text-6xl font-bold tabular text-kmpr-teal leading-none">
            {rupeeFmt.format(Math.round(cumulativeSavings))}
          </span>
          <span className="text-kmpr-muted text-base font-medium">
            cumulative savings vs Discom
          </span>
        </div>

        {/* Preset chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: "Year I sign (2026)", y: 2026 },
            { label: "Year my CFO retires (2046)", y: 2046 },
          ].map(({ label, y }) => (
            <button
              key={y}
              onClick={() => handlePreset(y)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                year === y
                  ? "bg-kmpr-teal text-white border-kmpr-teal"
                  : "bg-white text-kmpr-navy border-kmpr-teal/25 hover:border-kmpr-teal"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-4 sm:p-6 mb-6">
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={series} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5F7F9" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: "#55667A" }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#55667A" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v}`}
                domain={[0, "auto"]}
                width={44}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                formatter={(value) => (
                  <span style={{ color: "#55667A", fontWeight: 600 }}>{value}</span>
                )}
              />
              <ReferenceLine
                x={year}
                stroke="#1ABEC8"
                strokeDasharray="4 3"
                strokeWidth={1.5}
                label={{ value: `${year}`, position: "insideTopRight", fontSize: 10, fill: "#1ABEC8" }}
              />
              <Line
                type="monotone"
                dataKey="Discom"
                stroke="#B45309"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: "#B45309" }}
              />
              <Line
                type="monotone"
                dataKey="KMPR"
                stroke="#1ABEC8"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: "#1ABEC8" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Year slider */}
        <div className="mb-8">
          <label htmlFor="year-slider" className="block text-kmpr-muted text-xs font-semibold uppercase tracking-widest mb-3">
            Drag to select year: <span className="text-kmpr-teal">{year}</span>
          </label>
          <input
            id="year-slider"
            type="range"
            min={START_YEAR}
            max={END_YEAR}
            step={1}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-kmpr-teal bg-kmpr-teal/20"
          />
          <div className="flex justify-between text-xs text-kmpr-muted mt-1">
            <span>{START_YEAR}</span>
            <span>{END_YEAR}</span>
          </div>
        </div>

        {/* Stats row at selected year */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Discom rate in " + year, value: `₹${discomAtYear.toFixed(2)}/unit` },
            { label: "KMPR rate",              value: `₹${KMPR_RATE.toFixed(2)}/unit` },
            { label: "Saving per unit",        value: `₹${(discomAtYear - KMPR_RATE).toFixed(2)}/unit` },
            { label: "Monthly saving",         value: rupeeFmt.format(Math.round((discomAtYear - KMPR_RATE) * kWhPerMonth)) },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-kmpr-teal/15 px-4 py-4 text-center">
              <p className="tabular text-lg font-bold text-kmpr-teal">{stat.value}</p>
              <p className="text-kmpr-muted text-[10px] uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Customise assumptions */}
        <div className="bg-white rounded-2xl border border-kmpr-teal/15 overflow-hidden">
          <button
            onClick={() => setShowCustom((s) => !s)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
          >
            <span className="text-kmpr-navy font-semibold text-sm">Customise assumptions</span>
            <span
              className={`w-6 h-6 rounded-full border border-kmpr-teal/30 flex items-center justify-center text-kmpr-teal transition-transform duration-200 ${
                showCustom ? "rotate-45" : ""
              }`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>

          {showCustom && (
            <div className="border-t border-kmpr-teal/10 px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  id: "discomStart",
                  label: "Discom starting rate (₹/unit)",
                  value: discomStart,
                  onChange: (v: number) => setDiscomStart(v),
                  min: 4, max: 15, step: 0.10,
                },
                {
                  id: "escalation",
                  label: "Annual escalation (%)",
                  value: Math.round(escalation * 100),
                  onChange: (v: number) => setEscalation(v / 100),
                  min: 0, max: 25, step: 1,
                },
                {
                  id: "kwh",
                  label: "Monthly consumption (kWh)",
                  value: kWhPerMonth,
                  onChange: (v: number) => setKWhPerMonth(v),
                  min: 10_000, max: 2_000_000, step: 10_000,
                },
              ].map(({ id, label, value, onChange, min, max, step }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-kmpr-muted text-xs font-medium mb-1.5">
                    {label}
                  </label>
                  <input
                    id={id}
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full bg-kmpr-soft-bg border border-kmpr-teal/20 rounded-xl px-4 py-2.5 text-kmpr-navy text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-kmpr-teal/40 transition-colors"
                  />
                </div>
              ))}
              <div className="sm:col-span-3">
                <p className="text-kmpr-muted text-xs leading-relaxed">
                  * KMPR rate (₹{KMPR_RATE}/unit) is locked by the PPA — it does not escalate. Discom rate used for comparison; actual rate depends on AP DISCOMS regulatory filings.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
