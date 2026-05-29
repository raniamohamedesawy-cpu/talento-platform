import { Card } from "./ui/card";

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[var(--muted)] rounded ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex gap-4">
        <Shimmer className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Shimmer className="h-4 w-1/3" />
          <Shimmer className="h-3 w-1/4" />
          <div className="flex gap-2">
            <Shimmer className="h-6 w-16 rounded-full" />
            <Shimmer className="h-6 w-16 rounded-full" />
            <Shimmer className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Shimmer className="h-8 w-24 rounded-md" />
            <Shimmer className="h-8 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function StatSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-7 w-12" />
        </div>
        <Shimmer className="w-9 h-9 rounded-lg" />
      </div>
    </Card>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {[false, true, false, true].map((isSelf, i) => (
        <div key={i} className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
          <Shimmer className={`h-12 rounded-lg ${isSelf ? "w-56" : "w-72"}`} />
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="space-y-2">
        <Shimmer className="h-8 w-56" />
        <Shimmer className="h-4 w-80" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <StatSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
        </div>
        <div className="space-y-3">
          <Shimmer className="h-48 rounded-lg" />
          <Shimmer className="h-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SessionsSkeleton() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Shimmer className="h-8 w-32" />
          <Shimmer className="h-4 w-64" />
        </div>
        <Shimmer className="h-10 w-44 rounded-md" />
      </div>
      <div className="flex gap-4 border-b border-[var(--border)] pb-0">
        <Shimmer className="h-9 w-36" />
        <Shimmer className="h-9 w-40" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-[var(--border)] p-5">
            <div className="flex gap-4">
              <Shimmer className="w-16 h-16 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <Shimmer className="h-4 w-48" />
                <div className="flex gap-3">
                  <Shimmer className="h-4 w-24" />
                  <Shimmer className="h-4 w-20" />
                </div>
                <div className="flex gap-2">
                  <Shimmer className="h-8 w-24 rounded-md" />
                  <Shimmer className="h-8 w-24 rounded-md" />
                </div>
              </div>
              <Shimmer className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AchievementsSkeleton() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="space-y-2">
        <Shimmer className="h-8 w-44" />
        <Shimmer className="h-4 w-72" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <StatSkeleton key={i} />)}
      </div>
      <Shimmer className="h-24 w-full rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export function LearningPathsSkeleton() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="space-y-2">
        <Shimmer className="h-8 w-44" />
        <Shimmer className="h-4 w-80" />
      </div>
      {[1, 2].map((i) => (
        <div key={i} className="rounded-lg border border-[var(--border)] p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex gap-3">
                <Shimmer className="h-6 w-48" />
                <Shimmer className="h-6 w-24 rounded-full" />
              </div>
              <Shimmer className="h-4 w-3/4" />
              <div className="flex gap-4">
                <Shimmer className="h-4 w-32" />
                <Shimmer className="h-4 w-28" />
              </div>
            </div>
            <Shimmer className="w-12 h-12 rounded-lg" />
          </div>
          <Shimmer className="h-2 w-full rounded-full" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((j) => (
              <Shimmer key={j} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
