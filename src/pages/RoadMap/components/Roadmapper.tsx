import type { LearningPathResponse, TopicStatus } from "@/api/topicApi";

export const mapAIToRoadmap = (learningPath: LearningPathResponse) => {
  if (!learningPath?.topics) return [];

  return learningPath.topics.map((t, index) => {
    const status = validateStatus(t.status);

    return {
      id: index + 1,
      title: t.title,
      description: t.description,
      status,
      duration: t.estimatedHours || "Auto",
      progress:
        status === "completed" ? 100 : status === "in-progress" ? 50 : 0,
      subtopics: (t.children || []).map((c) => c.title),
    };
  });
};

const validateStatus = (status: string): TopicStatus => {
  switch (status) {
    case "COMPLETED":
      return "completed";
    case "IN_PROGRESS":
      return "in-progress";
    case "LOCKED":
      return "locked";
    default:
      return "locked";
  }
};
