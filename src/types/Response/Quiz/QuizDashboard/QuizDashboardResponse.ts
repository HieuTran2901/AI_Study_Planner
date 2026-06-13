import type { QuizCardResponse } from "@/types/Response";
import type { WeakTopicResponse } from "./WeakTopicResponse";
import type { QuizHistoryResponse } from "./QuizHistoryResponse";
import type { QuizStatsResponse } from "./QuizStatsResponse";
import type { DailyQuizResponse } from "./DailyQuizResponse";

export interface QuizDashboardResponse {
  recommendedQuizzes: QuizCardResponse[];
  dailyQuiz: DailyQuizResponse;
  continuedQuizzes: QuizCardResponse[];
  weakTopics: WeakTopicResponse[];
  recentQuizzes: QuizHistoryResponse[];
  stats: QuizStatsResponse;
  aiTips: string[];
}
