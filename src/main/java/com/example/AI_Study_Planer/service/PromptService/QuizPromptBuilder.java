package com.example.AI_Study_Planer.service.PromptService;

import com.example.AI_Study_Planer.enums.Quiz.Difficulty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizPromptBuilder {

    private final SystemPromptBuilder systemPromptBuilder;

    public String build(
            String topic,
            Difficulty difficulty
    ) {

        return String.join(
                "\n\n",

                systemPromptBuilder.buildQuiz(),

                """
                USER INPUT

                Topic:
                %s

                Difficulty:
                %s
                """
                        .formatted(
                                topic,
                                difficulty.name()
                        )
        );
    }

}