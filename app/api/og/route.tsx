// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title    = searchParams.get("title")    ?? "Open Access Solar for AP Industries";
    const subtitle = searchParams.get("subtitle") ?? "Rs. 4.30/unit · 25-year fixed tariff · 40 MW Madakasira plant";
    const tag      = searchParams.get("tag")      ?? "Open Access Solar";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0F2A3F",
            padding: "60px 72px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "auto" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#1ABEC8", letterSpacing: "0.15em" }}>
                KMPR
              </span>
              <span style={{ fontSize: 24, fontWeight: 300, color: "rgba(255,255,255,0.9)", letterSpacing: "0.1em" }}>
                POWER
              </span>
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", marginTop: 4 }}>
              ENERGIZING INDIA
            </span>
          </div>

          {/* Tag pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(26,190,200,0.15)",
              border: "1px solid rgba(26,190,200,0.3)",
              borderRadius: 100,
              padding: "6px 16px",
              width: "fit-content",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1ABEC8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {tag}
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: 20,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.4,
                marginBottom: 48,
                maxWidth: "800px",
              }}
            >
              {subtitle}
            </div>
          )}

          {/* Bottom row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: "rgba(26,190,200,0.1)",
                border: "1px solid rgba(26,190,200,0.2)",
                borderRadius: 8,
                padding: "10px 20px",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "#1ABEC8" }}>Rs. 4.30 / unit</span>
              <span style={{ width: 1, height: 20, backgroundColor: "rgba(26,190,200,0.3)" }} />
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>25 years fixed</span>
            </div>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
              kmprpower.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    // Fallback: plain navy card — never 500
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0F2A3F",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 700, color: "#1ABEC8", letterSpacing: "0.15em" }}>
            KMPR POWER
          </span>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
