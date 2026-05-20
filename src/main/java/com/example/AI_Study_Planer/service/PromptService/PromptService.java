package com.example.AI_Study_Planer.service.PromptService;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class PromptService {

    private final ResourceLoader resourceLoader;

    public String load(String path) {

        try {

            return resourceLoader
                    .getResource("classpath:" + path)
                    .getContentAsString(StandardCharsets.UTF_8);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to load prompt: " + path,
                    e
            );
        }
    }
}
