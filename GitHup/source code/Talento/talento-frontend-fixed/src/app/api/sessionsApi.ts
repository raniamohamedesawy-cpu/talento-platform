import api from "../lib/axiosInstance";

export type SessionStatus = "UPCOMING" | "COMPLETED" | "CANCELLED";

export type ApiSession = {
  id: number;
  mentor?: any;
  learner?: any;
  skill?: string;
  sessionDate?: string;
  durationMinutes?: number;
  status?: SessionStatus;
  creditsUsed?: number;
};

export async function getUpcomingSessions() {
  const res = await api.get<ApiSession[]>('/api/sessions/upcoming');
  return res.data;
}

export async function getPastSessions() {
  const res = await api.get<ApiSession[]>('/api/sessions/past');
  return res.data;
}

export async function bookSession(payload: Partial<ApiSession> & { mentor: any }) {
  const res = await api.post<ApiSession>('/api/sessions/book', payload);
  return res.data;
}

export async function cancelSession(sessionId: number) {
  const res = await api.put<ApiSession>(`/api/sessions/${sessionId}/cancel`);
  return res.data;
}

