package com.example.AI_Study_Planer.repository;

import com.example.AI_Study_Planer.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, String> {
    Optional<Conversation> findByIdAndUserId(String conversationId, String userId);
    Optional<Conversation> findByUserId(String userId);
}
