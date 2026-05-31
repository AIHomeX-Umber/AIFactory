import Link from "next/link";

export const metadata = {
  title: "AI Workflow Documentation — FactoryRouter",
  description:
    "How to use FactoryRouter AI Fit workflows to accelerate product routing, listing creation, and lead qualification.",
};

const WORKFLOWS = [
  {
    id: "product-routing",
    title: "Product Routing Workflow",
    badge: "Core",
    badgeColor: "#4ade80",
    description:
      "Takes a product spec sheet as input and outputs a ranked channel recommendation with supporting rationale. Designed for suppliers entering a new market or channel.",
    steps: [
      "Input: product name, category, weight, price point, target market, existing certifications",
      "AI evaluates channel fit scores across Amazon, Wayfair, Shopify DTC, TikTok Shop, Walmart",
      "Output: ranked channel list with fit rationale and top 3 action items",
      "Optional: generates listing outline for top recommended channel",
    ],
    useCases: [
      "Chinese factory evaluating US market entry",
      "Distributor deciding between Amazon and Wayfair",
      "Brand migrating from Amazon to DTC",
    ],
    toolsRequired: ["Claude / GPT-4", "Product spec sheet (text or PDF)"],
  },
  {
    id: "listing-generator",
    title: "Channel Listing Generator",
    badge: "Productivity",
    badgeColor: "#60a5fa",
    description:
      "Generates optimized product listings for multiple channels from a single factory spec sheet. Outputs Amazon bullet points, Wayfair product descriptions, and Shopify product page copy — each adapted to channel norms.",
    steps: [
      "Input: factory spec sheet (dimensions, materials, weight, features, certifications)",
      "AI adapts tone and structure to channel requirements",
      "Amazon: SEO-optimized title + 5 bullet points",
      "Wayfair: structured description + feature highlights",
      "Shopify DTC: brand story + feature narrative + FAQ",
    ],
    useCases: [
      "Supplier launching on multiple channels simultaneously",
      "Brand updating listings across channels after product revision",
      "Agency managing listing creation at scale",
    ],
    toolsRequired: ["Claude / GPT-4", "Factory spec sheet"],
  },
  {
    id: "lead-qualifier",
    title: "Lead Qualification Workflow",
    badge: "Sales",
    badgeColor: "#fbbf24",
    description:
      "Processes inbound inquiry emails or contact form submissions and scores them by buyer intent, company size, and channel fit. Reduces manual review time from hours to minutes.",
    steps: [
      "Input: raw inquiry email or contact form data",
      "AI extracts: company name, market, product interest, volume indicators, decision timeline",
      "Scores lead on: intent (1–5), fit (1–5), urgency (1–5)",
      "Output: structured lead card + recommended response template",
    ],
    useCases: [
      "Supplier receiving high volume of Alibaba inquiries",
      "Distributor managing inbound channel partner requests",
      "Sales team prioritizing follow-up queue",
    ],
    toolsRequired: ["Claude / GPT-4", "Inquiry text input"],
  },
  {
    id: "content-calendar",
    title: "TikTok Shop Content Calendar",
    badge: "Social",
    badgeColor: "#f472b6",
    description:
      "Generates a 30-day TikTok Shop content calendar for a product, including video concepts, hooks, and affiliate creator briefs. Optimized for lifestyle categories (planters, home decor, kitchen gadgets).",
    steps: [
      "Input: product name, key features, target audience, 3 hero images",
      "AI generates: 30 video concepts with hook lines",
      "Each concept: 30-second structure, on-screen text suggestions, caption + hashtags",
      "Bonus: affiliate creator brief template for outreach",
    ],
    useCases: [
      "Supplier launching on TikTok Shop for the first time",
      "Brand building organic content strategy",
      "Agency creating content briefs for creator network",
    ],
    toolsRequired: ["Claude / GPT-4", "Product images", "TikTok Shop seller account"],
  },
];

export default function WorkflowDocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#4b5563] mb-8">
        <Link href="/intel" className="hover:text-white transition-colors">
          Intelligence
        </Link>
        <span>/</span>
        <span className="text-[#6b7280]">Workflow Documentation</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-3">AI Fit Workflows</h1>
        <p className="text-[#6b7280] max-w-2xl leading-relaxed">
          Structured AI workflows for product routing, listing creation, lead
          qualification, and content strategy. Each workflow takes a specific input
          and produces an operator-ready output. No prompt engineering required.
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 mb-10">
        <h2 className="text-sm font-medium text-white mb-4">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-[#4ade80] font-mono text-xs">1. SELECT</span>
            <p className="text-[#6b7280]">
              Pick a workflow that matches your current bottleneck — routing,
              listing, lead qualification, or content.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#60a5fa] font-mono text-xs">2. INPUT</span>
            <p className="text-[#6b7280]">
              Provide the required inputs (spec sheet, inquiry email, product info).
              No special formatting needed.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#fbbf24] font-mono text-xs">3. OUTPUT</span>
            <p className="text-[#6b7280]">
              Get a structured, operator-ready output — channel recommendation,
              listings, lead score, or content calendar.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow cards */}
      <div className="space-y-6">
        {WORKFLOWS.map((wf) => (
          <div
            key={wf.id}
            className="rounded-xl border border-[#1f2228] bg-[#111318] overflow-hidden"
          >
            <div
              className="h-0.5 w-full"
              style={{ background: wf.badgeColor }}
            />
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-white font-semibold text-lg leading-snug">
                  {wf.title}
                </h2>
                <span
                  className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{
                    color: wf.badgeColor,
                    borderColor: `${wf.badgeColor}44`,
                    background: `${wf.badgeColor}11`,
                  }}
                >
                  {wf.badge}
                </span>
              </div>

              <p className="text-[#6b7280] text-sm leading-relaxed mb-6">
                {wf.description}
              </p>

              {/* Steps */}
              <div className="mb-6">
                <p className="text-xs font-mono text-[#4b5563] mb-3">STEPS</p>
                <ol className="space-y-2">
                  {wf.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#d1d5db]">
                      <span
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono mt-0.5"
                        style={{
                          color: wf.badgeColor,
                          background: `${wf.badgeColor}11`,
                          border: `1px solid ${wf.badgeColor}44`,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Use cases + Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-[#0a0b0d] border border-[#1f2228] p-4">
                  <p className="text-xs font-mono text-[#4b5563] mb-2">
                    USE CASES
                  </p>
                  <ul className="space-y-1.5">
                    {wf.useCases.map((uc) => (
                      <li key={uc} className="text-sm text-[#d1d5db] flex gap-2">
                        <span className="text-[#4b5563] shrink-0">→</span>
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-[#0a0b0d] border border-[#1f2228] p-4">
                  <p className="text-xs font-mono text-[#4b5563] mb-2">
                    TOOLS REQUIRED
                  </p>
                  <ul className="space-y-1.5">
                    {wf.toolsRequired.map((t) => (
                      <li key={t} className="text-sm text-[#d1d5db] flex gap-2">
                        <span className="text-[#4b5563] shrink-0">•</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-[#1f2228] bg-[#111318] p-8 text-center">
        <h2 className="text-lg font-bold text-white mb-2">
          Want these workflows applied to your product?
        </h2>
        <p className="text-[#6b7280] text-sm mb-6">
          Submit a routing request and we'll run the relevant workflows for your
          specific situation.
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
