"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import PickCard from "@/components/pick-card";
import type { Pick, PickSource, PickSaturation } from "@/lib/picks";
import { SOURCE_LABELS, SATURATION_LABELS, SATURATION_COLORS, SOURCE_COLORS, getAllCategories } from "@/lib/picks";

const MARGIN_TIERS = [
  { label: "全部", min: 0, max: 100 },
  { label: "50%+", min: 50, max: 100 },
  { label: "60%+", min: 60, max: 100 },
  { label: "70%+", min: 70, max: 100 },
];

const SORT_OPTIONS = [
  { value: "newest", label: "最新" },
  { value: "margin_desc", label: "毛利最高" },
  { value: "price_desc", label: "客单最高" },
];

type Props = { picks: Pick[] };

export default function FeedClient({ picks }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- parse URL state ---
  const activeCats = useMemo(
    () => searchParams.get("cat")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );
  const activeSources = useMemo(
    () => (searchParams.get("src")?.split(",").filter(Boolean) ?? []) as PickSource[],
    [searchParams]
  );
  const activeSats = useMemo(
    () => (searchParams.get("sat")?.split(",").filter(Boolean) ?? []) as PickSaturation[],
    [searchParams]
  );
  const marginTierIdx = useMemo(
    () => Number(searchParams.get("margin") ?? "0"),
    [searchParams]
  );
  const sort = searchParams.get("sort") ?? "newest";

  // --- URL writer ---
  const setParam = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === "") params.delete(k);
        else params.set(k, v);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  function toggleMulti(key: string, value: string, current: string[]) {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setParam({ [key]: next.join(",") || null });
  }

  // --- filtering + sorting ---
  const allCategories = useMemo(() => getAllCategories(picks), [picks]);
  const marginTier = MARGIN_TIERS[marginTierIdx] ?? MARGIN_TIERS[0];

  const filtered = useMemo(() => {
    let result = picks.filter((p) => {
      if (activeCats.length && !activeCats.includes(p.category)) return false;
      if (activeSources.length && !activeSources.includes(p.source)) return false;
      if (activeSats.length && !activeSats.includes(p.saturation)) return false;
      if (p.marginPct < marginTier.min || p.marginPct > marginTier.max) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === "margin_desc") return b.marginPct - a.marginPct;
      if (sort === "price_desc") return b.suggestedRetail - a.suggestedRetail;
      // newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [picks, activeCats, activeSources, activeSats, marginTier, sort]);

  const hasFilters =
    activeCats.length || activeSources.length || activeSats.length || marginTierIdx !== 0 || sort !== "newest";

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-1">选品信息流</h1>
        <p className="text-sm text-[#6b7280]">我们替你做了判断——工厂直供独家品 + GigaB2B / 1688 严选</p>
      </div>

      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 p-4 rounded-xl border border-[#1f2228] bg-[#0d1014]">
        {/* Row 1: category */}
        <div>
          <span className="text-[11px] text-[#4b5563] uppercase tracking-wider mb-2 block">品类</span>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => {
              const active = activeCats.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleMulti("cat", cat, activeCats)}
                  className="px-3 py-1 rounded-full text-[12px] border transition-colors"
                  style={{
                    borderColor: active ? "#4ade80" : "#1f2228",
                    background: active ? "#4ade8022" : "transparent",
                    color: active ? "#4ade80" : "#6b7280",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: source + saturation */}
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="text-[11px] text-[#4b5563] uppercase tracking-wider mb-2 block">货源</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(SOURCE_LABELS) as PickSource[]).map((src) => {
                const active = activeSources.includes(src);
                const color = SOURCE_COLORS[src];
                return (
                  <button
                    key={src}
                    onClick={() => toggleMulti("src", src, activeSources)}
                    className="px-3 py-1 rounded-full text-[12px] border transition-colors"
                    style={{
                      borderColor: active ? color : "#1f2228",
                      background: active ? color + "22" : "transparent",
                      color: active ? color : "#6b7280",
                    }}
                  >
                    {SOURCE_LABELS[src]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-[11px] text-[#4b5563] uppercase tracking-wider mb-2 block">饱和度</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(SATURATION_LABELS) as PickSaturation[]).map((sat) => {
                const active = activeSats.includes(sat);
                const color = SATURATION_COLORS[sat];
                return (
                  <button
                    key={sat}
                    onClick={() => toggleMulti("sat", sat, activeSats)}
                    className="px-3 py-1 rounded-full text-[12px] border transition-colors"
                    style={{
                      borderColor: active ? color : "#1f2228",
                      background: active ? color + "22" : "transparent",
                      color: active ? color : "#6b7280",
                    }}
                  >
                    {SATURATION_LABELS[sat]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 3: margin + sort */}
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="text-[11px] text-[#4b5563] uppercase tracking-wider mb-2 block">毛利区间</span>
            <div className="flex gap-2">
              {MARGIN_TIERS.map((tier, idx) => {
                const active = marginTierIdx === idx;
                return (
                  <button
                    key={tier.label}
                    onClick={() => setParam({ margin: idx === 0 ? null : String(idx) })}
                    className="px-3 py-1 rounded-full text-[12px] border transition-colors"
                    style={{
                      borderColor: active ? "#4ade80" : "#1f2228",
                      background: active ? "#4ade8022" : "transparent",
                      color: active ? "#4ade80" : "#6b7280",
                    }}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-[11px] text-[#4b5563] uppercase tracking-wider mb-2 block">排序</span>
            <div className="flex gap-2">
              {SORT_OPTIONS.map((opt) => {
                const active = sort === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setParam({ sort: opt.value === "newest" ? null : opt.value })}
                    className="px-3 py-1 rounded-full text-[12px] border transition-colors"
                    style={{
                      borderColor: active ? "#4ade80" : "#1f2228",
                      background: active ? "#4ade8022" : "transparent",
                      color: active ? "#4ade80" : "#6b7280",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <div>
            <button
              onClick={clearAll}
              className="text-[12px] text-[#6b7280] hover:text-[#f87171] transition-colors"
            >
              × 清除全部筛选
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-[13px] text-[#4b5563] mb-6">
        共 {filtered.length} 条选品
        {hasFilters && <span className="ml-1 text-[#4ade80]">（已筛选）</span>}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-[#4b5563]">
          <p className="text-lg mb-2">没有符合条件的选品</p>
          <button
            onClick={clearAll}
            className="text-sm text-[#4ade80] hover:underline"
          >
            清除筛选条件 →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pick) => (
            <PickCard key={pick.id} pick={pick} />
          ))}
        </div>
      )}
    </div>
  );
}
