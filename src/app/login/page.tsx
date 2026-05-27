"use client";

import { useState, useRef, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize client once — never re-create inside event handlers.
  // Dynamic await import() + PKCE flow causes the cached code-verifier cookie
  // to be written by one instance then read by another, breaking the fetch.
  const supabaseRef = useRef<SupabaseClient | null>(null);
  useEffect(() => {
    supabaseRef.current = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseRef.current) return;

    setLoading(true);
    setError(null);

    const { error } = await supabaseRef.current.auth.signInWithOtp({
      email,
      options: {
        // No trailing slash — must match Supabase Dashboard → Auth → Redirect URLs exactly
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);

    if (error) {
      // Full error logging so the real cause surfaces in the browser console
      console.log("[login] signInWithOtp error:", error);
      console.log("[login] error.message:", error.message);
      console.log("[login] error.status:", (error as { status?: number }).status);
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <span className="font-semibold text-white tracking-tight text-sm">FactoryRouter</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">登录</h1>
          <p className="text-sm text-[#6b7280]">输入邮箱，我们发送一个免密登录链接。</p>
        </div>

        {sent ? (
          <div className="text-center rounded-xl border border-[#1f2228] bg-[#111318] p-8">
            <div className="w-10 h-10 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center mx-auto mb-4 text-[#4ade80] text-lg">
              ✓
            </div>
            <p className="text-white font-medium mb-1">邮件已发送</p>
            <p className="text-sm text-[#6b7280]">查收 <span className="text-white">{email}</span> 的邮件，点击链接登录。</p>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#a1a1aa] mb-2">邮箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-3 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-2.5 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors disabled:opacity-40"
              >
                {loading ? "发送中…" : "发送登录链接"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
