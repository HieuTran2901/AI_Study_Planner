package com.example.AI_Study_Planer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnsplashImageResponse {
    private String id;
    private Urls urls;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Urls {
        private String small;
        private String regular;
        private String full;
    }
}