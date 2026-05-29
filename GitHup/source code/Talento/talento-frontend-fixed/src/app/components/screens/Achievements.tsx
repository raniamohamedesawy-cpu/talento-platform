import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { AchievementsSkeleton } from "../Skeletons";
import { ErrorState } from "../ErrorStates";
import { useAsyncData } from "../../hooks/useAsyncData";
import {
  Award,
  Trophy,
  Star,
  Target,
  Zap,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function Achievements() {
  const { loading, error } = useAsyncData(600);

  const stats = {
    totalPoints: 1250,
    level: 8,
    nextLevelPoints: 1500,
    rank: "Gold Contributor",
  };

  const achievements = [
    {
      id: 1,
      title: "First Session",
      description: "Complete your first learning session",
      icon: BookOpen,
      earned: true,
      earnedDate: "2026-03-15",
      points: 50,
      rarity: "common",
    },
    {
      id: 2,
      title: "Teaching Star",
      description: "Teach 10 sessions",
      icon: Star,
      earned: true,
      earnedDate: "2026-04-10",
      points: 100,
      rarity: "rare",
      progress: 10,
      total: 10,
    },
    {
      id: 3,
      title: "Perfect Rating",
      description: "Receive 5 five-star ratings",
      icon: Trophy,
      earned: true,
      earnedDate: "2026-04-20",
      points: 150,
      rarity: "epic",
      progress: 5,
      total: 5,
    },
    {
      id: 4,
      title: "Master Mentor",
      description: "Teach 50 sessions",
      icon: Award,
      earned: false,
      points: 500,
      rarity: "legendary",
      progress: 12,
      total: 50,
    },
    {
      id: 5,
      title: "Community Builder",
      description: "Connect with 25 different people",
      icon: Users,
      earned: false,
      points: 200,
      rarity: "epic",
      progress: 15,
      total: 25,
    },
    {
      id: 6,
      title: "Quick Learner",
      description: "Complete 20 learning sessions",
      icon: Zap,
      earned: false,
      points: 150,
      rarity: "rare",
      progress: 8,
      total: 20,
    },
    {
      id: 7,
      title: "Path Completer",
      description: "Complete a learning path",
      icon: Target,
      earned: false,
      points: 300,
      rarity: "epic",
      progress: 0,
      total: 1,
    },
    {
      id: 8,
      title: "Rising Star",
      description: "Reach level 10",
      icon: TrendingUp,
      earned: false,
      points: 250,
      rarity: "rare",
      progress: 8,
      total: 10,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "legendary":
        return "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  if (loading) return <AchievementsSkeleton />;
  if (error) return <ErrorState message="Couldn't load achievements." onRetry={() => window.location.reload()} />;

  const earned = achievements.filter((a) => a.earned);
  const inProgress = achievements.filter((a) => !a.earned);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Achievements</h1>
        <p className="text-[var(--muted-foreground)]">
          Track your progress and unlock rewards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 shadow-[var(--shadow-md)] bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)] text-white">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[var(--primary)]/20">
              <Trophy className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-sm opacity-80">Total Points</p>
              <p className="text-2xl font-semibold">{stats.totalPoints}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-[var(--shadow-md)]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[var(--primary)]/10">
              <TrendingUp className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Level</p>
              <p className="text-2xl font-semibold">{stats.level}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-[var(--shadow-md)]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[var(--success)]/10">
              <CheckCircle2 className="h-6 w-6 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Unlocked</p>
              <p className="text-2xl font-semibold">{earned.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-[var(--shadow-md)]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[var(--warning)]/10">
              <Award className="h-6 w-6 text-[var(--warning)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Rank</p>
              <p className="text-lg font-semibold">{stats.rank}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-[var(--shadow-md)]">
        <div className="flex items-center justify-between mb-2">
          <h3>Level Progress</h3>
          <span className="text-sm text-[var(--muted-foreground)]">
            {stats.totalPoints} / {stats.nextLevelPoints} XP
          </span>
        </div>
        <Progress
          value={(stats.totalPoints / stats.nextLevelPoints) * 100}
          className="h-3"
        />
        <p className="text-sm text-[var(--muted-foreground)] mt-2">
          {stats.nextLevelPoints - stats.totalPoints} points to level {stats.level + 1}
        </p>
      </Card>

      <div>
        <h2 className="mb-4">Unlocked Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earned.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card
                key={achievement.id}
                className="p-5 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow border-2 border-[var(--primary)]/30"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[var(--primary)]/10">
                    <Icon className="h-8 w-8 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--primary)] font-semibold">
                        +{achievement.points} XP
                      </span>
                      <span className="text-[var(--muted-foreground)]">
                        {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-4">In Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inProgress.map((achievement) => {
            const Icon = achievement.icon;
            const progressPercent = achievement.progress && achievement.total
              ? (achievement.progress / achievement.total) * 100
              : 0;

            return (
              <Card
                key={achievement.id}
                className="p-5 shadow-[var(--shadow-md)] opacity-75"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[var(--muted)]">
                    <Icon className="h-8 w-8 text-[var(--muted-foreground)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Lock className="h-4 w-4 text-[var(--muted-foreground)]" />
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mb-3">
                      {achievement.description}
                    </p>
                    {achievement.progress !== undefined && achievement.total && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-1">
                          <span>Progress</span>
                          <span>
                            {achievement.progress} / {achievement.total}
                          </span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                      </div>
                    )}
                    <span className="text-sm text-[var(--muted-foreground)]">
                      Reward: +{achievement.points} XP
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
