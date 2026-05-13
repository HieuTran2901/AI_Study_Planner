package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.GithubResponse;

import lombok.Data;

import java.util.List;

@Data
public class GithubSearchResponse {

    private List<GithubRepoItem> items;
}
