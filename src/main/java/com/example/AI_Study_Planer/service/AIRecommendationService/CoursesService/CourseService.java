package com.example.AI_Study_Planer.service.AIRecommendationService.CoursesService;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.CourseDetailResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.repository.LearningPathRepository;
import com.example.AI_Study_Planer.repository.TopicRepository;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final LearningPathRepository learningPathRepository;
    private final CourseHelper courseHelper;
    private final UserService userService;

    public CourseDetailResponse getCourseDetail(String resourceId, Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        LearningPath path = learningPathRepository.findByResourceIdAndUserId(resourceId, user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.LEARNING_PATH_NOT_FOUND));

        return courseHelper.mapToCourse(path);
    }
}
