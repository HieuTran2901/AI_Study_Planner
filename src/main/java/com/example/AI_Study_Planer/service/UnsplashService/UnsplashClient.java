package com.example.AI_Study_Planer.service.UnsplashService;

import com.example.AI_Study_Planer.dto.response.UnsplashImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UnsplashClient {
    private final WebClient unsplashWebClient;
    private final ObjectMapper mapper = new ObjectMapper();

    private List<UnsplashImageResponse> parseResults(JsonNode json) {
        try {
            return mapper.readerForListOf(UnsplashImageResponse.class)
                    .readValue(json.get("results"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<UnsplashImageResponse> searchImages(String query) {
        return unsplashWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/photos")
                        .queryParam("query", query)
                        .queryParam("per_page", 5)
                        .build()
                )
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(this::parseResults)
                .block();
    }
}
