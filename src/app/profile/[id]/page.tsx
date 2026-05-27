import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import ObjectCard from "@/components/object-card";
import { notFound } from "next/navigation";
import type { Offer, Request, Workflow, Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();

  const supabase = await createClient();

  const [profileRes, offersRes, requestsRes, workflowsRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).single(),
    supabase.from("offers").select("*, profiles(id, name, avatar_url)").eq("created_by", id).eq("status", "published").order("created_at", { ascending: false }),
    supabase.from("requests").select("*, profiles(id, name, avatar_url)").eq("created_by", id).eq("status", "published").order("created_at", { ascending: false }),
    supabase.from("workflows").select("*, profiles(id, name, avatar_url)").eq("created_by", id).eq("status", "published").order("created_at", { ascending: false }),
  ]);

  const profile = profileRes.data as Profile | null;
  if (!profile) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-start gap-5 mb-12">
        <div className="w-14 h-14 rounded-full bg-[#1f2228] flex items-center justify-center text-xl font-semibold text-white shrink-0 overflow-hidden">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt={profile.name ?? ""} className="w-full h-full object-cover" />
          ) : (
            (profile.name?.[0] ?? "?").toUpperCase()
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{profile.name || "匿名用户"}</h1>
          {profile.bio && <p className="text-sm text-[#6b7280] max-w-lg">{profile.bio}</p>}
        </div>
      </div>

      {offersRes.data && offersRes.data.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-medium text-[#a1a1aa] mb-4">供给 ({offersRes.data.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offersRes.data.map((item) => <ObjectCard key={item.id} type="offer" item={item as unknown as Offer} />)}
          </div>
        </section>
      )}

      {requestsRes.data && requestsRes.data.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-medium text-[#a1a1aa] mb-4">需求 ({requestsRes.data.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requestsRes.data.map((item) => <ObjectCard key={item.id} type="request" item={item as unknown as Request} />)}
          </div>
        </section>
      )}

      {workflowsRes.data && workflowsRes.data.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-medium text-[#a1a1aa] mb-4">工作流 ({workflowsRes.data.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workflowsRes.data.map((item) => <ObjectCard key={item.id} type="workflow" item={item as unknown as Workflow} />)}
          </div>
        </section>
      )}

      {!offersRes.data?.length && !requestsRes.data?.length && !workflowsRes.data?.length && (
        <p className="text-[#4b5563] text-center py-16">该用户还没有发布任何内容。</p>
      )}
    </div>
  );
}
