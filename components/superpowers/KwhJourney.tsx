"use client";

import {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  animate,
} from "framer-motion";
import Link from "next/link";

// ─── SVG icons ────────────────────────────────────────────────────────────────

function SolarIcon({ active }: { active: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto">
      <rect x="4" y="12" width="48" height="30" rx="2"
        stroke={active ? "#1ABEC8" : "#fff"} strokeWidth="2" strokeOpacity={active ? 1 : 0.5} />
      {/* Grid */}
      {[20, 36].map((x) => (
        <line key={x} x1={x} y1="12" x2={x} y2="42"
          stroke={active ? "#1ABEC8" : "#fff"} strokeWidth="1" strokeOpacity={active ? 0.7 : 0.3} />
      ))}
      <line x1="4" y1="27" x2="52" y2="27"
        stroke={active ? "#1ABEC8" : "#fff"} strokeWidth="1" strokeOpacity={active ? 0.7 : 0.3} />
      {/* Stand */}
      <line x1="28" y1="42" x2="28" y2="50"
        stroke={active ? "#1ABEC8" : "#fff"} strokeWidth="2" strokeOpacity={active ? 1 : 0.5} />
      <line x1="18" y1="50" x2="38" y2="50"
        stroke={active ? "#1ABEC8" : "#fff"} strokeWidth="2" strokeOpacity={active ? 1 : 0.5} />
    </svg>
  );
}

function TowerIcon({ active }: { active: boolean }) {
  const c = active ? "#1ABEC8" : "#fff";
  const o = active ? 1 : 0.5;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto">
      {/* Tower body */}
      <polygon points="28,4 38,52 18,52" stroke={c} strokeWidth="2" strokeOpacity={o} fill="none" />
      {/* Cross braces */}
      <line x1="21" y1="24" x2="35" y2="24" stroke={c} strokeWidth="1.5" strokeOpacity={o} />
      <line x1="23" y1="36" x2="33" y2="36" stroke={c} strokeWidth="1.5" strokeOpacity={o} />
      {/* Wires */}
      <path d="M4 16 Q28 22 52 16" stroke={c} strokeWidth="1.5" strokeOpacity={o} fill="none" />
      <path d="M4 26 Q28 32 52 26" stroke={c} strokeWidth="1.5" strokeOpacity={o} fill="none" />
    </svg>
  );
}

function FactoryIcon({ active }: { active: boolean }) {
  const c = active ? "#1ABEC8" : "#fff";
  const o = active ? 1 : 0.5;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto">
      {/* Main building */}
      <rect x="6" y="28" width="44" height="22" stroke={c} strokeWidth="2" strokeOpacity={o} />
      {/* Chimneys */}
      <rect x="10" y="14" width="8" height="16" stroke={c} strokeWidth="1.5" strokeOpacity={o} />
      <rect x="24" y="18" width="8" height="12" stroke={c} strokeWidth="1.5" strokeOpacity={o} />
      {/* Windows */}
      <rect x="12" y="36" width="7" height="7" stroke={c} strokeWidth="1.5" strokeOpacity={o} />
      <rect x="26" y="36" width="7" height="7" stroke={c} strokeWidth="1.5" strokeOpacity={o} />
      {/* Door */}
      <rect x="38" y="38" width="6" height="12" stroke={c} strokeWidth="1.5" strokeOpacity={o} />
    </svg>
  );
}

// ─── Milestone config ─────────────────────────────────────────────────────────

