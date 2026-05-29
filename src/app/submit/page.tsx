"use client";

import { useState } from "react";
import Link from "next/link";

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

export default function SubmitProductPage() {
  const [form, setForm] = useState({
    factory_name: "",
    contact_name: "",
    contact: "",
    product_name: "",
    product_category: "",
    description: "",
    moq: "",
    lead_time: "",
    certifications: "",
    target_markets: "",
    website: "",
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
        .from("product_submissions")
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
        <h1 className="text-2xl font-bold text-white mb-3">Product Submitted</h1>
        <p className="text-[#6b7280] mb-8 leading-relaxed">
          Thank you for submitting{" "}
          <span className="text-white">{form.product_name}</span>. We'll review
          it and may feature it in the product intelligence library. We'll follow
          up at{" "}
          <span className="text-white">{form.contact}</span>.
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
        <span className="text-[#6b7280]">Submit Product</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-3">Submit Your Product</h1>
        <p className="text-[#6b7280] leading-relaxed">
          Chinese factories and suppliers: submit your product for routing analysis.
          We'll evaluate channel fit, demand trends, and supplier positioning — and
          may feature it in the FactoryRouter intelligence library.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Factory / Supplier Info */}
        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-4">
          <h2 className="text-sm font-medium text-white">Factory / Supplier Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Factory / Company Name *
              </label>
              <input
                name="factory_name"
                value={form.factory_name}
                onChange={handleChange}
                required
                placeholder="e.g. Foshan Hengxin Furniture"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Contact Name *
              </label>
              <input
                name="contact_name"
                value={form.contact_name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Contact (email or WeChat) *
              </label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                placeholder="email or WeChat ID"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Website / Alibaba Store
              </label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-4">
          <h2 className="text-sm font-medium text-white">Product Details</h2>
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
          <div>
            <label className="block text-xs text-[#6b7280] mb-1.5">
              Product Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe your product: materials, dimensions, weight, key features, price range, and what makes it competitive."
              className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                MOQ (Minimum Order Quantity)
              </label>
              <input
                name="moq"
                value={form.moq}
                onChange={handleChange}
                placeholder="e.g. 50 units, 500 units"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Lead Time
              </label>
              <input
                name="lead_time"
                value={form.lead_time}
                onChange={handleChange}
                placeholder="e.g. 30 days, 45–60 days"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Certifications
              </label>
              <input
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                placeholder="e.g. CE, UL, BIFMA, FSC"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b7280] mb-1.5">
                Target Markets
              </label>
              <input
                name="target_markets"
                value={form.target_markets}
                onChange={handleChange}
                placeholder="e.g. US, UK, EU, Australia"
                className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#6b7280] mb-1.5">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Anything else we should know — existing channel experience, unique manufacturing capabilities, etc."
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
          {loading ? "Submitting…" : "Submit Product →"}
        </button>
        <p className="text-center text-xs text-[#4b5563]">
          We review all submissions. Selected products may be featured in our intelligence library.
        </p>
      </form>
    </div>
  );
}
