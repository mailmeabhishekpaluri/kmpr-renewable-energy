import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// ─── Types ────────────────────────────────────────────────────────────────────

type ImageMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";
type DocMediaType   = "application/pdf";

export interface ExtractedBill {
  kwh_per_month:       number | null;
  tariff_per_unit:     number | null;
  sanctioned_load_kva: number | null;
  billing_period:      string | null;
}

// ─── Prompt ───────────────────────────────────────────────────────────────────

const PROMPT =
  "Extract from this Indian industrial electricity bill and return ONLY a JSON object with keys: " +
  "kwh_per_month (number), tariff_per_unit (number, Rs/unit), sanctioned_load_kva (number), " +
  "billing_period (string). If any value is missing, set it to null. Do not include any commentary.";

// ─── JSON extraction (handle stray text / code fences) ───────────────────────

function extractJSON(text: string): ExtractedBill | null {
  // Direct parse
  try { return JSON.parse(text.trim()) as ExtractedBill; } catch {}

  // From ```json ... ``` code fence
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) {
    try { return JSON.parse(fence[1].trim()) as ExtractedBill; } catch {}
  }

  // First {...} block
  const block = text.match(/\{[\s\S]*?\}/);
  if (block) {
    try { return JSON.parse(block[0]) as ExtractedBill; } catch {}
  }

  return null;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("bill") as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json({ ok: false, error: "File exceeds 10 MB limit" }, { status: 413 });
    }

    const bytes  = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mime   = file.type;

    const isPdf   = mime === "application/pdf";
    const isImage = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(mime);

    if (!isPdf && !isImage) {
      return NextResponse.json(
        { ok: false, error: "Unsupported file type. Please upload a PDF, JPG, or PNG." },
        { status: 415 }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Build vision content block
    const visionBlock = isPdf
      ? ({
          type: "document",
          source: { type: "base64", media_type: mime as DocMediaType, data: base64 },
        } as const)
      : ({
          type: "image",
          source: { type: "base64", media_type: mime as ImageMediaType, data: base64 },
        } as const);

    const response = await client.messages.create({
      model:      "claude-sonnet-4-6",
      max_tokens: 512,
      messages:   [{
        role:    "user",
        content: [visionBlock, { type: "text", text: PROMPT }],
      }],
    });

    const rawText  = response.content[0].type === "text" ? response.content[0].text : "";
    const extracted = extractJSON(rawText);

    if (!extracted) {
      return NextResponse.json(
        { ok: false, error: "Could not parse bill data from the document." },
        { status: 422 }
      );
    }

    // File is never persisted — only processed in memory
    return NextResponse.json({ ok: true, extracted });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[extract-bill]", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
