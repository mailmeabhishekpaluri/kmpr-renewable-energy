import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { ProposalDocument, type ProposalData, type SavingsRow } from "@/lib/proposalPdf";

// ─── Input type ───────────────────────────────────────────────────────────────

type ProposalInput = {
  company:        string;
  district:       string;
  kwhPerMonth:    number;
  currentTariff:  number;
  preferredModel: "PPA" | "BOOT" | "Not sure";
  email?:         string;
};

// ─── Savings computation ──────────────────────────────────────────────────────

const KMPR_RATE  = 4.30;
const ESCALATION = 0.10;

function buildTable(kwhPerMonth: number, currentTariff: number): SavingsRow[] {
  let cumulative = 0;
  return Array.from({ length: 25 }, (_, i) => {
    const discom  = parseFloat((currentTariff * Math.pow(1 + ESCALATION, i)).toFixed(2));
    const saving  = Math.round((discom - KMPR_RATE) * 12 * kwhPerMonth);
    cumulative   += saving;
    return { year: 2026 + i, discom, kmpr: KMPR_RATE, saving, cumulative: Math.round(cumulative) };
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

function formatDate(): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
}

// ─── Cache ────────────────────────────────────────────────────────────────────

const CACHE_DIR = "/tmp/kmpr-proposals";
const CACHE_TTL = 24 * 60 * 60 * 1_000;

function cacheKey(input: Omit<ProposalInput, "email">): string {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex").slice(0, 16);
}

function readCache(key: string): Buffer | null {
  const p = path.join(CACHE_DIR, `${key}.pdf`);
  try {
    const stat = fs.statSync(p);
    if (Date.now() - stat.mtimeMs > CACHE_TTL) { fs.unlinkSync(p); return null; }
    return fs.readFileSync(p);
  } catch { return null; }
}

function writeCache(key: string, buf: Buffer): void {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(path.join(CACHE_DIR, `${key}.pdf`), buf);
  } catch { /* non-blocking */ }
}

// ─── Email (Resend — optional) ────────────────────────────────────────────────

async function sendEmail(
  email: string,
  company: string,
  pdfBuffer: Buffer,
  slug: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) { console.info("[generate-proposal] RESEND_API_KEY not set — skipping email"); return; }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from:        "KMPR Power <noreply@kmprpower.in>",
      to:          [email, "sales@kmprpower.in"],
      subject:     `Your KMPR Solar Proposal — ${company}`,
      html:        `<p>Dear ${company},</p><p>Please find your customised solar power proposal attached. This document models your 25-year savings under KMPR's open access PPA and BOOT models.</p><p>We'll be in touch within 4 working hours to walk you through the numbers.</p><p>— KMPR Power Team</p>`,
      attachments: [{ filename: `KMPR_Proposal_${slug}.pdf`, content: pdfBuffer }],
    });
    console.info("[generate-proposal] Email sent to", email);
  } catch (err) {
    console.error("[generate-proposal] Email failed:", err);
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ProposalInput;
    const { company, district, kwhPerMonth, currentTariff, preferredModel, email } = body;

    if (!company || !district || !kwhPerMonth || !currentTariff || !preferredModel) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const cacheInput = { company, district, kwhPerMonth, currentTariff, preferredModel };
    const key        = cacheKey(cacheInput);
    const slug       = slugify(company);

    // Check cache
    let pdfBuffer = readCache(key);

    if (!pdfBuffer) {
      const data: ProposalData = {
        company, district, kwhPerMonth, currentTariff, preferredModel,
        generatedAt: formatDate(),
      };
      const table = buildTable(kwhPerMonth, currentTariff);

      pdfBuffer = await renderToBuffer(
        React.createElement(ProposalDocument, { data, table })
      );

      writeCache(key, pdfBuffer);
    }

    // Send email in background (non-blocking)
    if (email) {
      sendEmail(email, company, pdfBuffer, slug).catch(() => {});
    }

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="KMPR_Proposal_${slug}.pdf"`,
        "Content-Length":      String(pdfBuffer.length),
        "Cache-Control":       "no-store",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[generate-proposal]", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
