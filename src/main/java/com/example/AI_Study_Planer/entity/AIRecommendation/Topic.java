package com.example.AI_Study_Planer.entity.AIRecommendation;

import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.enums.TopicStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String difficulty; // BEGINNER / INTERMEDIATE / ADVANCED

    private Integer estimatedHours;

    private int progress = 0;

    private String imageUrl;
    private String imageQuery;

    private boolean completed = false;

    @Enumerated(EnumType.STRING)
    private TopicStatus status;

    private int orderIndex;

    // CHILD → PARENT
    @ManyToOne
    @JoinColumn(name = "parent_topic_id")
    @JsonBackReference
    private Topic parentTopic;

    // PARENT → CHILDREN
    @OneToMany(mappedBy = "parentTopic", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Topic> children = new ArrayList<>();

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resource> resources = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learning_path_id")
    private LearningPath learningPath;

    private boolean isAIGenerated;

    private LocalDateTime createdAt;
}
