export interface QuizHistoryResponse {
  attemptId: string;
  quizId: string;
  title: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
}
