import type { Difficulty } from "@/types/Enums";
import type { QuizQuestionResponse } from "./QuizQuestionResponse";

export interface QuizDetailResponse {
  id: string;

  title: string;

  description: string | null;

  difficulty: Difficulty;

  durationMinutes: number | null;

  totalQuestions: number;

  aiRecommended: boolean | null;

  category: string | null;

  questions: QuizQuestionResponse[];
}
