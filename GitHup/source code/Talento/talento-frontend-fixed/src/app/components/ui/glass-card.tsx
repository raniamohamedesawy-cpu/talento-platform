import * as React from "react";
import { cn } from "./utils";

export function GlassCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="glass-card"
      className={cn(
        "glass rounded-[var(--radius-lg)] border border-white/18 bg-white/65 text-[var(--foreground)] shadow-[var(--shadow-xl)] backdrop-blur-xl dark:bg-[rgba(11,20,31,0.72)] dark:border-white/10 dark:text-slate-50",
        className,
      )}
      {...props}
    />
  );
}
