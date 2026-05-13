package com.example.AI_Study_Planer.dto.response.AIRecommendationResponse;

import lombok.Data;

import java.util.List;

@Data
public class YoutubeVideoResponse {
    private List<Item> items;

    @Data
    public static class Item {
        private String id;
        private Snippet snippet;
        private Statistics statistics;
        private ContentDetails contentDetails;
    }

    @Data
    public static class Snippet {
        private String title;
        private String channelTitle;
        private String publishedAt;
        private YoutubeSearchResponse.Thumbnails thumbnails;
    }

    @Data
    public static class Statistics {
        private String viewCount;
        private String likeCount;
    }

    @Data
    public static class ContentDetails {
        private String duration; // ISO 8601 (PT10M30S)
    }
}
