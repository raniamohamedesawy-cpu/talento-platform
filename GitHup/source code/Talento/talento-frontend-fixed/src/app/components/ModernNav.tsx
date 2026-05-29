import { useState } from "react";
import { Bell, Search, MessageSquare, Coins, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { getStoredUser } from "../api/authApi";
import { mockUser } from "../data/user";
import { useApp } from "../context/AppContext";

interface ModernNavProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  onLogout?: () => void;
}

function userInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ModernNav({ onNavigate, onSearch, onLogout }: ModernNavProps) {
  const { credits } = useApp();
  const authUser = getStoredUser();
  const displayName = authUser?.name ?? mockUser.name;
  const avatar = authUser ? userInitials(authUser.name) : mockUser.avatar;
  const [query, setQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    navigate("/matches");
    setShowMobileSearch(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgba(13,24,37,0.78)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => onNavigate("dashboard")} className="flex-shrink-0 rounded-full p-1.5 transition-opacity hover:opacity-80">
            <Logo variant="navbar" className="h-8 w-auto" />
          </button>
          <div className="hidden md:flex flex-1 max-w-md items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
            <Search className="mr-2 h-4 w-4 text-slate-300" />
            <Input
              type="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search skills, people, or AI insights"
              className="border-0 bg-transparent px-0 text-sm placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {query && (
              <button onClick={clearSearch} className="rounded-full p-1 text-slate-300 hover:text-white" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-[#D4A574]/25 bg-[#D4A574]/10 px-3 py-1.5 text-xs font-semibold text-[#F4D1A0] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#D4A574]" />
            Premium AI
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/5" onClick={() => setShowMobileSearch((v)=>!v)} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          <button onClick={() => onNavigate("dashboard")} className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-[#F4D1A0] sm:flex" aria-label={`${credits} credits available`}>
            <Coins className="h-4 w-4 text-[#D4A574]" />
            <span>{credits}</span>
          </button>

          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/5" onClick={() => onNavigate("chat")} aria-label="View messages">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#D4A574]" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden text-white hover:bg-white/5 sm:flex" onClick={() => onNavigate("chat")} aria-label="Open chat">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <ThemeToggle className="text-white hover:bg-white/5" />

          {onLogout && (
            <Button variant="ghost" size="icon" className="hidden text-white hover:bg-white/5 sm:flex" onClick={onLogout} aria-label="Sign out">
              <LogOut className="h-5 w-5" />
            </Button>
          )}

          <button onClick={() => onNavigate("profile")} aria-label={`View profile for ${displayName}`} className="rounded-full p-0.5 ring-1 ring-[#D4A574]/25">
            <Avatar className="h-9 w-9 cursor-pointer hover:opacity-90 transition-opacity">
              <AvatarFallback className="bg-gradient-to-br from-[#D4A574] to-[#B88950] text-[var(--navy)] text-sm font-semibold">
                {avatar}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      {showMobileSearch && (
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
            <Search className="mr-2 h-4 w-4 text-slate-300" />
            <Input
              type="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search skills or people"
              className="border-0 bg-transparent px-0 text-sm placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            {query && (
              <button onClick={clearSearch} className="rounded-full p-1 text-slate-300 hover:text-white" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
