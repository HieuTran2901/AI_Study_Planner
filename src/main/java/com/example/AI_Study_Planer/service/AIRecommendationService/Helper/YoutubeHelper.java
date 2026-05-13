package com.example.AI_Study_Planer.service.AIRecommendationService.Helper;

import com.example.AI_Study_Planer.dto.response.AIRecommendationResponse.YoutubeVideoResponse;
import com.example.AI_Study_Planer.entity.AIRecommendation.Resource;
import com.example.AI_Study_Planer.enums.ResourceType;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class YoutubeHelper {
    private Long parseLong(String value) {
        try {
            return value != null ? Long.parseLong(value) : 0L;
        } catch (Exception e) {
            return 0L;
        }
    }

    private Integer parseDuration(String isoDuration) {
        try {
            if (isoDuration == null) return 0;

            return (int) Duration
                    .parse(isoDuration)
                    .getSeconds();
        } catch (Exception e) {
            return 0;
        }
    }

    public Resource mapToResource(YoutubeVideoResponse.Item item) {

        Resource r = new Resource();

        r.setTitle(item.getSnippet().getTitle());
        r.setUrl("https://www.youtube.com/watch?v=" + item.getId());
        r.setThumbnailUrl(item.getSnippet().getThumbnails().getHigh().getUrl());
        r.setPlatform("YouTube");
        r.setType(ResourceType.VIDEO);

        // parse String → Long
        r.setViewCount(parseLong(item.getStatistics().getViewCount()));
        r.setLikeCount(parseLong(item.getStatistics().getLikeCount()));
        r.setChannelTitle(item.getSnippet().getChannelTitle());
        r.setPublishedAt(item.getSnippet().getPublishedAt());
        r.setDurationSeconds(parseDuration(item.getContentDetails().getDuration()));

        return r;
    }
}
