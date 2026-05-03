package com.example.AI_Study_Planer.dto.request.AIRecommendation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TopicGenerateRequest {
    private String input; // "ex: I want to learn React from zero"
}
