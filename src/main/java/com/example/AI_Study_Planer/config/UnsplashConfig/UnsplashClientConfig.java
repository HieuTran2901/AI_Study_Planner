package com.example.AI_Study_Planer.config.UnsplashConfig;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@RequiredArgsConstructor
public class UnsplashClientConfig {

    private final UnsplashProperties props;

    @Bean
    public WebClient unsplashWebClient() {
        return WebClient.builder()
                .baseUrl(props.getBaseUrl())
                .defaultHeader("Authorization", "Client-ID " + props.getAccessKey())
                .build();
    }
}