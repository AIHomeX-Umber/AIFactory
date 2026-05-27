type Props = {
  savedCount?: number;
  forkCount?: number;
};

export default function SignalBadge({ savedCount, forkCount }: Props) {
  const items = [
    savedCount != null && savedCount > 0 && `Saved by ${savedCount}`,
    forkCount != null && forkCount > 0 && `Forked ${forkCount} times`,
  ].filter(Boolean) as string[];

  if (items.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {items.map((label) => (
        <span key={label} className="text-xs text-[#4b5563] font-mono">
          {label}
        </span>
      ))}
    </div>
  );
}
