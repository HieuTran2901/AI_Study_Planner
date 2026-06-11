package com.example.AI_Study_Planer.mapper;

import com.example.AI_Study_Planer.dto.response.Quiz.*;
import com.example.AI_Study_Planer.entity.Quiz.Quiz;
import com.example.AI_Study_Planer.entity.Quiz.QuizAttempt;
import com.example.AI_Study_Planer.entity.Quiz.QuizOption;
import com.example.AI_Study_Planer.entity.Quiz.QuizQuestion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizMapper {

    @Mapping(source = "estimatedMinutes", target = "durationMinutes")
    QuizDetailResponse toQuizDetailResponse(Quiz quiz);

    @Mapping(source = "orderIndex", target = "order")
    QuizQuestionResponse toQuestionResponse(QuizQuestion question);

    @Mapping(source = "content", target = "optionText")
    @Mapping(target = "order", ignore = true)
    QuestionOptionResponse toQuestionOptionResponse(
            QuizOption option
    );

    @Mapping(target = "duration", source = "estimatedMinutes")
    @Mapping(target = "questionCount", source = "totalQuestions")
    @Mapping(target = "aiRecommended", source = "aiGenerated")
    @Mapping(target = "category", source = "topic.title")
    @Mapping(target = "progress", ignore = true)
    QuizCardResponse toQuizCardResponse(Quiz quiz);

    List<QuizCardResponse> toQuizCardResponseList(
            List<Quiz> quizzes
    );

    @Mapping(target = "id", source = "quiz.id")
    @Mapping(target = "title", source = "quiz.title")
    @Mapping(target = "difficulty", source = "quiz.difficulty")
    @Mapping(target = "duration", source = "quiz.estimatedMinutes")
    @Mapping(target = "questionCount", source = "quiz.totalQuestions")
    @Mapping(target = "aiRecommended", source = "quiz.aiGenerated")
    @Mapping(target = "category", source = "quiz.topic.title")
    @Mapping(target = "progress", source = "progress")
    QuizCardResponse toQuizCardResponse(
            QuizAttempt attempt
    );

    List<QuizCardResponse> toQuizAttemptCardResponseList(
            List<QuizAttempt> attempts
    );

    @Mapping(target = "quizId", source = "quiz.id")
    @Mapping(target = "title", source = "quiz.title")
    @Mapping(target = "score", source = "score")
    @Mapping(target = "completedAt", source = "completedAt")
    QuizHistoryResponse toQuizHistoryResponse(
            QuizAttempt attempt
    );

    List<QuizHistoryResponse> toQuizHistoryResponseList(
            List<QuizAttempt> attempts
    );
}
