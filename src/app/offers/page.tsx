import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import ObjectCard from "@/components/object-card";
import Link from "next/link";
import type { Metadata } from "next";
import type { Offer } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "供给市场 — 产品 · 资源 · 合作机会 | FactoryRouter",
  description:
    "浏览中国工厂发布的产品、资源和合作机会。找到适合你渠道的差异化货源，直连工厂供应端。",
  alternates: {
    canonical: "https://factoryrouter.com/offers",
  },
};

export default async function OffersPage() {
  let offers: Offer[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("offers")
        .select("*, profiles(id, name, avatar_url)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(50);
      offers = (data ?? []) as unknown as Offer[];
    } catch {
      // Supabase not configured or query failed
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">供给</h1>
          <p className="text-sm text-[#6b7280]">浏览产品、资源与合作机会</p>
        </div>
        <Link
          href="/offers/new"
          className="px-4 py-2 rounded-lg bg-[#4ade80] text-black text-sm font-semibold hover:bg-[#22c55e] transition-colors"
        >
          发布供给
        </Link>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-24 text-[#4b5563]">
          <p className="text-lg mb-4">还没有供给</p>
          <Link href="/offers/new" className="text-[#4ade80] hover:underline text-sm">成为第一个发布的人 →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <ObjectCard key={offer.id} type="offer" item={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
