"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactLabel, contactHref } from "@/lib/utils";
import type { ContactMethods, ObjectType } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  methods: ContactMethods;
  objectType: ObjectType;
  objectId: string;
};

export default function ContactModal({ open, onClose, methods, objectType, objectId }: Props) {
  useEffect(() => {
    if (!open) return;
    const recordClick = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      await supabase.from("contact_clicks").insert({
        user_id: data.user?.id ?? null,
        object_type: objectType,
        object_id: objectId,
      });
    };
    recordClick();
  }, [open, objectType, objectId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const entries = (Object.entries(methods) as [keyof ContactMethods, string | undefined][])
    .filter(([, v]) => v && v.trim() !== "");

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
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold text-base">联系方式</h2>
              <button
                onClick={onClose}
                className="text-[#4b5563] hover:text-white transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            {entries.length === 0 ? (
              <p className="text-[#6b7280] text-sm">对方未填写联系方式。</p>
            ) : (
              <div className="flex flex-col gap-3">
                {entries.map(([key, value]) => {
                  const href = contactHref(key, value!);
                  const label = contactLabel(key);
                  return (
                    <div key={key} className="flex items-center justify-between gap-4 py-2.5 border-b border-[#1f2228] last:border-0">
                      <span className="text-sm text-[#6b7280]">{label}</span>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#4ade80] hover:underline font-mono truncate max-w-[180px]"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm text-white font-mono truncate max-w-[180px]">
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
