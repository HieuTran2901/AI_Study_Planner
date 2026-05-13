package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ModuleResponse {
    private String id;
    private String title;
    private String level;

    private List<LessonResponse> lessons;
}