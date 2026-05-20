package com.example.AI_Study_Planer.service.AIRecommendationService.TopicService;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.constant.RoleName;
import com.example.AI_Study_Planer.dto.request.AIRecommendation.TopicGenerateRequest;
import com.example.AI_Study_Planer.dto.request.OpenRouterMessage;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.LearningPathResponse;
import com.example.AI_Study_Planer.dto.response.UserPreferenceResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.mapper.LearningPathMapper;
import com.example.AI_Study_Planer.repository.LearningPathRepository;
import com.example.AI_Study_Planer.service.OpenRouterService;
import com.example.AI_Study_Planer.service.AIRecommendationService.PreferenceService.PreferenceService;
import com.example.AI_Study_Planer.service.PromptService.SystemPromptBuilder;
import com.example.AI_Study_Planer.service.PromptService.UserPromptBuilder;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicGeneratorService {
    private final OpenRouterService openRouterService;
    private final UserService userService;
    private final PreferenceService preferenceService;
    private final LearningPathRepository learningPathRepository;
    private final LearningPathMapper learningPathMapper;
    private final TopicGeneratorHelper topicGeneratorHelper;
    private final SystemPromptBuilder systemPromptBuilder;
    private final UserPromptBuilder userPromptBuilder;

    public LearningPathResponse generate(TopicGenerateRequest req, Authentication authentication) {
        User user = userService.getCurrentUser(authentication);
        UserPreferenceResponse preference =
                preferenceService.getUserPreference(authentication);

        String systemPrompt = systemPromptBuilder.buildRecommendation();
        String userPrompt = userPromptBuilder.build(req.getInput(), preference);

        List<OpenRouterMessage> messages = List.of(
                new OpenRouterMessage(RoleName.SYSTEM, systemPrompt),
                new OpenRouterMessage(RoleName.USER, userPrompt)
        );


        String reply = openRouterService.chat(messages);

        // parse JSON
        LearningPathResponse parsed = topicGeneratorHelper.parse(reply);

        // save
        save(parsed, user);

        // return FE
        return parsed;
    }

    public void save(LearningPathResponse response, User user) {

        if(response.getTitle() == null || response.getTopics() == null) {
            throw new AppException(ErrorCode.INVALID_AI_RESPONSE);
        }

        LearningPath path = learningPathMapper.toLearningPath(response);
        path.setUser(user);

        List<Topic> topics = new ArrayList<>();

        for (int i = 0; i < response.getTopics().size(); i++) {
            Topic topic = topicGeneratorHelper.buildTopic(
                    response.getTopics().get(i),
                    null,
                    path,
                    i
            );
            topics.add(topic);
        }

        path.setTopics(topics);

        learningPathRepository.save(path);
    }

}
