package com.example.AI_Study_Planer.mapper;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.LearningPathResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TopicMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "parentTopic", ignore = true)
    @Mapping(target = "learningPath", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "orderIndex", ignore = true)
    @Mapping(target = "children", ignore = true)
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    Topic toTopic(LearningPathResponse.TopicNode node);
}
