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
