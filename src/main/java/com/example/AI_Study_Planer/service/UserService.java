package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.constant.RoleName;
import com.example.AI_Study_Planer.dto.request.LoginRequest;
import com.example.AI_Study_Planer.dto.request.RegisterRequest;
import com.example.AI_Study_Planer.dto.response.UserResponse;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.enums.UserStatus;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.mapper.UserMapper;
import com.example.AI_Study_Planer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

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
}
