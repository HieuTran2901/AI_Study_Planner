package com.example.AI_Study_Planer.dto.response.Quiz.Quizgenerate;

import com.example.AI_Study_Planer.enums.Quiz.QuestionType;
import lombok.Data;

import java.util.List;

@Data
public class QuizGenerateQuestion {

    private String questionText;

    private QuestionType type;

    private Integer order;

    private List<QuizGenerateOption> options;
}
