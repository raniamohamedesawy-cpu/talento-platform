import { Home, Users, MessageSquare, User, Settings, Calendar, Award, BookOpen, Menu } from "lucide-react";
import { useLocation } from "react-router";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

interface AppSidebarProps {
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: "dashboard",      icon: Home,          label: "Dashboard"      },
  { id: "matches",        icon: Users,         label: "Matches"        },
  { id: "sessions",       icon: Calendar,      label: "Sessions"       },
  { id: "chat",           icon: MessageSquare, label: "Messages"       },
  { id: "learning-paths", icon: BookOpen,      label: "Learning Paths" },
  { id: "achievements",   icon: Award,         label: "Achievements"   },
  { id: "profile",        icon: User,          label: "Profile"        },
  { id: "settings",       icon: Settings,      label: "Settings"       },
];

function SidebarContent({
  onNavigate,
  onClose,
}: {
  onNavigate: (page: string) => void;
  onClose?: () => void;
}) {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col h-full bg-[var(--navy)]">
      <div className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === `/${item.id}` || pathname.startsWith(`/${item.id}/`);

          return (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose?.(); }}
              className={`
                w-full px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors
                ${isActive
                  ? "bg-[var(--primary)]/20 text-[var(--primary)] border-r-2 border-[var(--primary)]"
                  : "text-white/80 hover:bg-[var(--navy-light)] hover:text-white"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[var(--navy)] border-r border-[var(--navy-light)] h-full">
        <SidebarContent onNavigate={onNavigate} />
      </aside>

      {/* Mobile sidebar — hamburger button sits in the top-left of main content */}
      <div className="lg:hidden fixed bottom-4 left-4 z-40">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-[var(--navy)] text-white shadow-lg hover:bg-[var(--navy-light)]"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-0 bg-[var(--navy)]">
            <SidebarContent onNavigate={onNavigate} onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
