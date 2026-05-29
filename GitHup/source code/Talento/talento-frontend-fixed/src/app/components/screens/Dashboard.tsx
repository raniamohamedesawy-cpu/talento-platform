import { Card } from "../ui/card";
import { SkillBadge } from "../SkillBadge";
import { Button } from "../ui/button";
import { CreditBalance } from "../CreditBalance";
import { Users, MessageSquare, Calendar, Award, Zap, TrendingUp, Shield, Sparkles } from "lucide-react";
import { DashboardSkeleton } from "../Skeletons";
import { ErrorState } from "../ErrorStates";
import { useAsyncData } from "../../hooks/useAsyncData";
import { getStoredUser } from "../../api/authApi";
import { mockUser, dashboardStats } from "../../data/user";
import { dashboardMatches } from "../../data/matches";
import { useApp } from "../../context/AppContext";
import { useState, useMemo } from "react";

const STAT_ICONS = { Users, Calendar, MessageSquare, Award } as const;

// ============================================================================
// TRUST SCORE COMPONENT - Animated circular progress with breakdown
// ============================================================================
function TrustScoreCircle({ score = 78, tier = "verified" }: { score?: number; tier?: "trusted" | "verified" | "new" }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const tierConfig = {
    trusted: { color: "var(--trust-high)", label: "Highly Trusted", bgGradient: "from-green-500/20 to-emerald-500/10" },
    verified: { color: "var(--trust-medium)", label: "Verified", bgGradient: "from-amber-500/20 to-yellow-500/10" },
    new: { color: "var(--trust-low)", label: "New User", bgGradient: "from-red-500/20 to-orange-500/10" },
  };

  const config = tierConfig[tier];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          {/* Animated progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: "drop-shadow(0 0 8px rgba(212, 165, 116, 0.5))" }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[var(--foreground)]">{score}</span>
          <span className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide">Score</span>
        </div>
      </div>

      {/* Tier badge */}
      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${config.bgGradient} border border-current`} style={{ color: config.color }}>
        {config.label}
      </div>

      {/* Trust metrics breakdown */}
      <div className="w-full space-y-2 pt-2">
        {[
          { label: "Completion Rate", value: 94 },
          { label: "Reliability", value: 87 },
          { label: "Communication", value: 92 },
        ].map((metric) => (
          <div key={metric.label} className="flex items-center justify-between text-xs">
            <span className="text-[var(--muted)]">{metric.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-[var(--background-secondary)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-full transition-all duration-500"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <span className="font-semibold text-[var(--foreground)] min-w-[24px]">{metric.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// AI MATCH CARD - Premium match with AI explanation
// ============================================================================
function AIMatchCard({ match }: { match: any }) {
  const [expandedExplanation, setExpandedExplanation] = useState(false);

  const matchBreakdown = [
    { metric: "Skill Overlap", value: Math.floor(Math.random() * 30 + 60) },
    { metric: "Level Match", value: Math.floor(Math.random() * 25 + 70) },
    { metric: "Availability", value: Math.floor(Math.random() * 40 + 55) },
    { metric: "Mutual Benefit", value: Math.floor(Math.random() * 35 + 65) },
  ];

  const avgConfidence = Math.round(matchBreakdown.reduce((sum, m) => sum + m.value, 0) / matchBreakdown.length);

  return (
    <div className="glass rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/10 group overflow-hidden relative">
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-[var(--navy)] flex items-center justify-center font-bold text-lg">
              {match.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[var(--foreground)] truncate">{match.name}</h4>
              <p className="text-xs text-[var(--muted)] flex items-center gap-2 mt-1">
                <Sparkles className="w-3 h-3" />
                AI Recommended
              </p>
            </div>
          </div>

          {/* Match percentage badge */}
          <div className="flex flex-col items-center gap-1">
            <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-[var(--success)]/20 to-[var(--success)]/10 border border-[var(--success)]/30">
              <span className="text-sm font-bold text-[var(--success)]">{match.match}%</span>
            </div>
            <span className="text-xs font-medium text-[var(--muted)]">Match</span>
          </div>
        </div>

        {/* Skills showcase */}
        <div className="space-y-2.5 mb-4">
          <div>
            <p className="text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wide">Offers</p>
            <div className="flex flex-wrap gap-1.5">
              {match.offered.map((skill: string) => (
                <SkillBadge key={skill} skill={skill} type="offered" size="sm" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wide">Wants</p>
            <div className="flex flex-wrap gap-1.5">
              {match.wanted.map((skill: string) => (
                <SkillBadge key={skill} skill={skill} type="wanted" size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* AI Confidence level */}
        <div className="mb-4 p-3 bg-white/5 backdrop-blur rounded-lg border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">AI Confidence</span>
            <span className="text-sm font-bold text-[var(--primary)]">{avgConfidence}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-full transition-all duration-700"
              style={{ width: `${avgConfidence}%` }}
            />
          </div>
        </div>

        {/* Expandable AI explanation */}
        <button
          onClick={() => setExpandedExplanation(!expandedExplanation)}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-xs font-medium text-[var(--primary)] transition-all flex items-center justify-between group/btn"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            {expandedExplanation ? "Hide" : "Show"} AI Analysis
          </span>
          <span className={`transition-transform duration-300 ${expandedExplanation ? "rotate-180" : ""}`}>▼</span>
        </button>

        {/* AI Explanation panel */}
        {expandedExplanation && (
          <div className="mt-4 p-3 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--navy)]/10 border border-[var(--primary)]/20 rounded-lg space-y-3 animate-in fade-in duration-300">
            <h5 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wide">Why This Match?</h5>

            {/* Breakdown metrics */}
            <div className="space-y-2.5">
              {matchBreakdown.map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <span className="text-xs text-[var(--muted)]">{item.metric}</span>
                  <div className="flex items-center gap-2 flex-1 ml-3">
                    <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[var(--foreground)] min-w-[28px] text-right">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI insight */}
            <p className="text-xs text-[var(--muted)] leading-relaxed pt-2 border-t border-white/10">
              <span className="font-semibold text-[var(--primary)]">AI Insight:</span> {match.name} is an ideal match for skill exchange based on complementary skill sets and schedule availability.
            </p>
          </div>
        )}

        {/* Action button */}
        <Button className="w-full mt-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:shadow-lg hover:shadow-[var(--primary)]/30 text-[var(--navy)] font-semibold transition-all">
          View Full Profile
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// STAT CARD - Premium stat card with trend indicator
// ============================================================================
function PremiumStatCard({ stat }: { stat: any }) {
  const Icon = STAT_ICONS[stat.iconName as keyof typeof STAT_ICONS];
  const isPositive = Math.random() > 0.5;

  return (
    <div className="glass rounded-xl p-4 border border-white/10 hover:border-[var(--primary)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/5 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">{stat.label}</p>
            <p className="text-3xl font-bold text-[var(--foreground)] mt-2">{stat.value}</p>
          </div>
          <div className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Trend indicator */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${isPositive ? "bg-[var(--success)]/20" : "bg-[var(--warning)]/20"}`}>
            <TrendingUp className={`h-3 w-3 ${isPositive ? "text-[var(--success)]" : "text-[var(--warning)]"}`} />
            <span className={`font-semibold ${isPositive ? "text-[var(--success)]" : "text-[var(--warning)]"}`}>
              {isPositive ? "↑" : "↓"} {Math.floor(Math.random() * 20 + 5)}%
            </span>
          </div>
          <span className="text-[var(--muted)]">vs last week</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================
