package com.example.AI_Study_Planer.mapper;

import com.example.AI_Study_Planer.dto.response.MessageResponse;
import com.example.AI_Study_Planer.entity.Attachment;
import com.example.AI_Study_Planer.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(target = "role", source = "role")
    @Mapping(target = "content", source = "content")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "fileUrls", source = "attachments")
    MessageResponse toMessageResponse(Message message);

    List<MessageResponse> toMessageResponseList(List<Message> messages);

    default List<String> mapAttachmentsToUrls(List<Attachment> attachments) {
        if (attachments == null) return List.of();
        return attachments.stream()
                .map(Attachment::getFileUrl)
                .toList();
    }
}
