"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    };
    init();
  }, []);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/")
      ? "text-white"
      : "text-[#6b7280] hover:text-white";

  async function handleSignOut() {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const navLinks = [
    { href: "/intel", label: "Intel" },
    { href: "/product-intel", label: "Products" },
    { href: "/channels", label: "Channels" },
    { href: "/request-routing", label: "Request Routing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1f2228] backdrop-blur-md bg-[#0a0b0d]/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
          <span className="font-semibold text-white tracking-tight text-sm">
            FactoryRouter
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${isActive(link.href)}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Submit Product CTA */}
          <Link
            href="/submit"
            className="px-3.5 py-1.5 rounded-lg border border-[#4ade80]/40 text-[#4ade80] text-xs font-medium hover:bg-[#4ade80]/10 transition-colors"
          >
            Submit Product
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/profile/${user.id}`}
                className="w-7 h-7 rounded-full bg-[#1f2228] flex items-center justify-center text-xs font-medium text-white hover:bg-[#2a3040] transition-colors"
              >
                {(user.email?.[0] ?? "?").toUpperCase()}
              </Link>
              <button
                onClick={handleSignOut}
                className="text-[#6b7280] hover:text-white transition-colors text-xs"
              >
                退出
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[#6b7280] hover:text-white transition-colors"
            >
              登录
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#6b7280] hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {mobileOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1f2228] bg-[#0a0b0d] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm transition-colors ${isActive(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#4ade80] hover:text-[#22c55e] transition-colors"
          >
            Submit Product →
          </Link>
          <div className="pt-2 border-t border-[#1f2228]">
            {user ? (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
                className="text-sm text-[#6b7280] hover:text-white transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[#6b7280] hover:text-white transition-colors"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
