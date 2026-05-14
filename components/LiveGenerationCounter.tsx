"use client";

/**
 * Placeholder — full implementation in Part C.
 * Shows a static animated card so the home page layout is complete.
 */
export default function LiveGenerationCounter() {
  return (
    <section className="bg-kmpr-navy py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
          Live Generation
        </p>
        <p className="text-white/40 text-sm">
          Real-time plant output widget — coming in Part C
        </p>
        <div className="mt-6 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
          <span className="tabular text-5xl font-bold text-kmpr-teal">— MW</span>
          <span className="text-white/50 text-sm">current output</span>
        </div>
      </div>
    </section>
  );
}
