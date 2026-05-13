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
    private String id;
    private String title;
    private String url;
    private String platform;
    private String type;
    private Double rating;

    // Youtube
    private String searchQuery;
    private String thumbnailUrl;
    private Long viewCount;
    private String channelTitle;
    private Integer durationSeconds;

    // Github
    private String description;
    private String author;
    private Integer stars;
}
