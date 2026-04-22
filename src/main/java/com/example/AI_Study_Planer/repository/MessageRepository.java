package com.example.AI_Study_Planer.repository;

import com.example.AI_Study_Planer.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    Optional<List<Message>> findTop20ByConversationIdOrderByCreatedAt(String conversationId);

    List<Message> findByConversationIdOrderByCreatedAt(String conversationId);
}
