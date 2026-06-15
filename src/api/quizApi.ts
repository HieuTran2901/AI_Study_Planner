import apiClient from "./axiosClient";

import type { ApiResponse } from "@/types/Common";
import type {
  QuizDetailResponse,
  QuizCardResponse,
  QuizDashboardResponse,
  QuizReviewResponse,
  QuizResultResponse,
} from "@/types/Response";
import type { GenerateQuizRequest, QuizSubmitRequest } from "@/types/Request";

export const quizApi = {
  getQuiz: async (quizId: string): Promise<ApiResponse<QuizDetailResponse>> => {
    const response = await apiClient.get(`/quizzes/${quizId}`);
    return response.data;
  },

  getMyQuizzes: async (): Promise<ApiResponse<QuizCardResponse[]>> => {
    const response = await apiClient.get("/quizzes");
    return response.data;
  },

  getRecommendedQuizzes: async (): Promise<ApiResponse<QuizCardResponse[]>> => {
    const response = await apiClient.get("/quizzes/recommended");
    return response.data;
  },

  getQuizDashboard: async (): Promise<ApiResponse<QuizDashboardResponse>> => {
    const response = await apiClient.get("/quizzes/dashboard");
    return response.data;
  },

  getQuizReview: async (
    quizId: string,
  ): Promise<ApiResponse<QuizReviewResponse>> => {
    const response = await apiClient.get(`/quizzes/${quizId}/review`);
    return response.data;
  },

  generateQuiz: async (
    payload: GenerateQuizRequest,
  ): Promise<ApiResponse<QuizDetailResponse>> => {
    const response = await apiClient.post("/quizzes/generate", payload);
    return response.data;
  },

  submitQuiz: async (
    quizId: string,
    request: QuizSubmitRequest,
  ): Promise<ApiResponse<QuizResultResponse>> => {
    const response = await apiClient.post(`/quizzes/${quizId}/submit`, request);
    return response.data;
  },
};
