import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProposalData = {
  company:        string;
  district:       string;
  kwhPerMonth:    number;
  currentTariff:  number;
  preferredModel: "PPA" | "BOOT" | "Not sure";
  generatedAt:    string;
};

export type SavingsRow = {
  year:       number;
  discom:     number;
  kmpr:       number;
  saving:     number;
  cumulative: number;
};

// ─── Brand palette ────────────────────────────────────────────────────────────

const C = {
  navy:    "#0F2A3F",
  teal:    "#1ABEC8",
  softBg:  "#EAF7F9",
  muted:   "#55667A",
  text:    "#1F2937",
  white:   "#FFFFFF",
  border:  "#C7EEF1",
  amber:   "#B45309",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const rupeeFmt = (n: number) =>
  "Rs. " + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

const rateFmt = (n: number) => `Rs. ${n.toFixed(2)}/unit`;

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  // Pages
  page:       { backgroundColor: C.white, padding: 40, fontFamily: "Helvetica", fontSize: 10, color: C.text },
  coverPage:  { backgroundColor: C.navy, padding: 0, fontFamily: "Helvetica" },

  // Cover
  coverBand:  { backgroundColor: C.teal, paddingVertical: 6, paddingHorizontal: 40 },
  coverBody:  { flex: 1, paddingHorizontal: 40, paddingTop: 80, paddingBottom: 40 },
  coverLogo:  { fontSize: 28, fontFamily: "Helvetica-Bold", color: C.teal, letterSpacing: 4 },
  coverTagline: { fontSize: 10, color: C.white, opacity: 0.6, marginTop: 4 },
  coverPre:   { fontSize: 12, color: C.white, opacity: 0.7, marginTop: 80 },
  coverName:  { fontSize: 32, fontFamily: "Helvetica-Bold", color: C.white, marginTop: 10, lineHeight: 1.2 },
  coverDate:  { fontSize: 10, color: C.teal, marginTop: 20 },
  coverFoot:  { paddingHorizontal: 40, paddingVertical: 14, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  coverFootTxt: { fontSize: 9, color: "rgba(255,255,255,0.4)" },

  // Shared layout
  header:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: C.border },
  headerLogo: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.teal },
  headerCo:   { fontSize: 9, color: C.muted },
  footer:     { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footerTxt:  { fontSize: 8, color: C.muted },

  // Typography
  sectionLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 },
  h1:          { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.navy, marginBottom: 12 },
  h2:          { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.navy, marginBottom: 8 },
  h3:          { fontSize: 12, fontFamily: "Helvetica-Bold", color: C.navy, marginBottom: 4 },
  body:        { fontSize: 10, color: C.text, lineHeight: 1.6, marginBottom: 8 },
  small:       { fontSize: 9, color: C.muted, lineHeight: 1.5 },

  // Cards / boxes
  statBox:    { backgroundColor: C.softBg, borderRadius: 6, padding: 14, flex: 1, marginRight: 8 },
  statVal:    { fontSize: 20, fontFamily: "Helvetica-Bold", color: C.teal },
  statLabel:  { fontSize: 8, color: C.muted, marginTop: 3 },
  card:       { backgroundColor: C.softBg, borderRadius: 6, padding: 14, marginBottom: 10 },
  navyCard:   { backgroundColor: C.navy, borderRadius: 6, padding: 14, marginBottom: 10 },

  // Table
  tableHead:  { flexDirection: "row", backgroundColor: C.navy, paddingVertical: 7, paddingHorizontal: 8, borderRadius: 4 },
  tableRow:   { flexDirection: "row", paddingVertical: 5, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: C.border },
  tableRowAlt: { flexDirection: "row", paddingVertical: 5, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.softBg },
  tableHeadTxt: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.white },
  tableTxt:   { fontSize: 9, color: C.text },
  tableTxtTeal: { fontSize: 9, color: C.teal, fontFamily: "Helvetica-Bold" },

  // Steps
  step:       { flexDirection: "row", marginBottom: 14 },
  stepNum:    { width: 22, height: 22, borderRadius: 11, backgroundColor: C.teal, marginRight: 12, alignItems: "center", justifyContent: "center" },
  stepNumTxt: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.white },
  stepBody:   { flex: 1, paddingTop: 2 },

  // Misc
  row:        { flexDirection: "row" },
  divider:    { height: 1, backgroundColor: C.border, marginVertical: 12 },
  tealBar:    { width: 4, backgroundColor: C.teal, borderRadius: 2, marginRight: 10 },
  bullet:     { flexDirection: "row", marginBottom: 8 },
  bulletDot:  { width: 6, height: 6, borderRadius: 3, backgroundColor: C.teal, marginTop: 3, marginRight: 8 },
  bulletTxt:  { flex: 1, fontSize: 10, color: C.text, lineHeight: 1.5 },
  specRow:    { flexDirection: "row", paddingVertical: 5, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: C.border },
  specLabel:  { width: "45%", fontSize: 9, color: C.muted },
  specVal:    { flex: 1, fontSize: 9, fontFamily: "Helvetica-Bold", color: C.navy },
  col2:       { flexDirection: "row", marginBottom: 12 },
  col2Left:   { flex: 1, marginRight: 10 },
  col2Right:  { flex: 1 },
});

