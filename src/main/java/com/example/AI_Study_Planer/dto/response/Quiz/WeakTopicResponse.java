package com.example.AI_Study_Planer.dto.response.Quiz;

import lombok.Data;

@Data
public class WeakTopicResponse {

    private String topic;

    private Integer accuracy;

    private Integer totalQuestions;
}