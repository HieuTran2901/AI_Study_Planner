package com.example.AI_Study_Planer.mapper;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.LearningPathResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LearningPathMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "topics", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    LearningPath toLearningPath(LearningPathResponse response);

}