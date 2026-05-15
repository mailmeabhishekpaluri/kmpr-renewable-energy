# SEO Optimisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full production SEO to kmprpower.in — dynamic OG images, per-page OpenGraph/Twitter metadata, canonical URLs, sitemap, robots.txt, and root structured data.

**Architecture:** A single `app/api/og/route.tsx` generates all OG images on demand via `next/og`. Root `app/layout.tsx` sets `metadataBase` and default OG/Twitter blocks so every page inherits a fallback. Each page overrides with its own `openGraph`/`twitter`/`alternates` fields. Sitemap and robots are Next.js route handlers.

**Tech Stack:** Next.js 16.2.6 App Router, `next/og` (`ImageResponse`), TypeScript, Sanity (`next-sanity` client for dynamic sitemap slugs).

---

## File Map

| Action | File |
|--------|------|
| Create | `app/api/og/route.tsx` |
| Modify | `app/layout.tsx` |
| Modify | `app/(site)/page.tsx` |
| Modify | `app/(site)/how-it-works/page.tsx` |
| Modify | `app/(site)/ppa/page.tsx` |
| Modify | `app/(site)/boot/page.tsx` |
| Modify | `app/(site)/compare/page.tsx` |
| Modify | `app/(site)/plant/page.tsx` |
| Modify | `app/(site)/track-record/page.tsx` |
| Modify | `app/(site)/about/page.tsx` |
| Modify | `app/(site)/calculator/page.tsx` |
| Modify | `app/(site)/contact/page.tsx` |
| Modify | `app/(site)/[industry]/page.tsx` |
| Create | `app/sitemap.ts` |
| Create | `app/robots.ts` |

---

## Task 1: Dynamic OG Image Route

**Files:**
- Create: `app/api/og/route.tsx`

- [ ] **Step 1: Create the OG image route**

```tsx
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
              kmprpower.in
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
```

- [ ] **Step 2: Verify the route works locally**

```bash
curl -I "http://localhost:3000/api/og?title=Test&tag=Steel"
# Expected: HTTP/1.1 200 OK, content-type: image/png
```

Open `http://localhost:3000/api/og?title=Solar+power+for+steel&tag=Steel` in a browser to visually confirm the card renders.

- [ ] **Step 3: Commit**

```bash
git add app/api/og/route.tsx
git commit -m "feat(seo): dynamic OG image route"
```

---

## Task 2: Root Layout — metadataBase, Defaults, JSON-LD

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace root layout metadata and add JSON-LD**

Replace the entire `app/layout.tsx` with:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kmprpower.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KMPR Power — Open Access Solar for AP Industries",
    template: "%s | KMPR Power",
  },
  description:
    "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
  robots: { index: true, follow: true },
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    siteName:    "KMPR Power",
    title:       "KMPR Power — Open Access Solar for AP Industries",
    description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "KMPR Power" }],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@KMPRPower",
    title:       "KMPR Power — Open Access Solar for AP Industries",
    description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
    images:      ["/api/og"],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KMPR Power",
  url: SITE_URL,
  logo: `${SITE_URL}/api/og`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9880221745",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Telugu"],
  },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KMPR Power",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-manrope text-kmpr-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): metadataBase, OG/Twitter defaults, Organization+WebSite JSON-LD"
```

---

## Task 3: Home Page Metadata

**Files:**
- Modify: `app/(site)/page.tsx`

- [ ] **Step 1: Add metadata export**

In `app/(site)/page.tsx`, add after the imports (before the data-fetching section):

```tsx
import type { Metadata } from "next";

const _ogParams = "title=40+MW+solar+at+Rs.+4.30%2Funit+in+AP&tag=Open+Access+Solar";

