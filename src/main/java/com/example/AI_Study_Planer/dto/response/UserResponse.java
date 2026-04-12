package com.example.AI_Study_Planer.dto.response;

import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private String id;
    private String fullName;
    private String phone;
    private String email;
    private String role;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    private UserStatus status;

    public UserResponse(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.role = user.getRole();
        this.status = user.getStatus();
    }
}
