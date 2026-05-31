"use client";

import { useState } from "react";
import type { Pick } from "@/lib/picks";
import {
  SOURCE_LABELS,
  SATURATION_LABELS,
  SATURATION_COLORS,
  SOURCE_COLORS,
  isNew,
} from "@/lib/picks";
import PickInquiryModal from "@/components/pick-inquiry-modal";

/** Returns true if the imageUrl is a real URL (http/https), not a placeholder service */
function isRealImage(url: string) {
  return url.startsWith("http") && !url.includes("placehold.co") && !url.includes("placeholder");
}

export default function PickCard({ pick }: { pick: Pick }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const satColor = SATURATION_COLORS[pick.saturation];
  const srcColor = SOURCE_COLORS[pick.source];
  const newBadge = isNew(pick.createdAt);

  return (
    <>
      <article
        className="relative rounded-xl border bg-[#111318] flex flex-col overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
        style={{
          borderColor: pick.featured ? "#4ade80" : "#1f2228",
          borderWidth: pick.featured ? "2px" : "1px",
        }}
      >
        {/* Featured corner badge */}
        {pick.featured && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#4ade80] text-black tracking-wide">
            精选
          </span>
        )}

        {/* New badge */}
        {newBadge && !pick.featured && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1f2228] text-[#4ade80] border border-[#4ade80]/40 tracking-wide">
            新
          </span>
        )}

        {/* Image */}
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          {isRealImage(pick.imageUrl) && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pick.imageUrl}
              alt={pick.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Gradient placeholder — no external dependencies */
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, #0d1014 0%, ${srcColor}18 100%)`,
              }}
            >
              <span
                className="text-3xl font-black opacity-20 select-none"
                style={{ color: srcColor }}
              >
                {pick.category}
              </span>
              <span className="text-[11px] text-[#374151] text-center px-4 leading-relaxed max-w-[180px]">
                {pick.title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-4 flex-1">
          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
              style={{ background: srcColor + "22", color: srcColor }}
            >
              {SOURCE_LABELS[pick.source]}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
              style={{ background: satColor + "22", color: satColor }}
            >
              {SATURATION_LABELS[pick.saturation]}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#1f2228] text-[#6b7280]">
              {pick.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-semibold text-[15px] leading-snug">
            {pick.title}
          </h3>

          {/* Verdict */}
          <p className="text-[#6b7280] text-[13px] leading-relaxed">
            {pick.verdict}
          </p>

          {/* Economics */}
          <div className="mt-auto pt-3 border-t border-[#1f2228]">
            {/* Margin — hero number */}
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl font-black text-[#4ade80]">
                {pick.marginPct}%
              </span>
              <span className="text-[12px] text-[#6b7280]">毛利率</span>
            </div>

            {/* Cost / Retail / MOQ */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <div className="text-[11px] text-[#4b5563] mb-0.5">供货价</div>
                <div className="text-[13px] text-white font-mono">
                  ¥{pick.costPrice}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#4b5563] mb-0.5">建议零售</div>
                <div className="text-[13px] text-white font-mono">
                  ¥{pick.suggestedRetail}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#4b5563] mb-0.5">最低起订</div>
                <div className="text-[13px] text-white font-mono">
                  {pick.moq} 件
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-[11px] text-[#4b5563]">交付：</span>
              <span className="text-[12px] text-[#a1a1aa]">{pick.delivery}</span>
            </div>

            {/* CTA */}
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-2.5 rounded-lg bg-[#4ade80] text-black text-sm font-semibold hover:bg-[#22c55e] transition-colors"
            >
              获取报价 / 联系拿样 →
            </button>
          </div>
        </div>
      </article>

      <PickInquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        pick={pick}
      />
    </>
  );
}
