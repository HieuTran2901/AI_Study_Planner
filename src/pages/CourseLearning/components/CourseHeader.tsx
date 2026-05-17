import { ChevronLeft, ChevronRight, ArrowLeft, Menu, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CourseHeaderProps {
  courseTitle: string;
  progressPercentage: number;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onToggleMobileCurriculum?: () => void;
}

export function CourseHeader({
  courseTitle,
  progressPercentage,
  onNextLesson,
  onPreviousLesson,
  canGoNext,
  canGoPrevious,
  onToggleMobileCurriculum,
}: CourseHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="px-3 sm:px-6 py-3 sm:py-4">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium truncate text-white/90">
              {courseTitle}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 min-w-[220px]">
              <div className="flex-1">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <span className="text-sm font-medium text-white/70 whitespace-nowrap tabular-nums">
                {progressPercentage}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={onPreviousLesson}
                disabled={!canGoPrevious}
                variant="outline"
                size="sm"
                className="bg-white/[0.03] border-white/10 hover:bg-white/10 text-white disabled:opacity-40 transition-all"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <Button
                onClick={onNextLesson}
                disabled={!canGoNext}
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 disabled:opacity-40 transition-all"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Avatar className="h-10 w-10 ring-2 ring-indigo-500/30">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile/Tablet Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between gap-3 mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 -ml-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <h1 className="text-sm sm:text-base font-medium truncate text-white/90 flex-1 text-center px-2">
              {courseTitle}
            </h1>

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMobileCurriculum}
              className="text-white/70 hover:text-white hover:bg-white/10 -mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Progress value={progressPercentage} className="h-1.5" />
            </div>
            <span className="text-xs font-medium text-white/60 whitespace-nowrap tabular-nums">
              {progressPercentage}%
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Button
              onClick={onPreviousLesson}
              disabled={!canGoPrevious}
              variant="outline"
              size="sm"
              className="flex-1 bg-white/[0.03] border-white/10 hover:bg-white/10 text-white text-xs disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Prev
            </Button>

            <Button
              onClick={onNextLesson}
              disabled={!canGoNext}
              size="sm"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
