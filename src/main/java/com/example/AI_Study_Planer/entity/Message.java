package com.example.AI_Study_Planer.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachments;

    private String role;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;
}
