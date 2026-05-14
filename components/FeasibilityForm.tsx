"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function FeasibilityForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = {
      company:        (form.elements.namedItem("company")        as HTMLInputElement).value,
      location:       (form.elements.namedItem("location")       as HTMLInputElement).value,
      sanctionedLoad: (form.elements.namedItem("sanctionedLoad") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <p className="text-kmpr-teal text-lg font-semibold">✓ Received!</p>
        <p className="text-white/60 text-sm mt-1">
          Our team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <input
        name="company"
        required
        placeholder="Company name"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-kmpr-teal transition-colors"
      />
      <input
        name="location"
        required
        placeholder="Location (district)"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-kmpr-teal transition-colors"
      />
      <input
        name="sanctionedLoad"
        required
        placeholder="Sanctioned load (kVA)"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-kmpr-teal transition-colors"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-kmpr-teal hover:bg-kmpr-teal-dark text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {status === "submitting" ? "Sending…" : "Check Feasibility"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-1 sm:col-span-full">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
