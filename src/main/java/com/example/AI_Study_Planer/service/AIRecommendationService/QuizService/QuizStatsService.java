package com.example.AI_Study_Planer.service.AIRecommendationService.QuizService;

import com.example.AI_Study_Planer.dto.response.Quiz.QuizStatsResponse;
import com.example.AI_Study_Planer.entity.Quiz.QuizAttempt;
import com.example.AI_Study_Planer.entity.User;
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
public class QuizStatsService {

    private final QuizRepository quizRepository;
    private final UserService userService;
    private final QuizAttemptRepository quizAttemptRepository;

    public QuizStatsResponse buildStats(
            Authentication authentication
    ) {
        User user = userService.getCurrentUser(authentication);

        QuizStatsResponse stats = new QuizStatsResponse();

        stats.setQuizzesCompleted(quizAttemptRepository.countCompleted(user.getId()));
        stats.setAverageScore(quizAttemptRepository.getAverageScore(user.getId()));
        stats.setCurrentStreak(getCurrentStreak(user));
        stats.setTotalPoints(quizAttemptRepository.getTotalPoints(user.getId()));

        return stats;
    }

    public Integer getCurrentStreak(
            User user
    ) {

        List<QuizAttempt> attempts =

                quizAttemptRepository
                        .findByUserId(user.getId())
                        .orElse(List.of());

        if (attempts.isEmpty()) {
            return 0;
        }

        Set<LocalDate> completedDates =

                attempts.stream()

                        .filter(a -> a.getCompletedAt() != null)

                        .map(a -> a.getCompletedAt()
                                .toLocalDate())

                        .collect(Collectors.toSet());

        LocalDate today = LocalDate.now();

        int streak = 0;

        LocalDate checkingDate = today;

        while (
                completedDates.contains(
                        checkingDate
                )
        ) {

            streak++;

            checkingDate =
                    checkingDate.minusDays(1);
        }

        return streak;
    }
}