// ─── Shared header/footer ─────────────────────────────────────────────────────

function PageHeader({ company }: { company: string }) {
  return (
    <View style={S.header} fixed>
      <Text style={S.headerLogo}>KMPR POWER</Text>
      <Text style={S.headerCo}>{company} · Confidential</Text>
    </View>
  );
}

function PageFooter({ page }: { page: string }) {
  return (
    <View style={S.footer} fixed>
      <Text style={S.footerTxt}>KMPR Power · Open Access Solar · Andhra Pradesh</Text>
      <Text style={S.footerTxt}>{page}</Text>
    </View>
  );
}

// ─── Page 1: Cover ───────────────────────────────────────────────────────────

function CoverPage({ data }: { data: ProposalData }) {
  return (
    <Page size="A4" style={S.coverPage}>
      {/* Top accent band */}
      <View style={S.coverBand}>
        <Text style={{ fontSize: 9, color: C.navy, fontFamily: "Helvetica-Bold" }}>
          OPEN ACCESS SOLAR · ANDHRA PRADESH
        </Text>
      </View>

      {/* Body */}
      <View style={S.coverBody}>
        <Text style={S.coverLogo}>KMPR</Text>
        <Text style={S.coverTagline}>Power — Madakasira 40 MW Solar Plant, Anantapur District, AP</Text>

        <Text style={S.coverPre}>Solar Power Proposal for</Text>
        <Text style={S.coverName}>{data.company}</Text>
        <Text style={S.coverDate}>Prepared: {data.generatedAt} · {data.district}, Andhra Pradesh</Text>

        <View style={{ marginTop: 60, backgroundColor: "rgba(26,190,200,0.12)", borderRadius: 8, padding: 20 }}>
          <Text style={{ fontSize: 11, color: C.white, lineHeight: 1.7 }}>
            This proposal is prepared exclusively for {data.company} based on your facility's
            consumption profile. It models your savings under KMPR's PPA and BOOT engagement models
            over a 25-year horizon.
          </Text>
        </View>
      </View>

      <View style={S.coverFoot}>
        <Text style={S.coverFootTxt}>Confidential · Not for distribution · KMPR Power Private Limited · Bengaluru</Text>
      </View>
    </Page>
  );
}

// ─── Page 2: Executive Summary ────────────────────────────────────────────────

