package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.dto.response.YoutubeSearchResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class YoutubeService {

    @Value("${youtube.api-key}")
    private String apikey;

    @Value("${youtube.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Resource> searchVideo(String query) {

        String url = UriComponentsBuilder
                .fromUriString(baseUrl + "/search")
                .queryParam("part", "snippet")
                .queryParam("q", query)
                .queryParam("type", "video")
                .queryParam("maxResults", 3)
                .queryParam("key", apikey)
                .toUriString();

        YoutubeSearchResponse response =
                restTemplate.getForObject(url, YoutubeSearchResponse.class);

        if (response == null || response.getItems() == null) {
            return List.of();
        }


        return response.getItems().stream().map(item -> {
            Resource r = new Resource();

            if (item.getId() == null || item.getId().getVideoId() == null) {
                return null;
            }

            String videoId = item.getId().getVideoId();

            r.setTitle(item.getSnippet().getTitle());
            r.setUrl("https://www.youtube.com/watch?v=" + videoId);
            r.setPlatform("Youtube");
            r.setType(ResourceType.VIDEO);
            r.setThumbnailUrl(item.getSnippet().getThumbnails().getHigh().getUrl());

            return r;
        }).toList();
    }
}
