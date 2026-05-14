const colors = [
  { name: "navy",      hex: "#0F2A3F", label: "Primary / Hero",     bg: "bg-kmpr-navy",       fg: "text-white" },
  { name: "teal",      hex: "#1ABEC8", label: "Accent / CTA",       bg: "bg-kmpr-teal",       fg: "text-white" },
  { name: "tealDark",  hex: "#0E8A93", label: "Hover / H2",         bg: "bg-kmpr-teal-dark",  fg: "text-white" },
  { name: "softBg",    hex: "#EAF7F9", label: "Panels / FAQ",       bg: "bg-kmpr-soft-bg",    fg: "text-kmpr-navy" },
  { name: "text",      hex: "#1F2937", label: "Body Copy",          bg: "bg-kmpr-text",       fg: "text-white" },
  { name: "muted",     hex: "#55667A", label: "Captions / Meta",    bg: "bg-kmpr-muted",      fg: "text-white" },
  { name: "alertBg",   hex: "#FFF6E0", label: "Alert Background",   bg: "bg-kmpr-alert-bg",   fg: "text-kmpr-alert-text" },
  { name: "alertText", hex: "#B45309", label: "Alert Text",         bg: "bg-kmpr-alert-text", fg: "text-white" },
];

export default function Home() {
  return (
    <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto space-y-16">

      {/* Color swatches */}
      <section>
        <p className="text-kmpr-muted text-xs font-medium uppercase tracking-widest mb-5">
          Colour Tokens
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {colors.map((c) => (
            <div
              key={c.name}
              className="rounded-xl overflow-hidden shadow-sm border border-black/5"
            >
              <div className={`${c.bg} h-20 flex items-end p-3`}>
                <span className={`${c.fg} text-xs font-medium`}>{c.hex}</span>
              </div>
              <div className="bg-white p-3">
                <p className="text-xs font-semibold text-kmpr-text">kmpr.{c.name}</p>
                <p className="text-xs text-kmpr-muted">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <p className="text-kmpr-muted text-xs font-medium uppercase tracking-widest">
          Typography — Manrope
        </p>
        <h1 className="text-5xl font-bold text-kmpr-navy leading-tight">
          Open Access Solar for AP Industries
        </h1>
        <h2 className="text-3xl font-bold text-kmpr-teal-dark">
          40 MW Madakasira Plant, Fully Operational
        </h2>
        <h3 className="text-xl font-semibold text-kmpr-text">
          Rs. 4.30/unit · 25-Year Fixed Tariff · Zero CapEx
        </h3>
        <p className="text-kmpr-text leading-relaxed max-w-prose">
          KMPR Power delivers open-access solar energy to industrial consumers across Andhra Pradesh
          under both PPA and BOOT models. Every unit you consume comes from a plant we own, operate,
          and maintain — with a tariff locked for 25 years.
        </p>
      </section>

      {/* Tabular numbers */}
      <section>
        <p className="text-kmpr-muted text-xs font-medium uppercase tracking-widest mb-5">
          Tabular Numbers (.tabular)
        </p>
        <div className="inline-block bg-kmpr-soft-bg rounded-2xl p-8">
          <p className="text-kmpr-muted text-sm mb-1">Current tariff</p>
          <p className="tabular text-5xl font-bold text-kmpr-teal">
            Rs. 4.30{" "}
            <span className="text-2xl text-kmpr-muted font-medium">/ unit</span>
          </p>
        </div>
      </section>

    </div>
  );
}
