package com.example.AI_Study_Planer.dto.response;

import com.example.AI_Study_Planer.enums.Preference.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferenceResponse {

    private String id;

    // ===== LEARNING =====

    private List<String> favoriteSubjects;

    private List<String> existingSkills;

    private LearningLevel currentLevel;

    private Integer experienceYears;

    // ===== GOALS =====

    private String learningGoal;

    private String careerTarget;

    private Boolean certificationGoal;

    private TargetTimeline targetTimeline;

    // ===== STUDY HABITS =====

    private Integer dailyStudyMinutes;

    // FIXED
    private List<Integer> weeklyStudyDays;

    private List<StudyTime> preferredStudyTimes;

    private LearningStyle learningStyle;

    // ===== CONTENT =====

    private PreferredLanguage preferredLanguage;

    private List<String> preferredResourceTypes;

    // ===== SYSTEM =====

    private LocalDateTime updatedAt;
}