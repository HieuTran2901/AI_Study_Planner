package com.example.AI_Study_Planer.controller;

import com.example.AI_Study_Planer.common.ApiResponse;
import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.request.LoginRequest;
import com.example.AI_Study_Planer.dto.request.RegisterRequest;
import com.example.AI_Study_Planer.dto.response.LogoutResponse;
import com.example.AI_Study_Planer.dto.response.TokenResponse;
import com.example.AI_Study_Planer.dto.response.UserResponse;
import com.example.AI_Study_Planer.entity.RefreshToken;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.repository.RefreshTokenRepository;
import com.example.AI_Study_Planer.repository.UserRepository;
import com.example.AI_Study_Planer.service.UserService;
import com.example.AI_Study_Planer.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@RequestBody RegisterRequest request) {
        User user = userService.register(request);

        UserResponse userResponse = new UserResponse(user);

        return ApiResponse.<UserResponse>builder()
                .results(userResponse)
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<TokenResponse> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        UserResponse user = userService.login(request);

        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getRole());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());

        //Save refreshToken to database
        RefreshToken rt = new RefreshToken();
        rt.setToken(refreshToken);
        rt.setExpiryDate(LocalDateTime.now()
                .plus(Duration.ofMillis(jwtUtil.getRefreshExpiration())));
        rt.setUserId(user.getId());
        refreshTokenRepository.save(rt);

        // Save cookie
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setSecure(false);
        cookie.setHttpOnly(true); // true for https, false for http
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge((int) (jwtUtil.getRefreshExpiration() / 1000));

        response.addCookie(cookie);

        TokenResponse tokenResponse = new TokenResponse(accessToken);

        return ApiResponse.<TokenResponse>builder()
                .results(tokenResponse)
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<TokenResponse> refreshToken(
            @CookieValue(value = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        if(refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            throw new AppException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        String userId = jwtUtil.getUserIdFromToken(refreshToken);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Generate new token
        String newAccessToken = jwtUtil.generateAccessToken(userId, user.getRole());
        String newRefreshToken = jwtUtil.generateRefreshToken(userId);

        Optional<RefreshToken> storedToken = refreshTokenRepository.findByToken(refreshToken);

        //Delete old token
        storedToken.ifPresent(refreshTokenRepository::delete);

        // Save new token
        RefreshToken rt = new RefreshToken();
        rt.setToken(newRefreshToken);
        rt.setUserId(userId);
        rt.setExpiryDate(LocalDateTime.now()
                .plus(Duration.ofMillis(jwtUtil.getRefreshExpiration())));

        refreshTokenRepository.save(rt);

        // Set new cookie
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge((int) (jwtUtil.getRefreshExpiration() / 1000));

        response.addCookie(cookie);

        TokenResponse tokenResponse = new TokenResponse(newAccessToken);

        return ApiResponse.<TokenResponse>builder()
                .results(tokenResponse)
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<LogoutResponse> logout(
            @CookieValue(value = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        // Delete token from database
        if(refreshToken != null) {
            refreshTokenRepository.findByToken(refreshToken)
                    .ifPresent(refreshTokenRepository::delete);
        }

        // Delete token from cookie
        Cookie deleteCookie = new Cookie("refreshToken", null);
        deleteCookie.setHttpOnly(true);
        deleteCookie.setPath("/auth/refresh");
        deleteCookie.setSecure(false);
        deleteCookie.setMaxAge(0);

        response.addCookie(deleteCookie);

        LogoutResponse logoutResponse = new LogoutResponse("Log out successfully");

        return ApiResponse.<LogoutResponse>builder()
                .results(logoutResponse)
                .build();
    }
}
