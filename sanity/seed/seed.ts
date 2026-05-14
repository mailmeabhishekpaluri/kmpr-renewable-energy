/**
 * Seed script — populates the Sanity dataset with known KMPR Power data.
 *
 * Prerequisites:
 *   1. Create a project at sanity.io and note the Project ID.
 *   2. Generate a write-capable API token at sanity.io → API → Tokens.
 *   3. Copy .env.local.example → .env.local and fill in the values.
 *
 * Run:
 *   pnpm tsx sanity/seed/seed.ts
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "kmpr",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production",
  apiVersion: "2024-01-01",
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

async function seed() {
  console.log("🌱  Seeding KMPR Power dataset...\n");

  // ── Leadership ──────────────────────────────────────────────────────────────
  const leaders = [
    {
      _id: "leadership-pan-krishna",
      _type: "leadership",
      name: "PAN Krishna",
      role: "Founder & Managing Director",
      credentialsBullets: [
        "Chartered Accountant (CA)",
        "20+ years in steel industry operations and finance",
        "Consultant, Hindupur Steels — led cost reduction through open-access solar adoption",
      ],
    },
    {
      _id: "leadership-prasad-raju-muppala",
      _type: "leadership",
      name: "Prasad Raju Muppala",
      role: "Director — Projects & Engineering",
      credentialsBullets: [
        "B.Tech, NIT (National Institute of Technology)",
        "31 years with APSEB (Andhra Pradesh State Electricity Board) — retired as Chief Engineer",
        "Operating 3 MW KGF solar plant since March 2017",
      ],
    },
  ];

  for (const doc of leaders) {
    await client.createOrReplace(doc);
    console.log(`✓  Leadership: ${doc.name}`);
  }

  // ── Case Studies ─────────────────────────────────────────────────────────────
  const caseStudies = [
    {
      _id: "case-study-hindupur-steels",
      _type: "caseStudy",
      clientName: "Hindupur Steels and Alloys",
      sector: "Steel",
      location: "Hindupur, Andhra Pradesh",
      status: "Active",
      summary:
        "Hindupur Steels switched to KMPR Power open-access solar under a PPA arrangement, replacing high-cost DISCOM supply for their rolling mill operations.",
      isPublic: true,
    },
    {
      _id: "case-study-kuber-steel",
      _type: "caseStudy",
      clientName: "Kuber Steel",
      sector: "Steel",
      location: "Andhra Pradesh",
      status: "Active",
      summary:
        "Kuber Steel engaged KMPR Power for open-access solar supply, reducing their per-unit cost and achieving predictable energy expenditure under a long-term tariff.",
      isPublic: true,
    },
  ];

  for (const doc of caseStudies) {
    await client.createOrReplace(doc);
    console.log(`✓  Case Study: ${doc.clientName}`);
  }

  // ── Site Settings (singleton) ────────────────────────────────────────────────
  const siteSettings = {
    _id: "singleton-site-settings",
    _type: "siteSettings",
    phoneNumbers: ["+91-9880221745", "+91-8499891118"],
    emails: ["info@kmprpower.in"],
    whatsappNumber: "+91-9880221745",
    slotsFilled: 3,
    slotsTotal: 7,
    plantSinceISO: "2024-01-01",
  };

  await client.createOrReplace(siteSettings);
  console.log(`✓  Site Settings`);

  console.log("\n✅  Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
