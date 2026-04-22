package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.dto.request.OpenRouterMessage;
import com.example.AI_Study_Planer.dto.request.OpenRouterRequest;
import com.example.AI_Study_Planer.dto.response.OpenRouterResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OpenRouterService {
    @Value("${openRouter.custom-api-key}")
    private String apiKey;

    @Value("${openRouter.url}")
    private String url;

    @Value("${openRouter.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String chat(List<OpenRouterMessage> messages) {

        // Create header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // Set properties for OpenRouter
        headers.set("HTTP-Referer", "http://localhost:5173");
        headers.set("X-Title", "AI Study Planner");

        //DTO request
        OpenRouterRequest body = new OpenRouterRequest(model, messages);

        // Send body, header to HttpEntity
        HttpEntity<OpenRouterRequest> request =
                new HttpEntity<>(body, headers);

        // Get response from openRouter
        ResponseEntity<OpenRouterResponse> response =
                restTemplate.postForEntity(url, request, OpenRouterResponse.class);

        // Validate
        if(!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Failed to call OpenRouter");
        }

        OpenRouterResponse opBody = response.getBody();

        if (opBody.getChoices() == null || opBody.getChoices().isEmpty()) {
            throw new RuntimeException("No AI response");
        }

        return response.getBody()
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }

    public String generateTitle(String message) {
        List<OpenRouterMessage> prompt = List.of(
                new OpenRouterMessage("system",
                        "You are an assistant that creates short conversation titles (max 6 words)."),
                new OpenRouterMessage("user",
                        "Create a short title for this message: " + message)
        );

        String title = chat(prompt);

        return title.replace("\"", "").trim();
    }
}
