import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LearningPathsSkeleton } from "../Skeletons";
import { ErrorState } from "../ErrorStates";
import { useAsyncData } from "../../hooks/useAsyncData";
import { CheckCircle2, Circle, Lock, TrendingUp, Clock, Award } from "lucide-react";

export function LearningPaths() {
  const { loading, error } = useAsyncData(700);

  const paths = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "Master modern web development with React and TypeScript",
      progress: 60,
      totalSkills: 8,
      completedSkills: 5,
      difficulty: "Intermediate",
      estimatedTime: "3 months",
      skills: [
        { name: "HTML/CSS Basics", status: "completed", credits: 5 },
        { name: "JavaScript Fundamentals", status: "completed", credits: 10 },
        { name: "React Basics", status: "completed", credits: 15 },
        { name: "TypeScript", status: "completed", credits: 15 },
        { name: "React Hooks", status: "in_progress", credits: 15 },
        { name: "State Management", status: "locked", credits: 20 },
        { name: "Testing", status: "locked", credits: 15 },
        { name: "Performance Optimization", status: "locked", credits: 20 },
      ],
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Learn Python, statistics, and machine learning basics",
      progress: 25,
      totalSkills: 6,
      completedSkills: 1,
      difficulty: "Beginner",
      estimatedTime: "4 months",
      skills: [
        { name: "Python Basics", status: "completed", credits: 10 },
        { name: "Data Analysis with Pandas", status: "in_progress", credits: 15 },
        { name: "Statistics", status: "locked", credits: 15 },
        { name: "Data Visualization", status: "locked", credits: 15 },
        { name: "Machine Learning Intro", status: "locked", credits: 20 },
        { name: "ML Projects", status: "locked", credits: 25 },
      ],
    },
  ];

  if (loading) return <LearningPathsSkeleton />;
  if (error) return <ErrorState message="Couldn't load learning paths." onRetry={() => window.location.reload()} />;

  const getStatusIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />;
    } else if (status === "in_progress") {
      return <Circle className="h-5 w-5 text-[var(--primary)] fill-[var(--primary)]/20" />;
    } else {
      return <Lock className="h-5 w-5 text-[var(--muted-foreground)]" />;
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Learning Paths</h1>
        <p className="text-[var(--muted-foreground)]">
          Structured pathways to master new skills
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {paths.map((path) => (
          <Card key={path.id} className="p-6 shadow-[var(--shadow-md)]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2>{path.title}</h2>
                  <Badge className="bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20">
                    {path.difficulty}
                  </Badge>
                </div>
                <p className="text-[var(--muted-foreground)] mb-4">
                  {path.description}
                </p>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                    <TrendingUp className="h-4 w-4" />
                    {path.completedSkills}/{path.totalSkills} skills completed
                  </div>
                  <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                    <Clock className="h-4 w-4" />
                    {path.estimatedTime}
                  </div>
                </div>
              </div>
              <Award className="h-12 w-12 text-[var(--primary)]" />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {path.progress}%
                </span>
              </div>
              <Progress value={path.progress} className="h-2" />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium mb-3">Skills Roadmap</h4>
              {path.skills.map((skill, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    skill.status === "locked"
                      ? "border-[var(--border)] opacity-60"
                      : "border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(skill.status)}
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {skill.credits} credits required
                      </p>
                    </div>
                  </div>
                  {skill.status === "completed" && (
                    <Badge className="bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]/20">
                      Completed
                    </Badge>
                  )}
                  {skill.status === "in_progress" && (
                    <Button size="sm" className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]">
                      Continue
                    </Button>
                  )}
                  {skill.status === "locked" && (
                    <Button size="sm" variant="outline" disabled>
                      Locked
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button className="flex-1 bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]">
                Continue Path
              </Button>
              <Button variant="outline">View Certificate</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-[var(--shadow-md)] bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)] text-white border-[var(--primary)]/30">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[var(--primary)]/20">
            <Award className="h-8 w-8 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-white">Create Custom Learning Path</h3>
            <p className="text-white/80 text-sm mb-4">
              Build your own personalized learning journey based on your goals
            </p>
            <Button className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]">
              Create Path
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
