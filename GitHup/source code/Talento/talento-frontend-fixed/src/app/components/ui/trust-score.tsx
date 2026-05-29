import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "./glass-card";
import { cn } from "./utils";

interface TrustScoreProps {
  score: number;
  label?: string;
  history?: number[];
  breakdown?: Array<{ label: string; value: number; tone: "success" | "warning" | "error" }>;
  className?: string;
}

const tierStyles = {
  trusted: "text-emerald-300",
  verified: "text-amber-200",
  new: "text-rose-200",
};

const tierColors = {
  trusted: "#10b981",
  verified: "#f59e0b",
  new: "#ef4444",
};

export function TrustScore({
  score,
  label = "Trust Score",
  history = [64, 68, 71, 77, 82, score],
  breakdown = [],
  className,
}: TrustScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const tier = score >= 84 ? "trusted" : score >= 70 ? "verified" : "new";

  useEffect(() => {
    const timeout = window.setTimeout(() => setAnimatedScore(score), 120);
    return () => window.clearTimeout(timeout);
  }, [score]);

  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (animatedScore / 100) * circumference;

  const trend = useMemo(() => {
    const latest = history[history.length - 1] ?? score;
    const earliest = history[0] ?? score;
    return latest - earliest;
  }, [history, score]);

  return (
    <GlassCard className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]">{label}</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{Math.round(score)}%</h3>
          <p className={`mt-1 text-sm font-medium ${tierStyles[tier]}`}>Status: {tier}</p>
        </div>
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke={tierColors[tier]}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 900ms ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-slate-50">{Math.round(animatedScore)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
          <span>Trust history</span>
          <span className={trend >= 0 ? "text-emerald-300" : "text-rose-200"}>{trend >= 0 ? "+" : ""}{trend}% shift</span>
        </div>
        <div className="flex h-16 items-end gap-1.5">
          {history.map((value, index) => (
            <div key={index} className="flex-1 rounded-full bg-white/10" style={{ height: `${Math.max(24, value)}%` }}>
              <div
                className="h-full w-full rounded-full bg-gradient-to-t from-emerald-500/70 to-[#D4A574]"
                style={{ opacity: index === history.length - 1 ? 1 : 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="mt-4 grid gap-2">
          {breakdown.map((item) => (
            <div key={item.label} className="rounded-xl bg-white/5 px-3 py-2">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-200">
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-700",
                    item.tone === "success" && "bg-emerald-400",
                    item.tone === "warning" && "bg-amber-400",
                    item.tone === "error" && "bg-rose-400",
                  )}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
