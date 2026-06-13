import type { Difficulty } from "@/types/Enums";

export interface GenerateQuizRequest {
  topic: string;
  difficulty: Difficulty;
  questionCount: number;
}
