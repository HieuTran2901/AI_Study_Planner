package com.example.AI_Study_Planer.service.AIRecommendationService.Provider;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.GithubResponse.GithubSearchResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;
import com.example.AI_Study_Planer.service.AIRecommendationService.Helper.GithubHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GithubProvider implements ResourceProvider{
    @Value("${github.base-url}")
    private String baseUrl;

    @Value("${github.token}")
    private String token;

    private final RestTemplate restTemplate;
    private final GithubHelper githubHelper;

    @Override
    public List<Resource> search(String query) {
        String optimizedQuery = githubHelper.optimizeGithubQuery(query);

        String url = UriComponentsBuilder
                .fromUriString(baseUrl + "/search/repositories")
                .queryParam("q", optimizedQuery )
                .queryParam("sort", "stars")
                .queryParam("order", "desc")
                .queryParam("per_page", 5)
                .toUriString();
        System.out.println(url);

        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(token);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<GithubSearchResponse> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        GithubSearchResponse.class
                );

        GithubSearchResponse body = response.getBody();

        if (body == null || body.getItems() == null) {
            return List.of();
        }

        List<Resource> results = body.getItems().stream()
                .filter(item -> item.getStars() > 100)
                .map(githubHelper::mapToResource)
                .toList();

        System.out.println("GITHUB RESULTS = " + results.size());

        return results;
    }

    @Override
    public boolean supports(ResourceType type) {
        return type == ResourceType.GITHUB;
    }

    @Override
    public String getProviderName() {
        return "github";
    }
}
