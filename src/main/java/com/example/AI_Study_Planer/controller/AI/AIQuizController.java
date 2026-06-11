package com.example.AI_Study_Planer.controller.AI;

import com.example.AI_Study_Planer.common.ApiResponse;
import com.example.AI_Study_Planer.dto.request.Quiz.GenerateQuizRequest;
import com.example.AI_Study_Planer.dto.request.Quiz.QuizSubmitRequest;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizCardResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizDashboardResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizDetailResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizResultResponse;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizReview.QuizReviewResponse;
import com.example.AI_Study_Planer.service.AIRecommendationService.QuizService.QuizDashboardService;
import com.example.AI_Study_Planer.service.AIRecommendationService.QuizService.QuizGeneratorService;
import com.example.AI_Study_Planer.service.AIRecommendationService.QuizService.QuizRecommendationService;
import com.example.AI_Study_Planer.service.AIRecommendationService.QuizService.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class AIQuizController {
    private  final QuizService quizService;
    private final QuizGeneratorService quizGenerationService;
    private final QuizRecommendationService quizRecommendationService;
    private final QuizDashboardService quizDashboardService;

    @GetMapping("/dashboard")
    public ApiResponse<QuizDashboardResponse> getDashboard(Authentication authentication) {
        return ApiResponse.<QuizDashboardResponse>builder()
                .results(quizDashboardService.getDashboard(authentication))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<QuizDetailResponse> getQuizDetail(
            @PathVariable String id,
            Authentication authentication
    ) {
        return ApiResponse.<QuizDetailResponse>builder()
                .results(quizService.getQuizDetail(id, authentication))
                .build();
    }

    @GetMapping
    public ApiResponse<List<QuizCardResponse>> getMyQuizzes(
            Authentication authentication
    ) {

        return ApiResponse.<List<QuizCardResponse>>builder()
                .results(
                        quizService.getMyQuizzes(authentication)
                )
                .build();
    }

    @GetMapping("/recommended")
    public ApiResponse<List<QuizCardResponse>> getRecommendQuiz(
            Authentication authentication
    ) {
        return ApiResponse.<List<QuizCardResponse>>builder()
                .results(quizRecommendationService.recommendQuiz(authentication))
                .build();
    }

    @GetMapping("/{id}/review")
    public ApiResponse<QuizReviewResponse> getQuizReview(
            @PathVariable String id,
            Authentication authentication
    ) {
        return ApiResponse.<QuizReviewResponse>builder()
                .results(
                        quizService.getQuizReview(id, authentication)
                )
                .build();
    }

   @PostMapping("/{id}/submit")
    public ApiResponse<QuizResultResponse> submitQuiz(
            @PathVariable String id,
            @RequestBody QuizSubmitRequest request,
            Authentication authentication
   ) {
        return ApiResponse.<QuizResultResponse>builder()
                .results(quizService.submitQuiz(id, request, authentication))
                .build();
   }

   @PostMapping("/generate")
    public ApiResponse<QuizDetailResponse> generateQuiz(
           @RequestBody GenerateQuizRequest request,
           Authentication authentication
           ) {
        return ApiResponse.<QuizDetailResponse>builder()
                .results(quizGenerationService.generateQuiz(authentication, request))
                .build();
   }

}
