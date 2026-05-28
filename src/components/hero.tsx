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
      <section className="pt-28 pb-10 px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Headline — one sentence, natural two-line break, micro stagger */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight mb-7">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              帮好产品
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.7, ease }}
            >
              找到最合适的渠道
            </motion.span>
          </h1>

          {/* Subtitle — one line, muted */}
          <motion.p
            className="text-base text-[#6b7280] mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            让好的产品被充分看见。
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
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
