# SEO Optimisation — Design Spec
**Date:** 2026-05-15  
**Approach:** B — Full SEO + Dynamic OG Images  
**Site:** https://kmprpower.in  

---

## 1. Scope

Twelve deliverables across four areas:

| # | Deliverable | File(s) |
|---|---|---|
| 1 | `metadataBase` + default OG/Twitter in root layout | `app/layout.tsx` |
| 2 | Organization + WebSite JSON-LD (root, once) | `app/layout.tsx` |
| 3 | Dynamic OG image API route | `app/api/og/route.tsx` |
| 4 | Home page `metadata` export | `app/(site)/page.tsx` |
| 5 | Per-page OG + Twitter + canonical — 8 static pages | `boot`, `ppa`, `compare`, `how-it-works`, `plant`, `track-record`, `about`, `calculator`, `contact` |
| 6 | `[industry]` `generateMetadata` — OG + Twitter + canonical | `app/(site)/[industry]/page.tsx` |
| 7 | `app/sitemap.ts` | new file |
| 8 | `app/robots.ts` | new file |

---

## 2. Foundation — Root Layout

### 2.1 `metadataBase`
```ts
metadataBase: new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kmprpower.in"
)
```
Required so all relative `/api/og?...` URLs in `openGraph.images` resolve to absolute URLs.  
`NEXT_PUBLIC_SITE_URL` is set in Vercel environment; defaults to production domain.

### 2.2 Default metadata block
```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://kmprpower.in"),
  title: {
    default: "KMPR Power — Open Access Solar for AP Industries",
    template: "%s | KMPR Power",
  },
  description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KMPR Power",
    title: "KMPR Power — Open Access Solar for AP Industries",
    description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "KMPR Power" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KMPRPower",
    title: "KMPR Power — Open Access Solar for AP Industries",
    description: "Rs. 4.30/unit, 25-year fixed tariff. 40 MW Madakasira plant, fully operational.",
    images: ["/api/og"],
  },
};
```
Individual pages override `title`, `description`, `openGraph`, `twitter` — the root block is the fallback.

### 2.3 Organization + WebSite JSON-LD
Injected once in `<body>` of root layout as two `<script type="application/ld+json">` tags.

**Organization:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KMPR Power",
  "url": "https://kmprpower.in",
  "logo": "https://kmprpower.in/api/og",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9880221745",
    "contactType": "sales",
    "areaServed": "IN",
    "availableLanguage": ["English", "Telugu"]
  },
  "sameAs": []
}
```

**WebSite:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KMPR Power",
  "url": "https://kmprpower.in"
}
```

---

## 3. OG Image API Route

### File: `app/api/og/route.tsx`

- Method: `GET`  
- Params: `title` (string), `subtitle` (string, optional), `tag` (string, optional)  
- Returns: `ImageResponse` 1200×630 px, `cache-control: public, max-age=86400`

### Visual design:
```
┌─────────────────────────────────────────────────────────┐
│ bg: #0F2A3F (navy)                                      │
│                                                         │
│  KMPR POWER        ← teal, top-left, 20px bold          │
│  Energizing India  ← white/40, 11px                     │
│                                                         │
│                                                         │
│  {tag}             ← teal pill, 12px uppercase          │
│  {title}           ← white, 52px bold, max 2 lines      │
│  {subtitle}        ← white/65, 20px, max 2 lines        │
│                                                         │
│  Rs. 4.30 / unit · 25 years fixed  ← teal, 16px        │
│                          kmprpower.in ← white/30, 14px  │
└─────────────────────────────────────────────────────────┘
```

- Font: system sans (no remote font fetch — keeps OG route fast)  
- Default (no params): renders the site-wide card with "Open Access Solar for AP Industries" headline  
- Error handling: any exception returns a plain navy `ImageResponse` with the KMPR wordmark only — never a 500

### Usage pattern in per-page metadata:
```ts
const ogUrl = `/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag)}`;
openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] }
twitter:   { images: [ogUrl] }
```

---

## 4. Per-Page Metadata

All pages follow this pattern (values differ per page):

```ts
const SITE = "https://kmprpower.in";

export const metadata: Metadata = {
  title: "<Page title>",
  description: "<Page description>",
  alternates: { canonical: `${SITE}/<path>` },
  openGraph: {
    title: "<Page title>",
    description: "<Page description>",
    url: `${SITE}/<path>`,
    images: [{ url: `/api/og?title=<enc>&tag=<enc>`, width: 1200, height: 630, alt: "<Page title>" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "<Page title>",
    description: "<Page description>",
    images: [`/api/og?title=<enc>&tag=<enc>`],
  },
};
```

### Page-by-page OG params

| Page | `tag` | `title` (OG card, ≤60 chars) |
|---|---|---|
| `/` | Open Access Solar | 40 MW solar at Rs. 4.30/unit in AP |
| `/how-it-works` | How It Works | Open access solar, explained |
| `/ppa` | PPA Model | 26% equity. 25-year fixed tariff. |
| `/boot` | BOOT Model | Own your solar plant in 6 years |
| `/compare` | PPA vs BOOT | Find the right model for your plant |
| `/plant` | Madakasira Plant | 40 MW fully operational in AP |
| `/track-record` | Track Record | Real clients. Real savings. |
| `/about` | About KMPR | Founded by a CA and a Chief Engineer |
| `/calculator` | Savings Calculator | Model 25 years of savings in 60s |
| `/contact` | Get Started | Check your eligibility in 4 hrs |
| `/[industry]` | `{label}` | Solar power for {label} in AP |

### `[industry]` — `generateMetadata`
Extend existing function to include `alternates`, `openGraph`, `twitter` using the fetched `doc.label` and `doc.hero.subheadline`.

---

## 5. Sitemap

### File: `app/sitemap.ts`

Static routes with change frequency and priority:

| Route | Priority | changeFreq |
|---|---|---|
| `/` | 1.0 | weekly |
| `/contact` | 0.9 | monthly |
| `/calculator` | 0.9 | monthly |
| `/ppa` | 0.8 | monthly |
| `/boot` | 0.8 | monthly |
| `/how-it-works` | 0.8 | monthly |
| `/compare` | 0.7 | monthly |
| `/plant` | 0.7 | monthly |
| `/track-record` | 0.7 | monthly |
| `/about` | 0.6 | monthly |
| `/[industry]` slugs | 0.8 each | monthly |

Dynamic industry slugs fetched from Sanity at build time: `*[_type == "industry"]{ "slug": slug.current }`.

---

## 6. Robots

### File: `app/robots.ts`

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio/" },
    sitemap: "https://kmprpower.in/sitemap.xml",
  };
}
```

---

## 7. Implementation Order

1. `app/api/og/route.tsx` — build and test locally first (everything else depends on it)  
2. `app/layout.tsx` — metadataBase + defaults + JSON-LD  
3. Static per-page metadata (9 pages in one pass)  
4. `[industry]` `generateMetadata`  
5. `app/sitemap.ts`  
6. `app/robots.ts`  
7. `pnpm build` — verify no errors, check rendered `<head>` tags  
8. Commit as `"feat: SEO optimisation — OG images, sitemap, structured data"`

---

## 8. Out of Scope

- `BreadcrumbList` JSON-LD per page (Approach C only)  
- `LocalBusiness` schema  
- Core Web Vitals / bundle-size work  
- Google Search Console submission  
- Content changes (titles/descriptions already written above)
