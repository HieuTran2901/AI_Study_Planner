package com.example.AI_Study_Planer.mapper;

import com.example.AI_Study_Planer.dto.request.UserPreferenceRequest;
import com.example.AI_Study_Planer.dto.response.UserPreferenceResponse;
import com.example.AI_Study_Planer.entity.UserPreference;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PreferenceMapper {
    UserPreferenceResponse toPreferenceResponse(UserPreference userPreference);

    void updatePreference(@MappingTarget UserPreference userPreference, UserPreferenceRequest request);
}
