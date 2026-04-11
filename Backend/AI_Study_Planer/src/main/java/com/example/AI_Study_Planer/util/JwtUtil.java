package com.example.AI_Study_Planer.util;

import io.jsonwebtoken.security.Keys;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
@Data
public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access.expiration:1800000}") // AccessToken default 30 min expire
    private String accessExpiration;

    @Value("{$jwt.refresh.expiration:604800000}") // RefreshToken default 7 day expire
    private String refreshExpiration;

    // Convert Jwt String to Secret Key
    private SecretKey getSigningKey() {return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}
