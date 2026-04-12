package com.example.AI_Study_Planer.util;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "jwt.debug", havingValue = "true", matchIfMissing = false)
public class JwtDebug {
    @Value("${jwt.secret-v1}")
    private String jwtSecret;

    @PostConstruct
    public void debug() {
        System.out.println("JWT_SECRET_V1 = " + System.getenv("JWT_SECRET_V1"));
        System.out.println("JWT_SECRET     = " + System.getenv("JWT_SECRET"));
        System.out.println("Injected       = " + jwtSecret);
    }
}
