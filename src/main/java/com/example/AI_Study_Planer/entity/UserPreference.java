package com.example.AI_Study_Planer.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "user_preferences")
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ElementCollection
    @CollectionTable(name = "user_favorite_subjects",
            joinColumns = @JoinColumn(name = "user_preference_id"))
    @Column(name = "subject")
    private List<String> favoriteSubjects;        // ["React", "Java", "English", ...]

    private String learningGoal;                  // "Get a job", "Improve English", "Prepare for exam"...

    private String currentLevel;                  // "Beginner", "Intermediate", "Advanced"

    private Integer dailyStudyMinutes;            // study target (minutes)

    private Integer weeklyStudyDays;

    @ElementCollection
    @CollectionTable(name = "preferred_study_times",
            joinColumns = @JoinColumn(name = "user_preference_id"))
    @Column(name = "study_time")
    private List<String> preferredStudyTimes;     // ["morning", "evening", "night"]

    private String learningStyle;                 // "visual", "auditory", "reading", "kinesthetic"

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