function ExecSummaryPage({ data, table }: { data: ProposalData; table: SavingsRow[] }) {
  const total25 = table[table.length - 1].cumulative;
  const monthly = (data.currentTariff - 4.30) * data.kwhPerMonth;
  const annual  = monthly * 12;

  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Executive Summary</Text>
      <Text style={S.h1}>Your 25-year savings opportunity</Text>
      <Text style={S.body}>
        Based on your current tariff of {rateFmt(data.currentTariff)} and monthly consumption of{" "}
        {new Intl.NumberFormat("en-IN").format(data.kwhPerMonth)} kWh, switching to KMPR's open
        access solar at {rateFmt(4.30)} (fixed for 25 years) generates the following savings:
      </Text>

      {/* Stat boxes */}
      <View style={[S.row, { marginBottom: 16 }]}>
        {[
          { label: "Monthly saving",      val: rupeeFmt(monthly) },
          { label: "Annual saving",       val: rupeeFmt(annual) },
          { label: "25-year cumulative",  val: rupeeFmt(total25) },
        ].map((s) => (
          <View key={s.label} style={S.statBox}>
            <Text style={S.statVal}>{s.val}</Text>
            <Text style={S.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Rate comparison */}
      <View style={S.divider} />
      <Text style={S.h2}>Rate comparison</Text>
      <View style={S.col2}>
        <View style={[S.col2Left, { backgroundColor: "#FFF6E0", borderRadius: 6, padding: 14 }]}>
          <Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold", color: C.amber }}>{rateFmt(data.currentTariff)}</Text>
          <Text style={{ fontSize: 8, color: C.amber, marginTop: 3 }}>Current Discom rate</Text>
          <Text style={[S.small, { marginTop: 6 }]}>Subject to ~10%/year regulatory escalation. No long-term certainty.</Text>
        </View>
        <View style={[S.col2Right, { backgroundColor: C.softBg, borderRadius: 6, padding: 14 }]}>
          <Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold", color: C.teal }}>{rateFmt(4.30)}</Text>
          <Text style={{ fontSize: 8, color: C.teal, marginTop: 3 }}>KMPR fixed rate</Text>
          <Text style={[S.small, { marginTop: 6 }]}>Contractually fixed for the full PPA term. Zero escalation risk.</Text>
        </View>
      </View>

      <View style={S.card}>
        <Text style={[S.h3, { color: C.teal }]}>Recommended model: {data.preferredModel === "Not sure" ? "PPA (primary)" : data.preferredModel}</Text>
        <Text style={S.body}>
          {data.preferredModel === "BOOT"
            ? "The BOOT model requires zero upfront investment. KMPR builds and funds the plant entirely. You pay your current electricity bill to KMPR for 6 years, then own the asset outright — followed by 20+ years of near-free power."
            : "The PPA model requires a 26% equity contribution (recovered in 9 months from bill savings). You receive fixed Rs. 4.30/unit solar power for 25 years under a bankable Power Purchase Agreement."}
        </Text>
      </View>
      <PageFooter page="Page 2 of 12" />
    </Page>
  );
}

// ─── Page 3: Open Access Mechanics ───────────────────────────────────────────

function OpenAccessPage({ data }: { data: ProposalData }) {
  const steps = [
    { title: "Generation", body: "KMPR's 40 MW solar plant at Madakasira, Anantapur District, generates power and injects it into the AP state transmission network at utility scale. The plant is fully commissioned and currently operational." },
    { title: "Transmission", body: "Under AP open access regulations (APERC/SLDC), your allocated units travel over the existing APTRANSCO 33 kV grid to your nearest feeder substation. No new infrastructure is required at your end. All SLDC scheduling, banking, and compliance are managed by KMPR." },
    { title: "Delivery", body: `You receive clean solar power at your facility meter at Rs. 4.30/unit — below the ${rateFmt(data.currentTariff)} you currently pay to Discom. The saving starts from day one of supply.` },
  ];

  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>How It Works</Text>
      <Text style={S.h1}>Open access solar — from plant to your meter</Text>
      <Text style={S.body}>
        Open access is a regulatory framework that allows large industrial consumers to purchase
        electricity directly from generators, bypassing the distribution company. KMPR manages
        the full open-access stack so you receive power with zero regulatory overhead.
      </Text>
      <View style={S.divider} />

      {steps.map((s, i) => (
        <View key={i} style={S.step}>
          <View style={S.stepNum}><Text style={S.stepNumTxt}>{i + 1}</Text></View>
          <View style={S.stepBody}>
            <Text style={S.h3}>{s.title}</Text>
            <Text style={S.body}>{s.body}</Text>
          </View>
        </View>
      ))}

      <View style={S.divider} />
      <Text style={[S.h2, { marginBottom: 10 }]}>What KMPR handles for you</Text>
      {["SLDC open access application and renewal", "Monthly scheduling and energy accounting", "Surplus banking and deviation settlement", "Regulatory compliance with APERC/SLDC norms", "Billing reconciliation with your Discom connection"].map((item, i) => (
        <View key={i} style={S.bullet}>
          <View style={S.bulletDot} />
          <Text style={S.bulletTxt}>{item}</Text>
        </View>
      ))}
      <PageFooter page="Page 3 of 12" />
    </Page>
  );
}

// ─── Page 4: Recommended Model ────────────────────────────────────────────────

function RecommendedModelPage({ data }: { data: ProposalData }) {
  const isPPA  = data.preferredModel !== "BOOT";
  const model  = isPPA ? "PPA" : "BOOT";
  const terms  = isPPA
    ? [
        ["Tariff",              "Rs. 4.30/unit at feeder substation (fixed, no escalation)"],
        ["Equity",              "26% of plant capex per MW — one-time, recovered in ~9 months"],
        ["Agreement duration",  "25 years"],
        ["Min commitment",      "2–3 MW per consumer"],
        ["Max per consumer",    "Up to 10 MW"],
        ["KMPR co-investment",  "Available for consumers meeting business surety criteria"],
        ["Plant ownership",     "26% equity stake throughout the 25-year term"],
      ]
    : [
        ["Upfront cost",        "Zero — KMPR funds 100% of plant construction"],
        ["Payment during term", "You pay your current electricity bill to KMPR (instead of Discom)"],
        ["Agreement duration",  "6 years to full ownership transfer"],
        ["Post-transfer cost",  "O&M only — typically Rs. 0.30–0.50/unit"],
        ["Plant ownership",     "Full legal ownership transfers to your entity at Year 6"],
        ["Tax benefits",        "9% GST benefit + 15% accelerated depreciation on commissioning"],
        ["Post-6-year power",   "20+ years of near-free power (O&M cost only)"],
      ];

  const rationale = isPPA
    ? `Based on your current tariff of ${rateFmt(data.currentTariff)}, a PPA at ${rateFmt(4.30)} saves ${rupeeFmt((data.currentTariff - 4.30) * 12 * data.kwhPerMonth)} per year from Year 1. Your 26% equity is recovered within 9 months from bill savings.`
    : `The BOOT model suits ${data.company}'s profile — zero upfront capital, KMPR builds and funds the plant, you pay your current bill to KMPR for 6 years and then own the asset outright. After Year 6: near-free power for 20+ years.`;

  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Recommended Model</Text>
      <Text style={S.h1}>{model} — {isPPA ? "Power Purchase Agreement" : "Build, Own, Operate, Transfer"}</Text>
      <Text style={S.body}>{rationale}</Text>
      <View style={S.divider} />
      <Text style={S.h2}>Key terms</Text>

      {/* Terms table */}
      <View style={S.tableHead}>
        {["Term", "Detail"].map((h) => (
          <Text key={h} style={[S.tableHeadTxt, { flex: h === "Term" ? 0.45 : 1 }]}>{h}</Text>
        ))}
      </View>
      {terms.map(([label, value], i) => (
        <View key={i} style={i % 2 === 0 ? S.tableRow : S.tableRowAlt}>
          <Text style={[S.tableTxt, { flex: 0.45, color: C.muted }]}>{label}</Text>
          <Text style={[S.tableTxt, { flex: 1 }]}>{value}</Text>
        </View>
      ))}

      <View style={[S.card, { marginTop: 16 }]}>
        <Text style={[S.sectionLabel, { marginBottom: 4 }]}>Why this model for {data.company}</Text>
        <Text style={S.body}>
          {isPPA
            ? `With a load of ${new Intl.NumberFormat("en-IN").format(data.kwhPerMonth)} kWh/month in ${data.district}, ${data.company} spends ${rupeeFmt(data.currentTariff * data.kwhPerMonth)} monthly on electricity. The PPA locks ${rateFmt(4.30)} with zero escalation — providing certainty and a bankable asset on your energy cost line.`
            : `The BOOT model converts your current electricity expenditure into an asset-building programme. After 6 years of paying KMPR (instead of Discom), ${data.company} owns the plant outright — turning an opex cost into a permanent infrastructure asset.`}
        </Text>
      </View>
      <PageFooter page="Page 4 of 12" />
    </Page>
  );
}

