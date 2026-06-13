import { Clock, Brain, Target, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Link } from "react-router";
import type { QuizCardResponse } from "@/types/Response";

// interface QuizCardProps {
//   id: string;
//   title: string;
//   difficulty: Difficulty;
//   duration: number;
//   questionCount: number;
//   progress?: number;
//   isAIRecommended?: boolean;
//   category?: string;
//   completedCount?: number;
// }

export function QuizCard({
  id,
  title,
  difficulty,
  duration,
  questionCount,
  progress = 0,
  aiRecommended = false,
  category,
  // completedCount,
}: QuizCardResponse) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "BEGINNER":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "INTERMEDIATE":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "ADVANCED":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
    }
  };

  return (
    <Card className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300">
      {/* Gradient glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />

      <CardContent className="relative p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {category && (
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                {category}
              </p>
            )}
            <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
          </div>
          {aiRecommended && (
            <div className="relative ml-2">
              <div className="absolute inset-0 bg-indigo-500/30 rounded-lg blur animate-pulse" />
              <Badge className="relative bg-gradient-to-r from-indigo-600 to-purple-600 border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Pick
              </Badge>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="outline" className={getDifficultyColor()}>
            <Target className="h-3 w-3 mr-1" />
            {difficulty}
          </Badge>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Brain className="h-3.5 w-3.5" />
            <span>{questionCount} questions</span>
          </div>
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* {completedCount !== undefined && (
          <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              <span className="text-muted-foreground">
                Completed{" "}
                <span className="text-foreground font-medium">
                  {completedCount}
                </span>{" "}
                times
              </span>
            </div>
          </div>
        )} */}

        {/* Action Button */}
        <Link to={`/quiz/${id}`}>
          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
            {progress > 0 ? "Continue Quiz" : "Start Quiz"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
