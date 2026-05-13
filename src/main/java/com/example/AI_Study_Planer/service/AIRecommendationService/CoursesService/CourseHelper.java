package com.example.AI_Study_Planer.service.AIRecommendationService.CoursesService;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.CourseDetailResponse;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.LessonResponse;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.ModuleResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import com.example.AI_Study_Planer.enums.LessonStatus;
import com.example.AI_Study_Planer.enums.TopicStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseHelper {
    public CourseDetailResponse mapToCourse(LearningPath path) {
        List<ModuleResponse> modules = path.getTopics().stream()
                .map(topic -> ModuleResponse.builder()
                        .id(topic.getId())
                        .title(topic.getTitle())
                        .level(topic.getDifficulty())
                        .lessons(
                                topic.getResources().stream()
                                        .map(r -> LessonResponse.builder()
                                                .id(r.getId())
                                                .title(r.getTitle())
                                                .videoUrl(r.getUrl())
                                                .duration("N/A")
                                                .status(mapStatus(topic))
                                                .build()
                                        ).toList()
                        )
                        .build()
                ).toList();

        return CourseDetailResponse.builder()
                .id(path.getId())
                .title(path.getTitle())
                .modules(modules)
                .totalLessons(countLessons(modules))
                .completedLessons(countCompleted(modules))
                .build();
    }

    private int countLessons(List<ModuleResponse> modules) {
        return modules.stream()
                .mapToInt(m -> m.getLessons().size())
                .sum();
    }

    private int countCompleted(List<ModuleResponse> modules) {
        return (int) modules.stream()
                .flatMap(m -> m.getLessons().stream())
                .filter(l -> l.getStatus() == LessonStatus.COMPLETED)
                .count();
    }

    private LessonStatus mapStatus(Topic topic) {
        if (topic.getStatus() == TopicStatus.COMPLETED) {
            return LessonStatus.COMPLETED;
        }
        if (topic.getStatus() == TopicStatus.IN_PROGRESS) {
            return LessonStatus.IN_PROGRESS;
        }
        return LessonStatus.LOCKED;
    }
}
