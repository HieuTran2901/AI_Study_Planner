package com.example.AI_Study_Planer.dto.request.Quiz;

import lombok.Data;

@Data
public class QuizAnswerRequest {

    private String questionId;

    private String selectedOptionId;
}