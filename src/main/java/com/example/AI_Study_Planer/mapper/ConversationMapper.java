package com.example.AI_Study_Planer.mapper;

import com.example.AI_Study_Planer.dto.response.ConversationResponse;
import com.example.AI_Study_Planer.dto.response.MessageResponse;
import com.example.AI_Study_Planer.entity.Conversation;
import com.example.AI_Study_Planer.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ConversationMapper {
    @Mapping(target = "conversationId", source = "id")
    ConversationResponse toConversationResponse(Conversation conversation);

    List<ConversationResponse> toConversationResponseList(List<Conversation> conversations);
}
