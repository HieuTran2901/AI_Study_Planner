package com.example.AI_Study_Planer.entity.AIRecommendation;

import com.example.AI_Study_Planer.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class AIRecommendation {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String suggestedTopicId;

    private String reason;

    private double confidence;

    @Column(columnDefinition = "TEXT")
    private String aiResponse;

    private LocalDateTime createdAt;
}
