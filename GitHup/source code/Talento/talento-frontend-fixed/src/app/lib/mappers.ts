import type { ApiMatch } from "../api/matchesApi";
import type { ApiSession } from "../api/sessionsApi";
import type { Match, Session } from "../types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function pickUser(api: ApiMatch): Record<string, unknown> {
  return (api.matchedUser ?? api.requester ?? {}) as Record<string, unknown>;
}

export function mapApiMatchToUi(api: ApiMatch): Match {
  const user = pickUser(api);
  const name = String(user.name ?? "User");
  const score = Math.round(Number(api.score ?? 0) * (api.score && api.score <= 1 ? 100 : 1));

  return {
    id: String(api.id),
    name,
    avatar: initials(name),
    title: String(user.title ?? "Skill exchanger"),
    location: String(user.location ?? ""),
    offered: api.offeredSkill ? [api.offeredSkill] : [],
    wanted: api.wantedSkill ? [api.wantedSkill] : [],
    match: score || 75,
    isNew: !api.connected,
    algorithmData: {
      name,
      matchScore: score || 75,
      skillOverlap: Math.min(95, score + 10),
      availabilityMatch: 80,
      ratingScore: 85,
      responseRate: 90,
    },
  };
}

export function mapApiSessionToUi(api: ApiSession, role: "upcoming" | "past"): Session {
  const partner =
    role === "upcoming"
      ? (api.mentor ?? api.learner ?? {})
      : (api.mentor ?? api.learner ?? {});
  const name = String(partner.name ?? "Partner");
  const dateStr = api.sessionDate ?? new Date().toISOString();

  return {
    id: api.id,
    with: name,
    avatar: initials(name),
    skill: api.skill ?? "Skill Exchange",
    date: dateStr.split("T")[0],
    time: new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    type: "Video Call",
    status: api.status === "UPCOMING" ? "confirmed" : "pending",
  };
}