export const metadata: Metadata = {
  title:       "KMPR Power — Open Access Solar for AP Industries",
  description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational. AP industries save Rs. 3–5 crore/year.",
  alternates:  { canonical: "https://kmprpower.in" },
  openGraph: {
    title:       "KMPR Power — Open Access Solar for AP Industries",
    description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
    url:         "https://kmprpower.in",
    images: [{
      url:    `/api/og?${_ogParams}`,
      width:  1200,
      height: 630,
      alt:    "KMPR Power — Open Access Solar",
    }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "KMPR Power — Open Access Solar for AP Industries",
    description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
    images:      [`/api/og?${_ogParams}`],
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add "app/(site)/page.tsx"
git commit -m "feat(seo): home page OG/Twitter/canonical metadata"
```

---

## Task 4: Static Pages — OG + Twitter + Canonical

**Files:**
- Modify: `app/(site)/how-it-works/page.tsx`
- Modify: `app/(site)/ppa/page.tsx`
- Modify: `app/(site)/boot/page.tsx`
- Modify: `app/(site)/compare/page.tsx`
- Modify: `app/(site)/plant/page.tsx`
- Modify: `app/(site)/track-record/page.tsx`
- Modify: `app/(site)/about/page.tsx`
- Modify: `app/(site)/calculator/page.tsx`
- Modify: `app/(site)/contact/page.tsx`

Each page already exports `metadata`. Extend each one by replacing the existing `export const metadata` block with the version below. Every block follows the same pattern — only the values differ.

- [ ] **Step 1: how-it-works/page.tsx**

Replace the existing `export const metadata: Metadata = { ... }` block with:

```ts
export const metadata: Metadata = {
  title:       "How Open Access Solar Works in Andhra Pradesh",
  description: "Open access lets AP industries buy solar power directly at Rs. 4.30/unit, bypassing Discom. Here's exactly how — at 33 kV, with zero wheeling charges.",
  alternates:  { canonical: "https://kmprpower.in/how-it-works" },
  openGraph: {
    title:       "How Open Access Solar Works in Andhra Pradesh",
    description: "Open access lets AP industries buy solar power directly at Rs. 4.30/unit, bypassing Discom. Here's exactly how.",
    url:         "https://kmprpower.in/how-it-works",
    images: [{ url: "/api/og?title=How+open+access+solar+works&tag=How+It+Works", width: 1200, height: 630, alt: "How Open Access Solar Works" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "How Open Access Solar Works in Andhra Pradesh",
    description: "Open access lets AP industries buy solar power directly at Rs. 4.30/unit, bypassing Discom.",
    images:      ["/api/og?title=How+open+access+solar+works&tag=How+It+Works"],
  },
};
```

- [ ] **Step 2: ppa/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "PPA Model — 26% Co-Investment, Rs. 4.30/unit for 25 Years",
  description: "Become a 26% co-investor in KMPR's 40 MW solar plant. Recover equity in 9 months from bill savings. Fixed Rs. 4.30/unit tariff for 25 years in Andhra Pradesh.",
  alternates:  { canonical: "https://kmprpower.in/ppa" },
  openGraph: {
    title:       "PPA Model — 26% equity, 9-month payback, 25-year tariff lock",
    description: "Become a 26% co-investor in KMPR's 40 MW solar plant. Recover equity in 9 months.",
    url:         "https://kmprpower.in/ppa",
    images: [{ url: "/api/og?title=26%25+equity.+25-year+fixed+tariff.&tag=PPA+Model", width: 1200, height: 630, alt: "KMPR PPA Model" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "PPA Model — 26% equity, 9-month payback, 25-year tariff lock",
    description: "Become a 26% co-investor in KMPR's 40 MW solar plant. Recover equity in 9 months.",
    images:      ["/api/og?title=26%25+equity.+25-year+fixed+tariff.&tag=PPA+Model"],
  },
};
```

- [ ] **Step 3: boot/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "BOOT Model — Own Your Solar Plant in 6 Years",
  description: "KMPR builds and finances your solar plant. Pay your current electricity bill to us for 6 years, then own the asset outright. 20+ years of near-free clean power after transfer.",
  alternates:  { canonical: "https://kmprpower.in/boot" },
  openGraph: {
    title:       "BOOT Model — Own your solar plant in 6 years",
    description: "KMPR builds and finances your plant. Pay your current bill for 6 years, then own the asset outright.",
    url:         "https://kmprpower.in/boot",
    images: [{ url: "/api/og?title=Own+your+solar+plant+in+6+years&tag=BOOT+Model", width: 1200, height: 630, alt: "KMPR BOOT Model" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "BOOT Model — Own your solar plant in 6 years",
    description: "KMPR builds and finances your plant. Pay your current bill for 6 years, then own the asset outright.",
    images:      ["/api/og?title=Own+your+solar+plant+in+6+years&tag=BOOT+Model"],
  },
};
```

- [ ] **Step 4: compare/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "PPA vs BOOT — Compare Solar Models",
  description: "Compare KMPR's PPA (26% equity, fixed Rs. 4.30/unit for 25 years) and BOOT (zero upfront, full ownership in 6 years) models to find the right fit for your business.",
  alternates:  { canonical: "https://kmprpower.in/compare" },
  openGraph: {
    title:       "PPA vs BOOT — Find the right model for your plant",
    description: "26% equity + 25-year tariff lock vs. full ownership in 6 years. Compare side by side.",
    url:         "https://kmprpower.in/compare",
    images: [{ url: "/api/og?title=Find+the+right+model+for+your+plant&tag=PPA+vs+BOOT", width: 1200, height: 630, alt: "PPA vs BOOT Comparison" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "PPA vs BOOT — Find the right model for your plant",
    description: "26% equity + 25-year tariff lock vs. full ownership in 6 years. Compare side by side.",
    images:      ["/api/og?title=Find+the+right+model+for+your+plant&tag=PPA+vs+BOOT"],
  },
};
```

- [ ] **Step 5: plant/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "Madakasira Solar Plant — 40 MW Open Access in Andhra Pradesh",
  description: "KMPR's 40 MW grid-connected solar plant in Madakasira, Anantapur District, Andhra Pradesh. Fully commissioned, 33 kV grid connection, 1,300+ acres reserved for 100–200 MW expansion.",
  alternates:  { canonical: "https://kmprpower.in/plant" },
  openGraph: {
    title:       "Madakasira Plant — 40 MW fully operational in AP",
    description: "40 MW grid-connected solar. 33 kV. 1,300+ acres for 100–200 MW Phase 2 expansion.",
    url:         "https://kmprpower.in/plant",
    images: [{ url: "/api/og?title=40+MW+fully+operational+in+AP&tag=Madakasira+Plant", width: 1200, height: 630, alt: "Madakasira 40 MW Solar Plant" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Madakasira Plant — 40 MW fully operational in AP",
    description: "40 MW grid-connected solar. 33 kV. 1,300+ acres for 100–200 MW Phase 2 expansion.",
    images:      ["/api/og?title=40+MW+fully+operational+in+AP&tag=Madakasira+Plant"],
  },
};
```

- [ ] **Step 6: track-record/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "Track Record — Industrial Clients & Promoter Portfolio",
  description: "KMPR's active industrial clients and Mr. Prasad Raju Muppala's open-access portfolio spanning Strides Pharma, Nestle, Orient Cement, J&K Tyres, and 12+ other industrial consumers across South India.",
  alternates:  { canonical: "https://kmprpower.in/track-record" },
  openGraph: {
    title:       "Track Record — Real clients. Real savings.",
    description: "Strides Pharma, Orient Cement, Nestle, J&K Tyres and 12+ others on open access solar.",
    url:         "https://kmprpower.in/track-record",
    images: [{ url: "/api/og?title=Real+clients.+Real+savings.&tag=Track+Record", width: 1200, height: 630, alt: "KMPR Track Record" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Track Record — Real clients. Real savings.",
    description: "Strides Pharma, Orient Cement, Nestle, J&K Tyres and 12+ others on open access solar.",
    images:      ["/api/og?title=Real+clients.+Real+savings.&tag=Track+Record"],
  },
};
```

- [ ] **Step 7: about/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "About KMPR Power — Founded by a CA and a Chief Engineer",
  description: "KMPR Power owns and operates a 40 MW solar plant in Madakasira, AP. Founded by CA PAN Krishna and Chief Engineer Prasad Raju Muppala. Backed by Ananta Solar Company.",
  alternates:  { canonical: "https://kmprpower.in/about" },
  openGraph: {
    title:       "About KMPR — Founded by a CA and a Chief Engineer",
    description: "PAN Krishna (CA, 20+ yrs steel) and Prasad Raju Muppala (31 yrs APSEB, Chief Engineer). Backed by Ananta Solar.",
    url:         "https://kmprpower.in/about",
    images: [{ url: "/api/og?title=Founded+by+a+CA+and+a+Chief+Engineer&tag=About+KMPR", width: 1200, height: 630, alt: "About KMPR Power" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "About KMPR — Founded by a CA and a Chief Engineer",
    description: "PAN Krishna (CA, 20+ yrs steel) and Prasad Raju Muppala (31 yrs APSEB, Chief Engineer). Backed by Ananta Solar.",
    images:      ["/api/og?title=Founded+by+a+CA+and+a+Chief+Engineer&tag=About+KMPR"],
  },
};
```

- [ ] **Step 8: calculator/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "Solar Savings Calculator — Upload Your Electricity Bill",
  description: "Upload your AP industrial electricity bill. KMPR's AI extracts your tariff and models 25 years of savings at Rs. 4.30/unit in seconds.",
  alternates:  { canonical: "https://kmprpower.in/calculator" },
  openGraph: {
    title:       "Model 25 years of savings in 60 seconds",
    description: "Upload your AP electricity bill. AI reads your tariff and shows your exact 25-year saving.",
    url:         "https://kmprpower.in/calculator",
    images: [{ url: "/api/og?title=Model+25+years+of+savings+in+60+seconds&tag=Savings+Calculator", width: 1200, height: 630, alt: "KMPR Savings Calculator" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Model 25 years of savings in 60 seconds",
    description: "Upload your AP electricity bill. AI reads your tariff and shows your exact 25-year saving.",
    images:      ["/api/og?title=Model+25+years+of+savings+in+60+seconds&tag=Savings+Calculator"],
  },
};
```

- [ ] **Step 9: contact/page.tsx**

```ts
export const metadata: Metadata = {
  title:       "Contact KMPR Power — Start Your Solar Feasibility Enquiry",
  description: "Talk to KMPR's founders about open access solar for your facility. We respond to all feasibility enquiries within 4 working hours.",
  alternates:  { canonical: "https://kmprpower.in/contact" },
  openGraph: {
    title:       "Check your eligibility — KMPR responds in 4 hours",
    description: "Talk to KMPR's founders. Feasibility review: zero cost, 48-hour turnaround.",
    url:         "https://kmprpower.in/contact",
    images: [{ url: "/api/og?title=Check+your+eligibility+in+4+hours&tag=Get+Started", width: 1200, height: 630, alt: "Contact KMPR Power" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Check your eligibility — KMPR responds in 4 hours",
    description: "Talk to KMPR's founders. Feasibility review: zero cost, 48-hour turnaround.",
    images:      ["/api/og?title=Check+your+eligibility+in+4+hours&tag=Get+Started"],
  },
};
```

- [ ] **Step 10: Commit all 9 static pages**

```bash
git add "app/(site)/how-it-works/page.tsx" \
        "app/(site)/ppa/page.tsx" \
        "app/(site)/boot/page.tsx" \
        "app/(site)/compare/page.tsx" \
        "app/(site)/plant/page.tsx" \
        "app/(site)/track-record/page.tsx" \
        "app/(site)/about/page.tsx" \
        "app/(site)/calculator/page.tsx" \
        "app/(site)/contact/page.tsx"
git commit -m "feat(seo): OG/Twitter/canonical on all static pages"
```

---

## Task 5: Industry Dynamic Route — Extend `generateMetadata`

**Files:**
- Modify: `app/(site)/[industry]/page.tsx`

- [ ] **Step 1: Replace `generateMetadata` function**

In `app/(site)/[industry]/page.tsx`, replace the existing `generateMetadata` function with:

```ts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const doc = await getIndustry(slug);

  if (!doc) return { title: "Industry | KMPR Power" };

  const title       = `Solar PPA for ${doc.label} in Andhra Pradesh`;
  const description = doc.hero.subheadline;
  const canonical   = `https://kmprpower.in/${slug}`;
  const ogTitle     = `Solar power for ${doc.label} in AP`;
  const ogImageUrl  = `/api/og?title=${encodeURIComponent(ogTitle)}&tag=${encodeURIComponent(doc.label)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [ogImageUrl],
    },
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(site)/[industry]/page.tsx"
git commit -m "feat(seo): industry pages OG/Twitter/canonical in generateMetadata"
```

---

## Task 6: Sitemap

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";

const SITE = "https://kmprpower.in";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE,                          priority: 1.0, changeFrequency: "weekly",  lastModified: new Date() },
  { url: `${SITE}/contact`,             priority: 0.9, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/calculator`,          priority: 0.9, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/ppa`,                 priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/boot`,                priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/how-it-works`,        priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/compare`,             priority: 0.7, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/plant`,               priority: 0.7, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/track-record`,        priority: 0.7, changeFrequency: "monthly", lastModified: new Date() },
  { url: `${SITE}/about`,               priority: 0.6, changeFrequency: "monthly", lastModified: new Date() },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let industrySlugs: string[] = [];
  try {
    const docs = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "industry"]{ "slug": slug.current }`
    );
    industrySlugs = docs.map((d) => d.slug).filter(Boolean);
  } catch {
    industrySlugs = ["steel", "pharma", "cement", "textile", "hospital"];
  }

  const industryRoutes: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url:             `${SITE}/${slug}`,
    priority:        0.8,
    changeFrequency: "monthly",
    lastModified:    new Date(),
  }));

  return [...STATIC_ROUTES, ...industryRoutes];
}
```

- [ ] **Step 2: Verify sitemap generates**

```bash
curl http://localhost:3000/sitemap.xml
# Expected: valid XML with <urlset> containing all routes
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): sitemap.xml with static + dynamic industry routes"
```

---

## Task 7: Robots

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create `app/robots.ts`**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow:     "/",
      disallow:  "/studio/",
    },
    sitemap: "https://kmprpower.in/sitemap.xml",
  };
}
```

- [ ] **Step 2: Verify**

```bash
curl http://localhost:3000/robots.txt
# Expected:
# User-Agent: *
# Allow: /
# Disallow: /studio/
# Sitemap: https://kmprpower.in/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add app/robots.ts
git commit -m "feat(seo): robots.txt — allow all, disallow /studio"
```

---

## Task 8: Build Verification + Final Push

- [ ] **Step 1: Run production build**

```bash
cd /Users/abhishekpaluri/playground/kmpr-power
pnpm build
# Expected: ✓ Compiled successfully, all 22 pages generate without errors
# Check that /api/og appears as ƒ (Dynamic) in the route table
```

- [ ] **Step 2: Spot-check rendered `<head>` on key pages**

Start the production server: `pnpm start`

```bash
curl -s http://localhost:3000 | grep -E "og:|twitter:|canonical"
# Expected: og:title, og:description, og:image, twitter:card, rel=canonical all present

curl -s http://localhost:3000/steel | grep -E "og:|twitter:|canonical"
# Expected: og:title="Solar PPA for Steel in Andhra Pradesh", og:image contains /api/og?title=...

curl -s http://localhost:3000/sitemap.xml | grep "<loc>"
# Expected: 15+ <loc> entries including /steel, /pharma, /cement

curl -s http://localhost:3000/robots.txt
# Expected: Disallow: /studio/
```

- [ ] **Step 3: Push to main**

```bash
git push origin main
```
