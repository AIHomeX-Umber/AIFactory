import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import ObjectCard from "@/components/object-card";
import Link from "next/link";
import type { Workflow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function WorkflowsPage() {
  let workflows: Workflow[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("workflows")
        .select("*, profiles(id, name, avatar_url)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(50);
      workflows = (data ?? []) as unknown as Workflow[];
    } catch {
      // Supabase not configured or query failed
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">工作流</h1>
          <p className="text-sm text-[#6b7280]">浏览与分享 AI 自动化工作流</p>
        </div>
        <Link
          href="/workflows/new"
          className="px-4 py-2 rounded-lg bg-[#fbbf24] text-black text-sm font-semibold hover:bg-[#f59e0b] transition-colors"
        >
          发布工作流
        </Link>
      </div>

      {workflows.length === 0 ? (
        <div className="text-center py-24 text-[#4b5563]">
          <p className="text-lg mb-4">还没有工作流</p>
          <Link href="/workflows/new" className="text-[#fbbf24] hover:underline text-sm">发布第一个工作流 →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((wf) => (
            <ObjectCard key={wf.id} type="workflow" item={wf} />
          ))}
        </div>
      )}
    </div>
  );
}
