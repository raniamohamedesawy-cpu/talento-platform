/** Authenticated user from backend JWT / users API */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  title?: string | null;
  location?: string | null;
  bio?: string | null;
  roles?: string[];
}

export interface User {
  id: string;
  email?: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  level: number;
  credits: number;
  offeredSkills: string[];
  wantedSkills: string[];
  joinedDate: string;
  bio?: string;
  trustScore?: number;
  fairnessScore?: number;
}

export interface Match {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  offered: string[];
  wanted: string[];
  match: number;
  isNew: boolean;
  trustScore?: number;
  fairnessState?: "balanced" | "slight imbalance" | "unbalanced";
  explanation?: string[];
  algorithmData: AlgorithmData;
}

export interface AlgorithmData {
  name: string;
  matchScore: number;
  skillOverlap: number;
  availabilityMatch: number;
  ratingScore: number;
  responseRate: number;
  mutualBenefit?: number;
  levelSimilarity?: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isSelf: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  skills: string[];
  messages: Message[];
}

export interface Session {
  id: number;
  with: string;
  avatar: string;
  skill: string;
  date: string;
  time: string;
  type?: string;
  status?: "confirmed" | "pending";
  rating?: number;
  review?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

export type Page =
  | "dashboard"
  | "profile"
  | "matches"
  | "chat"
  | "sessions"
  | "learning-paths"
  | "achievements"
  | "video-call"
  | "settings";
