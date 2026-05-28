"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JoinModal from "@/components/join-modal";


export default function Hero() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setLoggedIn(!!data.user);
    };
    check();
  }, []);

  function handleEnterNetwork() {
    if (loggedIn) router.push("/offers/new");
    else setJoinOpen(true);
  }

  return (
    <>
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono text-[#4ade80] mb-8 tracking-widest uppercase">
              AI-native B2B opportunity network
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              发布好产品
              <br />对接好渠道
              <br />链接对的人
            </h1>
            <p className="text-base text-[#6b7280] mb-10 max-w-md mx-auto leading-relaxed">
              让好的产品被充分看见，
              <br />让靠谱的渠道触达到源头供应链。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleEnterNetwork}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors"
              >
                进入网络 →
              </button>
              <Link
                href="/offers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#1f2228] text-[#a1a1aa] text-sm hover:text-white hover:border-[#374151] transition-colors"
              >
                浏览网络
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  );
}
