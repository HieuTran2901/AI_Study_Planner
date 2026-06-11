package com.example.AI_Study_Planer.dto.response.Quiz.QuizReview;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionReviewResponse {

    private String questionId;
    private String questionText;

    private String selectedAnswer;
    private String correctAnswer;

    private Boolean correct;

    private String explanation;

    private List<OptionReviewResponse> options;
}
