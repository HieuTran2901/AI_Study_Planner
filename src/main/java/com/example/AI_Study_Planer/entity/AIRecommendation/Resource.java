package com.example.AI_Study_Planer.entity.AIRecommendation;

import com.example.AI_Study_Planer.enums.ResourceType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String url;

    //Youtube
    private String searchQuery;
    private String thumbnailUrl;

    private String platform;

    @Enumerated(EnumType.STRING)
    private ResourceType type;

    private Double rating;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;
}
