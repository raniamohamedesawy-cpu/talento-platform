import { Sparkles } from "lucide-react";
import { cn } from "./utils";

interface AIInsightBadgeProps {
  label: string;
  tone?: "ai" | "trust" | "fairness";
  className?: string;
}

const toneStyles = {
  ai: "border-[#D4A574]/35 bg-[#D4A574]/12 text-[#D4A574]",
  trust: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300",
  fairness: "border-amber-300/35 bg-amber-500/10 text-amber-200",
};

export function AIInsightBadge({ label, tone = "ai", className }: AIInsightBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
        toneStyles[tone],
        className,
      )}
    >
      <Sparkles className="h-3 w-3" />
      {label}
    </span>
  );
}
