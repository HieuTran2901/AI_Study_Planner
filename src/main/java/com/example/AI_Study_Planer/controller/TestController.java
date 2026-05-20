package com.example.AI_Study_Planer.controller;

import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.service.AIRecommendationService.Provider.GithubProvider;
import com.example.AI_Study_Planer.service.AIRecommendationService.Provider.YoutubeProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final GithubProvider githubProvider;

    private final YoutubeProvider youtubeProvider;

    @GetMapping("/github")
    public List<Resource> testGithub(
            @RequestParam String query
    ) {
        System.out.println("QUERY = " + query);
        return githubProvider.search(query);
    }

    @GetMapping("/youtube")
    public List<Resource> testYoutube(
            @RequestParam String query
    ) {

        System.out.println("YOUTUBE QUERY = " + query);

        return youtubeProvider.search(query);
    }
}