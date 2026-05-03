package com.example.AI_Study_Planer.dto.request.AIRecommendation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateProgressRequest {
    private int progress;
}
