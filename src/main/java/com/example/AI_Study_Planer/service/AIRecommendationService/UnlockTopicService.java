package com.example.AI_Study_Planer.service.AIRecommendationService;

import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import com.example.AI_Study_Planer.enums.TopicStatus;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class UnlockTopicService {
    public void unlockTopic(List<Topic> topics) {
        for (int i = 0; i < topics.size(); i++) {
            Topic current = topics.get(i);

            if(i==0) {
                if(current.getStatus() == null){
                    current.setStatus(TopicStatus.IN_PROGRESS);
                }
                continue;
            }

            Topic prev = topics.get(i-1);

            if(TopicStatus.COMPLETED.equals(prev.getStatus())) {
                if(TopicStatus.LOCKED.equals(current.getStatus()) || current.getStatus() == null) {
                    current.setStatus(TopicStatus.IN_PROGRESS);
                }
            } else {
                current.setStatus(TopicStatus.LOCKED);
            }
        }
    }

    public void unlockNext(Topic topic) {
        Topic parent = topic.getParentTopic();
        if (parent == null) return;

        List<Topic> siblings = parent.getChildren();

        //Sort by orderIndex
        siblings.sort(Comparator.comparing(Topic::getOrderIndex));

        int index = siblings.indexOf(topic);

        if(topic.getStatus() == TopicStatus.COMPLETED && index + 1 < siblings.size()) {

            Topic next = siblings.get(index+1);

            if (next.getStatus() == TopicStatus.LOCKED) {
                next.setStatus(TopicStatus.IN_PROGRESS);
            }
        }
    }
}
