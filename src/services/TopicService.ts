import { topicApi } from "@/api/topicApi";
import type { GenerateTopicRequest } from "@/types/Request";

export const TopicService = {
  getLearningPath: async () => {
    const response = await topicApi.getLearningPath();
    return response.results;
  },

  getCourse: async (resourceId: string) => {
    const response = await topicApi.getCourse(resourceId);
    return response.results;
  },

  generateLearningPath: async (payload: GenerateTopicRequest) => {
    const response = await topicApi.generateLearningPath(payload);
    return response.results;
  },
};
