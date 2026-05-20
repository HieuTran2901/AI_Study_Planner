package com.example.AI_Study_Planer.controller;

import com.example.AI_Study_Planer.common.ApiResponse;
import com.example.AI_Study_Planer.dto.request.UserPreferenceRequest;
import com.example.AI_Study_Planer.dto.response.UserPreferenceResponse;
import com.example.AI_Study_Planer.service.AIRecommendationService.PreferenceService.PreferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/preferences")
public class PreferenceController {
    private final PreferenceService preferenceService;

    @GetMapping("/me")
    public ApiResponse<UserPreferenceResponse> getUserPreference(
            Authentication authentication
    ) {
        return ApiResponse.<UserPreferenceResponse>builder()
                .results(preferenceService.getUserPreference(authentication))
                .build();
    }

    @PutMapping("/me")
    public ApiResponse<UserPreferenceResponse> updatePreference(
            @RequestBody UserPreferenceRequest request,
            Authentication authentication
    ) {
        UserPreferenceResponse preference = preferenceService.updatePreference(request, authentication);

        return ApiResponse.<UserPreferenceResponse>builder()
                .results(preference)
                .build();
    }
}
