package com.example.AI_Study_Planer.service.AIRecommendationService.Provider;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.YoutubeResonse.YoutubeSearchResponse;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.YoutubeResonse.YoutubeVideoResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;
import com.example.AI_Study_Planer.service.AIRecommendationService.Helper.YoutubeHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class YoutubeProvider implements ResourceProvider {

    @Value("${youtube.api-key}")
    private String apiKey;

    @Value("${youtube.base-url}")
    private String baseUrl;

    @Value("${youtube.search-max-result}")
    private int maxResults;

    private final RestTemplate restTemplate;
    private final YoutubeHelper youtubeHelper;

    @Override
    public List<Resource> search(String query) {
        String optimizedQuery = youtubeHelper.optimizeYoutubeQuery(query);

        // ===== 1. CALL SEARCH API =====
        String searchUrl = UriComponentsBuilder
                .fromUriString(baseUrl + "/search")
                .queryParam("part", "snippet")
                .queryParam("q", optimizedQuery)
                .queryParam("type", "video")
                .queryParam("order", "date") // return newest video
                .queryParam("order","relevance") // get video that relevant to query
                .queryParam("videoDuration", "long") // get video have long duration
                .queryParam("maxResults", maxResults)
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

    @Override
    public boolean supports(ResourceType type) {
        return type == ResourceType.VIDEO;
    }

    @Override
    public String getProviderName() {
        return "youtube";
    }
}