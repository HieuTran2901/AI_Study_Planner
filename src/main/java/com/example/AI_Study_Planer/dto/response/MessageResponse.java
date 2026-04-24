package com.example.AI_Study_Planer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
    private String id;
    private String role;
    private String content;
    private LocalDateTime createdAt;
    private List<String> fileUrls;
}