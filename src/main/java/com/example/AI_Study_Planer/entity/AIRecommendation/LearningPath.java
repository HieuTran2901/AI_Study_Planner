package com.example.AI_Study_Planer.entity.AIRecommendation;

import com.example.AI_Study_Planer.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class LearningPath {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title; // "React Mastery Path"

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "learningPath", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> topics;

    private boolean isActive;

    private LocalDateTime createdAt;
}
