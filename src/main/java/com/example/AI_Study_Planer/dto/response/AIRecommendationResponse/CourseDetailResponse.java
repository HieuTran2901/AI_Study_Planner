package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CourseDetailResponse {
    private String id;
    private String title;

    private Integer totalLessons;
    private Integer completedLessons;

    private List<ModuleResponse> modules;
}
