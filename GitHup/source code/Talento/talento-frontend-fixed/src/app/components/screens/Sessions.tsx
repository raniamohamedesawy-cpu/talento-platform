import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, Video, Star } from "lucide-react";
import { useState } from "react";
import { RatingModal } from "../RatingModal";
import { BookingModal } from "../BookingModal";
import { useApp } from "../../context/AppContext";
import { useToast } from "../Toast";
import { EmptyState } from "../ErrorStates";
import { SessionsSkeleton } from "../Skeletons";
import { useAsyncData } from "../../hooks/useAsyncData";
import type { Session } from "../../types";

export function Sessions() {
  const { upcomingSessions, pastSessions, addSession, addRating, spendCredits } = useApp();
  const { toast } = useToast();
  const { loading } = useAsyncData(500);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [ratingTarget, setRatingTarget] = useState<Session | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleRatingSubmit = (rating: number, review: string) => {
    if (!ratingTarget) return;
    addRating(ratingTarget.id, rating, review);
    setRatingTarget(null);
    toast("Review submitted successfully!");
  };

  const handleBookingConfirm = (date: Date, time: string) => {
    const newSession: Session = {
      id: Date.now(),
      with: "New Partner",
      avatar: "NP",
      skill: "New Skill",
      date: date.toISOString().split("T")[0],
      time,
      type: "Video Call",
      status: "pending",
    };
    addSession(newSession);
    spendCredits(10);
    setShowBooking(false);
    toast("Session scheduled! −10 credits", "info");
  };

  if (loading) return <SessionsSkeleton />;

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Sessions</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage your learning and teaching sessions
          </p>
        </div>
        <Button
          className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]"
          onClick={() => setShowBooking(true)}
        >
          Schedule New Session
        </Button>
      </div>

      <div className="flex gap-2 border-b border-[var(--border)]">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "upcoming"
              ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          Upcoming ({upcomingSessions.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "past"
              ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          Past Sessions ({pastSessions.length})
        </button>
      </div>

      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {upcomingSessions.length === 0 ? (
            <EmptyState
              title="No upcoming sessions"
              description="Schedule a session with one of your matches to get started."
              action={{ label: "Schedule Session", onClick: () => setShowBooking(true) }}
            />
          ) : (
            upcomingSessions.map((session) => (
              <Card key={session.id} className="p-5 shadow-[var(--shadow-md)]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--navy)] text-[var(--primary)] flex items-center justify-center text-xl font-semibold flex-shrink-0">
                    {session.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium mb-1">
                          {session.skill} with {session.with}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-[var(--muted-foreground)]">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(session.date).toLocaleDateString("en-US", {
                              weekday: "short", month: "short", day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {session.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            Video Call
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={
                          session.status === "confirmed"
                            ? "bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]/20"
                            : "bg-[var(--warning-light)] text-[var(--warning)] border-[var(--warning)]/20"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {session.status === "confirmed" && (
                        <Button size="sm" className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]">
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm">Cancel</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div className="space-y-4">
          {pastSessions.length === 0 ? (
            <EmptyState
              title="No past sessions yet"
              description="Your completed sessions will appear here."
            />
          ) : (
            pastSessions.map((session) => (
              <Card key={session.id} className="p-5 shadow-[var(--shadow-md)]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--navy)] text-[var(--primary)] flex items-center justify-center text-xl font-semibold flex-shrink-0">
                    {session.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">
                      {session.skill} with {session.with}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-[var(--muted-foreground)] mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(session.date).toLocaleDateString("en-US", {
                          weekday: "short", month: "short", day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </div>
                    </div>
                    {session.rating && (
                      <div className="bg-[var(--secondary)] rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">Your Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (session.rating ?? 0)
                                    ? "fill-[var(--primary)] text-[var(--primary)]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {session.review && (
                          <p className="text-sm text-[var(--muted-foreground)]">"{session.review}"</p>
                        )}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Book Again</Button>
                      {!session.rating && (
                        <Button
                          size="sm"
                          className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]"
                          onClick={() => setRatingTarget(session)}
                        >
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {ratingTarget && (
        <RatingModal
          open={!!ratingTarget}
          onClose={() => setRatingTarget(null)}
          userName={ratingTarget.with}
          skill={ratingTarget.skill}
          onSubmit={handleRatingSubmit}
        />
      )}

      <BookingModal
        open={showBooking}
        onClose={() => setShowBooking(false)}
        userName="your partner"
        skill="new skill"
        onConfirm={handleBookingConfirm}
      />
    </div>
  );
}
