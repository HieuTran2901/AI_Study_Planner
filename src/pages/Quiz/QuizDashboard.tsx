import {
  Brain,
  TrendingDown,
  History,
  Sparkles,
  Trophy,
  Target,
} from "lucide-react";

import { useEffect } from "react";

import { useQuiz } from "@/hooks";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { QuizCard } from "@/components/quiz/QuizCard";
import { DailyQuizCard } from "@/components/quiz/DailyQuizCard";
import { CustomQuizCard } from "./components";

export function QuizDashboard() {
  const { dashboard, getQuizDashboard, isFetchingQuizzes, error } = useQuiz();

  useEffect(() => {
    getQuizDashboard();
  }, [getQuizDashboard]);

  if (isFetchingQuizzes) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-red-500">
        {error}
      </div>
    );
  }

  // const completedToday =
  //   dashboard?.recentQuizzes?.some((quiz) => {
  //     const completedDate = new Date(quiz.completedAt);

  //     const today = new Date();

  //     return completedDate.toDateString() === today.toDateString();
  //   }) ?? false;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quiz Dashboard</h1>

        <p className="text-muted-foreground">
          Test your knowledge and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily */}
          <DailyQuizCard
            quizId={dashboard?.dailyQuiz?.quizId ?? "daily"}
            streak={dashboard?.dailyQuiz?.streak ?? 0}
            completedToday={dashboard?.dailyQuiz?.completedToday ?? false}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomQuizCard />

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Stats</h3>

                <div className="space-y-3">
                  <StatRow
                    label="Completed"
                    value={dashboard?.stats?.quizzesCompleted ?? 0}
                  />

                  <StatRow
                    label="Average Score"
                    value={`${dashboard?.stats?.averageScore ?? 0}%`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Continue Quiz */}
          {(dashboard?.continuedQuizzes?.length ?? 0) > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex gap-2 items-center">
                <TrendingDown className="h-5 w-5 text-indigo-400" />
                Continue Learning
              </h2>

              <div className="grid gap-4">
                {dashboard?.continuedQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} {...quiz} />
                ))}
              </div>
            </div>
          )}

          {/* Recommended */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              AI Recommended
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dashboard?.recommendedQuizzes?.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          </div>

          {/* Recent */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <History className="h-5 w-5 text-indigo-400" />
              Recent Quizzes
            </h2>

            <div className="space-y-3">
              {dashboard?.recentQuizzes?.map((quiz) => (
                <Card key={quiz.quizId} className="bg-card/50">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{quiz.title}</h3>

                        <p>
                          {quiz.completedAt
                            ? new Date(quiz.completedAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-indigo-400">
                            {quiz.score}%
                          </p>

                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>

                        <Trophy className="h-8 w-8 text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex gap-2 items-center">
                <Trophy className="h-5 w-5 text-indigo-400" />
                Your Stats
              </h3>

              <div className="space-y-4">
                <StatRow
                  label="Completed"
                  value={dashboard?.stats?.quizzesCompleted ?? 0}
                />

                <StatRow
                  label="Average Score"
                  value={`${dashboard?.stats?.averageScore ?? 0}%`}
                />

                <StatRow
                  label="Current Streak"
                  value={`${dashboard?.stats?.currentStreak ?? 0} days`}
                />

                <StatRow
                  label="Total Points"
                  value={dashboard?.stats?.totalPoints ?? 0}
                />
              </div>
            </CardContent>
          </Card>

          {/* Weak Topics */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex gap-2 items-center">
                <Target className="h-5 w-5 text-rose-400" />
                Focus Areas
              </h3>

              <div className="space-y-4">
                {dashboard?.weakTopics?.map((topic) => (
                  <div key={topic.topic}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{topic.topic}</span>

                      <span className="text-sm text-muted-foreground">
                        {topic.accuracy}%
                      </span>
                    </div>

                    <Progress value={topic.accuracy} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Tip */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Brain className="h-6 w-6 text-indigo-500" />

                <div>
                  <h4 className="font-semibold mb-2">AI Study Tip</h4>

                  <p className="text-sm text-muted-foreground">
                    {dashboard?.aiTips?.[0] ?? "Keep practicing consistently."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
