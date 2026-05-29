import { cn } from "./ui/utils";

interface SkillBadgeProps {
  skill: string;
  type: "offered" | "wanted";
  size?: "sm" | "md";
  className?: string;
}

export function SkillBadge({ skill, type, size = "md", className }: SkillBadgeProps) {
  const isOffered = type === "offered";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        isOffered
          ? "bg-[rgba(46,125,94,0.12)] text-[var(--success)] border border-[rgba(46,125,94,0.35)]"
          : "bg-[rgba(232,151,62,0.12)] text-[var(--warning)] border border-[rgba(232,151,62,0.35)]",

        className
      )}
    >
      {skill}
    </span>
  );
}
