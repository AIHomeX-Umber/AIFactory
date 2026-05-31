import Link from "next/link";
import { productIntelData, channelIntelData } from "@/lib/intel-data";

export const metadata = {
  title: "Product Intelligence — FactoryRouter",
  description:
    "Operator-grade intelligence on which products go to which channels. Built from real distribution data, not market research.",
};

function ScoreBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-1 w-4 rounded-sm ${i < value ? "bg-[#4ade80]" : "bg-[#1f2228]"}`}
        />
      ))}
    </div>
  );
}

export default function IntelPage() {
  const topProducts = [...productIntelData].sort(
    (a, b) => b.opportunityScore - a.opportunityScore
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80] mb-4">
          INTELLIGENCE
        </span>
        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          Product × Channel Intelligence
        </h1>
        <p className="text-[#6b7280] max-w-2xl leading-relaxed">
          Operator-grade routing intelligence. We map which products fit which
          channels — and more importantly, which ones don't. Built from real
          distribution data, not market research.
        </p>
      </div>

      {/* Opportunity Score rubric */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-12">
        <h2 className="text-sm font-medium text-white mb-4">
          Opportunity Score Rubric
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-[#4ade80] font-mono text-xs mb-1">
              DEMAND TREND
            </p>
            <p className="text-[#6b7280]">
              Is buyer demand growing, stable, or declining? 1 = declining, 5 =
              strong uptrend.
            </p>
          </div>
          <div>
            <p className="text-[#60a5fa] font-mono text-xs mb-1">
              CHANNEL FIT
            </p>
            <p className="text-[#6b7280]">
              How well does this product category match available channel
              economics? 1 = poor fit, 5 = native fit.
            </p>
          </div>
          <div>
            <p className="text-[#fbbf24] font-mono text-xs mb-1">
              SUPPLIER ACCESS
            </p>
            <p className="text-[#6b7280]">
              How accessible are quality suppliers? 1 = scarce/specialized, 5 =
              abundant and competitive.
            </p>
          </div>
        </div>
      </div>

      {/* Product signals grid */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Top Opportunities</h2>
          <Link
            href="/product-intel"
            className="text-sm text-[#6b7280] hover:text-white transition-colors"
          >
            View all products →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/product-intel/${p.slug}`}
              className="group rounded-xl border border-[#1f2228] bg-[#111318] p-6 hover:border-[#374151] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">{p.category}</p>
                  <h3 className="text-white font-semibold">{p.name}</h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="text-2xl font-black text-white">
                    {p.opportunityScore}
                  </span>
                  <span className="text-[#4b5563] text-sm">/15</span>
                </div>
              </div>

              <p className="text-[#6b7280] text-sm mb-4 leading-relaxed">
                {p.insight}
              </p>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#4b5563] w-24 shrink-0">
                    Demand
                  </span>
                  <ScoreBar value={p.demandTrend} />
                  <span className="text-xs text-[#4b5563]">
                    {p.demandTrend}/5
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#4b5563] w-24 shrink-0">
                    Channel Fit
                  </span>
                  <ScoreBar value={p.channelFit} />
                  <span className="text-xs text-[#4b5563]">
                    {p.channelFit}/5
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#4b5563] w-24 shrink-0">
                    Supplier Access
                  </span>
                  <ScoreBar value={p.supplierAccessibility} />
                  <span className="text-xs text-[#4b5563]">
                    {p.supplierAccessibility}/5
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.bestChannels.map((ch) => (
                  <span
                    key={ch}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#1f2228] text-[#a1a1aa]"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Channel quick-reference */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Channel Overview</h2>
          <Link
            href="/channels"
            className="text-sm text-[#6b7280] hover:text-white transition-colors"
          >
            Full channel intel →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {channelIntelData.map((ch) => (
            <Link
              key={ch.id}
              href="/channels"
              className="rounded-xl border border-[#1f2228] bg-[#111318] p-4 hover:border-[#374151] transition-colors"
            >
              <p className="text-white font-medium mb-1.5">{ch.name}</p>
              <p className="text-xs text-[#6b7280] leading-relaxed line-clamp-2">
                {ch.bestProductTypes}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Need routing for your product?
        </h2>
        <p className="text-[#6b7280] text-sm mb-6">
          Submit your product and we'll map the best channel path for your
          specific situation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/request-routing"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors"
          >
            Request Routing →
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-[#1f2228] text-[#a1a1aa] text-sm hover:text-white hover:border-[#374151] transition-colors"
          >
            Submit Your Product
          </Link>
        </div>
      </div>
    </div>
  );
}
