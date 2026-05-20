import {
  TotalStudyHours,
  AIRecommendation,
  CompletedTopics,
  CurrentStreak,
  LearningProgress,
  OverallProgress,
  RecentActivity,
  TodayTask,
} from "./components";

import useUser from "@/hooks/useUser";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-full p-8 bg-background text-foreground transition-colors">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Welcome back, {user ? user.fullName : "Learner"}!
          </h1>

          <span className="text-2xl">🚀</span>
        </div>

        <p className="text-muted-foreground">
          Keep up the great work! You're making excellent progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <TotalStudyHours />
        <CompletedTopics />
        <CurrentStreak />
        <OverallProgress />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <LearningProgress />

        <TodayTask />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIRecommendation />

        <RecentActivity />
      </div>
    </div>
  );
}
