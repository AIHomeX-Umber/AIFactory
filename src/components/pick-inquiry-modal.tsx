"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Pick } from "@/lib/picks";

type Props = {
  open: boolean;
  onClose: () => void;
  pick: Pick;
};

type FormState = "idle" | "submitting" | "done";

export default function PickInquiryModal({ open, onClose, pick }: Props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setName("");
        setContact("");
        setNote("");
        setState("idle");
      }, 300);
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    // Simulated submission — no backend this phase
    setTimeout(() => setState("done"), 800);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-2xl border border-[#1f2228] bg-[#111318] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-base">
                {state === "done" ? "已收到，感谢！" : "获取报价 / 联系拿样"}
              </h2>
              <button
                onClick={onClose}
                className="text-[#4b5563] hover:text-white transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            {state === "done" ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✓</div>
                <p className="text-[#4ade80] font-semibold mb-2">留资成功</p>
                <p className="text-[#6b7280] text-sm">
                  我们通常在 1 个工作日内通过微信/手机联系您。
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-4 py-2 rounded-lg border border-[#1f2228] text-[#a1a1aa] text-sm hover:text-white transition-colors"
                >
                  关闭
                </button>
              </div>
            ) : (
              <>
                {/* Product info */}
                <div className="mb-4 px-3 py-2.5 rounded-lg bg-[#0d1014] border border-[#1f2228]">
                  <p className="text-[#6b7280] text-[11px] mb-0.5">咨询产品</p>
                  <p className="text-white text-[13px] font-medium">{pick.title}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[#6b7280] text-[12px] mb-1">
                      您的姓名 <span className="text-[#f87171]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="张三"
                      className="w-full px-3 py-2 rounded-lg bg-[#0d1014] border border-[#1f2228] text-white text-sm placeholder:text-[#374151] focus:outline-none focus:border-[#4ade80]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6b7280] text-[12px] mb-1">
                      微信 / 手机 <span className="text-[#f87171]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="微信号或手机号"
                      className="w-full px-3 py-2 rounded-lg bg-[#0d1014] border border-[#1f2228] text-white text-sm placeholder:text-[#374151] focus:outline-none focus:border-[#4ade80]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6b7280] text-[12px] mb-1">
                      补充说明（可选）
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="数量需求、目标市场、其他问题…"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-[#0d1014] border border-[#1f2228] text-white text-sm placeholder:text-[#374151] focus:outline-none focus:border-[#4ade80]/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="mt-1 py-2.5 rounded-lg bg-[#4ade80] text-black text-sm font-semibold hover:bg-[#22c55e] transition-colors disabled:opacity-60"
                  >
                    {state === "submitting" ? "提交中…" : "提交留资"}
                  </button>
                </form>

                <p className="mt-3 text-center text-[#4b5563] text-[11px]">
                  通常 1 个工作日内回复 · 信息仅用于联系您
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
