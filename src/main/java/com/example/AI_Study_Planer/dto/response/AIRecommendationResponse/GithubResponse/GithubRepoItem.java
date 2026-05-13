package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.GithubResponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GithubRepoItem {

    private String name;

    @JsonProperty("html_url")
    private String htmlUrl;

    private String description;

    @JsonProperty("stargazers_count")
    private Integer stars;

    @JsonProperty("forks_count")
    private Integer forks;

    private Owner owner;


    @Data
    public static class Owner {
        private String login;
    }
}