// ─── Page 5: 25-year Savings Table ───────────────────────────────────────────

function SavingsTablePage({ data, table }: { data: ProposalData; table: SavingsRow[] }) {
  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Financial Projection</Text>
      <Text style={S.h1}>25-year savings — year by year</Text>
      <Text style={[S.small, { marginBottom: 10 }]}>
        Assumes 10%/year Discom escalation. KMPR rate fixed at Rs. 4.30/unit.
        Monthly consumption: {new Intl.NumberFormat("en-IN").format(data.kwhPerMonth)} kWh.
      </Text>

      {/* Table header */}
      <View style={S.tableHead}>
        {[["Year", 0.12], ["Discom ₹/unit", 0.22], ["KMPR ₹/unit", 0.22], ["Annual Saving", 0.24], ["Cumulative", 0.20]].map(([h, w]) => (
          <Text key={String(h)} style={[S.tableHeadTxt, { flex: Number(w) }]}>{h}</Text>
        ))}
      </View>

      {table.map((row, i) => (
        <View key={row.year} style={i % 2 === 0 ? S.tableRow : S.tableRowAlt}>
          <Text style={[S.tableTxt, { flex: 0.12 }]}>{row.year}</Text>
          <Text style={[S.tableTxt, { flex: 0.22, color: C.amber }]}>{row.discom.toFixed(2)}</Text>
          <Text style={[S.tableTxt, { flex: 0.22, color: C.teal }]}>{row.kmpr.toFixed(2)}</Text>
          <Text style={[S.tableTxt, { flex: 0.24 }]}>{rupeeFmt(row.saving)}</Text>
          <Text style={[S.tableTxtTeal, { flex: 0.20 }]}>{rupeeFmt(row.cumulative)}</Text>
        </View>
      ))}

      <PageFooter page="Page 5 of 12" />
    </Page>
  );
}

