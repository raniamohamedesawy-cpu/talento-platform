import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SkillBadge } from "../SkillBadge";
import { Input } from "../ui/input";
import { Search, Filter, TrendingUp, Info } from "lucide-react";
import { Badge } from "../ui/badge";
import { MatchingAlgorithm } from "../MatchingAlgorithm";
import { BookingModal } from "../BookingModal";
import { useState, useMemo, useEffect } from "react";
import { CardSkeleton } from "../Skeletons";
import { ErrorState, EmptyState } from "../ErrorStates";
import { useApp } from "../../context/AppContext";
import { useToast } from "../Toast";
import { connectMatch } from "../../api/matchesApi";
import type { Match, Session } from "../../types";
import { mockMatches } from "../../data/matches";

interface MatchesProps {
  searchQuery?: string;
}

export function Matches({ searchQuery = "" }: MatchesProps) {
  const {
    spendCredits,
    addSession,
    matches: contextMatches,
    matchesLoading,
    matchesError,
    searchMatches,
    reload,
  } = useApp();
  const { toast } = useToast();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showAlgorithm, setShowAlgorithm] = useState<string | null>(null);
  const [bookingTarget, setBookingTarget] = useState<Match | null>(null);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const q = localSearch || searchQuery;
    if (q.trim()) {
      searchMatches(q).catch(() => undefined);
    }
  }, [localSearch, searchQuery, searchMatches]);

  const activeQuery = localSearch || searchQuery;
  const sourceMatches = contextMatches.length > 0 ? contextMatches : mockMatches;

  const filtered = useMemo(() => {
    if (!activeQuery.trim()) return sourceMatches;
    const q = activeQuery.toLowerCase();
    return sourceMatches.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.offered.some((s) => s.toLowerCase().includes(q)) ||
        m.wanted.some((s) => s.toLowerCase().includes(q)) ||
        m.title.toLowerCase().includes(q)
    );
  }, [activeQuery, sourceMatches]);

  const handleConnect = async (match: Match) => {
    const numericId = Number(match.id);
    if (!Number.isNaN(numericId) && numericId > 0) {
      try {
        await connectMatch(numericId);
        toast(`Connected with ${match.name}!`, "success");
        await reload();
        return;
      } catch {
        // fall through to booking modal for demo/offline mode
      }
    }
    setBookingTarget(match);
  };

  const handleBookingConfirm = (date: Date, time: string) => {
    if (!bookingTarget) return;
    const newSession: Session = {
      id: Date.now(),
      with: bookingTarget.name,
      avatar: bookingTarget.avatar,
      skill: bookingTarget.offered[0] ?? "Skill Exchange",
      date: date.toISOString().split("T")[0],
      time,
      type: "Video Call",
      status: "pending",
    };
    addSession(newSession);
    spendCredits(10);
    setBookingTarget(null);
    toast(`Session booked with ${bookingTarget.name}! −10 credits`, "info");
  };

  if (matchesError) {
    return (
      <ErrorState
        message="Couldn't load matches. Check your connection and try again."
        type="network"
        onRetry={() => reload()}
      />
    );
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Your Matches</h1>
        <p className="text-[var(--muted-foreground)]">
          Connect with people who have the skills you want and want the skills you have
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or skill..."
            className="pl-9"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            aria-label="Search matches"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {activeQuery && (
        <p className="text-sm text-[var(--muted-foreground)]">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{activeQuery}&quot;
        </p>
      )}

      {matchesLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matches found"
          description={`No one matches "${activeQuery}". Try a different skill or name.`}
          action={{ label: "Clear search", onClick: () => setLocalSearch("") }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((match: Match) => (
            <div key={match.id} className="space-y-3">
              <Card className="p-5 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--navy)] text-[var(--primary)] flex items-center justify-center text-xl font-semibold flex-shrink-0">
                    {match.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{match.name}</h3>
                          {match.isNew && (
                            <Badge className="bg-[var(--primary)] text-[var(--navy)] text-xs px-2 py-0 font-semibold">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)]">{match.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{match.location}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[var(--success)] font-semibold">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">{match.match}%</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)] mb-1">Offers:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.offered.map((skill) => (
                            <SkillBadge key={skill} skill={skill} type="offered" size="sm" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)] mb-1">Wants:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.wanted.map((skill) => (
                            <SkillBadge key={skill} skill={skill} type="wanted" size="sm" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        size="sm"
                        onClick={() => handleConnect(match)}
                      >
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        aria-label="View match score breakdown"
                        onClick={() =>
                          setShowAlgorithm(showAlgorithm === match.id ? null : match.id)
                        }
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              {showAlgorithm === match.id && (
                <MatchingAlgorithm match={match.algorithmData} />
              )}
            </div>
          ))}
        </div>
      )}

      {bookingTarget && (
        <BookingModal
          open={!!bookingTarget}
          onClose={() => setBookingTarget(null)}
          userName={bookingTarget.name}
          skill={bookingTarget.offered[0] ?? "Skill Exchange"}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}
