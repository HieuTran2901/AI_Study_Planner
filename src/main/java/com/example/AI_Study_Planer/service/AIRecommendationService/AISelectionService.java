package com.example.AI_Study_Planer.service.AIRecommendationService;

import com.example.AI_Study_Planer.dto.request.OpenRouterMessage;
import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.AISelectVideoResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;
import com.example.AI_Study_Planer.service.OpenRouterService;
import com.example.AI_Study_Planer.service.PromptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AISelectionService {

    private final OpenRouterService openRouterService;
    private final PromptService promptService;

    public List<Resource> chooseBestResources(
            String query,
            List<Resource> resources
    ) {

        List<Resource> selected = new ArrayList<>();

        try {

            addBestByType(selected, query, resources, ResourceType.VIDEO);

            addBestByType(selected, query, resources, ResourceType.GITHUB);

            addBestByType(selected, query, resources, ResourceType.DOCUMENTATION);

            addBestByType(selected, query, resources, ResourceType.ARTICLE);

        } catch (Exception e) {

            return resources.stream()
                    .limit(3)
                    .toList();
        }

        return selected;
    }

//    private String buildUserPrompt(String query, List<Resource> videos) {
//        StringBuilder sb = new StringBuilder();
//
//        sb.append("Search query: ").append(query).append("\n\n");
//        sb.append("Videos:\n");
//
//        for (int i = 0; i < videos.size(); i++) {
//            Resource v = videos.get(i);
//
//            sb.append(i).append(". ")
//                    .append("Title: ").append(v.getTitle()).append("\n")
//                    .append("Views: ").append(v.getViewCount()).append("\n")
//                    .append("Channel: ").append(v.getChannelTitle()).append("\n")
//                    .append("Duration: ").append(v.getDurationSeconds()).append(" seconds\n\n");
//        }
//
//        return sb.toString();
//    }

    private String buildUserPrompt(
            String query,
            List<Resource> resources
    ) {

        StringBuilder sb = new StringBuilder();

        sb.append("Search query: ")
                .append(query)
                .append("\n\n");

        sb.append("Resources:\n\n");

        for (int i = 0; i < resources.size(); i++) {

            Resource r = resources.get(i);

            sb.append(i)
                    .append(". ")
                    .append("Type: ")
                    .append(r.getType())
                    .append("\n");

            // ===== BASIC =====
            if (r.getTitle() != null) {
                sb.append("Title: ")
                        .append(r.getTitle())
                        .append("\n");
            }

            if (r.getDescription() != null) {
                sb.append("Description: ")
                        .append(r.getDescription())
                        .append("\n");
            }

            if (r.getPlatform() != null) {
                sb.append("Platform: ")
                        .append(r.getPlatform())
                        .append("\n");
            }

            // ===== URL =====
            if (r.getUrl() != null) {
                sb.append("URL: ")
                        .append(r.getUrl())
                        .append("\n");
            }

            // =====================================================
            // VIDEO (YouTube / Vimeo / Course videos)
            // =====================================================

            if (r.getChannelTitle() != null) {
                sb.append("Channel: ")
                        .append(r.getChannelTitle())
                        .append("\n");
            }

            if (r.getViewCount() != null) {
                sb.append("Views: ")
                        .append(r.getViewCount())
                        .append("\n");
            }

            if (r.getDurationSeconds() != null) {
                sb.append("Duration: ")
                        .append(r.getDurationSeconds())
                        .append(" seconds\n");
            }

            // =====================================================
            // GITHUB
            // =====================================================

            if (r.getStars() != null) {
                sb.append("Stars: ")
                        .append(r.getStars())
                        .append("\n");
            }

            if (r.getForks() != null) {
                sb.append("Forks: ")
                        .append(r.getForks())
                        .append("\n");
            }

//            if (r.getLanguage() != null) {
//                sb.append("Language: ")
//                        .append(r.getLanguage())
//                        .append("\n");
//            }

            if (r.getGithubOwner() != null) {
                sb.append("Owner: ")
                        .append(r.getGithubOwner())
                        .append("\n");
            }

            // =====================================================
            // DOCUMENTATION / ARTICLE
            // =====================================================

//            if (r.getAuthor() != null) {
//                sb.append("Author: ")
//                        .append(r.getAuthor())
//                        .append("\n");
//            }
//
//            if (r.getPublishedAt() != null) {
//                sb.append("PublishedAt: ")
//                        .append(r.getPublishedAt())
//                        .append("\n");
//            }
//
//            if (r.getReadingMinutes() != null) {
//                sb.append("ReadingMinutes: ")
//                        .append(r.getReadingMinutes())
//                        .append("\n");
//            }

            // =====================================================
            // COURSE
            // =====================================================

//            if (r.getInstructor() != null) {
//                sb.append("Instructor: ")
//                        .append(r.getInstructor())
//                        .append("\n");
//            }
//
//            if (r.getLevel() != null) {
//                sb.append("Level: ")
//                        .append(r.getLevel())
//                        .append("\n");
//            }
//
//            if (r.getDurationHours() != null) {
//                sb.append("CourseHours: ")
//                        .append(r.getDurationHours())
//                        .append("\n");
//            }
//
//            if (r.getStudentCount() != null) {
//                sb.append("Students: ")
//                        .append(r.getStudentCount())
//                        .append("\n");
//            }

            sb.append("\n");
        }

        return sb.toString();
    }

    public Resource chooseBestSingleResource(
            String query,
            List<Resource> resources
    ) {

        try {

            String systemPrompt =
                    promptService.getBestResourcePrompt();

            String userPrompt =
                    buildUserPrompt(query, resources);

            List<OpenRouterMessage> messages = List.of(
                    new OpenRouterMessage("system", systemPrompt),
                    new OpenRouterMessage("user", userPrompt)
            );

            String reply = openRouterService.chat(messages);

//            ObjectMapper mapper = new ObjectMapper();
//
//            AISelectVideoResponse res =
//                    mapper.readValue(reply, AISelectVideoResponse.class);
//
//            int index = res.getSelectedIndex();
            int index = Integer.parseInt(reply.trim());

            if (index < 0 || index >= resources.size()) {
                return resources.getFirst();
            }

            return resources.get(index);

        } catch (Exception e) {

            return resources.getFirst();
        }
    }

    private void addBestByType(
            List<Resource> selected,
            String query,
            List<Resource> resources,
            ResourceType type
    ) {

        List<Resource> filtered = resources.stream()
                .filter(r -> r.getType() == type)
                .toList();

        if (filtered.isEmpty()) {
            return;
        }

        Resource best = chooseBestSingleResource(query, filtered);

        if (best != null) {
            selected.add(best);
        }
    }
}
