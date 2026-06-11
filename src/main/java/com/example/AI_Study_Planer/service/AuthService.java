package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.dto.request.LoginRequest;
import com.example.AI_Study_Planer.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    public LoginResult login(LoginRequest request) {

        User user = authenticate(request);

        String accessToken =
                tokenService.generateAccessToken(user);

        String refreshToken =
                tokenService.generateRefreshToken(user);

        refreshTokenService.create(
                user.getId(),
                refreshToken
        );

        return LoginResult.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
