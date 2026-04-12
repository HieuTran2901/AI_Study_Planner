package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.constant.RoleName;
import com.example.AI_Study_Planer.dto.request.LoginRequest;
import com.example.AI_Study_Planer.dto.request.RegisterRequest;
import com.example.AI_Study_Planer.dto.request.UpdateProfileRequest;
import com.example.AI_Study_Planer.dto.request.UserPreferenceRequest;
import com.example.AI_Study_Planer.dto.response.UserPreferenceResponse;
import com.example.AI_Study_Planer.dto.response.UserResponse;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.entity.UserPreference;
import com.example.AI_Study_Planer.enums.UserStatus;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.mapper.PreferenceMapper;
import com.example.AI_Study_Planer.mapper.UserMapper;
import com.example.AI_Study_Planer.repository.PreferenceRepository;
import com.example.AI_Study_Planer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PreferenceRepository preferenceRepository;

    private final UserMapper userMapper;
    private final PreferenceMapper preferenceMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        //validation
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_USED);
        }
        if(userRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new AppException(ErrorCode.PHONE_ALREADY_USED);
        }

        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setStatus(UserStatus.ACTIVE);
        user.setRole(RoleName.STUDENT);
        user.setCreateAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public UserResponse login(LoginRequest request) {
        User logUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_FOUND));

        if (!passwordEncoder.matches(request.getPassword(), logUser.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_INCORRECT);
        }

        return userMapper.toUserResponse(logUser);
    }

    public User getCurrentUser(Authentication authentication) {
        if(authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.USER_NOT_AUTHENTICATED);
        }

        String userId = authentication.getName();
        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

    }

    public UserResponse updateProfile(UpdateProfileRequest request, Authentication authentication) {
        User user = getCurrentUser(authentication);

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());

        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }

    public UserPreferenceResponse updatePreference(UserPreferenceRequest request, Authentication authentication) {
        User user = getCurrentUser(authentication);

        UserPreference userPreference = preferenceRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    UserPreference newPreference = new UserPreference();
                    newPreference.setUser(user);
                    return newPreference;
                });

        preferenceMapper.updatePreference(userPreference, request);

        UserPreference savePreference = preferenceRepository.save(userPreference);

        return preferenceMapper.toPreferenceResponse(savePreference);
    }

    public UserPreferenceResponse getUserPreference(Authentication authentication) {
        User user = getCurrentUser(authentication);

        UserPreference preference = preferenceRepository.findByUserId(user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.PREFERENCE_NOT_FOUND));

        return preferenceMapper.toPreferenceResponse(preference);
    }
}