// ─── Page 6: Alternative Model ────────────────────────────────────────────────

function AlternativeModelPage({ data }: { data: ProposalData }) {
  const altIsPPA = data.preferredModel === "BOOT";
  const alt = altIsPPA ? "PPA" : "BOOT";

  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>For Comparison</Text>
      <Text style={S.h1}>The {alt} model — an alternative to consider</Text>
      <Text style={S.body}>
        While we recommend the {data.preferredModel === "Not sure" ? "PPA" : data.preferredModel} model for {data.company},
        the {alt} model may also be suitable depending on your capital allocation preferences.
      </Text>

      <View style={S.card}>
        <Text style={S.h3}>{alt} — {altIsPPA ? "Power Purchase Agreement" : "Build, Own, Operate, Transfer"}</Text>
        <Text style={S.body}>
          {altIsPPA
            ? "Under the PPA model, you invest 26% of plant capex (recovered in 9 months from bill savings) and receive Rs. 4.30/unit fixed-tariff solar for 25 years. You hold a 26% equity stake in the plant and benefit from 9% GST + 15% accelerated depreciation in Year 1."
            : "Under the BOOT model, KMPR builds and finances 100% of the plant. You pay your current electricity bill to KMPR (instead of Discom) for 6 years. Full legal ownership of the plant — land, panels, inverters — transfers to your entity at Year 6, followed by 20+ years of near-free power."}
        </Text>
      </View>

      <Text style={S.h2}>When to choose the {alt} model</Text>
      {(altIsPPA
        ? ["Your CFO prefers capex over long-term opex commitments", "You want a bankable PPA on your balance sheet for green credentials", "You want 9% GST + 15% accelerated depreciation benefits in Year 1", "You can deploy capital: equity recovered in 9 months from bill savings"]
        : ["Capital is committed elsewhere — zero upfront is the priority", "You want the plant as a balance-sheet asset within 6 years", "Your energy team can manage plant O&M post-transfer", "Long-term opex certainty matters more than near-term depreciation benefit"]
      ).map((item, i) => (
        <View key={i} style={S.bullet}>
          <View style={S.bulletDot} />
          <Text style={S.bulletTxt}>{item}</Text>
        </View>
      ))}

      <Text style={[S.small, { marginTop: 20 }]}>
        Our team can model both options in detail during your feasibility call. Both models deliver
        the same Rs. 4.30/unit tariff — the difference is ownership structure and capital deployment.
      </Text>
      <PageFooter page="Page 6 of 12" />
    </Page>
  );
}

