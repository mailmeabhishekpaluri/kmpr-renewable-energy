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

  // ── Extra case studies for verticals ────────────────────────────────────────
  const extraCaseStudies = [
    {
      _id: "case-study-strides-pharma",
      _type: "caseStudy",
      clientName: "Strides Pharma Group",
      sector: "Pharmaceuticals",
      location: "Karnataka",
      status: "Active",
      summary: "Strides Pharma adopted open access solar under technical leadership of Mr. Prasad Raju Muppala, reducing energy costs across their API manufacturing facilities.",
      isPublic: true,
    },
    {
      _id: "case-study-orient-cement",
      _type: "caseStudy",
      clientName: "Orient Cement",
      sector: "Cement Manufacturing",
      location: "Andhra Pradesh",
      status: "Active",
      summary: "Orient Cement's Andhra Pradesh grinding unit moved to open access renewables, cutting per-unit cost by over 40% and eliminating Discom escalation risk.",
      isPublic: true,
    },
  ];

  for (const doc of extraCaseStudies) {
    await client.createOrReplace(doc);
    console.log(`✓  Case Study: ${doc.clientName}`);
  }

  // ── Industry verticals ───────────────────────────────────────────────────────
  const industries = [
    {
      _id: "industry-steel",
      _type: "industry",
      label: "Steel",
      slug: { _type: "slug", current: "steel" },
      hero: {
        headline: "Solar power for steel in Andhra Pradesh.",
        subheadline:
          "Rolling mills, furnaces, and EAFs run on round-the-clock power. KMPR delivers 33 kV solar directly to your substation at Rs. 4.30/unit — fixed for 25 years.",
      },
      headlineStat:
        "Average AP steel plant saves Rs. 3–5 crore per year switching from Discom to KMPR open access solar.",
      featuredCaseStudy: { _type: "reference", _ref: "case-study-hindupur-steels" },
      faq: [
        {
          _key: "steel-faq-1",
          question: "Will solar work for my 24/7 furnace load?",
          answer:
            "Yes. Open access solar provides a base-load allocation during daylight hours. Any shortfall (night load, overcast periods) is automatically served by your existing Discom connection — with no manual switching. Your plant runs uninterrupted.",
        },
        {
          _key: "steel-faq-2",
          question: "How does KMPR handle my 33 kV substation connection?",
          answer:
            "We inject power directly at your 33 kV feeder substation. No change to your internal HT distribution is required. KMPR handles the SLDC open access application and all scheduling — your energy manager has zero additional workload.",
        },
        {
          _key: "steel-faq-3",
          question: "Can I get open access if my load fluctuates between 2 MW and 5 MW?",
          answer:
            "Yes. Open access allocation is set at your average contracted load. SLDC banking provisions allow surplus to be banked and drawn later — smoothing out load variability without additional cost.",
        },
      ],
    },
    {
      _id: "industry-pharma",
      _type: "industry",
      label: "Pharmaceuticals",
      slug: { _type: "slug", current: "pharma" },
      hero: {
        headline: "Solar power for pharmaceuticals in Andhra Pradesh.",
        subheadline:
          "GMP manufacturing demands uninterrupted, quality power. KMPR's 33 kV open access supply eliminates voltage fluctuations and locks your energy cost — no Discom surprises.",
      },
      headlineStat:
        "AP pharma plants paying Rs. 7–9/unit to Discom save Rs. 2–3 crore annually at KMPR's Rs. 4.30/unit — without touching their existing grid backup.",
      featuredCaseStudy: { _type: "reference", _ref: "case-study-strides-pharma" },
      faq: [
        {
          _key: "pharma-faq-1",
          question: "Will open access solar affect our GMP compliance?",
          answer:
            "No. Open access is a billing and sourcing arrangement — it does not affect your internal electrical infrastructure or power quality at the point of use. Your existing UPS, voltage stabilisers, and DG sets continue to operate as before.",
        },
        {
          _key: "pharma-faq-2",
          question: "What happens during a grid outage?",
          answer:
            "Your Discom connection is retained as a backup and activates automatically during outages. KMPR power and Discom backup coexist — there is no manual switching involved.",
        },
        {
          _key: "pharma-faq-3",
          question: "Is the 33 kV supply suitable for our cleanroom HVAC load?",
          answer:
            "Yes. HVAC and utility loads are among the best matches for open access solar — they are large, predictable, and run during business hours when solar generation is highest.",
        },
      ],
    },
    {
      _id: "industry-cement",
      _type: "industry",
      label: "Cement",
      slug: { _type: "slug", current: "cement" },
      hero: {
        headline: "Solar power for cement plants in Andhra Pradesh.",
        subheadline:
          "Grinding units and clinker kilns are AP's highest per-unit energy consumers. Open access solar from KMPR cuts your energy cost by 40%+ and eliminates Discom escalation forever.",
      },
      headlineStat:
        "A 10 MW cement grinding unit pays Rs. 80–90 lakh monthly to Discom. KMPR reduces that by Rs. 35–40 lakh — from day one.",
      featuredCaseStudy: { _type: "reference", _ref: "case-study-orient-cement" },
      faq: [
        {
          _key: "cement-faq-1",
          question: "Can we use open access for our VRM and ball mill loads?",
          answer:
            "Yes. Vertical roller mills and ball mills are continuous, high-load consumers — ideal for base-load open access solar allocation. KMPR sizes the supply to match your grinding unit's contracted demand.",
        },
        {
          _key: "cement-faq-2",
          question: "How does KMPR handle kiln outages when demand drops suddenly?",
          answer:
            "SLDC banking provisions allow unused units to be banked and drawn during high-demand periods. KMPR's scheduling team manages this on your behalf — no manual intervention required.",
        },
        {
          _key: "cement-faq-3",
          question: "Is the cross-subsidy surcharge applicable to cement plants?",
          answer:
            "Consumers connected at 33 kV in Andhra Pradesh under open access are exempt from cross-subsidy surcharge under current APERC regulations — one of the largest cost-reduction levers for cement manufacturers.",
        },
      ],
    },
    {
      _id: "industry-textile",
      _type: "industry",
      label: "Textiles",
      slug: { _type: "slug", current: "textile" },
      hero: {
        headline: "Solar power for textile mills in Andhra Pradesh.",
        subheadline:
          "Spinning, weaving, and processing lines run continuously. KMPR delivers clean, fixed-price solar to your facility — reducing your cost per metre of fabric, permanently.",
      },
      headlineStat:
        "AP textile mills on KMPR open access solar report 35–45% reduction in per-unit electricity cost compared to Discom supply.",
      featuredCaseStudy: { _type: "reference", _ref: "case-study-hindupur-steels" },
      faq: [
        {
          _key: "textile-faq-1",
          question: "Our spinning lines run three shifts — does solar cover night production?",
          answer:
            "Open access solar covers your daytime load (typically 60–70% of 24-hour consumption). Night production is served by your retained Discom connection. The net saving is still 35–45% of your total bill.",
        },
        {
          _key: "textile-faq-2",
          question: "We have multiple spinning and weaving sheds — can each shed be on open access?",
          answer:
            "Open access is applied at the HT connection point (33 kV incoming). All loads behind that connection — spinning, weaving, utilities — benefit from the lower tariff automatically.",
        },
        {
          _key: "textile-faq-3",
          question: "Can we start with 2 MW and expand later?",
          answer:
            "Yes. KMPR's PPA starts at 2–3 MW per consumer. Expansion up to 10 MW is possible within the same agreement — subject to plant availability and load verification.",
        },
      ],
    },
    {
      _id: "industry-hospital",
      _type: "industry",
      label: "Hospitals",
      slug: { _type: "slug", current: "hospital" },
      hero: {
        headline: "Solar power for hospital groups in Andhra Pradesh.",
        subheadline:
          "Hospitals cannot afford outages or escalating energy bills. KMPR provides fixed-rate 33 kV solar supply while keeping your grid backup fully intact — zero operational disruption.",
      },
      headlineStat:
        "A 200-bed hospital group in AP with 2–3 MW load saves Rs. 60–90 lakh annually on energy with KMPR open access solar.",
      featuredCaseStudy: { _type: "reference", _ref: "case-study-hindupur-steels" },
      faq: [
        {
          _key: "hospital-faq-1",
          question: "Will open access affect our critical care power supply?",
          answer:
            "No. Open access is a supply-side arrangement at the 33 kV incoming. Your internal distribution, UPS systems, critical care panels, and DG sets are unaffected. Patient safety infrastructure is unchanged.",
        },
        {
          _key: "hospital-faq-2",
          question: "Can a hospital group with multiple facilities get a single PPA?",
          answer:
            "Yes. KMPR can structure a multi-facility PPA that covers 2–5 hospital campuses under a single agreement — provided each facility is in Andhra Pradesh and individually connected at 33 kV.",
        },
        {
          _key: "hospital-faq-3",
          question: "Is open access solar eligible for hospital trusts and charitable organisations?",
          answer:
            "Yes — both private hospital companies and trust-owned hospitals can enter open access PPAs in AP, subject to APERC eligibility criteria. KMPR will confirm eligibility during the feasibility review.",
        },
      ],
    },
  ];

  for (const doc of industries) {
    await client.createOrReplace(doc);
    console.log(`✓  Industry: ${doc.label}`);
  }

  console.log("\n✅  Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
