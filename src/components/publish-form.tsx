"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactMethods, ObjectType } from "@/lib/types";

type Props = {
  type: ObjectType;
};

const placeholders: Record<ObjectType, { title: string; description: string }> = {
  offer: {
    title: "例：美国现货壁床资源，寻找 Walmart 渠道合作",
    description: "描述你的供给内容、优势、合作方式，以及你在寻找什么样的合作方……",
  },
  request: {
    title: "例：寻找 TikTok Shop 家具类目运营服务",
    description: "描述你的需求背景、规模、预算范围，以及你期待合作方具备什么能力……",
  },
  workflow: {
    title: "例：Amazon Listing 自动生成工作流",
    description: "描述这个工作流的用途、核心步骤、使用的工具或模型，以及适用场景……",
  },
};

const typeLabels: Record<ObjectType, string> = {
  offer: "供给",
  request: "需求",
  workflow: "工作流",
};

const contactKeys: (keyof ContactMethods)[] = ["wechat", "whatsapp", "email", "telegram", "x"];
const contactPlaceholders: Record<keyof ContactMethods, string> = {
  wechat: "微信号",
  whatsapp: "+1234567890",
  email: "you@example.com",
  telegram: "@username",
  x: "@handle",
};

export default function PublishForm({ type }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactMethods>({});
  const [workflowType, setWorkflowType] = useState("");
  const [steps, setSteps] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const val = tagInput.trim().replace(/,$/, "");
      if (val && !tags.includes(val)) setTags([...tags, val]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const hasContact = Object.values(contact).some((v) => v && v.trim() !== "");
    if (!hasContact) {
      setError("请至少填写一种联系方式。");
      return;
    }

    setSubmitting(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const base = {
      title,
      description,
      tags,
      contact_methods: contact,
      created_by: user.id,
      status: "published" as const,
    };

    let result;
    if (type === "offer") {
      result = await supabase.from("offers").insert([base]).select().single();
    } else if (type === "request") {
      result = await supabase.from("requests").insert([base]).select().single();
    } else {
      result = await supabase.from("workflows").insert([{
        ...base,
        workflow_type: workflowType || null,
        steps: steps ? steps.split("\n").filter(Boolean).map((s, i) => ({ step: i + 1, content: s })) : [],
      }]).select().single();
    }

    setSubmitting(false);
    if (result?.error) {
      setError(result.error.message);
      return;
    }
    if (result?.data) {
      const data = result.data as unknown as { id: string };
      router.push(`/${type === "offer" ? "offers" : type === "request" ? "requests" : "workflows"}/${data.id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-[#a1a1aa] mb-2">
          标题 <span className="text-[#4ade80]">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholders[type].title}
          required
          className="w-full rounded-lg border border-[#1f2228] bg-[#111318] px-4 py-3 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-[#a1a1aa] mb-2">
          描述 <span className="text-[#4ade80]">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={placeholders[type].description}
          required
          rows={6}
          className="w-full rounded-lg border border-[#1f2228] bg-[#111318] px-4 py-3 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
        />
      </div>

      {/* Workflow extras */}
      {type === "workflow" && (
        <>
          <div>
            <label className="block text-sm font-medium text-[#a1a1aa] mb-2">工作流类型（可选）</label>
            <input
              type="text"
              value={workflowType}
              onChange={(e) => setWorkflowType(e.target.value)}
              placeholder="例：Listing 生成 / 客服自动化 / 数据分析"
              className="w-full rounded-lg border border-[#1f2228] bg-[#111318] px-4 py-3 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#a1a1aa] mb-2">步骤（可选，每行一步）</label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder={"1. 收集产品信息\n2. 调用 GPT-4 生成标题\n3. 人工校对并发布"}
              rows={4}
              className="w-full rounded-lg border border-[#1f2228] bg-[#111318] px-4 py-3 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#fbbf24] transition-colors resize-none font-mono"
            />
          </div>
        </>
      )}

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-[#a1a1aa] mb-2">标签（可选，回车或逗号分隔）</label>
        <div className="rounded-lg border border-[#1f2228] bg-[#111318] px-3 py-2 flex flex-wrap gap-2 focus-within:border-[#4ade80] transition-colors min-h-[44px]">
          {tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-xs bg-[#1f2228] text-[#a1a1aa] px-2 py-0.5 rounded-full">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="text-[#4b5563] hover:text-white ml-0.5">×</button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder={tags.length === 0 ? "跨境电商 · TikTok · 家居" : ""}
            className="flex-1 min-w-[80px] bg-transparent text-white placeholder-[#4b5563] text-sm outline-none"
          />
        </div>
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-[#a1a1aa] mb-2">
          联系方式 <span className="text-[#4ade80]">*</span>
          <span className="text-[#4b5563] font-normal ml-1">（至少填写一种）</span>
        </label>
        <div className="space-y-2.5">
          {contactKeys.map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-[#6b7280] w-20 shrink-0">{key === "x" ? "X (Twitter)" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <input
                type="text"
                value={contact[key] ?? ""}
                onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                placeholder={contactPlaceholders[key]}
                className="flex-1 rounded-lg border border-[#1f2228] bg-[#111318] px-3 py-2 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !title || !description}
        className="w-full py-3 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? "发布中…" : `发布${typeLabels[type]}`}
      </button>
    </form>
  );
}