// ─── Page 7: Plant Snapshot ───────────────────────────────────────────────────

function PlantPage({ data }: { data: ProposalData }) {
  const specs = [
    ["Plant type",             "Grid-connected open access solar power plant"],
    ["Location",               "Madakasira, Anantapur District, Andhra Pradesh"],
    ["Operational status",     "Fully commissioned, currently operational"],
    ["Grid connectivity",      "33 kV feeder substation"],
    ["Total capacity",         "40 MW solar + 30 MW wind (multiple consumers)"],
    ["Consumer range",         "2–3 MW minimum per consumer; up to 10 MW"],
    ["Funding",                "Privately funded by Ananta Solar Company (no bank debt)"],
    ["Land bank",              "1,300+ acres secured for 100–200 MW Phase 2 expansion"],
    ["Regulatory management",  "AP SLDC scheduling, banking, compliance — handled by KMPR"],
  ];

  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Our Asset</Text>
      <Text style={S.h1}>Madakasira Solar Plant — 40 MW</Text>
      <Text style={S.body}>
        The Madakasira plant is KMPR's primary generation asset and the source of power for all
        current and future PPA/BOOT consumers. It is privately funded, debt-free, and has been
        operational since commissioning.
      </Text>

      {/* Photo placeholder */}
      <View style={{ height: 140, backgroundColor: C.softBg, borderRadius: 8, marginBottom: 16, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: C.border }}>
        <Text style={{ fontSize: 11, color: C.teal, fontFamily: "Helvetica-Bold" }}>Madakasira 40 MW — Aerial Photography</Text>
        <Text style={[S.small, { marginTop: 4 }]}>Available in the virtual plant tour — see contact page</Text>
      </View>

      {/* Specs */}
      {specs.map(([label, val], i) => (
        <View key={i} style={i % 2 === 0 ? S.specRow : [S.specRow, { backgroundColor: C.softBg }]}>
          <Text style={S.specLabel}>{label}</Text>
          <Text style={S.specVal}>{val}</Text>
        </View>
      ))}
      <PageFooter page="Page 7 of 12" />
    </Page>
  );
}

// ─── Page 8: Founder Credentials ─────────────────────────────────────────────

function FoundersPage({ data }: { data: ProposalData }) {
  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>The Team</Text>
      <Text style={S.h1}>Founder credentials</Text>
      <Text style={S.body}>
        KMPR is founded by two industry veterans with complementary expertise across solar project
        delivery, grid operations, and industrial energy procurement.
      </Text>
      <View style={S.divider} />

      {[
        {
          name: "Mr. PAN Krishna",
          role: "Co-Founder & Director",
          creds: ["Chartered Accountant (CA) by profession", "20+ years in steel manufacturing sector", "Strategic consultant to Hindupur Steels and Alloys Pvt Ltd", "Leads consumer acquisition and commercial negotiations for KMPR", "Deep expertise in project finance, compliance, and business structuring"],
        },
        {
          name: "Mr. Prasad Raju Muppala",
          role: "Co-Founder & Technical Director",
          creds: ["B.Tech Electrical Engineering — NIT Graduate", "31-year career at A.P. State Electricity Board; retired as Chief Engineer", "Promoted own 3 MW solar plant at KGF, Karnataka (operational since March 2017)", "Plant supplies power to Government of Karnataka under long-term contract", "Expert in SLDC grid operations, open access scheduling, and AP power regulatory framework"],
        },
      ].map((f) => (
        <View key={f.name} style={[S.navyCard, { marginBottom: 14 }]}>
          <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", color: C.white }}>{f.name}</Text>
          <Text style={{ fontSize: 9, color: C.teal, marginBottom: 10 }}>{f.role}</Text>
          {f.creds.map((c, i) => (
            <View key={i} style={[S.bullet, { marginBottom: 5 }]}>
              <View style={[S.bulletDot, { backgroundColor: C.teal }]} />
              <Text style={[S.bulletTxt, { color: "rgba(255,255,255,0.8)" }]}>{c}</Text>
            </View>
          ))}
        </View>
      ))}
      <PageFooter page="Page 8 of 12" />
    </Page>
  );
}

