package com.example.AI_Study_Planer.mapper;

import com.example.AI_Study_Planer.dto.request.RegisterRequest;
import com.example.AI_Study_Planer.dto.response.UserResponse;
import com.example.AI_Study_Planer.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest request);
    UserResponse toUserResponse(User user);
}
