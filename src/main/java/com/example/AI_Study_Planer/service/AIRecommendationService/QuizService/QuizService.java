package com.example.AI_Study_Planer.service.AIRecommendationService.QuizService;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.request.Quiz.QuizAnswerRequest;
import com.example.AI_Study_Planer.dto.request.Quiz.QuizSubmitRequest;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizCardResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizDetailResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizResultResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizReview.QuizReviewResponse;
import com.example.AI_Study_Planer.entity.Quiz.Quiz;
import com.example.AI_Study_Planer.entity.Quiz.QuizAnswer;
import com.example.AI_Study_Planer.entity.Quiz.QuizAttempt;
import com.example.AI_Study_Planer.entity.Quiz.QuizQuestion;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.mapper.QuizMapper;
import com.example.AI_Study_Planer.repository.Quiz.QuizAnswerRepository;
import com.example.AI_Study_Planer.repository.Quiz.QuizAttemptRepository;
import com.example.AI_Study_Planer.repository.Quiz.QuizRepository;
import com.example.AI_Study_Planer.service.AIRecommendationService.Helper.QuizGenerationHelper;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserService userService;
    private final QuizMapper quizMapper;
    private final QuizGenerationHelper quizGenerationHelper;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAnswerRepository quizAnswerRepository;

    public List<QuizCardResponse> getMyQuizzes(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        List<Quiz> quizzes = quizRepository.findByUserId(user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        return quizMapper.toQuizCardResponseList(quizzes);
    }

    public QuizDetailResponse getQuizDetail(
            String quizId,
            Authentication authentication
    ) {
        User user = userService.getCurrentUser(authentication);

        Quiz quiz = quizRepository.findByIdAndUserId(quizId, user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        return quizMapper.toQuizDetailResponse(quiz);
    }

    public QuizResultResponse submitQuiz(
            String quizId,
            QuizSubmitRequest request,
            Authentication authentication
    ) {
        User user = userService.getCurrentUser(authentication);

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        Map<String, String> answerMap =
                request.getAnswers()
                        .stream()
                        .collect(Collectors.toMap(
                                QuizAnswerRequest::getQuestionId,
                                QuizAnswerRequest::getSelectedOptionId
                        ));

        int correct = 0;
        List<String> weakAreas = new ArrayList<>();

        int total = quiz.getQuestions().size();

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setUser(user);
        attempt.setCompleted(true);
        attempt.setCompletedAt(LocalDateTime.now());

        attempt = quizAttemptRepository.save(attempt);

        for (QuizQuestion question : quiz.getQuestions()) {

            String selectedOptionId =
                    answerMap.get(question.getId());

            if (selectedOptionId == null) {
                throw new AppException(ErrorCode.QUIZ_SUBMISSION_INVALID);
            }

            boolean isCorrect =
                    question.getOptions()
                            .stream()
                            .anyMatch(option ->
                                    Boolean.TRUE.equals(option.getCorrect())
                                            && option.getId().equals(selectedOptionId)
                            );

            if (isCorrect) {
                correct++;
            } else {
                weakAreas.add(question.getQuestionText());
            }

            QuizAnswer answer = new QuizAnswer();
            answer.setAttempt(attempt);
            answer.setQuestion(question);
            answer.setSelectedAnswer(selectedOptionId);
            answer.setCorrect(isCorrect);

            quizAnswerRepository.save(answer);
        }

        int score = total == 0
                ? 0
                : correct * 100 / total;

        attempt.setScore(score);
        attempt.setCorrectAnswers(correct);
        attempt.setTotalQuestions(total);

        quizAttemptRepository.save(attempt);

        QuizResultResponse response = new QuizResultResponse();
        response.setScore(score);
        response.setCorrectAnswers(correct);
        response.setTotalQuestions(total);
        response.setWeakAreas(weakAreas);

        return response;

    }

    public QuizReviewResponse getQuizReview(
            String quizId,
            Authentication authentication
    ) {

        User user = userService.getCurrentUser(authentication);

        Quiz quiz = quizRepository.findById(quizId).orElseThrow(
                        () -> new AppException(ErrorCode.QUIZ_NOT_FOUND));

        QuizAttempt attempt = quizAttemptRepository.findTopByQuizAndUserOrderByCompletedAtDesc(quiz, user)
                        .orElseThrow(() -> new AppException(ErrorCode.QUIZ_ATTEMPT_NOT_FOUND));

        return quizGenerationHelper.toQuizReviewResponse(
                quiz,
                attempt
        );
    }
}
