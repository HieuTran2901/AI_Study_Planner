package com.example.AI_Study_Planer.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UploadFileResponse {
    private String fileName;
    private String url;
    private String contentType;
    private long size;
}

