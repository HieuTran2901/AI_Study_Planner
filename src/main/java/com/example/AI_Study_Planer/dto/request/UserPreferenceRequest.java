package com.example.AI_Study_Planer.dto.request;

import com.example.AI_Study_Planer.enums.Preference.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferenceRequest {

    // ===== LEARNING =====

    @Size(max = 10, message = "Maximum 10 favorite subjects")
    private List<String> favoriteSubjects;

    @Size(max = 20, message = "Maximum 20 existing skills")
    private List<String> existingSkills;

    private LearningLevel currentLevel;

    @Min(value = 0, message = "Experience years cannot be negative")
    @Max(value = 50, message = "Experience years too large")
    private Integer experienceYears;

    // ===== GOALS =====

    @Size(max = 200, message = "Learning goal is too long")
    private String learningGoal;

    @Size(max = 100, message = "Career target is too long")
    private String careerTarget;

    private Boolean certificationGoal;

    private TargetTimeline targetTimeline;

    // ===== STUDY HABITS =====

    @Min(value = 15, message = "Minimum 15 minutes per day")
    @Max(value = 300, message = "Maximum 300 minutes per day")
    private Integer dailyStudyMinutes;

    private List<Integer> weeklyStudyDays;

    private List<StudyTime> preferredStudyTimes;

    private LearningStyle learningStyle;

    // ===== CONTENT =====

    private PreferredLanguage preferredLanguage;

    @Size(max = 10, message = "Maximum 10 preferred resource types")
    private List<String> preferredResourceTypes;
}