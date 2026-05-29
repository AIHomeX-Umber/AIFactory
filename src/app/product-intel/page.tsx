import Link from "next/link";
import { productIntelData } from "@/lib/intel-data";

export const metadata = {
  title: "Product Intelligence Library — FactoryRouter",
  description:
    "Routing intelligence for Chinese factory products across major e-commerce channels.",
};

function ScoreDot({ value }: { value: number }) {
  const color =
    value >= 4 ? "#4ade80" : value === 3 ? "#fbbf24" : "#ef4444";
  return (
    <span
      className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
      style={{ background: color }}
    />
  );
}

export default function ProductIntelPage() {
  const sorted = [...productIntelData].sort(
    (a, b) => b.opportunityScore - a.opportunityScore
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[#4b5563] mb-6">
          <Link href="/intel" className="hover:text-white transition-colors">
            Intelligence
          </Link>
          <span>/</span>
          <span className="text-[#6b7280]">Products</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Product Library</h1>
        <p className="text-[#6b7280]">
          {sorted.length} products analyzed. Sorted by opportunity score.
        </p>
      </div>

      {/* Score legend */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-[#6b7280]">
        <span className="flex items-center gap-1.5">
          <ScoreDot value={5} />
          High (4–5)
        </span>
        <span className="flex items-center gap-1.5">
          <ScoreDot value={3} />
          Medium (3)
        </span>
        <span className="flex items-center gap-1.5">
          <ScoreDot value={1} />
          Low (1–2)
        </span>
        <span className="ml-auto">Opportunity = Demand + Channel Fit + Supplier Access</span>
      </div>

      {/* Product cards */}
      <div className="space-y-3">
        {sorted.map((product) => (
          <Link
            key={product.slug}
            href={`/product-intel/${product.slug}`}
            className="group block rounded-xl border border-[#1f2228] bg-[#111318] p-6 hover:border-[#374151] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Left */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-[#4b5563]">
                    {product.category}
                  </span>
                </div>
                <h2 className="text-white font-semibold text-lg mb-2 group-hover:text-[#4ade80] transition-colors">
                  {product.name}
                </h2>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  {product.insight}
                </p>
              </div>

              {/* Scores */}
              <div className="flex sm:flex-col gap-4 sm:gap-2 sm:items-end shrink-0">
                <div className="text-center sm:text-right">
                  <p className="text-3xl font-black text-white leading-none">
                    {product.opportunityScore}
                  </p>
                  <p className="text-[#4b5563] text-xs">/15</p>
                </div>
                <div className="flex flex-col gap-1 text-xs text-[#6b7280]">
                  <span>
                    <ScoreDot value={product.demandTrend} />
                    Demand {product.demandTrend}/5
                  </span>
                  <span>
                    <ScoreDot value={product.channelFit} />
                    Channel {product.channelFit}/5
                  </span>
                  <span>
                    <ScoreDot value={product.supplierAccessibility} />
                    Supply {product.supplierAccessibility}/5
                  </span>
                </div>
              </div>
            </div>

            {/* Best channels */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.bestChannels.map((ch) => (
                <span
                  key={ch}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-[#1f2228] text-[#a1a1aa]"
                >
                  {ch}
                </span>
              ))}
              <span className="ml-auto text-xs text-[#4b5563] self-center group-hover:text-[#6b7280] transition-colors">
                View full report →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <p className="text-[#6b7280] text-sm mb-4">
          Don't see your product? Submit it for analysis.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors"
        >
          Submit Your Product →
        </Link>
      </div>
    </div>
  );
}
