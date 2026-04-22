package com.example.AI_Study_Planer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class PromptService {

    @Value("classpath:system-prompt.txt")
    private Resource promptResource;

    public String getSystemPrompt() {
        try (InputStream input = promptResource.getInputStream()) {
            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Cannot load prompt", e);
        }
    }
}