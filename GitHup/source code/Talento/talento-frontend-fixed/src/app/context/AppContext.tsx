import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Conversation, Match, Session } from "../types";
import { initialConversations } from "../data/conversations";
import {
  upcomingSessions as initialUpcoming,
  pastSessions as initialPast,
} from "../data/sessions";
import { mockMatches } from "../data/matches";
import { getBalance } from "../api/creditsApi";
import { getMatches, searchMatches as searchMatchesApi } from "../api/matchesApi";
import { getUpcomingSessions, getPastSessions } from "../api/sessionsApi";
import { getStoredUser, isAuthenticated } from "../api/authApi";
import { mapApiMatchToUi, mapApiSessionToUi } from "../lib/mappers";

interface AppContextValue {
  credits: number;
  spendCredits: (amount: number) => void;
  earnCredits: (amount: number) => void;
  conversations: Conversation[];
  setConversations: (convs: Conversation[]) => void;
  upcomingSessions: Session[];
  pastSessions: Session[];
  addSession: (session: Session) => void;
  addRating: (sessionId: number, rating: number, review: string) => void;
  matches: Match[];
  matchesLoading: boolean;
  matchesError: boolean;
  reload: () => Promise<void>;
  searchMatches: (query?: string) => Promise<void>;
  useApiData: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(45);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>(initialUpcoming);
  const [pastSessions, setPastSessions] = useState<Session[]>(initialPast);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [matchesError, setMatchesError] = useState(false);
  const [useApiData, setUseApiData] = useState(false);

  const spendCredits = (amount: number) =>
    setCredits((prev) => Math.max(0, prev - amount));

  const earnCredits = (amount: number) => setCredits((prev) => prev + amount);

  const addSession = (session: Session) =>
    setUpcomingSessions((prev) => [session, ...prev]);

  const addRating = (sessionId: number, rating: number, review: string) =>
    setPastSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, rating, review } : s))
    );

  const reload = useCallback(async () => {
    if (!isAuthenticated()) return;

    setMatchesLoading(true);
    setMatchesError(false);

    try {
      const [apiMatches, upcoming, past, balance] = await Promise.all([
        getMatches(),
        getUpcomingSessions(),
        getPastSessions(),
        getBalance(),
      ]);

      if (apiMatches.length > 0) {
        setMatches(apiMatches.map(mapApiMatchToUi));
        setUseApiData(true);
      }

      if (upcoming.length > 0) {
        setUpcomingSessions(upcoming.map((s) => mapApiSessionToUi(s, "upcoming")));
        setUseApiData(true);
      }

      if (past.length > 0) {
        setPastSessions(past.map((s) => mapApiSessionToUi(s, "past")));
        setUseApiData(true);
      }

      setCredits(balance.credits);
    } catch {
      setMatchesError(true);
      setUseApiData(false);
    } finally {
      setMatchesLoading(false);
    }
  }, []);

  const searchMatches = useCallback(
    async (query?: string) => {
      if (!isAuthenticated()) return;

      setMatchesLoading(true);
      setMatchesError(false);

      try {
        if (query && query.trim().length > 0) {
          const results = await searchMatchesApi(query.trim());
          setMatches(
            results.length > 0 ? results.map(mapApiMatchToUi) : mockMatches.filter(
              (m) =>
                m.name.toLowerCase().includes(query.toLowerCase()) ||
                m.offered.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
                m.wanted.some((s) => s.toLowerCase().includes(query.toLowerCase()))
            )
          );
        } else {
          await reload();
        }
        setUseApiData(true);
      } catch {
        setMatchesError(true);
      } finally {
        setMatchesLoading(false);
      }
    },
    [reload]
  );

  useEffect(() => {
    if (getStoredUser()) {
      reload().catch(() => undefined);
    }
  }, [reload]);

  return (
    <AppContext.Provider
      value={{
        credits,
        spendCredits,
        earnCredits,
        conversations,
        setConversations,
        upcomingSessions,
        pastSessions,
        addSession,
        addRating,
        matches,
        matchesLoading,
        matchesError,
        reload,
        searchMatches,
        useApiData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
