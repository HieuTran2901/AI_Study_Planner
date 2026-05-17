import { useEffect, useState, useMemo } from "react";
import {
  CourseHeader,
  CourseCurriculum,
  CourseInfo,
  CourseTabs,
  VideoPlayer,
  MobileCurriculum,
} from "./components";
import { useCourse } from "@/hooks";
import { useParams } from "react-router-dom";
import { toEmbedUrl } from "./components/CourseHelper";

export function CourseLearning() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileCurriculumOpen, setIsMobileCurriculumOpen] = useState(false);

  const { id: courseId } = useParams();
  const { courseLearning, fetchCourse, loading } = useCourse();

  // fetch course
  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, [fetchCourse, courseId]);

  // flatten lessons
  const allLessons = useMemo(() => {
    return courseLearning?.modules.flatMap((m) => m.lessons) ?? [];
  }, [courseLearning]);

  // derive currentLessonId
  const currentLessonId =
    selectedLessonId ??
    allLessons.find((l) => l.id === courseId)?.id ??
    allLessons[0]?.id ??
    null;

  // current lesson
  const currentLesson = useMemo(() => {
    return allLessons.find((l) => l.id === currentLessonId) ?? null;
  }, [allLessons, currentLessonId]);

  // current index
  const currentIndex = useMemo(() => {
    return allLessons.findIndex((l) => l.id === currentLessonId);
  }, [allLessons, currentLessonId]);

  // current module
  const currentModule = useMemo(() => {
    return courseLearning?.modules.find((module) =>
      module.lessons.some((l) => l.id === currentLessonId),
    );
  }, [courseLearning, currentLessonId]);

  // navigation
  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      setSelectedLessonId(allLessons[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousLesson = () => {
    if (currentIndex > 0) {
      setSelectedLessonId(allLessons[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // progress
  const progressPercentage = useMemo(() => {
    if (!courseLearning) return 0;
    return Math.round(
      (courseLearning.completedLessons / courseLearning.totalLessons) * 100,
    );
  }, [courseLearning]);

  // loading state
  if (loading || !courseLearning || !currentLesson) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <CourseHeader
        courseTitle={courseLearning.title}
        progressPercentage={progressPercentage}
        onNextLesson={handleNextLesson}
        onPreviousLesson={handlePreviousLesson}
        canGoNext={currentIndex < allLessons.length - 1}
        canGoPrevious={currentIndex > 0}
        onToggleMobileCurriculum={() => setIsMobileCurriculumOpen(true)}
      />

      {/* Desktop */}
      <div className="hidden lg:flex pt-20">
        <div
          className={`flex-1 transition-all duration-500 ${
            isSidebarOpen ? "mr-[420px]" : "mr-0"
          }`}
        >
          <div className="p-6 xl:p-8 max-w-7xl mx-auto">
            <VideoPlayer
              videoUrl={toEmbedUrl(currentLesson.videoUrl)}
              title={currentLesson.title}
            />

            <CourseInfo
              lesson={currentLesson}
              level={currentModule?.level || "BEGINNER"}
              onMarkComplete={() => console.log("Mark as completed")}
            />

            <CourseTabs />
          </div>
        </div>

        <CourseCurriculum
          modules={courseLearning.modules}
          currentLessonId={currentLesson.id}
          onLessonSelect={handleLessonSelect}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Mobile */}
      <div className="lg:hidden pt-32 sm:pt-36">
        <div className="px-3 sm:px-4 pb-6">
          <VideoPlayer
            videoUrl={toEmbedUrl(currentLesson.videoUrl)}
            title={currentLesson.title}
          />

          <CourseInfo
            lesson={currentLesson}
            level={currentModule?.level || "BEGINNER"}
            onMarkComplete={() => console.log("Mark as completed")}
          />

          <CourseTabs />
        </div>
      </div>

      {/* Mobile Curriculum */}
      <MobileCurriculum
        modules={courseLearning.modules}
        currentLessonId={currentLesson.id}
        onLessonSelect={handleLessonSelect}
        isOpen={isMobileCurriculumOpen}
        onClose={() => setIsMobileCurriculumOpen(false)}
      />
    </div>
  );
}
