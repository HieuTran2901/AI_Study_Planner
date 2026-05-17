import { Clock, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/types/Response";

interface CourseInfoProps {
  lesson: Lesson;
  level: string;
  onMarkComplete: () => void;
}

export function CourseInfo({ lesson, level, onMarkComplete }: CourseInfoProps) {
  const getLevelBadge = () => {
    switch (level) {
      case "BEGINNER":
        return "Beginner";
      case "INTERMEDIATE":
        return "Intermediate";
      default:
        return "Advanced";
    }
  };

  const getBadgeColor = () => {
    const level = getLevelBadge();
    if (level === "Beginner")
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 ring-1 ring-emerald-500/20";
    if (level === "Intermediate")
      return "bg-amber-500/15 text-amber-400 border-amber-500/30 ring-1 ring-amber-500/20";
    return "bg-rose-500/15 text-rose-400 border-rose-500/30 ring-1 ring-rose-500/20";
  };

  return (
    <div className="mt-6 lg:mt-8 p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm border border-white/[0.08] shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {lesson.title}
          </h2>
          <p className="text-white/60 mb-5 lg:mb-6 leading-relaxed text-sm sm:text-base">
            In this lesson, you'll learn the fundamental concepts and practical
            applications that will help you master this topic. Follow along with
            the video and complete the exercises to reinforce your
            understanding.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge
              variant="outline"
              className={`${getBadgeColor()} px-3 py-1 text-xs font-medium`}
            >
              <Award className="h-3 w-3 mr-1.5" />
              {getLevelBadge()}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-white/60 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium tabular-nums">
                {lesson.duration}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={onMarkComplete}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 shrink-0 w-full lg:w-auto transition-all"
          size="lg"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Mark as Completed
        </Button>
      </div>
    </div>
  );
}
