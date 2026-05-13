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
    private String platform;

    //Youtube
    private String searchQuery;
    private String thumbnailUrl;
    private Long viewCount;
    private Long likeCount;
    private String channelTitle;
    private String publishedAt;
    private Integer durationSeconds;
    private Double aiScore;

    //Github
    @Column(columnDefinition = "TEXT")
    private String description;

    private String author;
    private Integer stars;
    private Integer forks;
    private String githubOwner;

    @Enumerated(EnumType.STRING)
    private ResourceType type;

    private Double rating;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;
}
