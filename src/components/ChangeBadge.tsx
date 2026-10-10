import { formatPercent } from "@/lib/bn";

// Design: up (▲) = red text, down (▼) = green text, flat = gray. Pill background is neutral.
export default function ChangeBadge({ change }: { change: number }) {
  const base =
    "inline-flex items-center gap-1 rounded-full bg-base-200 px-2.5 py-1 text-xs font-semibold";
  if (change > 0)
    return (
      <span className={`${base} text-error`}>
        <span className="text-[9px]">▲</span> {formatPercent(change)}
      </span>
    );
  if (change < 0)
    return (
      <span className={`${base} text-success`}>
        <span className="text-[9px]">▼</span> {formatPercent(change)}
      </span>
    );
  return (
    <span className={`${base} text-base-content`}>— {formatPercent(0)}</span>
  );
}
