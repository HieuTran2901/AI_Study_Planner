package com.example.AI_Study_Planer.repository;

import com.example.AI_Study_Planer.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, String> {
    List<Attachment> findByMessageId(String messageId);
}
