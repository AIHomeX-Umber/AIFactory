import { Suspense } from "react";
import type { Metadata } from "next";
import { getPicks } from "@/lib/picks";
import FeedClient from "./feed-client";

export const metadata: Metadata = {
  title: "选品信息流 · FactoryRouter",
  description:
    "工厂直供独家品 + GigaB2B/1688 严选——我们替跨境渠道卖家做好了判断，含毛利数据、饱和度分析与货源信息。",
};

export default function FeedPage() {
  const picks = getPicks();

  return (
    <Suspense>
      <FeedClient picks={picks} />
    </Suspense>
  );
}
