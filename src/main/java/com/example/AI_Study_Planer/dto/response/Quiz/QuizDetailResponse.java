package com.example.AI_Study_Planer.dto.response.Quiz;

import com.example.AI_Study_Planer.enums.Quiz.Difficulty;
import lombok.Data;

import java.util.List;

@Data
public class QuizDetailResponse {

    private String id;

    private String title;

    private String description;

    private Difficulty difficulty;

    private Integer durationMinutes;

    private Integer totalQuestions;

    private String category;

    private Boolean aiRecommended;

    private List<QuizQuestionResponse> questions;
}
