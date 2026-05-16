// app/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kmprpower.com";

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
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
