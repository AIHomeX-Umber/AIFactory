"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import ContactModal from "@/components/contact-modal";
import SignalBadge from "@/components/signal-badge";
import type { Offer, Request, Workflow, ObjectType, ContactMethods } from "@/lib/types";

type Props = {
  type: ObjectType;
  item: Offer | Request | Workflow;
};

const typeConfig: Record<ObjectType, { color: string; label: string; ctaLabel: string; basePath: string }> = {
  offer: { color: "#4ade80", label: "供给", ctaLabel: "建立连接", basePath: "/offers" },
  request: { color: "#60a5fa", label: "需求", ctaLabel: "响应需求", basePath: "/requests" },
  workflow: { color: "#fbbf24", label: "工作流", ctaLabel: "使用 Workflow", basePath: "/workflows" },
};

export default function DetailView({ type, item }: Props) {
  const config = typeConfig[type];
  const [modalOpen, setModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const forkCount = type === "workflow" ? (item as Workflow).fork_count : undefined;
  const contactMethods = item.contact_methods as ContactMethods;

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
      if (data.user) {
        const { data: saveData } = await supabase
          .from("saves")
          .select("id")
          .eq("user_id", data.user.id)
          .eq("object_type", type)
          .eq("object_id", item.id)
          .single();
        setSaved(!!saveData);
      }
    };
    init();
  }, [type, item.id]);

  async function handleSave() {
    if (!userId) { window.location.href = "/login"; return; }
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    if (saved) {
      await supabase.from("saves").delete().eq("user_id", userId).eq("object_type", type).eq("object_id", item.id);
      setSaved(false);
    } else {
      await supabase.from("saves").insert({ user_id: userId, object_type: type, object_id: item.id });
      setSaved(true);
    }
  }

  async function handleFork() {
    if (!userId) { window.location.href = "/login"; return; }
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const w = item as Workflow;
    const { data } = await supabase.from("workflows").insert([{
      title: `${w.title} (Fork)`,
      description: w.description,
      workflow_type: w.workflow_type,
      steps: w.steps,
      tools: w.tools,
      tags: w.tags,
      contact_methods: {},
      created_by: userId,
      status: "draft" as const,
      forked_from: w.id,
    }]).select().single();
    if (data) window.location.href = `/workflows/${(data as unknown as { id: string }).id}`;
  }

  const workflowSteps = type === "workflow" ? ((item as Workflow).steps || []) as Array<{ step: number; content: string }> : [];

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#4b5563] mb-8">
          <Link href={config.basePath} className="hover:text-white transition-colors">{config.label}</Link>
          <span>/</span>
          <span className="text-[#6b7280] truncate max-w-xs">{item.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span
            className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border mb-4"
            style={{ color: config.color, borderColor: `${config.color}33`, background: `${config.color}11` }}
          >
            {config.label}
          </span>
          <h1 className="text-3xl font-bold text-white mb-3">{item.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b7280]">
            {item.profiles?.name && (
              <Link href={`/profile/${item.created_by}`} className="hover:text-white transition-colors">
                {item.profiles.name}
              </Link>
            )}
            <span>{formatDate(item.created_at)}</span>
            <SignalBadge savedCount={item.saved_count} forkCount={forkCount} />
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-6">
          <p className="text-[#d1d5db] leading-relaxed whitespace-pre-wrap">{item.description}</p>
        </div>

        {/* Workflow steps */}
        {type === "workflow" && workflowSteps.length > 0 && (
          <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-6">
            <h3 className="text-sm font-medium text-[#a1a1aa] mb-4">工作流步骤</h3>
            <ol className="space-y-3">
              {workflowSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[10px] text-[#fbbf24] font-mono mt-0.5">
                    {step.step ?? i + 1}
                  </span>
                  <span className="text-[#d1d5db] text-sm">{step.content}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#1f2228] text-[#6b7280]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-lg text-black font-semibold text-sm transition-all"
            style={{ background: config.color }}
          >
            {config.ctaLabel}
          </button>
          <button
            onClick={handleSave}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
              saved
                ? "border-[#4ade80]/40 text-[#4ade80] bg-[#4ade80]/10"
                : "border-[#1f2228] text-[#6b7280] hover:text-white hover:border-[#374151]"
            }`}
          >
            {saved ? "已收藏" : "收藏"}
          </button>
          {type === "workflow" && (
            <button
              onClick={handleFork}
              className="px-5 py-2.5 rounded-lg text-sm font-medium border border-[#1f2228] text-[#6b7280] hover:text-white hover:border-[#374151] transition-colors"
            >
              Fork
            </button>
          )}
        </div>
      </div>

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        methods={contactMethods}
        objectType={type}
        objectId={item.id}
      />
    </>
  );
}
