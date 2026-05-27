import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import DetailView from "@/components/detail-view";
import { notFound } from "next/navigation";
import type { Request } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("requests")
    .select("*, profiles(id, name, avatar_url)")
    .eq("id", id)
    .single();

  const request = data as unknown as Request | null;
  if (!request) notFound();
  return <DetailView type="request" item={request} />;
}