// ─── Page 9: Investor ─────────────────────────────────────────────────────────

function InvestorPage({ data }: { data: ProposalData }) {
  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Financial Backing</Text>
      <Text style={S.h1}>Our investor: Ananta Solar Company</Text>
      <Text style={S.body}>
        KMPR Power is not bank-financed. The Madakasira 40 MW plant is backed by Ananta Solar
        Company — a committed private renewable energy investor. This structure provides consumers
        with a well-funded, stable counterparty for their long-term power agreements.
      </Text>

      <View style={S.card}>
        <Text style={S.h3}>Why private funding matters to you</Text>
        {[
          "No bank-covenant risk — no lender covenants can trigger operational restrictions on the plant",
          "Faster decision-making — no bank approval cycles for consumer onboarding or agreement amendments",
          "Long-term alignment — the investor's return is tied to plant performance over 25+ years",
          "Expansion capital committed — Phase 2 (100–200 MW) is backed by the same investor",
        ].map((item, i) => (
          <View key={i} style={S.bullet}>
            <View style={S.bulletDot} />
            <Text style={S.bulletTxt}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={S.divider} />
      <Text style={S.h2}>Expansion pipeline</Text>
      <Text style={S.body}>
        KMPR has secured 1,300+ acres in Andhra Pradesh for a 100–200 MW Phase 2 solar + wind
        expansion. Once the current 40 MW plant reaches full consumer subscription, the Phase 2
        development will commence — giving current consumers priority allocation in the expanded plant.
      </Text>
      <PageFooter page="Page 9 of 12" />
    </Page>
  );
}

// ─── Page 10: Regulatory Advantages ──────────────────────────────────────────

function RegulatoryPage({ data }: { data: ProposalData }) {
  const points = [
    { title: "Zero wheeling charges", body: "AP open access consumers at 33 kV are exempt from wheeling charges, cross-subsidy surcharges, and banking charges — eliminating 3 of the 5 cost components in a typical Discom bill." },
    { title: "SLDC scheduling fully managed", body: "KMPR handles all State Load Dispatch Centre applications, monthly scheduling submissions, deviation accounting, and surplus banking on your behalf. Your energy team has zero additional workload." },
    { title: "Discom backup retained", body: "Open access is additive — your existing Discom connection remains as a backup. Solar from KMPR is consumed first; Discom power fills any shortfall. No infrastructure changes at your end." },
    { title: "Compliance and renewal", body: "KMPR manages annual open access licence renewal, regulatory filings with APERC, and any changes in AP open access regulations — protecting your supply continuity automatically." },
  ];

  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Regulatory Framework</Text>
      <Text style={S.h1}>Key regulatory advantages</Text>
      <Text style={S.body}>
        Andhra Pradesh's open access regulations (APERC framework) create material cost advantages
        for 33 kV industrial consumers. Here's what this means for {data.company}:
      </Text>

      {points.map((p, i) => (
        <View key={i} style={[S.step, { marginBottom: 16 }]}>
          <View style={[S.tealBar, { height: 42 }]} />
          <View style={S.stepBody}>
            <Text style={S.h3}>{p.title}</Text>
            <Text style={S.body}>{p.body}</Text>
          </View>
        </View>
      ))}
      <PageFooter page="Page 10 of 12" />
    </Page>
  );
}

// ─── Page 11: Getting Started ─────────────────────────────────────────────────

function GettingStartedPage({ data }: { data: ProposalData }) {
  const steps = [
    { title: "Feasibility call (30 min)", body: "A 30-minute call with KMPR's Director to validate your load profile, confirm AP eligibility, and align on the preferred model. No commitment required." },
    { title: "Term sheet issue (3 business days)", body: "KMPR issues a draft PPA or BOOT term sheet tailored to your facility. Your legal team reviews and requests any amendments." },
    { title: "SLDC open access application", body: "KMPR files the open access application with AP SLDC on your behalf. Approval typically takes 21–30 days from filing." },
    { title: "Agreement execution", body: "Final PPA or BOOT agreement is executed. KMPR confirms the supply commencement date and metering setup." },
    { title: "First solar unit", body: "Supply commences. Metering reconciliation runs monthly. Your Discom bill is replaced (partially or fully) by KMPR invoicing at Rs. 4.30/unit." },
  ];

  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Next Steps</Text>
      <Text style={S.h1}>How to get started</Text>
      <Text style={S.body}>
        From feasibility call to first solar unit in 60–90 days. Here's the process:
      </Text>

      {steps.map((s, i) => (
        <View key={i} style={S.step}>
          <View style={S.stepNum}><Text style={S.stepNumTxt}>{i + 1}</Text></View>
          <View style={S.stepBody}>
            <Text style={S.h3}>{s.title}</Text>
            <Text style={S.body}>{s.body}</Text>
          </View>
        </View>
      ))}
      <PageFooter page="Page 11 of 12" />
    </Page>
  );
}

