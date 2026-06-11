package com.example.AI_Study_Planer.dto.request.Quiz;

import lombok.Data;

import java.util.List;

@Data
public class QuizSubmitRequest {

    private List<QuizAnswerRequest> answers;
}