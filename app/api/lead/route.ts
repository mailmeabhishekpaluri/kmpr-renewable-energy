import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { company, location, sanctionedLoad } = await req.json();

    if (!company || !location || !sanctionedLoad) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: persist to Sanity, send notification email, or forward to CRM
    console.log("[lead]", { company, location, sanctionedLoad, ts: new Date().toISOString() });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
