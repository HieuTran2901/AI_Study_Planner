package com.example.AI_Study_Planer.service.PromptService;

import com.example.AI_Study_Planer.dto.response.UserPreferenceResponse;
import org.springframework.stereotype.Component;

@Component
public class PreferencePromptBuilder {

    public String build(UserPreferenceResponse pref) {

        return """
                USER PREFERENCES:

                Favorite Subjects:
                %s

                Existing Skills:
                %s

                Current Level:
                %s

                Experience Years:
                %s

                Learning Goal:
                %s

                Career Target:
                %s

                Certification Goal:
                %s

                Target Timeline:
                %s

                STUDY HABITS:

                Daily Study Minutes:
                %s

                Weekly Study Days:
                %s

                Preferred Study Times:
                %s

                LEARNING STYLE:

                %s

                CONTENT PREFERENCES:

                Preferred Language:
                %s

                Preferred Resource Types:
                %s
                """
                .formatted(

                        pref.getFavoriteSubjects(),

                        pref.getExistingSkills(),

                        pref.getCurrentLevel(),

                        pref.getExperienceYears(),

                        pref.getLearningGoal(),

                        pref.getCareerTarget(),

                        pref.getCertificationGoal(),

                        pref.getTargetTimeline(),

                        pref.getDailyStudyMinutes(),

                        pref.getWeeklyStudyDays(),

                        pref.getPreferredStudyTimes(),

                        pref.getLearningStyle(),

                        pref.getPreferredLanguage(),

                        pref.getPreferredResourceTypes()
                );
    }
}
