package com.example.AI_Study_Planer.dto.response.Quiz.QuizReview;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OptionReviewResponse {
    private String id;
    private String content;
    private Boolean correct;
}