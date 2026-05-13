package com.example.AI_Study_Planer.service.AIRecommendationService.Provider;

import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;

import java.util.List;

public interface ResourceProvider {
    List<Resource> search(String query);

    boolean supports(ResourceType type);

    String getProviderName();
}
