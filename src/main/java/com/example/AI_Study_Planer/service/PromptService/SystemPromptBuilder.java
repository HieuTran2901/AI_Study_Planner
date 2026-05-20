package com.example.AI_Study_Planer.service.PromptService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SystemPromptBuilder {

    private final PromptService promptService;

    public String buildRecommendation() {

        return String.join(
                "\n\n",
                promptService.load("prompts/system/core-rules.txt"),
                promptService.load("prompts/system/personalization-rules.txt"),
                promptService.load("prompts/system/resource-rules.txt"),
                promptService.load("prompts/system/quality-rules.txt"),

                promptService.load("prompts/examples/roadmap-example.json"),
                promptService.load("prompts/schema/output-schema.json")
        );
    }

    public  String buildChat() {
        return String.join(
                "\n\n",
                promptService.load("prompts/chat/chat-system-prompt.txt")
        );
    }
}
