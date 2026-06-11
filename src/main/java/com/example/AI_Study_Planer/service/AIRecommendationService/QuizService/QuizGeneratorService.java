package com.example.AI_Study_Planer.service.AIRecommendationService.QuizService;

import com.example.AI_Study_Planer.constant.RoleName;
import com.example.AI_Study_Planer.dto.request.Quiz.GenerateQuizRequest;
import com.example.AI_Study_Planer.dto.response.Quiz.QuizDetailResponse;
import com.example.AI_Study_Planer.entity.Quiz.Quiz;
import com.example.AI_Study_Planer.entity.Quiz.QuizOption;
import com.example.AI_Study_Planer.entity.Quiz.QuizQuestion;
import com.example.AI_Study_Planer.entity.User;
import com.example.AI_Study_Planer.mapper.QuizMapper;
import com.example.AI_Study_Planer.repository.Quiz.QuizOptionRepository;
import com.example.AI_Study_Planer.repository.Quiz.QuizQuestionRepository;
import com.example.AI_Study_Planer.repository.Quiz.QuizRepository;
import com.example.AI_Study_Planer.service.AIRecommendationService.Helper.QuizGenerationHelper;
import com.example.AI_Study_Planer.service.OpenRouterService;
import com.example.AI_Study_Planer.service.PromptService.QuizPromptBuilder;
import com.example.AI_Study_Planer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizGeneratorService {
    private final OpenRouterService openRouterService;

    private final QuizRepository quizRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizOptionRepository quizOptionRepository;
    private final QuizGenerationHelper quizGenerationHelper;

    private final UserService userService;

    private final QuizPromptBuilder quizPromptBuilder;

    private final QuizMapper quizMapper;

    public QuizDetailResponse generateQuiz(
            Authentication authentication,
            GenerateQuizRequest request
    ) {
        String systemPrompt =
                quizPromptBuilder.build(request.getTopic(), request.getDifficulty());

        String quizPrompt =
                quizPromptBuilder.build(
                        request.getTopic(),
                        request.getDifficulty()
                );

        String reply =
                openRouterService.buildChat(
                        systemPrompt,
                        quizPrompt
                );
        System.out.println("========== AI RESPONSE ==========");
        System.out.println(reply);
        System.out.println("=================================");

        User user = userService.getCurrentUser(authentication);


        Quiz quiz = quizGenerationHelper.parseQuiz(reply,user);

        Quiz savedQuiz = saveQuiz(quiz);

        return quizMapper.toQuizDetailResponse(savedQuiz);
    }

    private Quiz saveQuiz(Quiz quiz) {

        Quiz savedQuiz =
                quizRepository.save(quiz);

        for (QuizQuestion question : quiz.getQuestions()) {
            question.setQuiz(savedQuiz);

            QuizQuestion savedQuestion =
                    quizQuestionRepository.save(question);

            for (QuizOption option : question.getOptions()) {
                option.setQuestion(savedQuestion);
                quizOptionRepository.save(option);
            }
        }

        return savedQuiz;
    }
}
