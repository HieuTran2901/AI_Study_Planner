package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse;

import com.example.AI_Study_Planer.enums.LessonStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LessonResponse {
    private String id;
    private String title;

    private String duration;

    private String videoUrl;

    private LessonStatus status; // enum
}
