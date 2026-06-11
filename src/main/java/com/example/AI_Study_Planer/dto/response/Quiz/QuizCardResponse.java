package com.example.AI_Study_Planer.dto.response.Quiz;

import com.example.AI_Study_Planer.enums.Quiz.Difficulty;
import lombok.Data;

@Data
public class QuizCardResponse {

    private String id;

    private String title;

    private Difficulty difficulty;

    private Integer duration;

    private Integer questionCount;

    private Integer progress;

    private String category;

    private Boolean aiRecommended;
}
