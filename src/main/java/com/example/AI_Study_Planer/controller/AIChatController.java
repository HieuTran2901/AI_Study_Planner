package com.example.AI_Study_Planer.controller;

import com.example.AI_Study_Planer.common.ApiResponse;
import com.example.AI_Study_Planer.dto.request.AIChatRequest;
import com.example.AI_Study_Planer.dto.response.AIChatResponse;
import com.example.AI_Study_Planer.dto.response.ConversationDetailResponse;
import com.example.AI_Study_Planer.dto.response.ConversationResponse;
import com.example.AI_Study_Planer.dto.response.PagedResponse;
import com.example.AI_Study_Planer.service.AIChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversation")
@RequiredArgsConstructor
public class AIChatController {
    private final AIChatService aiChatService;

    @GetMapping("/{id}/message")
    public ApiResponse<ConversationDetailResponse> getAllMessage(
            @PathVariable String id,
            Authentication authentication) {
        ConversationDetailResponse response = aiChatService.getAllMessage(id,authentication);

        return ApiResponse.<ConversationDetailResponse>builder()
                .results(response)
                .build();
    }

    @GetMapping
    public ApiResponse<PagedResponse<ConversationResponse>> getMyConversation(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication
    ) {
        return ApiResponse.<PagedResponse<ConversationResponse>>builder()
                .results(aiChatService.getAllConversation(authentication, page, size))
                .build();
    }

    @PostMapping
    public ApiResponse<ConversationResponse> createConversation(Authentication authentication) {
        ConversationResponse response = aiChatService.createConversation(authentication);

        return ApiResponse.<ConversationResponse>builder()
                .results(response)
                .build();
    }

    @PostMapping("/{id}/message")
    public ApiResponse<AIChatResponse> chatAI(@RequestBody AIChatRequest request,
                                              @PathVariable String id,
                                              Authentication authentication) {
        AIChatResponse response = aiChatService.chat(request,id, authentication);

        return ApiResponse.<AIChatResponse>builder()
                .results(response)
                .build();
    }

}
