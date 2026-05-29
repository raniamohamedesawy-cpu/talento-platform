import { cn } from "./utils";
import { GlassCard } from "./glass-card";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <GlassCard className={cn("p-5 animate-pulse", className)}>
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-full bg-white/30 dark:bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded-full bg-white/35 dark:bg-white/10" />
          <div className="h-2.5 w-2/3 rounded-full bg-white/25 dark:bg-white/10" />
          <div className="h-2.5 w-1/2 rounded-full bg-white/20 dark:bg-white/10" />
        </div>
      </div>
    </GlassCard>
  );
}
