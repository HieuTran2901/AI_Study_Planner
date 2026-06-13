import { Calendar, Trophy, Flame, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import type { DailyQuizResponse } from "@/types/Response";
import { useQuiz } from "@/hooks";
import type { GenerateQuizRequest } from "@/types/Request";

export function DailyQuizCard({ streak, completedToday }: DailyQuizResponse) {
  const { generateQuiz, isGeneratingQuiz } = useQuiz();

  const navigate = useNavigate();

  const handleStartDailyQuiz = async (payload: GenerateQuizRequest) => {
    const quiz = await generateQuiz(payload);
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <Card className="relative overflow-hidden border-border bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse" />

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-30" />

      <CardContent className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Daily Challenge
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {completedToday
                ? "You've completed today's challenge!"
                : "Complete today's quiz to keep your streak"}
            </p>
          </div>

          {/* Streak */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/30 rounded-lg blur animate-pulse" />
              <div className="relative bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">{streak}</p>
              <p className="text-xs text-muted-foreground">day streak</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Questions", value: "10" },
            { label: "Duration", value: "5 min" },
            { label: "Points", value: "+50" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action */}
        {completedToday ? (
          <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <Trophy className="h-5 w-5 text-emerald-400" />
            <span className="font-medium text-emerald-400">
              Challenge Complete!
            </span>
          </div>
        ) : (
          <Button
            disabled={isGeneratingQuiz}
            onClick={() =>
              handleStartDailyQuiz({
                topic: "General Knowledge",
                difficulty: "BEGINNER",
                questionCount: 10,
              })
            }
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/30 group"
          >
            {isGeneratingQuiz ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2 group-hover:animate-spin" />
                Start Daily Challenge
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
