package com.example.AI_Study_Planer.controller;

import com.example.AI_Study_Planer.common.ApiResponse;
import com.example.AI_Study_Planer.dto.response.UploadFileResponse;
import com.example.AI_Study_Planer.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/media")
public class MediaController {
    @Autowired
    private MediaService mediaService;

    @PostMapping("/upload")
    public ApiResponse<UploadFileResponse> upload(@RequestParam("file") MultipartFile file) {
        return ApiResponse.<UploadFileResponse>builder()
                .results(mediaService.uploadImage(file))
                .build();
    }
}
