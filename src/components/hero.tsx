"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JoinModal from "@/components/join-modal";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
      <section className="pt-48 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Headline — two lines, stagger */}
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.15] mb-10 tracking-tight"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            好产品
            <br />好渠道
          </motion.h1>

          {/* AI narrative — brighter, calm, infrastructural */}
          <motion.p
            className="text-xl text-[#a1a1aa] font-light tracking-wide mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            AI 帮产品找到最 fit 的渠道
          </motion.p>

          {/* Subtitle — quiet, secondary */}
          <motion.p
            className="text-sm text-[#4b5563] mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease }}
          >
            让好的产品被充分看见
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease }}
          >
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
          </motion.div>

        </div>
      </section>

      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  );
}
