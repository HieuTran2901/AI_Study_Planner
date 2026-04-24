package com.example.AI_Study_Planer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AIChatRequest {
//    private String conversationId;
    private String message;
    private List<String> fileUrls;
}
