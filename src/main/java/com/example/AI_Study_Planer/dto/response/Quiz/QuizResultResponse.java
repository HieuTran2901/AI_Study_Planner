package com.example.AI_Study_Planer.dto.response.Quiz;

import lombok.Data;

import java.util.List;

@Data
public class QuizResultResponse {

    private Integer score;

    private Integer correctAnswers;

    private Integer totalQuestions;

    private Integer durationSeconds;

    private List<String> weakAreas;

    private String aiFeedback;
}
