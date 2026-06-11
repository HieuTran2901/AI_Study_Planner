package com.example.AI_Study_Planer.dto.response.Quiz.Quizgenerate;

import com.example.AI_Study_Planer.enums.Quiz.Difficulty;
import lombok.Data;

import java.util.List;

@Data
public class QuizGenerateResponse {

    private String title;

    private Difficulty difficulty;

    private Integer estimatedMinutes;

    private List<QuizGenerateQuestion> questions;
}
