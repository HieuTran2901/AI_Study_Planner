package com.example.AI_Study_Planer.config.UnsplashConfig;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "unsplash")
@Data
public class UnsplashProperties {
    private String baseUrl;
    private String accessKey;
    private String secretKey;
}
