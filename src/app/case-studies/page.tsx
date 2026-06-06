import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — FactoryRouter",
  description:
    "Real routing outcomes: how Chinese manufacturers found the right distribution channels.",
};

// Placeholder case studies — will be replaced with real data post-launch
const PLACEHOLDER_CASES = [
  {
    id: "standing-desk-dtc",
    category: "Office Furniture",
    headline: "From Amazon Race-to-Bottom to DTC Brand at 40% Margin",
    product: "Electric Standing Desk",
    outcome: "Moved from Amazon to Shopify DTC. Revenue −20% in month 1, +60% in month 6 with better margins.",
    channel: "Shopify DTC",
    coming: true,
  },
  {
    id: "planter-tiktok",
    category: "Home & Garden",
    headline: "How a Ceramic Planter Factory Found Its Audience on TikTok Shop",
    product: "Designer Ceramic Planter",
    outcome: "TikTok Shop affiliate strategy drove $80K GMV in first 90 days.",
    channel: "TikTok Shop",
    coming: true,
  },
  {
    id: "murphy-wayfair",
    category: "Space-Saving Furniture",
    headline: "Why Wayfair Beat Amazon for This Murphy Bed Supplier",
    product: "Wall Bed System",
    outcome: "Return rate dropped from 14% to 4% after moving from Amazon to Wayfair. Margin recovered.",
    channel: "Wayfair",
    coming: true,
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[#4b5563] mb-6">
          <Link href="/intel" className="hover:text-white transition-colors">
            Intelligence
          </Link>
          <span>/</span>
          <span className="text-[#6b7280]">Case Studies</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Case Studies</h1>
        <p className="text-[#6b7280] max-w-xl leading-relaxed">
          Real routing outcomes. How Chinese manufacturers and distributors found
          the right channel — and what happened when they got there.
        </p>
      </div>

      {/* Coming soon banner */}
      <div className="rounded-xl border border-[#fbbf24]/20 bg-[#fbbf24]/5 px-6 py-4 mb-10 flex items-center gap-3">
        <span className="text-[#fbbf24] text-lg">⏳</span>
        <div>
          <p className="text-[#fbbf24] text-sm font-medium">
            Case studies launching soon
          </p>
          <p className="text-[#6b7280] text-xs">
            We're documenting the first wave of routing outcomes from the network.
            Submit your product to be considered.
          </p>
        </div>
      </div>

      {/* Preview cards */}
      <div className="space-y-4">
        {PLACEHOLDER_CASES.map((c) => (
          <div
            key={c.id}
            className="relative rounded-xl border border-[#1f2228] bg-[#111318] p-6 overflow-hidden"
          >
            {/* Blur overlay for coming soon */}
            {c.coming && (
              <div className="absolute inset-0 backdrop-blur-[2px] bg-[#111318]/60 z-10 flex items-center justify-center">
                <span className="text-xs font-mono text-[#4b5563] border border-[#1f2228] rounded-full px-3 py-1">
                  Coming soon
                </span>
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-xs text-[#4b5563] mb-2">{c.category}</p>
                <h2 className="text-white font-semibold text-lg mb-2 leading-snug">
                  {c.headline}
                </h2>
                <p className="text-[#6b7280] text-sm mb-4">{c.outcome}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#1f2228] text-[#a1a1aa]">
                    {c.product}
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80]">
                    → {c.channel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-[#1f2228] bg-[#111318] p-8 text-center">
        <h2 className="text-lg font-bold text-white mb-2">
          Be part of the first batch
        </h2>
        <p className="text-[#6b7280] text-sm mb-6">
          Submit your product. If we help you find the right channel, we'll document
          the outcome as a case study (with your permission).
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors"
          >
            Submit Your Product →
          </Link>
          <Link
            href="/request-routing"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-[#1f2228] text-[#a1a1aa] text-sm hover:text-white hover:border-[#374151] transition-colors"
          >
            Request Routing
          </Link>
        </div>
      </div>
    </div>
  );
}
