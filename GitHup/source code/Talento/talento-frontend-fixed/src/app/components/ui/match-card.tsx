import { useState } from "react";
import { ChevronDown, Sparkles, Star, Users } from "lucide-react";
import { GlassCard } from "./glass-card";
import { AIInsightBadge } from "./ai-insight-badge";
import { LevelBadge } from "./level-badge";
import { Button } from "./button";
import { Progress } from "./progress";
import type { Match } from "../../types";
import { cn } from "./utils";

interface MatchCardProps {
  match: Match;
  onConnect?: (match: Match) => void;
  compact?: boolean;
}

export function MatchCard({ match, onConnect, compact = false }: MatchCardProps) {
  const [expanded, setExpanded] = useState(false);
  const score = match.match;
  const confidence = Math.max(65, Math.round((match.trustScore ?? score) * 0.9));
  const levelSimilarity = match.algorithmData.levelSimilarity ?? Math.min(98, Math.round(score * 0.9));
  const availability = match.algorithmData.availabilityMatch ?? 82;
  const mutualBenefit = match.algorithmData.mutualBenefit ?? Math.min(96, Math.round(score * 0.95));

  const reasons = match.explanation ?? [
    `Strong overlap in ${match.offered.slice(0, 2).join(" and ")}.`,
    "Availability aligns with your preferred learning windows.",
    "Community trust signals are above the platform average.",
  ];

  return (
    <GlassCard className={cn("p-5 transition-all duration-300 hover:-translate-y-0.5", compact ? "p-4" : "p-5")}> 
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gradient-navy)] text-lg font-bold text-[var(--primary)] shadow-lg">
          {match.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[var(--foreground)]">{match.name}</h3>
                <AIInsightBadge label="AI Match" tone="ai" />
              </div>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{match.title} · {match.location}</p>
            </div>
            <div className="rounded-full bg-[#D4A574]/15 px-2.5 py-1 text-right">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]">Match</p>
              <p className="text-lg font-semibold text-[var(--foreground)]">{score}%</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <LevelBadge level={Math.max(4, Math.round(score / 12))} />
            <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100">
              Confidence {confidence}%
            </span>
            {match.fairnessState && (
              <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                {match.fairnessState}
              </span>
            )}
          </div>

          <div className="mt-4 grid gap-2">
            {[
              { label: "Skill Overlap", value: match.algorithmData.skillOverlap },
              { label: "Level Similarity", value: levelSimilarity },
              { label: "Availability Match", value: availability },
              { label: "Mutual Benefit", value: mutualBenefit },
            ].map((metric) => (
              <div key={metric.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-200">
                  <span>{metric.label}</span>
                  <span className="font-semibold text-[var(--primary)]">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-1.5 bg-white/10" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
              Explainable AI enabled
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={() => onConnect?.(match)}>
                Connect
              </Button>
              <Button size="sm" variant="outline" onClick={() => setExpanded((v)=>!v)}>
                <span>Why this match?</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
              </Button>
            </div>
          </div>

          {expanded && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(10,18,29,0.65)] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <Users className="h-4 w-4 text-[var(--primary)]" />
                AI explanation
              </div>
              <ul className="space-y-2">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2 text-sm text-slate-200">
                    <Star className="mt-0.5 h-3.5 w-3.5 text-[var(--primary)]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
