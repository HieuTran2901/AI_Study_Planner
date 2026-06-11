package com.example.AI_Study_Planer.service.AIRecommendationService.QuizService;

import com.example.AI_Study_Planer.dto.response.Quiz.DailyQuizResponse;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DailyQuizService {
    private final UserService userService;

    public DailyQuizResponse getDailyQuiz(
            Authentication authentication
    ) {

        User user = userService.getCurrentUser(authentication);

        DailyQuizResponse response =
                new DailyQuizResponse();

        response.setQuizId(
                "daily-quiz-id"
        );

        response.setCompletedToday(
                false
        );

        response.setStreak(
                7
        );

        return response;
    }
}
