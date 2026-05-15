"use client";

/** Placeholder — animated kWh journey diagram. Full implementation in Part C. */
export default function KwhJourney() {
  return (
    <section className="bg-kmpr-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3 text-center">
          The kWh Journey
        </p>
        <p className="text-white/40 text-sm text-center mb-8">
          Animated flow diagram — coming in Part C
        </p>
        {/* Static flow strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
          {["Madakasira Plant", "APTRANSCO Grid", "33 kV Substation", "Your Meter"].map((label, i) => (
            <div key={label} className="flex flex-col sm:flex-row items-center">
              <div className="flex flex-col items-center">
                <div className="w-32 h-20 rounded-xl bg-white/5 border border-kmpr-teal/20 flex items-center justify-center">
                  <p className="text-white/70 text-xs font-medium text-center px-2 leading-snug">{label}</p>
                </div>
              </div>
              {i < 3 && (
                <div className="w-px h-6 sm:h-px sm:w-8 bg-kmpr-teal/30 mx-0 my-1 sm:mx-0 sm:my-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
