import { quizApi } from "@/api/quizApi";
import type { GenerateQuizRequest, QuizSubmitRequest } from "@/types/Request";

export const QuizService = {
  getQuiz: async (quizId: string) => {
    const response = await quizApi.getQuiz(quizId);
    return response.results;
  },
  getMyQuizzes: async () => {
    const response = await quizApi.getMyQuizzes();
    return response.results;
  },

  getRecommendedQuizzes: async () => {
    const response = await quizApi.getRecommendedQuizzes();
    return response.results;
  },

  getQuizDashboard: async () => {
    const response = await quizApi.getQuizDashboard();
    return response.results;
  },

  getQuizReview: async (quizId: string) => {
    const response = await quizApi.getQuizReview(quizId);
    return response.results;
  },

  generateQuiz: async (payload: GenerateQuizRequest) => {
    const response = await quizApi.generateQuiz(payload);
    return response.results;
  },

  submitQuiz: async (quizId: string, request: QuizSubmitRequest) => {
    const response = await quizApi.submitQuiz(quizId, request);
    return response.results;
  },
};
