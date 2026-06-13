import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { QuizService } from "@/services";
import type {
  QuizCardResponse,
  QuizDashboardResponse,
  QuizDetailResponse,
  QuizReviewResponse,
} from "@/types/Response";
import type { QuizSubmitRequest } from "@/types/Request";

export function useQuiz() {
  const [quizzes, setQuizzes] = useState<QuizCardResponse[]>([]);
  const [quizReview, setQuizReview] = useState<QuizReviewResponse | null>(null);
  const [dashboard, setDashboard] = useState<QuizDashboardResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isFetchingQuizzes, setIsFetchingQuizzes] = useState(false);

  const [isFetchingQuiz, setIsFetchingQuiz] = useState(false);

  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetailResponse | null>(
    null,
  );

  const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    return "Something went wrong";
  };

  const handleError = useCallback(
    (err: unknown, toastId: string) => {
      const message = getErrorMessage(err);

      setError(message);

      toast.error(message, {
        toastId,
      });

      throw err;
    },
    [setError],
  );

  const getQuiz = useCallback(
    async (quizId: string) => {
      setIsFetchingQuiz(true);
      setError(null);
      try {
        const data = await QuizService.getQuiz(quizId);
        setSelectedQuiz(data);
        return data;
      } catch (err: unknown) {
        handleError(err, "fetch-quiz-error");
        throw err;
      } finally {
        setIsFetchingQuiz(false);
      }
    },
    [handleError],
  );

  const getMyQuizzes = useCallback(async () => {
    setIsFetchingQuizzes(true);
    setError(null);
    try {
      const data = await QuizService.getMyQuizzes();
      setQuizzes(data);
      return data;
    } catch (err: unknown) {
      handleError(err, "fetch-quizzes-error");
      throw err;
    } finally {
      setIsFetchingQuizzes(false);
    }
  }, [handleError]);

  const getRecommendedQuizzes = useCallback(async () => {
    setIsFetchingQuizzes(true);
    setError(null);
    try {
      const data = await QuizService.getRecommendedQuizzes();
      setQuizzes(data);
      return data;
    } catch (err: unknown) {
      handleError(err, "fetch-recommended-quizzes-error");
      throw err;
    } finally {
      setIsFetchingQuizzes(false);
    }
  }, [handleError]);

  const getQuizDashboard = useCallback(async () => {
    setIsFetchingQuizzes(true);
    setError(null);
    try {
      const data = await QuizService.getQuizDashboard();
      setDashboard(data);
      console.log("Quiz Dashboard:", data);
      return data;
    } catch (err: unknown) {
      handleError(err, "fetch-quiz-dashboard-error");
      throw err;
    } finally {
      setIsFetchingQuizzes(false);
    }
  }, [handleError]);

  const getQuizReview = useCallback(
    async (quizId: string) => {
      setIsFetchingQuiz(true);
      setError(null);
      try {
        const data = await QuizService.getQuizReview(quizId);
        setQuizReview(data);
        return data;
      } catch (err: unknown) {
        handleError(err, "fetch-quiz-review-error");
        throw err;
      } finally {
        setIsFetchingQuiz(false);
      }
    },
    [handleError],
  );

  const generateQuiz = useCallback(
    // Extract the type of the payload from the service method
    async (payload: Parameters<typeof QuizService.generateQuiz>[0]) => {
      setIsGeneratingQuiz(true);
      setError(null);
      try {
        const data = await QuizService.generateQuiz(payload);
        setSelectedQuiz(data);
        await getMyQuizzes(); // Refresh quiz list after generating a new quiz
        return data;
      } catch (err: unknown) {
        handleError(err, "generate-quiz-error");
        throw err;
      } finally {
        setIsGeneratingQuiz(false);
      }
    },
    [handleError, getMyQuizzes],
  );

  const submitQuiz = useCallback(
    async (quizId: string, request: QuizSubmitRequest) => {
      setError(null);
      try {
        const data = await QuizService.submitQuiz(quizId, request);
        return data;
      } catch (err: unknown) {
        handleError(err, "submit-quiz-error");
        throw err;
      }
    },
    [handleError],
  );

  return {
    dashboard,
    quizzes,
    error,

    isFetchingQuizzes,
    isFetchingQuiz,
    isGeneratingQuiz,
    selectedQuiz,
    quizReview,

    getQuiz,
    getMyQuizzes,
    getRecommendedQuizzes,
    getQuizDashboard,
    getQuizReview,
    generateQuiz,
    submitQuiz,
  };
}
