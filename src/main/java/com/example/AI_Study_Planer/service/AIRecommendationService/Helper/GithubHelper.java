package com.example.AI_Study_Planer.service.AIRecommendationService.Helper;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.GithubResponse.GithubRepoItem;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;
import org.springframework.stereotype.Service;

@Service
public class GithubHelper {
    public Resource mapToResource(GithubRepoItem repo) {
        Resource resource = new Resource();
        resource.setTitle(repo.getName());
        resource.setUrl(repo.getHtmlUrl());
        resource.setDescription(repo.getDescription());
        resource.setPlatform("GitHub");
        resource.setType(ResourceType.GITHUB);
        resource.setAuthor(
                repo.getOwner() != null
                        ? repo.getOwner().getLogin() : null
        );
        resource.setStars(repo.getStars());
        resource.setRating(calculateRating(repo.getStars(), repo.getForks()));
        resource.setForks(repo.getForks());

        return resource;
    }

    public Double calculateRating(
            Integer stars,
            Integer forks
    ) {

        int s = stars != null ? stars : 0;
        int f = forks != null ? forks : 0;

        int score = s + (f * 2);

        if (score > 100000) return 5.0;
        if (score > 30000) return 4.8;
        if (score > 10000) return 4.5;
        if (score > 3000) return 4.2;

        return 4.0;
    }

    public String optimizeGithubQuery(String query) {
        return query
                .replace(" ", "_")
                .trim();
    }
}