export function Dashboard() {
  const { loading, error } = useAsyncData(800);
  const { matches: apiMatches } = useApp();
  const authUser = getStoredUser();
  const firstName = (authUser?.name ?? mockUser.name).split(" ")[0];
  const previewMatches = apiMatches.length > 0 ? apiMatches.slice(0, 3) : dashboardMatches;

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorState message="Couldn't load your dashboard." onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* ===== HERO SECTION ===== */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--foreground)] to-[var(--primary)] bg-clip-text text-transparent">
              Welcome back, {firstName}
            </h1>
            <span className="text-3xl">👋</span>
          </div>
          <p className="text-[var(--muted)] text-lg max-w-md">
            Here's your AI-powered skill exchange hub with explainable recommendations.
          </p>
        </div>

        {/* ===== PREMIUM STAT GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat) => (
            <PremiumStatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== AI MATCHES SECTION (2/3 width) ===== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">AI-Recommended Matches</h2>
                <p className="text-sm text-[var(--muted)] mt-1">Intelligent matches based on your skills and goals</p>
              </div>
              <Button variant="outline" className="hidden md:flex">
                View All
              </Button>
            </div>

            {/* Match cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previewMatches.map((match) => (
                <AIMatchCard key={match.name} match={match} />
              ))}
            </div>
          </div>

          {/* ===== SIDEBAR (1/3 width) ===== */}
          <div className="space-y-6">
            {/* Trust Score Card */}
            <div className="glass rounded-xl p-6 border border-white/10 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Your Trust Score</h3>
              <TrustScoreCircle score={78} tier="verified" />
            </div>

            {/* Credits Card */}
            <div className="glass rounded-xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">Credit Balance</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-[var(--primary)]">42</span>
                <span className="text-sm text-[var(--muted)]">credits available</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div className="h-full w-2/3 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]" />
              </div>
              <p className="text-xs text-[var(--muted)] mb-4">Earn more by completing skill exchanges</p>
              <Button className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-[var(--navy)] font-semibold">
                <Zap className="w-4 h-4 mr-2" />
                Earn Credits
              </Button>
            </div>

            {/* Premium Upgrade */}
            <div className="glass rounded-xl p-6 border border-[var(--primary)]/30 bg-gradient-to-br from-[var(--primary)]/10 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent opacity-50" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-[var(--primary)]" />
                  <h3 className="font-semibold text-[var(--foreground)]">Upgrade to Premium</h3>
                </div>
                <p className="text-sm text-[var(--muted)] mb-4">
                  Unlock unlimited matches, priority support, and AI insights
                </p>
                <Button className="w-full bg-[var(--primary)] text-[var(--navy)] hover:shadow-lg hover:shadow-[var(--primary)]/30 font-semibold">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
