"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const inputCls =
  "w-full rounded-lg border border-[#1f2228] bg-[#111318] px-3 py-2 text-white placeholder-[#374151] text-sm focus:outline-none focus:border-[#4ade80] transition-colors";
const textareaCls = `${inputCls} resize-none`;

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#6b7280] mb-1.5">
        {label}{" "}
        {required && <span className="text-[#4ade80]">*</span>}
        {hint && <span className="text-[#374151] font-normal ml-1">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}

export default function JoinModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    contact: "",
    current_focus: "",
    strengths: "",
    why_join: "",
    referral: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: err } = await supabase.from("join_applications").insert([form]);
      if (err) throw err;
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失败，请重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1f2228] bg-[#0d0e11] shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-[#0d0e11] border-b border-[#1f2228] px-6 py-5 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span className="text-[10px] font-mono text-[#4ade80] tracking-widest uppercase">
                FactoryRouter Network
              </span>
            </div>
            <h2 className="text-white font-bold text-xl">Apply to Join</h2>
            <p className="text-[#6b7280] text-sm mt-1">
              Early curated network for serious operators.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#4b5563] hover:text-white transition-colors mt-1 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Success */}
        {submitted ? (
          <div className="px-6 py-14 text-center">
            <div className="w-10 h-10 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#4ade80] text-base">✓</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">申请已收到</h3>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs mx-auto">
              我们会认真审核每一份申请。
              <br />
              通过后会通过你填写的联系方式联系你。
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 rounded-lg border border-[#1f2228] text-[#6b7280] hover:text-white text-sm transition-colors"
            >
              关闭
            </button>
          </div>
        ) : (

          /* Form */
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <p className="text-xs text-[#4b5563] leading-relaxed border-l-2 border-[#1f2228] pl-3 py-1">
              FactoryRouter 优先连接制造业团队、渠道方、AI-native operators
              和长期主义创业者。
              <br />
              请认真介绍你的生意和团队。我们不接受广告和低质量供应商。
            </p>

            <Field label="Name" required>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="你的名字"
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Company / Team">
                <input
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="公司或团队名"
                  className={inputCls}
                />
              </Field>
              <Field label="Role">
                <input
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  placeholder="你的角色"
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="联系方式" required hint="微信 / 邮箱 / LinkedIn 任选一">
              <input
                required
                value={form.contact}
                onChange={(e) => set("contact", e.target.value)}
                placeholder="wechat ID / email / linkedin"
                className={inputCls}
              />
            </Field>

            <Field label="你正在做什么？" required>
              <textarea
                required
                rows={3}
                value={form.current_focus}
                onChange={(e) => set("current_focus", e.target.value)}
                placeholder="介绍你的生意、产品或当前项目……"
                className={textareaCls}
              />
            </Field>

            <Field label="你最擅长什么？" required>
              <textarea
                required
                rows={2}
                value={form.strengths}
                onChange={(e) => set("strengths", e.target.value)}
                placeholder="你的核心能力、团队优势……"
                className={textareaCls}
              />
            </Field>

            <Field label="为什么想加入 FactoryRouter？" required>
              <textarea
                required
                rows={2}
                value={form.why_join}
                onChange={(e) => set("why_join", e.target.value)}
                placeholder="你希望在这里找到什么，解决什么问题……"
                className={textareaCls}
              />
            </Field>

            <Field label="谁邀请你？" hint="邀请码或介绍人（可选）">
              <input
                value={form.referral}
                onChange={(e) => set("referral", e.target.value)}
                placeholder="邀请码 / 介绍人名字"
                className={inputCls}
              />
            </Field>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors disabled:opacity-40"
            >
              {submitting ? "提交中…" : "申请加入网络"}
            </button>

            <p className="text-center text-[10px] text-[#374151] pb-1">
              每一份申请会被认真审核 · 不接受广告和低质量信息
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
