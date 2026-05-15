import { unstable_cache } from "next/cache";
import { sanityClient } from "@/lib/sanity";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/superpowers/WhatsAppCTA";

// Fetch slot data with 5-minute ISR — editors update Sanity, reflects within 300 s
const getSlotData = unstable_cache(
  async () => {
    try {
      const data = await sanityClient.fetch<{ slotsFilled?: number; slotsTotal?: number }>(
        `*[_type == "siteSettings"][0]{ slotsFilled, slotsTotal }`
      );
      return {
        filled: data?.slotsFilled ?? 3,
        total:  data?.slotsTotal  ?? 7,
      };
    } catch {
      return { filled: 3, total: 7 };
    }
  },
  ["kmpr-slot-data"],
  { revalidate: 300 }
);

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { filled, total } = await getSlotData();

  return (
    <>
      <Header slotsFilled={filled} slotsTotal={total} />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
