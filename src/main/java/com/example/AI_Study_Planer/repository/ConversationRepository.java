package com.example.AI_Study_Planer.repository;

import com.example.AI_Study_Planer.entity.Conversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, String> {
    Optional<Conversation> findByIdAndUserId(String conversationId, String userId);
    Page<Conversation> findByUserId(String userId, Pageable pageable);
}
