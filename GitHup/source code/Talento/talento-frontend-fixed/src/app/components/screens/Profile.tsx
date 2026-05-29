import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SkillBadge } from "../SkillBadge";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { MapPin, Briefcase, Calendar, Edit2, Star, Award, TrendingUp } from "lucide-react";

export function Profile() {
  const userRating = 4.8;
  const totalReviews = 24;
  const topAchievements = [
    { title: "Teaching Star", icon: Star, rarity: "rare" },
    { title: "Perfect Rating", icon: Award, rarity: "epic" },
  ];

  return (
    <div className="p-6 max-w-[900px] mx-auto space-y-6">
      <Card className="p-6 shadow-[var(--shadow-md)]">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-[var(--navy)] text-[var(--primary)] flex items-center justify-center text-3xl font-semibold">
            JD
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="mb-1">John Doe</h1>
                <p className="text-[var(--muted-foreground)]">Senior Frontend Developer</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[var(--primary)] text-[var(--primary)]" />
                    <span className="font-semibold">{userRating}</span>
                  </div>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    ({totalReviews} reviews)
                  </span>
                  <Badge className="bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20">
                    Level 8
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Tech Corp
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined March 2025
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-md)]">
        <h3 className="mb-4">Top Achievements</h3>
        <div className="flex gap-3">
          {topAchievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.title}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-[var(--primary)]/30 bg-[var(--primary)]/5"
              >
                <div className="p-2 rounded bg-[var(--primary)]/10">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <span className="font-medium text-sm">{achievement.title}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-md)]">
        <h2 className="mb-4">About</h2>
        <p className="text-[var(--foreground)] leading-relaxed">
          Passionate frontend developer with 8+ years of experience building scalable web
          applications. Looking to expand my backend skills while sharing my expertise in
          React and modern JavaScript frameworks.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between mb-4">
            <h3>Skills I Offer</h3>
            <Button variant="ghost" size="sm">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { skill: "React", level: "Expert", years: 6 },
              { skill: "TypeScript", level: "Advanced", years: 4 },
              { skill: "Node.js", level: "Intermediate", years: 3 },
              { skill: "CSS/Tailwind", level: "Expert", years: 7 },
              { skill: "JavaScript", level: "Expert", years: 8 },
            ].map((item) => (
              <div key={item.skill} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SkillBadge skill={item.skill} type="offered" size="sm" />
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {item.years} years
                  </span>
                </div>
                <span className="text-sm font-medium">{item.level}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            Add Skill
          </Button>
        </Card>

        <Card className="p-6 shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between mb-4">
            <h3>Skills I Want</h3>
            <Button variant="ghost" size="sm">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { skill: "Python", level: "Beginner" },
              { skill: "Data Science", level: "Beginner" },
              { skill: "Machine Learning", level: "Beginner" },
              { skill: "AWS", level: "Intermediate" },
            ].map((item) => (
              <div key={item.skill} className="flex items-center justify-between">
                <SkillBadge skill={item.skill} type="wanted" size="sm" />
                <span className="text-sm font-medium">{item.level}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            Add Skill
          </Button>
        </Card>
      </div>

      <Card className="p-6 shadow-[var(--shadow-md)]">
        <h2 className="mb-4">Availability</h2>
        <div className="space-y-4">
          <div>
            <Label>Preferred Meeting Times</Label>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Weekday evenings (7-9 PM PST)
            </p>
          </div>
          <div>
            <Label>Session Duration</Label>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              1 hour sessions, 2x per week
            </p>
          </div>
          <Button variant="outline">Update Availability</Button>
        </div>
      </Card>
    </div>
  );
}
