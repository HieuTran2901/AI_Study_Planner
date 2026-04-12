package com.example.AI_Study_Planer.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

// This is class generate Jwt key, to use it change property generate-key in application.yml to true.
// When you run application, you can see the key in console, copy that key then paste to property secret.
// After done, change property generate-key to false

@Component
@ConditionalOnProperty(name = "jwt.generate-key", havingValue = "true", matchIfMissing = true)
public class CreateJwtSecretKey {

    @PostConstruct
    public void init() {
        SecretKey key = Jwts.SIG.HS256.key().build();
        String base64Key = Encoders.BASE64.encode(key.getEncoded());
        System.out.println("Jwt key:" + base64Key);
    }
}
