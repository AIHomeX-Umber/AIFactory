"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    };
    init();
  }, []);

  const isActive = (path: string) =>
    pathname.startsWith(path)
      ? "text-white"
      : "text-[#6b7280] hover:text-white";

  async function handleSignOut() {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1f2228] backdrop-blur-md bg-[#0a0b0d]/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
          <span className="font-semibold text-white tracking-tight text-sm">FactoryRouter</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/offers" className={`transition-colors ${isActive("/offers")}`}>供给</Link>
          <Link href="/requests" className={`transition-colors ${isActive("/requests")}`}>需求</Link>
          <Link href="/workflows" className={`transition-colors ${isActive("/workflows")}`}>工作流</Link>
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
      </div>
    </nav>
  );
}
