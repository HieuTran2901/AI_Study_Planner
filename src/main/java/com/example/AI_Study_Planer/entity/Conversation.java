package com.example.AI_Study_Planer.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String tittle;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
