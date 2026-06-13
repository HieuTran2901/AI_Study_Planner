import type { QuestionType } from "@/types/Enums";
import type { QuizOptionResponse } from "./QuizOptionResponse";

export interface QuizQuestionResponse {
  id: string;

  questionText: string;

  type: QuestionType;

  order: number;

  options: QuizOptionResponse[];
}
