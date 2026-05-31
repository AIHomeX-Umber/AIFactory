import Link from "next/link";
import { channelIntelData, productIntelData } from "@/lib/intel-data";

export const metadata = {
  title: "Channel Intelligence — FactoryRouter",
  description:
    "Where to sell: operator-grade analysis of Amazon, Wayfair, Shopify DTC, TikTok Shop, and Walmart Marketplace.",
};

const channelColors: Record<string, string> = {
  amazon: "#fbbf24",
  wayfair: "#60a5fa",
  "shopify-dtc": "#4ade80",
  "tiktok-shop": "#f472b6",
  "walmart-marketplace": "#818cf8",
};

export default function ChannelsPage() {
  // Build a matrix: for each channel, find products that list it as best
  const channelProductMap: Record<string, string[]> = {};
  for (const ch of channelIntelData) {
    channelProductMap[ch.id] = productIntelData
      .filter((p) =>
        p.bestChannels.some((bc) =>
          bc.toLowerCase().replace(/\s+/g, "-").includes(ch.id.replace("-marketplace", ""))
        )
      )
      .map((p) => p.name);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[#4b5563] mb-6">
          <Link href="/intel" className="hover:text-white transition-colors">
            Intelligence
          </Link>
          <span>/</span>
          <span className="text-[#6b7280]">Channels</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-3">
          Channel Intelligence
        </h1>
        <p className="text-[#6b7280] max-w-2xl leading-relaxed">
          Where to sell — and where not to. Operator analysis of each major
          e-commerce channel: freight economics, buyer intent, fee structure, and
          product category fit.
        </p>
      </div>

      {/* Channel cards */}
      <div className="space-y-6">
        {channelIntelData.map((channel) => {
          const color = channelColors[channel.id] ?? "#4ade80";
          const products = channelProductMap[channel.id] ?? [];

          return (
            <div
              key={channel.id}
              className="rounded-xl border border-[#1f2228] bg-[#111318] overflow-hidden"
            >
              {/* Color strip */}
              <div
                className="h-0.5 w-full"
                style={{ background: color }}
              />
              <div className="p-6">
                {/* Channel name + best product types */}
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <h2
                      className="text-xl font-bold mb-1"
                      style={{ color }}
                    >
                      {channel.name}
                    </h2>
                    <p className="text-[#6b7280] text-sm leading-relaxed max-w-xl">
                      {channel.bestProductTypes}
                    </p>
                  </div>
                  {products.length > 0 && (
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] font-mono text-[#4b5563] mb-1.5">
                        BEST FOR
                      </p>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {products.map((p) => (
                          <span
                            key={p}
                            className="text-[10px] px-2 py-0.5 rounded-full border"
                            style={{
                              color,
                              borderColor: `${color}33`,
                              background: `${color}11`,
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Strengths / Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-mono text-[#4ade80] mb-3">
                      STRENGTHS
                    </p>
                    <ul className="space-y-2">
                      {channel.strengths.map((s) => (
                        <li key={s} className="flex gap-2 text-sm text-[#d1d5db]">
                          <span className="text-[#4ade80] shrink-0 mt-0.5">+</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#ef4444] mb-3">
                      WEAKNESSES
                    </p>
                    <ul className="space-y-2">
                      {channel.weaknesses.map((w) => (
                        <li key={w} className="flex gap-2 text-sm text-[#d1d5db]">
                          <span className="text-[#ef4444] shrink-0 mt-0.5">−</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Use / Avoid guidance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-[#0a0b0d] border border-[#1f2228] p-4">
                    <p className="text-xs font-mono text-[#4ade80] mb-2">
                      USE WHEN
                    </p>
                    <p className="text-[#d1d5db] text-sm leading-relaxed">
                      {channel.shouldUse}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#0a0b0d] border border-[#1f2228] p-4">
                    <p className="text-xs font-mono text-[#ef4444] mb-2">
                      AVOID WHEN
                    </p>
                    <p className="text-[#d1d5db] text-sm leading-relaxed">
                      {channel.shouldAvoid}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 rounded-xl border border-[#1f2228] bg-[#111318] p-8 text-center">
        <h2 className="text-lg font-bold text-white mb-2">
          Not sure which channel fits your product?
        </h2>
        <p className="text-[#6b7280] text-sm mb-6">
          Submit your routing request and get a personalized channel recommendation.
        </p>
        <Link
          href="/request-routing"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors"
        >
          Request Routing →
        </Link>
      </div>
    </div>
  );
}
