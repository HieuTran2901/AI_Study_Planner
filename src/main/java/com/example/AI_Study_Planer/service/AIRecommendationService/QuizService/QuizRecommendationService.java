package com.example.AI_Study_Planer.service.AIRecommendationService.QuizService;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizCardResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.WeakTopicResponse;
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

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class QuizRecommendationService {
    private final QuizMapper quizMapper;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UserService userService;

    public List<WeakTopicResponse> analyzeWeakTopics(
            List<QuizAttempt> attempts
    ) {

        Map<String, List<QuizAttempt>> grouped =

                attempts.stream()

                        .filter(a -> a.getQuiz() != null)
                        .filter(a -> a.getQuiz().getTopic() != null)

                        .collect(
                                Collectors.groupingBy(
                                        a -> a.getQuiz()
                                                .getTopic()
                                                .getTitle()
                                )
                        );

        return grouped.entrySet()

                .stream()

                .map(entry -> {

                    String topic = entry.getKey();

                    double avgScore =
                            entry.getValue()
                                    .stream()
                                    .mapToInt(QuizAttempt::getScore)
                                    .average()
                                    .orElse(0);

                    WeakTopicResponse response = new WeakTopicResponse();

                    response.setTopic(topic);

                    response.setAccuracy((int)Math.round(avgScore));

                    return response;
                })

                .filter(r -> r.getAccuracy() < 70)

                .sorted(Comparator.comparingInt(WeakTopicResponse::getAccuracy))

                .toList();
    }

    private List<QuizCardResponse> generateRecommendation(
            List<WeakTopicResponse> weakTopics
    ) {

        if (weakTopics.isEmpty()) {

            return quizMapper
                    .toQuizCardResponseList(
                            quizRepository
                                    .findTop10ByOrderByCreatedAtDesc()
                                    .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND))
                    );
        }

        List<String> topicTitles =

                weakTopics.stream()

                        .map(
                                WeakTopicResponse::getTopic
                        )

                        .toList();

        List<Quiz> quizzes = quizRepository.findByTopicTitleIn(topicTitles)
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        Map<String,Integer> weakTopicRank =

                IntStream.range(
                                0,
                                weakTopics.size()
                        )

                        .boxed()

                        .collect(
                                Collectors.toMap(
                                        i -> weakTopics
                                                .get(i)
                                                .getTopic(),
                                        i -> i
                                )
                        );

        return quizzes
                .stream()
                // prioritize sort the weakest topic first
                .sorted(
                        Comparator.comparing(
                                quiz ->
                                        weakTopicRank.getOrDefault(
                                                quiz.getTopic().getTitle(),
                                                Integer.MAX_VALUE
                                        )
                        )
                )
                .limit(10)
                .map(quizMapper::toQuizCardResponse)
                .toList();
    }

    public List<QuizCardResponse> recommendQuiz(
            Authentication authentication
    ) {

        User user =
                userService.getCurrentUser(authentication);

        List<QuizAttempt> attempts =
                quizAttemptRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() -> new AppException(ErrorCode.ATTEMPT_NOT_FOUND))
                ;

        List<WeakTopicResponse> weakTopics =
                analyzeWeakTopics(attempts);

        return generateRecommendation(
                weakTopics
        );
    }
}
