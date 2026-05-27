import Link from "next/link";
import SignalBadge from "@/components/signal-badge";
import { truncate, formatDate } from "@/lib/utils";
import type { Offer, Request, Workflow, ObjectType } from "@/lib/types";

type Props = {
  type: ObjectType;
  item: Offer | Request | Workflow;
};

const typeConfig: Record<ObjectType, { color: string; label: string; basePath: string }> = {
  offer: { color: "#4ade80", label: "供给", basePath: "/offers" },
  request: { color: "#60a5fa", label: "需求", basePath: "/requests" },
  workflow: { color: "#fbbf24", label: "工作流", basePath: "/workflows" },
};

export default function ObjectCard({ type, item }: Props) {
  const config = typeConfig[type];
  const forkCount = type === "workflow" ? (item as Workflow).fork_count : undefined;

  return (
    <Link
      href={`${config.basePath}/${item.id}`}
      className="group block rounded-xl border border-[#1f2228] bg-[#111318] p-5 hover:bg-[#161b22] hover:border-[#2a3040] transition-all duration-150 overflow-hidden relative"
    >
      <div
        className="absolute top-0 left-0 w-0.5 h-full rounded-l-xl"
        style={{ background: config.color }}
      />
      <div className="pl-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{ color: config.color, borderColor: `${config.color}33`, background: `${config.color}11` }}
          >
            {config.label}
          </span>
          <span className="text-xs text-[#4b5563] shrink-0">{formatDate(item.created_at)}</span>
        </div>

        <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-[#e5e7eb] transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-[#6b7280] text-sm leading-relaxed mb-3 line-clamp-2">
          {truncate(item.description, 120)}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-[#1f2228] text-[#6b7280]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          {item.profiles?.name && (
            <span className="text-xs text-[#4b5563]">{item.profiles.name}</span>
          )}
          <SignalBadge savedCount={item.saved_count} forkCount={forkCount} />
        </div>
      </div>
    </Link>
  );
}
