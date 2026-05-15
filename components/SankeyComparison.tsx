"use client";

/** Placeholder — Sankey diagram comparing cost flows. Full implementation in Part C. */
export default function SankeyComparison() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
          Cost Flow Comparison
        </p>
        <h2 className="text-2xl font-bold text-kmpr-navy mb-4">
          Where your energy rupees go
        </h2>
        <p className="text-kmpr-muted text-sm mb-8">
          Sankey diagram showing Discom vs. open-access cost breakdown — coming in Part C
        </p>
        <div className="bg-kmpr-soft-bg rounded-2xl border border-kmpr-teal/15 p-8 grid grid-cols-2 gap-8 text-left">
          <div>
            <p className="text-kmpr-muted text-xs uppercase tracking-widest mb-4 font-semibold">Discom (per unit)</p>
            {[["Generation", "₹3.20"], ["Transmission", "₹1.40"], ["Distribution", "₹1.80"], ["Cross-subsidy", "₹1.10"], ["Taxes & duties", "₹0.70"]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm py-1.5 border-b border-black/5">
                <span className="text-kmpr-text">{k}</span>
                <span className="text-kmpr-alert-text font-semibold tabular">{v}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm py-2 font-bold">
              <span className="text-kmpr-navy">Total</span>
              <span className="text-kmpr-alert-text tabular">₹8.20</span>
            </div>
          </div>
          <div>
            <p className="text-kmpr-muted text-xs uppercase tracking-widest mb-4 font-semibold">KMPR Open Access (per unit)</p>
            {[["Generation (solar)", "₹2.80"], ["Scheduling fee", "₹0.90"], ["Banking & balancing", "₹0.60"], ["Cross-subsidy", "₹0.00"], ["Taxes & duties", "₹0.00"]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm py-1.5 border-b border-black/5">
                <span className="text-kmpr-text">{k}</span>
                <span className={v === "₹0.00" ? "text-kmpr-muted tabular" : "text-kmpr-teal font-semibold tabular"}>{v}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm py-2 font-bold">
              <span className="text-kmpr-navy">Total</span>
              <span className="text-kmpr-teal tabular">₹4.30</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
