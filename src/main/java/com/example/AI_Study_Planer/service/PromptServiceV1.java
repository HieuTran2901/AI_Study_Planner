package com.example.AI_Study_Planer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class PromptServiceV1 {

    @Value("classpath:prompts/system-prompt.txt")
    private Resource systemPrompt;

    @Value("classpath:prompts/recommendation-prompt.txt")
    private Resource recommendationPrompt;

    @Value("classpath:prompts/chooseBestResource-prompt.txt")
    private Resource chooseBestVideoPrompt;

    private String loadResource(Resource resource) {
        try (InputStream input = resource.getInputStream()) {
            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Cannot load prompt", e);
        }
    }

    public String getSystemPrompt() {
        return loadResource(systemPrompt);
    }

    public String getRecommendationPrompt() {
        return loadResource(recommendationPrompt);
    }

    public String getBestResourcePrompt() {
        return loadResource(chooseBestVideoPrompt);
    }
}