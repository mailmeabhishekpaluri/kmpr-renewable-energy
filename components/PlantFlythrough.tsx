"use client";

/** Placeholder — 3D plant flythrough. Full implementation in Part C. */
export default function PlantFlythrough() {
  return (
    <section className="bg-kmpr-navy py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3 text-center">
          Virtual Plant Tour
        </p>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Madakasira — 40 MW from above
        </h2>
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-video flex items-center justify-center">
          <div className="text-center space-y-3 px-8">
            <div className="w-14 h-14 rounded-full bg-kmpr-teal/15 border border-kmpr-teal/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-kmpr-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            </div>
            <p className="text-white/60 text-sm">3D plant flythrough — coming in Part C</p>
            <p className="text-white/30 text-xs">Aerial drone footage · Panel layout · Grid infrastructure</p>
          </div>
        </div>
      </div>
    </section>
  );
}
