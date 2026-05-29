import { cn } from "./utils";

interface LevelBadgeProps {
  level: number;
  className?: string;
}

const levelStyles = {
  premium: "border-[#D4A574]/40 bg-[#D4A574]/15 text-[#D4A574]",
  advanced: "border-emerald-400/35 bg-emerald-500/10 text-emerald-200",
  starter: "border-slate-300/35 bg-slate-500/10 text-slate-200",
};

export function LevelBadge({ level, className }: LevelBadgeProps) {
  const styleKey = level >= 8 ? "premium" : level >= 5 ? "advanced" : "starter";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase",
        levelStyles[styleKey],
        className,
      )}
    >
      Level {level}
    </span>
  );
}
