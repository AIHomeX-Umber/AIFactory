"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
  {
    title: "发布产品",
    subtitle: "展示你的产品、资源或服务，找到合适的渠道与合作方。",
    cta: "发布产品 →",
    href: "/offers/new",
    color: "#4ade80",
    browse: "/offers",
    browseLabel: "浏览产品",
  },
  {
    title: "寻找产品",
    subtitle: "发布你的渠道需求，让靠谱的产品和供应链主动找到你。",
    cta: "寻找产品 →",
    href: "/requests/new",
    color: "#60a5fa",
    browse: "/requests",
    browseLabel: "浏览渠道",
  },
  {
    title: "AI Fit",
    subtitle: "让 AI 帮你高效链接🔗对的人和团队。",
    cta: "AI Fit →",
    href: "/workflows/new",
    color: "#fbbf24",
    browse: "/workflows",
    browseLabel: "浏览 workflow",
  },
];

export default function ActionCards() {
  return (
    <section className="pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-[#6b7280] text-sm mb-10"
        >
          你今天想完成什么？
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-xl border border-[#1f2228] bg-[#111318] p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-200 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                style={{ background: card.color }}
              />
              <div>
                <h3 className="text-white font-semibold text-lg mb-1.5">{card.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{card.subtitle}</p>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href={card.href}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 text-black"
                  style={{ background: card.color }}
                >
                  {card.cta}
                </Link>
                <Link
                  href={card.browse}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm text-[#6b7280] hover:text-white border border-[#1f2228] hover:border-[#374151] transition-colors"
                >
                  {card.browseLabel}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
