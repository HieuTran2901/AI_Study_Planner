import type { QuestionReviewResponse } from "./QuestionReviewResponse";

export interface QuizReviewResponse {
  quizId: string;
  title: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  questions: QuestionReviewResponse[];
}
