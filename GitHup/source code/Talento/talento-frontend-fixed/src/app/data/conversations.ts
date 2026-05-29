import type { Conversation } from "../types";

export const initialConversations: Conversation[] = [
  {
    id: "0",
    name: "Sarah Chen",
    avatar: "SC",
    lastMessage: "That sounds great! When are you free?",
    time: "2m ago",
    unread: 2,
    skills: ["React", "Python"],
    messages: [
      { id: "1", sender: "Sarah Chen", content: "Hi! I saw we're a great match. I'd love to learn React from you!", time: "10:30 AM", isSelf: false },
      { id: "2", sender: "You",        content: "Hi Sarah! Happy to help. Are you looking for basics or advanced concepts?", time: "10:32 AM", isSelf: true },
      { id: "3", sender: "Sarah Chen", content: "I'd love to learn hooks and state management in depth.", time: "10:35 AM", isSelf: false },
      { id: "4", sender: "You",        content: "Perfect! In exchange, I'd love to learn Python for data science.", time: "10:36 AM", isSelf: true },
      { id: "5", sender: "Sarah Chen", content: "Let's do a skill swap — one session each?", time: "10:38 AM", isSelf: false },
      { id: "6", sender: "You",        content: "That sounds great! When are you free?", time: "10:40 AM", isSelf: true },
    ],
  },
  { id: "1", name: "Marcus Johnson",  avatar: "MJ", lastMessage: "I'd love to learn more about TypeScript", time: "1h ago",  unread: 0, skills: ["Python", "React"],          messages: [{ id: "1", sender: "Marcus Johnson",  content: "I'd love to learn more about TypeScript", time: "1h ago",  isSelf: false }] },
  { id: "2", name: "Elena Rodriguez", avatar: "ER", lastMessage: "Thanks for the design tips!",             time: "3h ago",  unread: 1, skills: ["UX Design", "JavaScript"], messages: [{ id: "1", sender: "Elena Rodriguez", content: "Thanks for the design tips!",             time: "3h ago",  isSelf: false }] },
  { id: "3", name: "David Kim",       avatar: "DK", lastMessage: "Let's schedule our next session",         time: "1d ago",  unread: 0, skills: ["Node.js", "AWS"],           messages: [{ id: "1", sender: "David Kim",       content: "Let's schedule our next session",         time: "1d ago",  isSelf: false }] },
];
