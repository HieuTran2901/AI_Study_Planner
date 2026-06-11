package com.example.AI_Study_Planer.dto.response.Quiz;

import lombok.Data;

@Data
public class QuizStatsResponse {

    private Integer quizzesCompleted;

    private Double averageScore;

    private Integer currentStreak;

    private Integer totalPoints;
}