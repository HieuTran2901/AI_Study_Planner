package com.example.AI_Study_Planer.service.PromptService;

import com.example.AI_Study_Planer.dto.response.UserPreferenceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserPromptBuilder {

    private final PreferencePromptBuilder preferencePromptBuilder;

    public String build(
            String learningRequest,
            UserPreferenceResponse preference
    ) {

        String preferenceContext =
                preferencePromptBuilder.build(preference);

        return """
                LEARNING REQUEST:

                %s

                %s
                """
                .formatted(
                        learningRequest,
                        preferenceContext
                );
    }
}
