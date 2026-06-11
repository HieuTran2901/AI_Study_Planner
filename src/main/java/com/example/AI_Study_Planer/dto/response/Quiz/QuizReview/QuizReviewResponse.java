package com.example.AI_Study_Planer.dto.response.Quiz.QuizReview;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuizReviewResponse {

    private String quizId;
    private String title;

    private Integer score;
    private Integer correctAnswers;
    private Integer totalQuestions;

    private List<QuestionReviewResponse> questions;
}
