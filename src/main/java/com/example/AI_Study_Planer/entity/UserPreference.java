package com.example.AI_Study_Planer.entity;

import com.example.AI_Study_Planer.enums.Preference.*;
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

    // ===== LEARNING =====
    @ElementCollection
    @CollectionTable(name = "user_favorite_subjects",
            joinColumns = @JoinColumn(name = "user_preference_id"))
    @Column(name = "subject")
    private List<String> favoriteSubjects;        // ["React", "Java", "English", ...]

    @ElementCollection
    @CollectionTable(
            name = "user_existing_skills",
            joinColumns = @JoinColumn(name = "user_preference_id")
    )
    @Column(name = "skill")
    private List<String> existingSkills;

    @Enumerated(EnumType.STRING)
    private LearningLevel currentLevel;

    private Integer experienceYears;

    // ===== GOALS =====

    private String learningGoal;     // "Get a job", "Improve English", "Prepare for exam"...

    private String careerTarget;

    @Column(nullable = false)
    private Boolean certificationGoal = false;

    @Enumerated(EnumType.STRING)
    private TargetTimeline targetTimeline;

    // ===== STUDY HABITS =====

    private Integer dailyStudyMinutes;      // study target (minutes)

    @ElementCollection
    @CollectionTable(
            name = "user_weekly_study_days",
            joinColumns = @JoinColumn(name = "user_preference_id")
    )
    @Column(name = "study_day")
    private List<Integer> weeklyStudyDays;


    @ElementCollection
    @CollectionTable(
            name = "preferred_study_times",
            joinColumns = @JoinColumn(name = "user_preference_id")
    )
    @Column(name = "study_time")
    @Enumerated(EnumType.STRING)
    private List<StudyTime> preferredStudyTimes;    // ["morning", "evening", "night"]

    @Enumerated(EnumType.STRING)
    private LearningStyle learningStyle;                 // "visual", "auditory", "reading", "kinesthetic"

    // ===== CONTENT =====
    @Enumerated(EnumType.STRING)
    private PreferredLanguage preferredLanguage;

    @ElementCollection
    @CollectionTable(
            name = "user_preferred_resource_types",
            joinColumns = @JoinColumn(name = "user_preference_id")
    )
    @Column(name = "resource_type")
    private List<String> preferredResourceTypes;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
