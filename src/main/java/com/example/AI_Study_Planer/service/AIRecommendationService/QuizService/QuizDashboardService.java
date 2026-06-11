package com.example.AI_Study_Planer.service.AIRecommendationService.QuizService;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.response.Quiz.*;
import com.example.AI_Study_Planer.entity.Quiz.Quiz;
import com.example.AI_Study_Planer.entity.Quiz.QuizAttempt;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.mapper.QuizMapper;
import com.example.AI_Study_Planer.repository.Quiz.QuizAttemptRepository;
import com.example.AI_Study_Planer.repository.Quiz.QuizRepository;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizDashboardService {
    private final UserService userService;
    private final QuizMapper quizMapper;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizRecommendationService quizRecommendationService;

    public QuizDashboardResponse getDashboard(
            Authentication authentication
    ) {
        User user = userService.getCurrentUser(authentication);

        List<Quiz> quizzes = quizRepository.findByUserId(user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        List<QuizCardResponse> cards = quizMapper.toQuizCardResponseList(quizzes);

        QuizDashboardResponse response = new QuizDashboardResponse();

        response.setRecommendedQuizzes(cards);
        response.setContinueQuizzes(getContinueQuizzes(user));
        response.setRecentQuizzes(getRecentQuizzes(user));
        response.setWeakTopics(getWeakTopics(user));
        response.setStats(getStats(user));
        response.setDailyQuiz(getDailyQuiz(user));

        return response;
    }

    private List<QuizCardResponse> getContinueQuizzes(
            User user
    ) {

        List<QuizAttempt> attempts = quizAttemptRepository
                        .findByUserId(user.getId())
                        .orElse(List.of());

        List<QuizAttempt> continueQuizzes =
                attempts.stream()
                        .filter(quiz -> quiz.getProgress() != null
                                && quiz.getProgress() < 100
                        ).toList();

        return quizMapper.toQuizAttemptCardResponseList(continueQuizzes);
    }

    public List<QuizHistoryResponse> getRecentQuizzes(
            User user
    ) {

        List<QuizAttempt> recentAttempts =
                quizAttemptRepository
                        .findTop5ByUserIdOrderByCompletedAtDesc(user.getId())
                        .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        return quizMapper.toQuizHistoryResponseList(recentAttempts);
    }

    private List<WeakTopicResponse> getWeakTopics(
            User user
    ) {

        List<QuizAttempt> attempts =
                quizAttemptRepository
                        .findByUserId(user.getId())
                        .orElse(List.of());

        return quizRecommendationService.analyzeWeakTopics(
                attempts
        );
    }

    private QuizStatsResponse getStats(
            User user
    ) {

        List<QuizAttempt> attempts =
                quizAttemptRepository
                        .findByUserId(user.getId())
                        .orElse(List.of());

        QuizStatsResponse stats =
                new QuizStatsResponse();

        stats.setQuizzesCompleted(
                attempts.size()
        );

        stats.setAverageScore(
                calculateAverageScore(attempts)
        );

        stats.setCurrentStreak(
                calculateStreak(attempts)
        );

        stats.setTotalPoints(
                calculateTotalPoints(attempts)
        );

        return stats;
    }

    private DailyQuizResponse getDailyQuiz(
            User user
    ) {

        List<QuizAttempt> attempts =

                quizAttemptRepository
                        .findByUserId(user.getId())
                        .orElse(List.of());

        boolean completedToday =

                attempts.stream()

                        .anyMatch(attempt ->

                                attempt.getCompletedAt() != null

                                        &&

                                        attempt.getCompletedAt()
                                                .toLocalDate()

                                                .equals(
                                                        LocalDate.now()
                                                )
                        );

        DailyQuizResponse dailyQuiz =
                new DailyQuizResponse();

        dailyQuiz.setQuizId("daily");

        dailyQuiz.setStreak(
                calculateStreak(attempts)
        );

        dailyQuiz.setCompletedToday(
                completedToday
        );

        return dailyQuiz;
    }

    private Double calculateAverageScore(
            List<QuizAttempt> attempts
    ) {

        if (attempts.isEmpty()) {
            return 0.0;
        }

        return (double) Math.round(

                attempts.stream()

                        .mapToInt(
                                QuizAttempt::getScore
                        )

                        .average()

                        .orElse(0)
        );
    }

    private Integer calculateTotalPoints(
            List<QuizAttempt> attempts
    ) {

        return attempts.stream()

                .mapToInt(
                        QuizAttempt::getScore
                )

                .sum();
    }

    private Integer calculateStreak(
            List<QuizAttempt> attempts
    ) {

        Set<LocalDate> completedDates =

                attempts.stream()

                        .filter(
                                a -> a.getCompletedAt() != null
                        )

                        .map(
                                a -> a.getCompletedAt()
                                        .toLocalDate()
                        )

                        .collect(
                                Collectors.toSet()
                        );

        LocalDate currentDay =
                LocalDate.now();

        int streak = 0;

        while (

                completedDates.contains(
                        currentDay
                )

        ) {

            streak++;

            currentDay =
                    currentDay.minusDays(1);
        }

        return streak;
    }

    private String getAiTip(
            User user
    ) {

        List<WeakTopicResponse> weakTopics =
                getWeakTopics(user);

        if (weakTopics.isEmpty()) {
            return "Keep practicing consistently.";
        }

        WeakTopicResponse weakest =
                weakTopics.getFirst();

        return String.format(
                "Focus on %s this week. Your weakest accuracy is %d%%.",
                weakest.getTopic(),
                weakest.getAccuracy()
        );
    }
}