const STOPS = [
  { id: "plant",   label: "Madakasira plant, AP",               note: "Power generated at ₹4.30/unit",          threshold: 0.08, desktopPos: "10%",  mobilePos: "8%"  },
  { id: "tower",   label: "33 kV feeder — no wheeling charges", note: "Travels on APTRANSCO transmission grid",  threshold: 0.48, desktopPos: "50%",  mobilePos: "50%" },
  { id: "factory", label: "Your 33 kV substation",              note: "Delivered directly to your meter",        threshold: 0.88, desktopPos: "90%",  mobilePos: "92%" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function KwhJourney() {
  const outerRef      = useRef<HTMLDivElement>(null);
  const [active, setActive]       = useState([false, false, false]);
  const [showCTA, setShowCTA]     = useState(false);
  const [autoplay, setAutoplay]   = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = () => setPrefersReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll progress on the outer (tall) section
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Single effective progress MotionValue (merge scroll + autoplay)
  const progress = useMotionValue(0);

  // Sync scroll → progress when autoplay is off
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!autoplay) progress.set(v);
  });

  // Autoplay: animate 0→1→0 loop
  useEffect(() => {
    if (!autoplay || prefersReduced) return;
    const controls = animate(progress, [0, 1], {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.8,
    });
    return () => controls.stop();
  }, [autoplay, prefersReduced, progress]);

  // Track milestone visibility + end CTA
  useMotionValueEvent(progress, "change", (v) => {
    setActive([v >= STOPS[0].threshold, v >= STOPS[1].threshold, v >= STOPS[2].threshold]);
    setShowCTA(v >= STOPS[2].threshold);
  });

  // Desktop: horizontal dot x (0–100%)
  const dotXPct  = useTransform(progress, [0, 1], [10,  90]);
  const dotXStyle = useTransform(dotXPct, (v) => `${v}%`);

  // Mobile: vertical dot y (0–100%)
  const dotYPct  = useTransform(progress, [0, 1], [8, 90]);
  const dotYStyle = useTransform(dotYPct, (v) => `${v}%`);

  return (
    // Outer tall section — scroll distance drives animation
    <div ref={outerRef} className="relative min-h-[200vh]">
      {/* Sticky visual panel */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-kmpr-navy overflow-hidden">

        {/* Header + autoplay toggle */}
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
          <div>
            <p className="text-kmpr-teal text-xs font-semibold uppercase tracking-widest mb-1">
              The Journey of 1 kWh
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              From Madakasira to your meter
            </h2>
          </div>
          {!prefersReduced && (
            <button
              onClick={() => setAutoplay((s) => !s)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-colors ${
                autoplay
                  ? "bg-kmpr-teal border-kmpr-teal text-white"
                  : "border-white/20 text-white/60 hover:border-kmpr-teal hover:text-kmpr-teal"
              }`}
            >
              {autoplay ? (
                <><span>⏹</span> Stop</>
              ) : (
                <><span>▶</span> Autoplay</>
              )}
            </button>
          )}
        </div>

        {/* ── DESKTOP: Horizontal ──────────────────────────────────────── */}
        <div className="hidden md:block w-full max-w-5xl px-8 relative">
          {/* Track line */}
          <div className="absolute top-[3.5rem] left-[10%] right-[10%] h-px bg-white/10" />
          {/* Animated fill */}
          <motion.div
            className="absolute top-[3.5rem] left-[10%] h-px bg-kmpr-teal origin-left"
            style={{ scaleX: progress, transformOrigin: "left" }}
            transition={{ duration: 0 }}
          />

          {/* Icons + labels */}
          <div className="relative flex justify-between items-start">
            {STOPS.map((stop, i) => (
              <div key={stop.id} className="flex flex-col items-center w-40 text-center">
                <motion.div
                  animate={{ opacity: active[i] ? 1 : 0.4, scale: active[i] ? 1 : 0.92 }}
                  transition={{ duration: 0.4 }}
                >
                  {i === 0 && <SolarIcon active={active[i]} />}
                  {i === 1 && <TowerIcon active={active[i]} />}
                  {i === 2 && <FactoryIcon active={active[i]} />}
                </motion.div>

                <AnimatePresence>
                  {active[i] && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-3"
                    >
                      <p className="text-white text-xs font-semibold leading-snug">{stop.label}</p>
                      <p className="text-white/45 text-[10px] mt-0.5 leading-snug">{stop.note}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Moving dot */}
          <motion.div
            className="absolute top-[2.5rem] -translate-x-1/2 z-10"
            style={{ left: dotXStyle }}
          >
            {/* Glow ring */}
            <div className="absolute inset-0 w-7 h-7 rounded-full bg-kmpr-teal/30 blur-sm scale-150" />
            <div className="relative w-7 h-7 rounded-full bg-kmpr-teal shadow-[0_0_14px_4px_rgba(26,190,200,0.5)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            {/* Dot label */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1">
              <p className="text-kmpr-teal text-[10px] font-bold tabular">1 kWh — ₹4.30</p>
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE: Vertical ─────────────────────────────────────────── */}
        <div className="block md:hidden w-full max-w-xs px-6 relative" style={{ height: 380 }}>
          {/* Track line */}
          <div className="absolute left-7 top-[8%] bottom-[8%] w-px bg-white/10" />
          {/* Animated fill */}
          <motion.div
            className="absolute left-7 top-[8%] w-px bg-kmpr-teal origin-top"
            style={{ scaleY: progress, transformOrigin: "top" }}
          />

          {/* Icons + labels */}
          {STOPS.map((stop, i) => (
            <div
              key={stop.id}
              className="absolute flex items-center gap-4"
              style={{ top: stop.mobilePos, transform: "translateY(-50%)" }}
            >
              <motion.div
                className="shrink-0"
                animate={{ opacity: active[i] ? 1 : 0.4, scale: active[i] ? 1 : 0.9 }}
                transition={{ duration: 0.4 }}
              >
                {i === 0 && <SolarIcon active={active[i]} />}
                {i === 1 && <TowerIcon active={active[i]} />}
                {i === 2 && <FactoryIcon active={active[i]} />}
              </motion.div>

              <AnimatePresence>
                {active[i] && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-white text-xs font-semibold leading-snug">{stop.label}</p>
                    <p className="text-white/45 text-[10px] mt-0.5">{stop.note}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Moving dot (vertical) */}
          <motion.div
            className="absolute left-7 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ top: dotYStyle }}
          >
            <div className="absolute inset-0 w-6 h-6 rounded-full bg-kmpr-teal/30 blur-sm scale-150" />
            <div className="relative w-6 h-6 rounded-full bg-kmpr-teal shadow-[0_0_12px_4px_rgba(26,190,200,0.5)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </motion.div>
        </div>

        {/* End-of-journey CTA */}
        <div className="mt-10 px-4">
          <AnimatePresence>
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                {/* Price tag pulse */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-kmpr-teal/15 border border-kmpr-teal/30 rounded-xl px-5 py-3 text-center"
                >
                  <p className="tabular text-2xl font-bold text-kmpr-teal leading-none">₹4.30</p>
                  <p className="text-white/50 text-xs mt-0.5">per unit — locked for 25 years</p>
                </motion.div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
                >
                  Lock this rate for my factory →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll hint (when autoplay is off and progress is near 0) */}
        <AnimatePresence>
          {!autoplay && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 text-white/25 text-xs tracking-widest"
            >
              ↓ scroll to follow the kWh
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
