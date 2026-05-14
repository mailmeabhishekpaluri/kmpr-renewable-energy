"use client";

/**
 * Placeholder — full implementation in Part C.
 * 10-second qualification quiz; shows a static teaser until then.
 */
export default function QualifyTest() {
  return (
    <section className="bg-kmpr-soft-bg py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-3">
          10-Second Qualification Test
        </p>
        <h2 className="text-3xl font-bold text-kmpr-navy mb-4">
          Is open-access solar right for you?
        </h2>
        <p className="text-kmpr-muted mb-8">
          Answer three quick questions and get an instant eligibility assessment.
        </p>
        <div className="bg-white border border-kmpr-teal/20 rounded-2xl p-8 text-kmpr-muted text-sm">
          Interactive qualification quiz — coming in Part C
        </div>
      </div>
    </section>
  );
}
