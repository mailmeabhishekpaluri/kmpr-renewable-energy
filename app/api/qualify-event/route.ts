import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { q, value } = await req.json();
    // Telemetry sink — log for now; replace with analytics/DB in Part D
    console.log("[qualify-event]", { q, value, ts: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
