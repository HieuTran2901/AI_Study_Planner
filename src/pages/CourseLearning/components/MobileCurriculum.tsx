import { ChevronRight, CheckCircle2, PlayCircle, Lock, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { Module, Lesson } from "@/types/Response";

interface MobileCurriculumProps {
  modules: Module[];
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileCurriculum({
  modules,
  currentLessonId,
  onLessonSelect,
  isOpen,
  onClose,
}: MobileCurriculumProps) {
  const [openModules, setOpenModules] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const getStatusIcon = (status: Lesson["status"], isActive: boolean) => {
    if (status === "completed") {
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    }
    if (status === "in-progress" || isActive) {
      return <PlayCircle className="h-4 w-4 text-indigo-400" />;
    }
    return <Lock className="h-4 w-4 text-white/30" />;
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.status === "completed").length,
    0,
  );

  const handleLessonSelect = (lessonId: string) => {
    onLessonSelect(lessonId);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-[#0a0a0f] rounded-t-3xl border-t border-white/10 transition-transform duration-500 ease-out max-h-[85vh] flex flex-col ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 border-b border-white/[0.08]">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">Curriculum</h3>
              <p className="text-sm text-white/50 mt-0.5">
                {completedLessons} of {totalLessons} completed
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/50 hover:text-white hover:bg-white/10 -mr-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-0.5 h-1 bg-white/5 rounded-full overflow-hidden">
            {Array.from({ length: totalLessons }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${
                  i < completedLessons
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                    : "bg-white/5"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2 pb-8">
            {modules.map((module) => (
              <Collapsible
                key={module.id}
                open={openModules.includes(module.id)}
                onOpenChange={() => toggleModule(module.id)}
              >
                <CollapsibleTrigger className="w-full group">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] active:from-white/[0.08] active:to-white/[0.04] transition-all border border-white/[0.05]">
                    <ChevronRight
                      className={`h-4 w-4 text-white/60 transition-all duration-300 ${
                        openModules.includes(module.id) ? "rotate-90" : ""
                      }`}
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-white/90">
                        {module.title}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">
                        {module.lessons.length} lessons
                      </p>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="ml-4 mt-2 space-y-1.5">
                    {module.lessons.map((lesson) => {
                      const isActive = lesson.id === currentLessonId;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() =>
                            lesson.status !== "locked" &&
                            handleLessonSelect(lesson.id)
                          }
                          disabled={lesson.status === "locked"}
                          className={`w-full p-3 rounded-xl text-left transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 ring-1 ring-indigo-500/50"
                              : "bg-white/[0.02] active:bg-white/[0.06] ring-1 ring-transparent"
                          } ${lesson.status === "locked" ? "opacity-40" : ""}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {getStatusIcon(lesson.status, isActive)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm mb-1.5 truncate ${
                                  isActive
                                    ? "text-white font-medium"
                                    : "text-white/80"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <p className="text-xs text-white/40 font-mono">
                                {lesson.duration}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
