import { notFound } from "next/navigation";
import Link from "next/link";
import { productIntelData } from "@/lib/intel-data";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productIntelData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productIntelData.find((p) => p.slug === slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — Product Intelligence | FactoryRouter`,
    description: product.insight,
  };
}

function ScoreBar({ value, color = "#4ade80" }: { value: number; color?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-6 rounded-sm"
          style={{ background: i < value ? color : "#1f2228" }}
        />
      ))}
    </div>
  );
}

function FitBadge({ value }: { value: number }) {
  const label = value >= 4 ? "Strong" : value === 3 ? "Moderate" : "Weak";
  const color =
    value >= 4 ? "#4ade80" : value === 3 ? "#fbbf24" : "#ef4444";
  return (
    <span
      className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border"
      style={{ color, borderColor: `${color}44`, background: `${color}11` }}
    >
      {label} {value}/5
    </span>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = productIntelData.find((p) => p.slug === slug);
  if (!product) notFound();

  const overallColor =
    product.opportunityScore >= 12
      ? "#4ade80"
      : product.opportunityScore >= 9
      ? "#fbbf24"
      : "#ef4444";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#4b5563] mb-8">
        <Link href="/intel" className="hover:text-white transition-colors">
          Intelligence
        </Link>
        <span>/</span>
        <Link
          href="/product-intel"
          className="hover:text-white transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-[#6b7280]">{product.name}</span>
      </div>

      {/* Hero */}
      <div className="mb-10">
        <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#1f2228] text-[#4b5563] mb-4">
          {product.category}
        </span>
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-4xl font-black text-white leading-tight">
            {product.name}
          </h1>
          <div className="text-right shrink-0">
            <p className="text-5xl font-black leading-none" style={{ color: overallColor }}>
              {product.opportunityScore}
            </p>
            <p className="text-[#4b5563] text-sm">/15</p>
          </div>
        </div>
        <p className="text-[#6b7280] mt-4 text-base leading-relaxed max-w-2xl">
          {product.insight}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-6">
        <h2 className="text-sm font-medium text-white mb-5">
          Opportunity Score Breakdown
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#6b7280] w-40 shrink-0">
              Demand Trend
            </span>
            <ScoreBar value={product.demandTrend} color="#4ade80" />
            <span className="text-sm text-[#a1a1aa] font-mono">
              {product.demandTrend}/5
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#6b7280] w-40 shrink-0">
              Channel Fit
            </span>
            <ScoreBar value={product.channelFit} color="#60a5fa" />
            <span className="text-sm text-[#a1a1aa] font-mono">
              {product.channelFit}/5
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#6b7280] w-40 shrink-0">
              Supplier Access
            </span>
            <ScoreBar value={product.supplierAccessibility} color="#fbbf24" />
            <span className="text-sm text-[#a1a1aa] font-mono">
              {product.supplierAccessibility}/5
            </span>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-[#1f2228] flex flex-wrap gap-2">
          <span className="text-xs text-[#4b5563]">Best channels:</span>
          {product.bestChannels.map((ch) => (
            <span
              key={ch}
              className="text-xs px-2.5 py-0.5 rounded-full bg-[#1f2228] text-[#a1a1aa]"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Routing Note — the moat */}
      <div className="rounded-xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-6 mb-6">
        <h2 className="text-sm font-medium text-[#4ade80] mb-4">
          Routing Note
        </h2>
        <p className="text-[#d1d5db] text-sm leading-relaxed whitespace-pre-wrap">
          {product.routingNote}
        </p>
      </div>

      {/* Market Overview */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-6">
        <h2 className="text-sm font-medium text-white mb-5">Market Overview</h2>
        <div className="space-y-5">
          {[
            {
              label: "Demand Drivers",
              value: product.marketOverview.demandDrivers,
            },
            {
              label: "Main Markets",
              value: product.marketOverview.mainMarkets,
            },
            {
              label: "Price Bands",
              value: product.marketOverview.priceBands,
            },
            {
              label: "Buyer Behavior",
              value: product.marketOverview.buyerBehavior,
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-mono text-[#4b5563] mb-1">{label.toUpperCase()}</p>
              <p className="text-[#d1d5db] text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Fit Table */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-6">
        <h2 className="text-sm font-medium text-white mb-5">
          Channel Fit Analysis
        </h2>
        <div className="space-y-4">
          {product.channelFitTable
            .sort((a, b) => b.fit - a.fit)
            .map((row) => (
              <div
                key={row.channel}
                className="border-b border-[#1f2228] pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">
                    {row.channel}
                  </span>
                  <FitBadge value={row.fit} />
                </div>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  {row.reason}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Supplier Landscape */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-6">
        <h2 className="text-sm font-medium text-white mb-5">
          Supplier Landscape
        </h2>
        <div className="space-y-4">
          {[
            { label: "Regions", value: product.supplierLandscape.regions },
            {
              label: "Factory Types",
              value: product.supplierLandscape.factoryTypes,
            },
            {
              label: "Capability Requirements",
              value: product.supplierLandscape.capabilityRequirements,
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-mono text-[#4b5563] mb-1">
                {label.toUpperCase()}
              </p>
              <p className="text-[#d1d5db] text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Players */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-6">
        <h2 className="text-sm font-medium text-white mb-5">Key Players</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Brands", value: product.keyPlayers.brands },
            { label: "Retailers", value: product.keyPlayers.retailers },
            { label: "Platforms", value: product.keyPlayers.platforms },
            { label: "Positioning", value: product.keyPlayers.positioning },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-mono text-[#4b5563] mb-1">
                {label.toUpperCase()}
              </p>
              <p className="text-[#d1d5db] text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Opportunity */}
      <div className="rounded-xl border border-[#fbbf24]/20 bg-[#fbbf24]/5 p-6 mb-10">
        <h2 className="text-sm font-medium text-[#fbbf24] mb-5">
          AI Opportunity
        </h2>
        <div className="space-y-4">
          {[
            { label: "Workflow Automation", value: product.aiOpportunity.workflow },
            { label: "Content Generation", value: product.aiOpportunity.content },
            {
              label: "Lead Qualification",
              value: product.aiOpportunity.leadQualification,
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-mono text-[#fbbf24]/60 mb-1">
                {label.toUpperCase()}
              </p>
              <p className="text-[#d1d5db] text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-8 text-center">
        <h2 className="text-lg font-bold text-white mb-2">
          Selling {product.name}?
        </h2>
        <p className="text-[#6b7280] text-sm mb-6">
          Get a personalized routing plan for your specific product and situation.
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
