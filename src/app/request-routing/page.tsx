"use client";

import { useState } from "react";
import Link from "next/link";

const CHANNEL_OPTIONS = [
  "Amazon",
  "Wayfair",
  "Shopify DTC",
  "TikTok Shop",
  "Walmart Marketplace",
  "Not sure / need guidance",
];

const PRODUCT_CATEGORIES = [
  "Furniture",
  "Outdoor Living",
  "Home Decor",
  "Kitchen & Dining",
  "Office",
  "Garden & Planters",
  "Storage & Organization",
  "Electronics",
  "Other",
];

export default function RequestRoutingPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    contact: "",
    product_name: "",
    product_category: "",
    target_market: "",
    current_channels: "",
    monthly_volume: "",
    main_challenge: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: dbErr } = await supabase
        .from("routing_requests")
        .insert([form]);
      if (dbErr) throw new Error(dbErr.message);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <div className="w-12 h-12 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center mx-auto mb-6 text-[#4ade80] text-xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Request Received
        </h1>
        <p className="text-[#6b7280] mb-8 leading-relaxed">
          We'll review your product and send a routing recommendation within 1–2 business days. Check{" "}
          <span className="text-white">{form.contact}</span> for our response.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/product-intel"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors"
          >
            Browse Product Intel →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#1f2228] text-[#a1a1aa] text-sm hover:text-white hover:border-[#374151] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#4b5563] mb-8">
        <Link href="/intel" className="hover:text-white transition-colors">
          Intelligence
        </Link>
        <span>/</span>
        <span className="text-[#6b7280]">Request Routing</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-3">Request Routing</h1>
        <p className="text-[#6b7280] leading-relaxed">
          Tell us about your product. We'll map the best channel path for your
          specific situation — based on your product category, target market, volume,
          and current distribution.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact info */}
        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-4">
          <h2 className="text-sm font-medium text-white">Contact Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Company
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company or factory name"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#6b7280] mb-1.5">
              Contact (email or WeChat) *
            </label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              placeholder="email@example.com or WeChat ID"
              className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-4">
          <h2 className="text-sm font-medium text-white">Product Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Product Name *
              </label>
              <input
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
                required
                placeholder="e.g. Electric Standing Desk"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Category *
              </label>
              <select
                name="product_category"
                value={form.product_category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              >
                <option value="">Select category</option>
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Target Market
              </label>
              <input
                name="target_market"
                value={form.target_market}
                onChange={handleChange}
                placeholder="e.g. US, UK, Germany"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Monthly Volume (units)
              </label>
              <input
                name="monthly_volume"
                value={form.monthly_volume}
                onChange={handleChange}
                placeholder="e.g. 500, 5000, 50000"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#6b7280] mb-1.5">
              Current Channels (if any)
            </label>
            <select
              name="current_channels"
              value={form.current_channels}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
            >
              <option value="">Select or leave blank</option>
              {CHANNEL_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenge */}
        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-4">
          <h2 className="text-sm font-medium text-white">Your Challenge</h2>
          <div>
            <label className="block text-xs text-[#6b7280] mb-1.5">
              What's your main challenge? *
            </label>
            <textarea
              name="main_challenge"
              value={form.main_challenge}
              onChange={handleChange}
              required
              rows={3}
              placeholder="e.g. Amazon return rates are killing our margin, we need to find a better channel. Or: we're entering the US market and don't know where to start."
              className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[#6b7280] mb-1.5">
              Additional Context
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Any other context that would help us give better routing advice."
              className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors disabled:opacity-40"
        >
          {loading ? "Submitting…" : "Submit Routing Request →"}
        </button>
        <p className="text-center text-xs text-[#4b5563]">
          We respond within 1–2 business days. No spam, ever.
        </p>
      </form>
    </div>
  );
}
