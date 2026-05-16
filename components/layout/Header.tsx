"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  SlotIndicatorPill,
  SlotCTA,
  SlotMobileCTA,
} from "@/components/superpowers/SlotIndicatorClient";

const NAV = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Our Models",
    href: "#",
    dropdown: [
      { label: "PPA", href: "/ppa" },
      { label: "BOOT", href: "/boot" },
      { label: "Compare", href: "/compare" },
    ],
  },
  { label: "Plant & Track Record", href: "/plant" },
  { label: "Contact", href: "/contact" },
];

type HeaderProps = {
  slotsFilled?: number;
  slotsTotal?: number;
};

export default function Header({ slotsFilled = 3, slotsTotal = 7 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(false);

  useEffect(() => {
    // Programmatic sentinel at 80px from top; Intersection Observer fires when it leaves the viewport
    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:80px;left:0;height:1px;width:1px;pointer-events:none;z-index:-1";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.style.position = "relative";
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-kmpr-navy shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none select-none">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-kmpr-teal">KMPR</span>
              <span className="text-white font-light"> POWER</span>
            </span>
            <span className="text-white/40 text-[9px] tracking-[0.22em] uppercase mt-0.5">
              Energizing India
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setModelsOpen(true)}
                  onMouseLeave={() => setModelsOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors">
                    {item.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${modelsOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {modelsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-40">
                      <div className="bg-kmpr-navy border border-white/10 rounded-xl shadow-2xl py-1.5">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Slot pill + CTA + hamburger */}
          <div className="flex items-center gap-3">
            <SlotIndicatorPill filled={slotsFilled} total={slotsTotal} />
            <SlotCTA filled={slotsFilled} total={slotsTotal} />
            <button
              className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — slides in from right */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-kmpr-navy flex flex-col pt-20 pb-8 px-6 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-1 flex-1">
            {NAV.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="mt-3">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest px-3 mb-1">
                    {item.label}
                  </p>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <SlotMobileCTA
            filled={slotsFilled}
            total={slotsTotal}
            onClick={() => setMobileOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
