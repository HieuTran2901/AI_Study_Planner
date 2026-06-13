import type { Difficulty } from "@/types/Enums";

export interface QuizCardResponse {
  id: string;

  title: string;

  difficulty: Difficulty;

  duration: number;

  questionCount: number;

  aiRecommended: boolean;

  category: string | null;

  progress?: number;
}
