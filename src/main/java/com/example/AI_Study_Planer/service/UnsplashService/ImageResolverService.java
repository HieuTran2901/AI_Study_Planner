package com.example.AI_Study_Planer.service.UnsplashService;

import com.example.AI_Study_Planer.dto.response.UnsplashImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageResolverService {

    private final UnsplashClient unsplashClient;

    public String resolveImage(String imageQuery) {

        List<UnsplashImageResponse> results =
                unsplashClient.searchImages(imageQuery);

        if (results == null || results.isEmpty()) {
            return fallbackImage();
        }

        // Always use stable CDN URL (production rule)
        return results.getFirst().getUrls().getRegular();
    }

    private String fallbackImage() {
        return "https://upload.wikimedia.org/wikipedia/commons/placeholder.svg";
    }
}
