import {
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronLeft,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Lesson, Module } from "@/types/Response";

interface CourseCurriculumProps {
  modules: Module[];
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function CourseCurriculum({
  modules,
  currentLessonId,
  onLessonSelect,
  isOpen,
  onToggle,
}: CourseCurriculumProps) {
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const getStatusIcon = (status: Lesson["status"]) => {
    if (status === "completed") {
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    }
    if (status === "in-progress") {
      return <PlayCircle className="h-4 w-4 text-indigo-400" />;
    }
    return <Lock className="h-4 w-4 text-white/30" />;
  };

  return (
    <>
      <div
        className={`fixed right-0 top-20 bottom-0 w-[400px] bg-[#111827]/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg">Course Curriculum</h3>
          <p className="text-sm text-white/60 mt-1">
            {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 space-y-3">
            {modules.map((module) => (
              <Collapsible
                key={module.id}
                open={openModules.includes(module.id)}
                onOpenChange={() => toggleModule(module.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        openModules.includes(module.id) ? "rotate-90" : ""
                      }`}
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm">{module.title}</p>
                      <p className="text-xs text-white/50">
                        {module.lessons.length} lessons
                      </p>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="ml-4 mt-2 space-y-1">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() =>
                          lesson.status !== "locked" &&
                          onLessonSelect(lesson.id)
                        }
                        disabled={lesson.status === "locked"}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          lesson.id === currentLessonId
                            ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/50"
                            : "bg-white/[0.02] hover:bg-white/5 border border-transparent"
                        } ${
                          lesson.status === "locked"
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getStatusIcon(lesson.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm mb-1 truncate">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-white/50">
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Button
        onClick={onToggle}
        size="sm"
        variant="outline"
        className={`fixed right-4 top-24 z-40 bg-[#111827]/95 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Curriculum
      </Button>
    </>
  );
}
