package com.example.AI_Study_Planer.dto.response.Quiz;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuizHistoryResponse {

    private String attemptId;

    private String quizId;

    private String title;

    private Integer score;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private LocalDateTime completedAt;
}