package com.example.AI_Study_Planer.dto.request.Quiz;

import com.example.AI_Study_Planer.enums.Quiz.Difficulty;
import lombok.Data;

@Data
public class GenerateQuizRequest {

    private String topic;

    private Difficulty difficulty;

    private Integer questionCount;
}
