import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import ObjectCard from "@/components/object-card";
import Link from "next/link";
import type { Request } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  let requests: Request[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("requests")
        .select("*, profiles(id, name, avatar_url)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(50);
      requests = (data ?? []) as unknown as Request[];
    } catch {
      // Supabase not configured or query failed
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">需求</h1>
          <p className="text-sm text-[#6b7280]">浏览采购、合作与外包需求</p>
        </div>
        <Link
          href="/requests/new"
          className="px-4 py-2 rounded-lg bg-[#60a5fa] text-black text-sm font-semibold hover:bg-[#3b82f6] transition-colors"
        >
          发布需求
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-24 text-[#4b5563]">
          <p className="text-lg mb-4">还没有需求</p>
          <Link href="/requests/new" className="text-[#60a5fa] hover:underline text-sm">发布第一个需求 →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <ObjectCard key={req.id} type="request" item={req} />
          ))}
        </div>
      )}
    </div>
  );
}
