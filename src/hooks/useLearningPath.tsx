import { useState, useCallback } from "react";
import { TopicService } from "@/services/TopicService";
import type { generateTopicRequest } from "@/api/topicApi";

import { useLearningPathStore } from "./storage/useLearningPathStore";

export function useLearningPath() {
  const { learningPath, setLearningPath } = useLearningPathStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ================= GET CURRENT =================
  const getLearningPath = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await TopicService.getLearningPath();
      setLearningPath(data);
      return data;
    } catch (err: any) {
      console.error("Error fetching learning path:", err);
      setError(err?.response?.data?.message || "Failed to load learning path");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ================= GENERATE =================
  const generateLearningPath = useCallback(
    async (payload: generateTopicRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await TopicService.generateLearningPath(payload);

        // Update UI
        setLearningPath(data);

        return data;
      } catch (err: any) {
        console.error("Error generating learning path:", err);
        setError(
          err?.response?.data?.message || "Failed to generate learning path",
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    // state
    learningPath,
    isLoading,
    error,

    // actions
    getLearningPath,
    generateLearningPath,
  };
}
