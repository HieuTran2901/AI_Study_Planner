package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.constant.RoleName;
import com.example.AI_Study_Planer.dto.request.AIChatRequest;
import com.example.AI_Study_Planer.dto.request.OpenRouterMessage;
import com.example.AI_Study_Planer.dto.response.*;
import com.example.AI_Study_Planer.entity.Attachment;
import com.example.AI_Study_Planer.entity.Conversation;
import com.example.AI_Study_Planer.entity.Message;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.mapper.ConversationMapper;
import com.example.AI_Study_Planer.mapper.MessageMapper;
import com.example.AI_Study_Planer.repository.AttachmentRepository;
import com.example.AI_Study_Planer.repository.ConversationRepository;
import com.example.AI_Study_Planer.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIChatService {
    private final OpenRouterService openRouterService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    private final UserService userService;
    private final PromptService promptService;
    private final AttachmentService attachmentService;

    private final MessageMapper messageMapper;
    private final ConversationMapper conversationMapper;

    public ConversationResponse createConversation(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setCreatedAt(LocalDateTime.now());
        conversation.setUpdatedAt(LocalDateTime.now());
        conversation.setTittle("New Chat");

        conversation = conversationRepository.save(conversation);

        return conversationMapper.toConversationResponse(conversation);
    }

    public List<OpenRouterMessage> buildMessages(
            String conversationId,
            AIChatRequest request
    ) {
        List<OpenRouterMessage> aiMessages = new ArrayList<>();

        String systemPrompt = promptService.getSystemPrompt();

        if(request.getFileUrls() != null) {
            for (String url : request.getFileUrls()) {
                aiMessages.add(new OpenRouterMessage(
                        RoleName.USER,
                        "Please analyze the following file:\\n" + url
                ));
            }
        }

        // System
        aiMessages.add(new OpenRouterMessage(
                RoleName.ASSISTANT,
                systemPrompt
        ));

        // History
        List<Message> history = messageRepository.findTop20ByConversationIdOrderByCreatedAt(conversationId)
                .orElseThrow(() -> new AppException(ErrorCode.HISTORY_NOT_FOUND));

        for (Message msg : history) {
            String content = msg.getContent();

            // Get file
            if(msg.getAttachments() != null && !msg.getAttachments().isEmpty()) {
                String files = msg.getAttachments().stream()
                        .map(Attachment::getFileUrl)
                        .reduce("",(a,b) -> a + "\n" + b);

                content += "\nAttached file:\n" + files;
            }

            aiMessages.add(new OpenRouterMessage(
                    msg.getRole().toLowerCase(),
                    content
            ));
        }

        // User message
        aiMessages.add(new OpenRouterMessage(
                RoleName.USER,
                request.getMessage()
        ));

        return aiMessages;
    }

    public AIChatResponse chat(AIChatRequest request, String conversationId, Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        Conversation conversation = conversationRepository.findByIdAndUserId(conversationId, user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.CONVERSATION_NOT_FOUND));

        conversation.setUpdatedAt(LocalDateTime.now());
        conversationRepository.save(conversation);

        if (request.getMessage() == null || request.getMessage().isBlank()) {
            throw new IllegalArgumentException("Message cannot be empty");
        }

        // Save user message
        Message userMsg = new Message();
        userMsg.setConversation(conversation);
        userMsg.setContent(request.getMessage());
        userMsg.setRole(RoleName.USER);
        userMsg.setCreatedAt(LocalDateTime.now());

        messageRepository.save(userMsg);

        // Save attachment
        attachmentService.saveAttachments(request.getFileUrls(), userMsg);

        // Build message
        List<OpenRouterMessage> messages = buildMessages(conversationId, request);

        // Call AI
        String reply = openRouterService.chat(messages);

        // Save AI message
        Message aiMsg = new Message();
        aiMsg.setConversation(conversation);
        aiMsg.setContent(reply);
        aiMsg.setRole(RoleName.ASSISTANT);
        aiMsg.setCreatedAt(LocalDateTime.now());

        messageRepository.save(aiMsg);

        return new AIChatResponse(conversationId, reply);
    }

    public ConversationDetailResponse getAllMessage(String conversationId,
                                                    Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        Conversation conversation = conversationRepository.findByIdAndUserId(conversationId, user.getId())
                .orElseThrow(()-> new AppException(ErrorCode.CONVERSATION_NOT_FOUND));

        List<Message> messages = messageRepository
                .findByConversationIdWithAttachments(conversation.getId());

        List<MessageResponse> res = messageMapper.toMessageResponseList(messages);

        ConversationDetailResponse response = new ConversationDetailResponse();
        response.setMessages(res);

        return response;
    }

    public PagedResponse<ConversationResponse> getAllConversation(Authentication authentication,
                                                                  int page, int size) {
        User user = userService.getCurrentUser(authentication);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Conversation> result = conversationRepository.findByUserId(user.getId(),pageable);

        List<ConversationResponse> conversations = conversationMapper
                .toConversationResponseList(result.getContent());

        return PagedResponse.<ConversationResponse>builder()
                .items(conversations)
                .page(result.getNumber())
                .size(result.getSize())
                .totalItems(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .hasNext(result.hasNext())
                .build();
    }
}
