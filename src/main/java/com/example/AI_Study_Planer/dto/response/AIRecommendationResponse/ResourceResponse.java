package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResourceResponse {
    private String title;
    private String url;
    private String platform;
    private String type;
//    private Integer estimatedHours;
    private Double rating;
}
