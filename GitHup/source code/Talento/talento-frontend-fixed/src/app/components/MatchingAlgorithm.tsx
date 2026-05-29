import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { TrendingUp, Target, Users, Clock, Star } from "lucide-react";

interface MatchingAlgorithmProps {
  match: {
    name: string;
    matchScore: number;
    skillOverlap: number;
    availabilityMatch: number;
    ratingScore: number;
    responseRate: number;
  };
}

export function MatchingAlgorithm({ match }: MatchingAlgorithmProps) {
  const factors = [
    {
      label: "Skill Overlap",
      value: match.skillOverlap,
      icon: Target,
      description: "How well your wanted skills match their offered skills",
    },
    {
      label: "Availability Match",
      value: match.availabilityMatch,
      icon: Clock,
      description: "Compatible scheduling and time zones",
    },
    {
      label: "Rating Score",
      value: match.ratingScore,
      icon: Star,
      description: "Their teaching rating from past students",
    },
    {
      label: "Response Rate",
      value: match.responseRate,
      icon: Users,
      description: "How quickly they typically respond to messages",
    },
  ];

  return (
    <Card className="p-5 shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-[var(--primary)]" />
        <h3>Match Score Breakdown</h3>
      </div>

      <div className="mb-4 p-4 rounded-lg bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)]">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">Overall Match</span>
          <span className="text-3xl font-semibold text-[var(--primary)]">
            {match.matchScore}%
          </span>
        </div>
        <Progress
          value={match.matchScore}
          className="h-2 mt-2 bg-white/20"
        />
      </div>

      <div className="space-y-3">
        {factors.map((factor) => {
          const Icon = factor.icon;
          return (
            <div
              key={factor.label}
              className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 rounded bg-[var(--primary)]/10">
                  <Icon className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{factor.label}</span>
                    <span className="text-sm font-semibold text-[var(--primary)]">
                      {factor.value}%
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {factor.description}
                  </p>
                  <Progress value={factor.value} className="h-1.5 mt-2" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-[var(--accent)] border border-[var(--primary)]/20">
        <p className="text-xs text-[var(--muted-foreground)]">
          <span className="font-medium text-[var(--foreground)]">
            How it works:
          </span>{" "}
          Our algorithm analyzes skill compatibility, schedules, ratings, and
          engagement to find your best matches for meaningful skill exchanges.
        </p>
      </div>
    </Card>
  );
}
