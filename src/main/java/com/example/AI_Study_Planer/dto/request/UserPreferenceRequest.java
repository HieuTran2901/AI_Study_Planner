package com.example.AI_Study_Planer.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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

    @Size(max = 10, message = "Maximum 10 favorite subjects")
    private List<String> favoriteSubjects;

    @NotBlank(message = "Learning goal cannot be empty")
    private String learningGoal;

    private String currentLevel;           // Beginner, Intermediate, Advanced

    @Min(value = 15, message = "Minimum 15 minutes per day")
    @Max(value = 300, message = "Maximum 300 minutes per day")
    private Integer dailyStudyMinutes;

    @Min(1)
    @Max(7)
    private Integer weeklyStudyDays;

    private List<String> preferredStudyTimes;   // ["morning", "afternoon", "evening", "night"]

    private String learningStyle;              // visual, auditory, reading, kinesthetic

//    private String notes;
}