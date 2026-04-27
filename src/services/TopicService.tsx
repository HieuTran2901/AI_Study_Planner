import { topicApi } from "@/api/topicApi";
import { type generateTopicRequest } from "@/api/topicApi";

export const TopicService = {
  getLearningPath: async () => {
    const response = await topicApi.getLearningPath();
    return response.results;
  },

  generateLearningPath: async (payload: generateTopicRequest) => {
    const response = await topicApi.generateLearningPath(payload);
    return response.results;
  },
};
