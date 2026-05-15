"use client";

/** Placeholder — interactive tariff comparison chart. Full implementation in Part C. */
export default function TariffTimeMachine() {
  return (
    <section className="bg-kmpr-soft-bg py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
          Tariff Time Machine
        </p>
        <h2 className="text-2xl font-bold text-kmpr-navy mb-4">
          See your bill in 5, 10, and 25 years
        </h2>
        <p className="text-kmpr-muted text-sm mb-8">
          Interactive Discom vs. KMPR cost comparison — coming in Part C
        </p>
        <div className="bg-white rounded-2xl border border-kmpr-teal/15 p-8 grid grid-cols-3 gap-6">
          {[
            { year: "Today",   discom: "₹8.20", kmpr: "₹4.30" },
            { year: "Year 10", discom: "₹15.40", kmpr: "₹4.30" },
            { year: "Year 25", discom: "₹29.80", kmpr: "₹4.30" },
          ].map((row) => (
            <div key={row.year} className="text-center">
              <p className="text-kmpr-muted text-xs uppercase tracking-widest mb-3">{row.year}</p>
              <p className="text-kmpr-alert-text tabular text-xl font-bold">{row.discom}<span className="text-xs font-normal block">Discom</span></p>
              <p className="text-kmpr-teal tabular text-xl font-bold mt-2">{row.kmpr}<span className="text-xs font-normal block text-kmpr-muted">KMPR</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
