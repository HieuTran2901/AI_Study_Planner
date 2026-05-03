package com.example.AI_Study_Planer.service.AIRecommendationService;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.LearningPathResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.enums.TopicStatus;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.repository.LearningPathRepository;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoadmapService {
    private final UnlockTopicService unlockTopicService;
    private final UserService userService;
    private final LearningPathRepository learningPathRepository;
    private final TopicGeneratorHelper topicGeneratorHelper;

    public List<Topic> process(List<Topic> topics) {

        // sort by order
        List<Topic> sorted = topics.stream()
                .sorted(Comparator.comparing(Topic::getOrderIndex))
                .toList();

        // apply unlock
        unlockTopicService.unlockTopic(topics);

        // check null value
        for (Topic t : sorted) {
            if (t.getStatus() == null) t.setStatus(TopicStatus.LOCKED);
        }

        return sorted;
    }

    public LearningPathResponse getCurrentLearningPath(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        LearningPath path = learningPathRepository.findTopByUserOrderByCreatedAtDesc(user)
                .orElseThrow(()-> new AppException(ErrorCode.LEARNING_PATH_NOT_FOUND));

        List<Topic> processed = process(path.getTopics());

        path.setTopics(processed);

        return topicGeneratorHelper.toResponse(path);
    }

    public int calculateProgress(Topic topic) {

        // subtopic
        if (topic.getChildren() == null || topic.getChildren().isEmpty()) {
            return topic.getProgress();
        }

        int total = topic.getChildren().stream()
                .mapToInt(this::calculateProgress)
                .sum();

        return total / topic.getChildren().size();
    }

    public void updateStatus(Topic topic) {
        if (topic.getProgress() == 100) {
            topic.setStatus(TopicStatus.COMPLETED);
        } else if (topic.getProgress() > 0) {
            topic.setStatus(TopicStatus.IN_PROGRESS);
        } else {
            topic.setStatus(TopicStatus.LOCKED);
        }
    }
}
