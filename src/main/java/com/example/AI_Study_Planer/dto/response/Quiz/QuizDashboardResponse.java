package com.example.AI_Study_Planer.dto.response.Quiz;

import lombok.Data;

import java.util.List;

@Data
public class QuizDashboardResponse {

    private List<QuizCardResponse> recommendedQuizzes;

    private DailyQuizResponse dailyQuiz;

    private List<QuizCardResponse> continueQuizzes;

    private List<WeakTopicResponse> weakTopics;

    private List<QuizHistoryResponse> recentQuizzes;

    private QuizStatsResponse stats;

    private String aiTip;
}