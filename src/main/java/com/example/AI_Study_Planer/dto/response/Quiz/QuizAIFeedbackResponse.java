package com.example.AI_Study_Planer.dto.response.Quiz;

import lombok.Data;

import java.util.List;

@Data
public class QuizAIFeedbackResponse {

    private String summary;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> recommendations;
}
