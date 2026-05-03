package com.example.AI_Study_Planer.dto.response;


import lombok.Data;

import java.util.List;

@Data
public class YoutubeSearchResponse {
    private List<Item> items;

    @Data
    public static class Item {
        private Id id;
        private Snippet snippet;
    }

    @Data
    public static class Id {
        private String videoId;
    }

    @Data
    public static class Snippet {
        private String title;
        private Thumbnails thumbnails;
    }

    @Data
    public static class Thumbnails {
        private Thumbnail high; // get thumbnail high quality (default, medium, high, standard, maxres)
    }

    @Data
    public static class Thumbnail {
        private String url;
    }
}