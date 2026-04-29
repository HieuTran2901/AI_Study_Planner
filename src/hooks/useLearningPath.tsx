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
    } catch (err: unknown) {
      console.error("Error fetching learning path:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load learning path");
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [setLearningPath]);

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
      } catch (err: unknown) {
        console.error("Error generating learning path:", err);

        if (err instanceof Error) {
          setError(err.message || "Failed to generate learning path");
        } else {
          setError("Failed to generate learning path");
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [setLearningPath],
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
