import Link from "next/link";
import { getPicks } from "@/lib/picks";
import PickCard from "@/components/pick-card";

export default function PicksSection() {
  const featured = getPicks()
    .filter((p) => p.featured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">本周精选</h2>
            <p className="text-sm text-[#6b7280]">我们这周最推荐的选品</p>
          </div>
          <Link
            href="/feed"
            className="text-sm text-[#4ade80] hover:underline shrink-0"
          >
            查看全部选品 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((pick) => (
            <PickCard key={pick.id} pick={pick} />
          ))}
        </div>
      </div>
    </section>
  );
}
