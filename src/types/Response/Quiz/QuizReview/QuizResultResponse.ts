export interface QuizResultResponse {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  durationSeconds: number;
  weakAreas: string[];
  aiFeedback: string;
}
