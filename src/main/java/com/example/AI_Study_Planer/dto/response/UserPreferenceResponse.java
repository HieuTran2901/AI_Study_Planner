package com.example.AI_Study_Planer.dto.response;

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

    private List<String> favoriteSubjects;

    private String learningGoal;

    private String currentLevel;

    private Integer dailyStudyMinutes;

    private Integer weeklyStudyDays;

    private List<String> preferredStudyTimes;

    private String learningStyle;

    private String notes;

    private LocalDateTime updatedAt;
}
