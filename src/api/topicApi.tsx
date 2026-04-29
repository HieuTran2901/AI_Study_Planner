import apiClient from "./axiosClient";
import { type ApiResponse } from "@/types/ApiResponse.type";

export type TopicStatus = "completed" | "in-progress" | "locked";

export interface TopicNode {
  title: string;
  description: string;
  difficulty: string;
  order: number;
  estimatedHours: number;
  progress: number;
  status: TopicStatus;
  children?: TopicNode[];
}

export interface LearningPathResponse {
  title: string;
  topics: TopicNode[];
}

export interface generateTopicRequest {
  input: string;
}

export const topicApi = {
  getLearningPath: async (): Promise<ApiResponse<LearningPathResponse>> => {
    const response = await apiClient.get("/recommendation");
    return response.data;
  },

  generateLearningPath: async (
    payload: generateTopicRequest,
  ): Promise<ApiResponse<LearningPathResponse>> => {
    const response = await apiClient.post(
      "/recommendation/topics/generate",
      payload,
    );
    return response.data;
  },
};
