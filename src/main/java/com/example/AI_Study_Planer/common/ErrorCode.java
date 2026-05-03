package com.example.AI_Study_Planer.common;

import lombok.Getter;

@Getter
public enum ErrorCode {
    SUCCESS(1000, "Success"),
    EMAIL_ALREADY_USED(1001,"Email already used"),
    PHONE_ALREADY_USED(1002, "Phone already used"),
    EMAIL_NOT_FOUND(1003, "Email not found"),
    PASSWORD_INCORRECT(1004, "Incorrect password!"),
    INVALID_REFRESH_TOKEN(1005, "Invalid refresh token"),
    USER_NOT_FOUND(1006, "User not found"),
    USER_NOT_AUTHENTICATED(1007, "User not authenticated"),
    PREFERENCE_NOT_FOUND(1008, "Preference not found"),
    CONVERSATION_NOT_FOUND(1009, "Conversation not found"),
    HISTORY_NOT_FOUND(1010, "History not found, check your conversationId!"),
    INVALID_FILE(1011, "Invalid file"),
    INVALID_FILE_TYPE(1012, "Invalid file type"),
    INVALID_AI_RESPONSE(1013, "Invalid AI response"),
    FILE_TOO_LARGE(1014, "File too large"),
    TOPIC_NOT_FOUND(1015, "Topic not found"),
    LEARNING_PATH_NOT_FOUND(1016, "Learning path not found")
    ;

    private final int code;
    private final String message;

    ErrorCode(int code, String message){
        this.code = code;
        this.message = message;
    }
}
