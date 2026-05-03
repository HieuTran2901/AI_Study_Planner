package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse;

import com.example.AI_Study_Planer.enums.TopicStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LearningPathResponse {

    private String id;
    private String title;
    private List<TopicNode> topics;

    @Data
    public static class TopicNode {
        private String id;
        private String title;
        private String description;
        private String difficulty;

        private Integer order;
        private Integer estimatedHours;

        private Integer progress;
        private TopicStatus status;

        private String imageQuery;
        private String imageUrl;

        private List<ResourceResponse> resources;

        private List<TopicNode> children;
    }
}
