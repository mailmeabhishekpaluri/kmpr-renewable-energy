"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  context?: string;
  className?: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildWaUrl(pathname: string, context?: string): string {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+919880221745").replace(/[^0-9]/g, "");
  const ts     = new Date().toISOString();
  const base   = `Hi KMPR — I'm on the ${pathname} page and want to discuss open access. — sent at ${ts}`;
  const msg    = context ? `${context}\n\n${base}` : base;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

// ─── QR Modal ────────────────────────────────────────────────────────────────

function QrModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-5 max-w-xs w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
          <p className="font-bold text-kmpr-navy text-base">Scan to open WhatsApp</p>
        </div>

        {/* QR */}
        <div className="bg-white p-2 rounded-xl border border-[#25D366]/20">
          <QRCodeSVG value={url} size={180} fgColor="#0F2A3F" level="M" />
        </div>

        <p className="text-kmpr-muted text-xs text-center leading-snug">
          Point your phone camera at this code to start the conversation on WhatsApp.
        </p>

        <button
          onClick={onClose}
          className="text-kmpr-muted text-xs hover:text-kmpr-navy transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─── WhatsApp Icon ────────────────────────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WhatsAppCTA({ context, className = "" }: Props) {
  const pathname       = usePathname();
  const [modal, setModal] = useState(false);

  const handleClick = useCallback(() => {
    const url = buildWaUrl(pathname, context);
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    if (isDesktop) {
      setModal(true);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [pathname, context]);

  const waUrl = buildWaUrl(pathname, context);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm ${className}`}
        aria-label="Continue on WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        Continue on WhatsApp
      </button>

      {modal && (
        <QrModal url={waUrl} onClose={() => setModal(false)} />
      )}
    </>
  );
}

// ─── Floating button (mobile only) ───────────────────────────────────────────

export function WhatsAppFloatingButton({ context }: { context?: string }) {
  const pathname          = usePathname();
  const [modal, setModal] = useState(false);

  const handleClick = useCallback(() => {
    const url = buildWaUrl(pathname, context);
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    if (isDesktop) {
      setModal(true);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [pathname, context]);

  const waUrl = buildWaUrl(pathname, context);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className="md:hidden fixed bottom-6 right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg flex items-center justify-center transition-colors"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </button>

      {modal && (
        <QrModal url={waUrl} onClose={() => setModal(false)} />
      )}
    </>
  );
}
