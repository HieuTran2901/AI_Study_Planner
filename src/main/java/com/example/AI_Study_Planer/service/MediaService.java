package com.example.AI_Study_Planer.service;

import com.example.AI_Study_Planer.common.ErrorCode;
import com.example.AI_Study_Planer.dto.response.UploadFileResponse;
import com.example.AI_Study_Planer.exception.AppException;
import com.example.AI_Study_Planer.service.StorageService.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Service
public class MediaService {
    @Autowired
    private StorageService storageService;

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/png",
            "image/jpeg",
            "image/webp"
    );

    private static final long MAX_SIZE = 5 * 1024 * 1024;

    public UploadFileResponse uploadImage(MultipartFile file) {
        validate(file);

        String url = storageService.uploadFile(file, "chat-AI");

        return UploadFileResponse.builder()
                .fileName(file.getOriginalFilename())
                .url(url)
                .size(file.getSize())
                .contentType(file.getContentType())
                .build();
    }

    private void validate(MultipartFile file){
        if (file == null || file.isEmpty()){
            throw new AppException(ErrorCode.INVALID_FILE);
        }

        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new AppException(ErrorCode.INVALID_FILE_TYPE);
        }

        if (file.getSize() > MAX_SIZE) {
            throw new AppException(ErrorCode.FILE_TOO_LARGE);
        }
    }
}
