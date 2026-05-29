import type { User } from "../types";

export const mockUser: User = {
  id: "current-user",
  name: "John Doe",
  avatar: "JD",
  title: "Senior Frontend Developer",
  location: "San Francisco, CA",
  rating: 4.8,
  reviewCount: 24,
  level: 8,
  credits: 45,
  offeredSkills: ["React", "TypeScript", "JavaScript", "Next.js", "TailwindCSS"],
  wantedSkills: ["Python", "Data Science", "Machine Learning", "AWS"],
  joinedDate: "March 2025",
  bio: "Passionate frontend developer with 6+ years of experience. I love teaching React and learning new technologies.",
};

export const dashboardStats = [
  { label: "Active Matches",    value: "12", iconName: "Users",         color: "text-[var(--primary)]",  bgColor: "bg-[var(--primary)]/10" },
  { label: "Upcoming Sessions", value: "2",  iconName: "Calendar",      color: "text-[var(--success)]",  bgColor: "bg-[var(--success)]/10" },
  { label: "New Messages",      value: "8",  iconName: "MessageSquare", color: "text-[var(--warning)]",  bgColor: "bg-[var(--warning)]/10" },
  { label: "Achievements",      value: "3",  iconName: "Award",         color: "text-[var(--navy)]",     bgColor: "bg-[var(--navy)]/10" },
];
