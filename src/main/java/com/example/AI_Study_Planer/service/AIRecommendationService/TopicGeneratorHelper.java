package com.example.AI_Study_Planer.service.AIRecommendationService;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.LearningPathResponse;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.ResourceResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import com.example.AI_Study_Planer.enums.ResourceType;
import com.example.AI_Study_Planer.enums.TopicStatus;
import com.example.AI_Study_Planer.mapper.TopicMapper;
import com.example.AI_Study_Planer.service.UnsplashService.ImageResolverService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicGeneratorHelper {
    private final TopicMapper topicMapper;
    private final ImageResolverService imageResolverService;

    public LearningPathResponse parse(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(json, LearningPathResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response: " + json, e);
        }
    }

    public Topic buildTopic(
            LearningPathResponse.TopicNode node,
            Topic parent,
            LearningPath path,
            int order
    ) {
        Topic topic = topicMapper.toTopic(node);

        topic.setParentTopic(parent);
        topic.setLearningPath(path);
        topic.setOrderIndex(order);
        topic.setAIGenerated(true);

        topic.setProgress(0);
        topic.setStatus(TopicStatus.LOCKED);
        topic.setImageUrl(
                imageResolverService.resolveImage(node.getImageQuery())
        );

        topic.setEstimatedHours(node.getEstimatedHours());

        if (node.getChildren() != null) {
            List<Topic> children = new ArrayList<>();

            for (int i = 0; i < node.getChildren().size(); i++) {
                children.add(
                        buildTopic(node.getChildren().get(i), topic, path, i)
                );
            }

            topic.setChildren(children);
        }

        if (node.getResources() != null) {
            List<Resource> resources = node.getResources().stream().map(r -> {
                Resource resource = new Resource();
                resource.setTitle(r.getTitle());
                resource.setUrl(r.getUrl());
                resource.setPlatform(r.getPlatform());
                resource.setType(ResourceType.valueOf(r.getType()));
                resource.setRating(r.getRating());
                resource.setTopic(topic);
                return resource;
            }).toList();

            topic.setResources(resources);
        }

        return topic;
    }

    public LearningPathResponse toResponse(LearningPath path) {
        LearningPathResponse res = new LearningPathResponse();

        res.setTitle(path.getTitle());

        if (path.getTopics() != null) {
            res.setTopics(
                    path.getTopics().stream()
                            .map(this::toNode)
                            .toList()
            );
        }

        return res;
    }

    private LearningPathResponse.TopicNode toNode(Topic topic) {
        LearningPathResponse.TopicNode node = new LearningPathResponse.TopicNode();

        node.setTitle(topic.getTitle());
        node.setDescription(topic.getDescription());
        node.setDifficulty(topic.getDifficulty());

        node.setOrder(topic.getOrderIndex());
        node.setEstimatedHours(topic.getEstimatedHours());

        node.setProgress(topic.getProgress());
        node.setStatus(topic.isCompleted() ? TopicStatus.COMPLETED : TopicStatus.IN_PROGRESS);
        node.setImageQuery(topic.getImageQuery());
        node.setImageUrl(topic.getImageUrl());

        if (topic.getChildren() != null && !topic.getChildren().isEmpty()) {
            node.setChildren(
                    topic.getChildren().stream()
                            .map(this::toNode)
                            .toList()
            );
        }

        if (topic.getResources() != null) {
            node.setResources(
                    topic.getResources().stream().map(r -> {
                        ResourceResponse dto = new ResourceResponse();
                        dto.setTitle(r.getTitle());
                        dto.setUrl(r.getUrl());
                        dto.setPlatform(r.getPlatform());
                        dto.setType(r.getType().name());
                        dto.setRating(r.getRating());
                        return dto;
                    }).toList()
            );
        }

        return node;
    }
}
