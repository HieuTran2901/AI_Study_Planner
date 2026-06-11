package com.example.AI_Study_Planer.service.AIRecommendationService.Helper;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizReview.OptionReviewResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizReview.QuestionReviewResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizReview.QuizReviewResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.Quizgenerate.QuizGenerateOption;
import com.example.AI_Study_Planer.dto.response.Quiz.Quizgenerate.QuizGenerateQuestion;
import com.example.AI_Study_Planer.dto.response.Quiz.Quizgenerate.QuizGenerateResponse;
import com.example.AI_Study_Planer.entity.Quiz.*;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizGenerationHelper {

    private final ObjectMapper objectMapper;

    public Quiz parseQuiz(
            String aiReply,
            User user
    ) {
        try {

            String cleaned =
                    cleanJson(aiReply);

            QuizGenerateResponse response =
                    objectMapper.readValue(
                            cleaned,
                            QuizGenerateResponse.class
                    );

            Quiz quiz = new Quiz();

            quiz.setUser(user);
            quiz.setTitle(response.getTitle());
            quiz.setDifficulty(response.getDifficulty());
            quiz.setEstimatedMinutes(response.getEstimatedMinutes());
            quiz.setAiGenerated(true);


            List<QuizQuestion> questions =
                    response.getQuestions()
                            .stream()
                            .map(this::toQuestionEntity)
                            .toList();

            quiz.setQuestions(questions);
            quiz.setTotalQuestions(questions.size());

            return quiz;
        } catch (Exception e) {
            throw new AppException(ErrorCode.FAILED_QUIZ_PARSE);
        }
    }

    private QuizQuestion toQuestionEntity(
            QuizGenerateQuestion dto
    ) {
        QuizQuestion question =
                new QuizQuestion();

        question.setQuestionText(
                dto.getQuestionText()
        );

        question.setOrderIndex(dto.getOrder());

        question.setType(dto.getType());

        List<QuizOption> options =
                dto.getOptions()
                        .stream()
                        .map(option -> toOptionEntity(option, question))
                        .toList();

        question.setOptions(options);

        return question;
    }

    private QuizOption toOptionEntity(
            QuizGenerateOption dto,
            QuizQuestion question
    ) {
        QuizOption option =
                new QuizOption();

        option.setContent(dto.getOptionText());
        option.setCorrect(dto.getIsCorrect());
        option.setQuestion(question);

        return option;
    }


    private String cleanJson(String raw) {

        if(raw == null) {
            return "";
        }

        String cleaned =
                raw.replace("```json","")
                        .replace("```","")
                        .replace("**","")
                        .trim();

        int start =
                cleaned.indexOf("{");

        int end =
                cleaned.lastIndexOf("}");

        if(start >= 0 && end >= 0) {

            cleaned =
                    cleaned.substring(
                            start,
                            end + 1
                    );
        }

        return cleaned;
    }

    private QuestionReviewResponse toQuestionReviewResponse(
            QuizQuestion question,
            QuizAnswer answer
    ) {
        return QuestionReviewResponse.builder()
                .questionId(question.getId())
                .questionText(question.getQuestionText())
                .selectedAnswer(answer != null ? answer.getSelectedAnswer() : null)
                .correctAnswer(question.getCorrectAnswer())
                .correct(answer != null && Boolean.TRUE.equals(answer.getCorrect()))
                .explanation(question.getExplanation())
                .options(
                        question.getOptions()
                                .stream()
                                .map(this::toOptionReviewResponse)
                                .toList()
                )
                .build();
    }

    private OptionReviewResponse toOptionReviewResponse(QuizOption option) {
        return OptionReviewResponse.builder()
                .id(option.getId())
                .content(option.getContent())
                .correct(option.getCorrect())
                .build();
    }

    public QuizReviewResponse toQuizReviewResponse(
            Quiz quiz,
            QuizAttempt attempt
    ) {

        Map<String, QuizAnswer> answerMap =
                attempt.getAnswers()
                        .stream()
                        .collect(Collectors.toMap(
                                a -> a.getQuestion().getId(),
                                Function.identity()
                        ));

        return QuizReviewResponse.builder()
                .quizId(quiz.getId())
                .title(quiz.getTitle())
                .score(attempt.getScore())
                .correctAnswers(attempt.getCorrectAnswers())
                .totalQuestions(attempt.getTotalQuestions())
                .questions(
                        quiz.getQuestions()
                                .stream()
                                .map(q -> toQuestionReviewResponse(
                                        q,
                                        answerMap.get(q.getId())
                                ))
                                .toList()
                )
                .build();
    }
}
