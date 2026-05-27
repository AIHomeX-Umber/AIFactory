import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import DetailView from "@/components/detail-view";
import { notFound } from "next/navigation";
import type { Offer } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("offers")
    .select("*, profiles(id, name, avatar_url)")
    .eq("id", id)
    .single();

  const offer = data as unknown as Offer | null;
  if (!offer) notFound();
  return <DetailView type="offer" item={offer} />;
}
