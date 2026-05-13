package com.example.AI_Study_Planer.service.AIRecommendationService.YoutubeService;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.YoutubeSearchResponse;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.YoutubeVideoResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.service.AIRecommendationService.Helper.YoutubeHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class YoutubeService {

    @Value("${youtube.api-key}")
    private String apiKey;

    @Value("${youtube.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate;
    private final YoutubeHelper youtubeHelper;

    public List<Resource> searchVideo(String query) {

        // ===== 1. CALL SEARCH API =====
        String searchUrl = UriComponentsBuilder
                .fromUriString(baseUrl + "/search")
                .queryParam("part", "snippet")
                .queryParam("q", query)
                .queryParam("type", "video")
                .queryParam("maxResults", 5)
                .queryParam("key", apiKey)
                .toUriString();

        YoutubeSearchResponse searchResponse =
                restTemplate.getForObject(searchUrl, YoutubeSearchResponse.class);

        if (searchResponse == null || searchResponse.getItems() == null) {
            return List.of();
        }

        // ===== 2. EXTRACT VIDEO IDS =====
        List<String> videoIds = searchResponse.getItems().stream()
                .map(i -> i.getId() != null ? i.getId().getVideoId() : null)
                .filter(id -> id != null && !id.isBlank())
                .toList();

        if (videoIds.isEmpty()) return List.of();

        // ===== 3. CALL VIDEOS API =====
        String videoUrl = UriComponentsBuilder
                .fromUriString(baseUrl + "/videos")
                .queryParam("part", "snippet,statistics,contentDetails")
                .queryParam("id", String.join(",", videoIds))
                .queryParam("key", apiKey)
                .toUriString();

        YoutubeVideoResponse videoResponse =
                restTemplate.getForObject(videoUrl, YoutubeVideoResponse.class);

        if (videoResponse == null || videoResponse.getItems() == null) {
            return List.of();
        }

        // =====MAP TO RESOURCE =====
        return videoResponse.getItems().stream()
                .map(youtubeHelper::mapToResource)
                .toList();
    }

}
