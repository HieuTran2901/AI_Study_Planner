package com.example.AI_Study_Planer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class OpenRouterRequest {
    private String model;
    private List<OpenRouterMessage> messages;
}
