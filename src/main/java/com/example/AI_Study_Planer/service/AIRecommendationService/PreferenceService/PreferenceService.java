package com.example.AI_Study_Planer.service.AIRecommendationService.PreferenceService;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.request.UserPreferenceRequest;
import com.example.AI_Study_Planer.dto.response.UserPreferenceResponse;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.entity.UserPreference;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.mapper.PreferenceMapper;
import com.example.AI_Study_Planer.repository.PreferenceRepository;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PreferenceService {
    private final PreferenceMapper preferenceMapper;
    private final PreferenceRepository preferenceRepository;

    private final UserService userService;

    public UserPreferenceResponse getUserPreference(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        UserPreference preference = preferenceRepository.findByUserId(user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.PREFERENCE_NOT_FOUND));

        return preferenceMapper.toPreferenceResponse(preference);
    }

    public UserPreferenceResponse updatePreference(UserPreferenceRequest request, Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        UserPreference userPreference = preferenceRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    UserPreference newPreference = new UserPreference();
                    newPreference.setUser(user);
                    return newPreference;
                });

        preferenceMapper.updatePreference(userPreference, request);

        UserPreference savePreference = preferenceRepository.save(userPreference);

        return preferenceMapper.toPreferenceResponse(savePreference);
    }
}
