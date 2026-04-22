package com.example.AI_Study_Planer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OpenRouterMessage {
    private String role;
    private String content;
}
