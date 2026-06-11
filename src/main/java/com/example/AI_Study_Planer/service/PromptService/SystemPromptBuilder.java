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
                promptService.load("prompts/system/AIRecommendation/core-rules.txt"),
                promptService.load("prompts/system/AIRecommendation/personalization-rules.txt"),
                promptService.load("prompts/system/AIRecommendation/resource-rules.txt"),
                promptService.load("prompts/system/AIRecommendation/quality-rules.txt"),

                promptService.load("prompts/examples/roadmap-example.json"),
                promptService.load("prompts/schema/output-recommendation-schema.json")
        );
    }

    public  String buildChat() {
        return String.join(
                "\n\n",
                promptService.load("prompts/chat/chat-system-prompt.txt")
        );
    }

    public String buildQuiz() {
        return String.join(
                "\n\n",
                promptService.load("prompts/system/AIQuiz/core-rules.txt"),
                promptService.load("prompts/system/AIQuiz/question-rules.txt"),
                promptService.load("prompts/system/AIQuiz/option-rules.txt"),
                promptService.load("prompts/system/AIQuiz/structure-rules.txt"),

                promptService.load("prompts/schema/output-quiz-schema.json"),
                promptService.load("prompts/examples/quiz-example.json")
        );
    }
}
