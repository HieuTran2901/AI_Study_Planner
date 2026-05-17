import apiClient from "./axiosClient";
import { type ApiResponse } from "@/types/Common/ApiResponse";
import type { LearningPathResponse } from "@/types/Response";
import type { GenerateTopicRequest } from "@/types/Request";
import type { CourseDetailResponse } from "@/types/Response/CourseDetailResponse";

export const topicApi = {
  getLearningPath: async (): Promise<ApiResponse<LearningPathResponse>> => {
    const response = await apiClient.get("/recommendation");
    return response.data;
  },

  generateLearningPath: async (
    payload: GenerateTopicRequest,
  ): Promise<ApiResponse<LearningPathResponse>> => {
    const response = await apiClient.post(
      "/recommendation/topics/generate",
      payload,
    );
    return response.data;
  },

  getCourse: async (
    resourceId: string,
  ): Promise<ApiResponse<CourseDetailResponse>> => {
    const response = await apiClient.get(
      `/recommendation/course/${resourceId}`,
    );
    return response.data;
  },
};
