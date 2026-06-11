package com.example.AI_Study_Planer.dto.response.Quiz;

import lombok.Data;

@Data
public class DailyQuizResponse {

    private String quizId;

    private String title;

    private Integer streak;

    private Boolean completedToday;
}
