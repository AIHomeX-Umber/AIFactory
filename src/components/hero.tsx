"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-mono text-[#4ade80] mb-6 tracking-widest uppercase">
            AI-native · B2B · Opportunity Network
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
            让产品、渠道与机会
            <br />高效连接。
          </h1>
          <p className="text-lg text-[#6b7280] mb-10 max-w-xl mx-auto">
            FactoryRouter — 发布供给、对接需求、共享工作流。像发 GitHub Issue 一样简单。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/offers/new"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#4ade80] text-black font-semibold text-sm hover:bg-[#22c55e] transition-colors"
            >
              开始发布 →
            </Link>
            <Link
              href="/offers"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#1f2228] text-[#a1a1aa] text-sm hover:text-white hover:border-[#374151] transition-colors"
            >
              浏览供给
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
