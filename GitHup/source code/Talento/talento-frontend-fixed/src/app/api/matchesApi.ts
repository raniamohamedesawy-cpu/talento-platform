import api from "../lib/axiosInstance";

export type ApiMatch = {
  id: number;
  requester: any;
  matchedUser: any;
  offeredSkill?: string | null;
  wantedSkill?: string | null;
  score?: number | null;
  connected?: boolean | null;
  createdAt?: string;
};

export async function searchMatches(query?: string) {
  await api.post("/api/matches/search", { query: query ?? "" });
  const res = await api.get<ApiMatch[]>("/api/matches");
  return res.data;
}

export async function getMatches() {
  const res = await api.get<ApiMatch[]>('/api/matches');
  return res.data;
}

export async function connectMatch(matchId: number) {
  const res = await api.post<ApiMatch>(`/api/matches/${matchId}/connect`);
  return res.data;
}

