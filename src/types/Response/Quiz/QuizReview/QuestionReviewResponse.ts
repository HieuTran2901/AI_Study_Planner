import type { OptionReviewResponse } from "./OptionReviewResponse";

export interface QuestionReviewResponse {
  questionId: string;
  questionText: string;

  selectedAnswer: string;
  correctAnswer: string;
  order: number;

  correct: boolean;
  explanation: string;

  options: OptionReviewResponse[];
}
