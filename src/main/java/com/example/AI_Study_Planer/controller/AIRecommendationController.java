package com.example.AI_Study_Planer.controller;

import com.example.AI_Study_Planer.common.ApiResponse;
import com.example.AI_Study_Planer.dto.request.AIRecommendation.TopicGenerateRequest;
import com.example.AI_Study_Planer.dto.request.AIRecommendation.UpdateProgressRequest;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.ResourceResponse;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.UpdateTopicResponse;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.LearningPathResponse;
import com.example.AI_Study_Planer.service.AIRecommendationService.RoadmapService;
import com.example.AI_Study_Planer.service.AIRecommendationService.TopicGeneratorService;
import com.example.AI_Study_Planer.service.AIRecommendationService.TopicProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendation")
@RequiredArgsConstructor
public class AIRecommendationController {
    private final TopicGeneratorService topicGeneratorService;
    private final TopicProgressService topicProgressService;
    private final RoadmapService roadmapService;

    @GetMapping
    public ApiResponse<LearningPathResponse> getCurrent(Authentication authentication) {
        return ApiResponse.<LearningPathResponse>builder()
                .results(roadmapService.getCurrentLearningPath(authentication))
                .build();
    }

    @PostMapping("/topics/generate")
    public ApiResponse<LearningPathResponse> generate(
            @RequestBody TopicGenerateRequest request,
            Authentication authentication
            ) {
        return ApiResponse.<LearningPathResponse>builder()
                .results(topicGeneratorService.generate(request, authentication))
                .build();
    }

    @PostMapping("/topics/{id}/update")
    public ApiResponse<UpdateTopicResponse> updateProgress(
            @PathVariable String id,
            @RequestBody UpdateProgressRequest request
            ) {
        return ApiResponse.<UpdateTopicResponse>builder()
                .results(topicProgressService.updateTopicProgress(id, request.getProgress()))
                .build();
    }

    @PostMapping("/topics/{id}/complete")
    public ApiResponse<Void> completedSubTopic(@PathVariable String id) {
        topicProgressService.completedSubtopic(id);

        return ApiResponse.<Void>builder()
                .message("Subtopic complete")
                .build();
    }
}
