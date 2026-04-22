package com.example.AI_Study_Planer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class OpenRouterResponse {
    private List<OpenRouterChoice> choices;
}
