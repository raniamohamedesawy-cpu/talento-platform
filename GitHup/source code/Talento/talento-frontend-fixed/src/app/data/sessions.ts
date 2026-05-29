import type { Session } from "../types";

export const upcomingSessions: Session[] = [
  { id: 1, with: "Sarah Chen",    avatar: "SC", skill: "Python Basics",        date: "2026-04-28", time: "2:00 PM - 3:00 PM", type: "video", status: "confirmed" },
  { id: 2, with: "Marcus Johnson", avatar: "MJ", skill: "React Hooks",          date: "2026-04-30", time: "6:00 PM - 7:00 PM", type: "video", status: "pending" },
];

export const pastSessions: Session[] = [
  { id: 3, with: "Elena Rodriguez", avatar: "ER", skill: "UX Design Principles", date: "2026-04-20", time: "3:00 PM - 4:00 PM", rating: 5, review: "Excellent session! Very helpful and patient." },
  { id: 4, with: "David Kim",       avatar: "DK", skill: "Node.js APIs",         date: "2026-04-15", time: "5:00 PM - 6:00 PM", rating: 4, review: "Great explanations, learned a lot." },
];
