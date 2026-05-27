import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import DetailView from "@/components/detail-view";
import { notFound } from "next/navigation";
import type { Workflow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("workflows")
    .select("*, profiles(id, name, avatar_url)")
    .eq("id", id)
    .single();

  const workflow = data as unknown as Workflow | null;
  if (!workflow) notFound();
  return <DetailView type="workflow" item={workflow} />;
}
