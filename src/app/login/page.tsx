"use client";

import { useState, useRef, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize client once — never re-create inside event handlers.
  const supabaseRef = useRef<SupabaseClient | null>(null);
  useEffect(() => {
    supabaseRef.current = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  async function handleOAuth(provider: "google" | "github") {
    if (!supabaseRef.current) return;
    setError(null);
    setOauthLoading(provider);
    const { error } = await supabaseRef.current.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setError(error.message);
      setOauthLoading(null);
    }
    // On success the browser navigates away — no need to reset loading state.
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseRef.current) return;
    setLoading(true);
    setError(null);
    const { error } = await supabaseRef.current.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      console.log("[login] signInWithOtp error:", error);
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <span className="font-semibold text-white tracking-tight text-sm">FactoryRouter</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">登录 / 注册</h1>
          <p className="text-sm text-[#6b7280]">加入 FactoryRouter，连接产品与渠道。</p>
        </div>

        {sent ? (
          /* Magic link sent state */
          <div className="text-center rounded-xl border border-[#1f2228] bg-[#111318] p-8">
            <div className="w-10 h-10 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center mx-auto mb-4 text-[#4ade80] text-lg">
              ✓
            </div>
            <p className="text-white font-medium mb-1">邮件已发送</p>
            <p className="text-sm text-[#6b7280]">
              查收 <span className="text-white">{email}</span> 的邮件，点击链接登录。
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {/* OAuth buttons */}
            <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-4 space-y-2.5">
              {/* Google */}
              <button
                onClick={() => handleOAuth("google")}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-[#1f2228] bg-[#0a0b0d] text-sm text-white hover:border-[#374151] hover:bg-[#111318] transition-colors disabled:opacity-40"
              >
                <GoogleIcon />
                {oauthLoading === "google" ? "跳转中…" : "Continue with Google"}
              </button>

              {/* GitHub */}
              <button
                onClick={() => handleOAuth("github")}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-[#1f2228] bg-[#0a0b0d] text-sm text-white hover:border-[#374151] hover:bg-[#111318] transition-colors disabled:opacity-40"
              >
                <GitHubIcon />
                {oauthLoading === "github" ? "跳转中…" : "Continue with GitHub"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1f2228]" />
              <span className="text-xs text-[#4b5563]">或用邮箱登录</span>
              <div className="flex-1 h-px bg-[#1f2228]" />
            </div>

            {/* Magic Link form */}
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="rounded-xl border border-[#1f2228] bg-[#111318] p-4 space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-[#1f2228] bg-[#0a0b0d] px-4 py-2.5 text-white placeholder-[#4b5563] text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
                />

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
          </div>
        )}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.13 17.64 11.823 17.64 9.2z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
