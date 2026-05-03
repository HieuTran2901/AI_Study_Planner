package com.example.AI_Study_Planer.service.AIRecommendationService;

import com.example.AI_Study_Planer.common.ApiResponse;
import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.UpdateTopicResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import com.example.AI_Study_Planer.enums.TopicStatus;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicProgressService {
    private final TopicRepository topicRepository;
    private final RoadmapService roadmapService;
    private final UnlockTopicService unlockTopicService;

    public UpdateTopicResponse updateTopicProgress(String topicId, int progress) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(()-> new AppException(ErrorCode.TOPIC_NOT_FOUND));

        topic.setProgress(progress);

        if(progress >= 100) {
            topic.setStatus(TopicStatus.COMPLETED);
        } else if(progress > 0) {
            topic.setStatus(TopicStatus.IN_PROGRESS);
        }
        topicRepository.save(topic);

        return UpdateTopicResponse.builder()
                .topicStatus(topic.getStatus())
                .progress(topic.getProgress())
                .build();
    }

    public ApiResponse<Void> completedSubtopic(String topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new AppException(ErrorCode.TOPIC_NOT_FOUND));

        // only leaf allow
        if (topic.getChildren() != null && !topic.getChildren().isEmpty()) {
            throw new RuntimeException("Only subtopic can be completed");
        }

        // set leaf done
        topic.setProgress(100);
        topic.setStatus(TopicStatus.COMPLETED);

        // update parent
        updateParent(topic.getParentTopic());

        // unlock next topic
        if (topic.getParentTopic() != null &&
                topic.getParentTopic().getStatus() == TopicStatus.COMPLETED) {

            unlockTopicService.unlockNext(topic.getParentTopic());
        }

        topicRepository.save(topic);

        return null;
    }

    private void updateParent(Topic parent) {
        if (parent == null) return;

        int progress = roadmapService.calculateProgress(parent);

        parent.setProgress(progress);
        roadmapService.updateStatus(parent);

        updateParent(parent.getParentTopic());
    }
}
