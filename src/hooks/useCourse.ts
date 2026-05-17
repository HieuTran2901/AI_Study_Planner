import { useState, useCallback } from "react";
import { TopicService } from "@/services/TopicService";
import { useCourseLearningStore } from "./storage/useCourseLearningStore";

export function useCourse() {
  const { courseLearning, setCourseLearning } = useCourseLearningStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(
    async (resourceId: string) => {
      try {
        setLoading(true);
        setError(null);

        const data = await TopicService.getCourse(resourceId);

        setCourseLearning(data);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch course");
      } finally {
        setLoading(false);
      }
    },
    [setCourseLearning],
  );

  const clearCourse = () => {
    setCourseLearning(null as any);
  };

  return {
    courseLearning,
    loading,
    error,
    fetchCourse,
    clearCourse,
  };
}