// ─── Page 12: Contact ─────────────────────────────────────────────────────────

function ContactPage({ data }: { data: ProposalData }) {
  return (
    <Page size="A4" style={S.page}>
      <PageHeader company={data.company} />
      <Text style={S.sectionLabel}>Contact</Text>
      <Text style={S.h1}>Talk to our Director</Text>
      <Text style={S.body}>
        No sales intermediaries. Your first call is directly with PAN Krishna or Prasad Raju
        Muppala — the founders who will structure your agreement.
      </Text>

      <View style={[S.navyCard, { padding: 24, marginTop: 10 }]}>
        <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 16 }}>
          KMPR Power Private Limited
        </Text>
        {[
          ["Director",    "PAN Krishna — Co-Founder & Director"],
          ["Phone",       "+91 98765 43210"],
          ["Email",       "info@kmprpower.in"],
          ["Website",     "kmprpower.com"],
          ["Office",      "#2112, 9th Main, D Block, Sahakaranagar, Bengaluru 560092"],
          ["Plant",       "Madakasira, Anantapur District, Andhra Pradesh 515581"],
        ].map(([label, val]) => (
          <View key={label} style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ width: 70, fontSize: 9, color: C.teal, fontFamily: "Helvetica-Bold" }}>{label}</Text>
            <Text style={{ flex: 1, fontSize: 9, color: "rgba(255,255,255,0.85)" }}>{val}</Text>
          </View>
        ))}
      </View>

      <View style={[S.card, { marginTop: 14 }]}>
        <Text style={S.h3}>Prepared specifically for {data.company}</Text>
        <Text style={S.body}>
          This proposal is based on {data.district}, Andhra Pradesh facility data and{" "}
          {new Intl.NumberFormat("en-IN").format(data.kwhPerMonth)} kWh/month consumption.
          All figures are indicative pending final load verification and SLDC confirmation.
        </Text>
        <Text style={S.small}>
          KMPR Power Private Limited · CIN pending · Registered: Bengaluru, Karnataka
        </Text>
      </View>

      {/* Bottom band */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: C.teal, paddingVertical: 14, paddingHorizontal: 40 }}>
        <Text style={{ fontSize: 9, color: C.white, fontFamily: "Helvetica-Bold", textAlign: "center" }}>
          KMPR Power · Open Access Solar for AP Industries · kmprpower.com
        </Text>
      </View>
    </Page>
  );
}

// ─── Root document ────────────────────────────────────────────────────────────

export function ProposalDocument({ data, table }: { data: ProposalData; table: SavingsRow[] }) {
  return (
    <Document
      title={`Solar Power Proposal — ${data.company}`}
      author="KMPR Power"
      subject="Open Access Solar Proposal"
      keywords="solar, open access, PPA, BOOT, KMPR, Andhra Pradesh"
    >
      <CoverPage           data={data} />
      <ExecSummaryPage     data={data} table={table} />
      <OpenAccessPage      data={data} />
      <RecommendedModelPage data={data} />
      <SavingsTablePage    data={data} table={table} />
      <AlternativeModelPage data={data} />
      <PlantPage           data={data} />
      <FoundersPage        data={data} />
      <InvestorPage        data={data} />
      <RegulatoryPage      data={data} />
      <GettingStartedPage  data={data} />
      <ContactPage         data={data} />
    </Document>
  );
}
