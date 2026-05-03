package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse;

import com.example.AI_Study_Planer.enums.TopicStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateTopicResponse {
    private TopicStatus topicStatus;
    private int progress;
}
