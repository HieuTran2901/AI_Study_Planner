package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.entity.Attachment;
import com.example.AI_Study_Planer.entity.Message;
import com.example.AI_Study_Planer.repository.AttachmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttachmentService {
    private final AttachmentRepository attachmentRepository;

    public void saveAttachments(
            List<String> fileUrls,
            Message message
    ) {
        if(fileUrls == null || fileUrls.isEmpty()) return;

        List<Attachment> attachments = fileUrls.stream()
                .map(url -> {
                    Attachment a = new Attachment();
                    a.setFileName(extractFileName(url));
                    a.setFileType(getFileType(url));
                    a.setCreatedAt(LocalDateTime.now());
                    a.setMessage(message);
                    a.setFileUrl(url);
                    return a;
                }).toList();
        attachmentRepository.saveAll(attachments);
    }

    private String extractFileName(String url) {
        return url.substring(url.lastIndexOf("/") + 1);
    }

    private String getFileType(String url) {
        if (url.endsWith(".png") || url.endsWith(".jpg")) return "image";
        if(url.endsWith("pdf")) return "pdf";

        return "file";
    }
}
