import Link from "next/link";

const QUICK_LINKS = [
  { label: "About",      href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Investor",   href: "/investor" },
  { label: "FAQ",        href: "/faq" },
  { label: "Privacy",    href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-kmpr-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Logo + address */}
          <div className="space-y-4">
            <div>
              <p className="text-xl font-bold tracking-tight leading-none">
                <span className="text-kmpr-teal">KMPR</span>
                <span className="font-light"> POWER</span>
              </p>
              <p className="text-white/40 text-[9px] tracking-[0.22em] uppercase mt-1">
                Energizing India
              </p>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Open-access solar PPA and BOOT plants for AP industries.
            </p>
            <address className="text-white/40 text-xs leading-relaxed not-italic">
              #2112, 9th Main, D Block<br />
              Sahakaranagar<br />
              Bengaluru 560092
            </address>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <a href="tel:+919880221745" className="hover:text-white transition-colors">
                  +91-9880221745
                </a>
              </li>
              <li>
                <a href="tel:+918499891118" className="hover:text-white transition-colors">
                  +91-8499891118
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="mailto:info@kmprpower.in"
                  className="hover:text-kmpr-teal transition-colors"
                >
                  info@kmprpower.in
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Portfolio download */}
          <div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-4">
              Resources
            </h4>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Plant specs, tariff structures, and case studies — all in one document.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Company Portfolio
            </button>
          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="text-white/35 text-xs">
            © KMPR Power LLP. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">Built in Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
