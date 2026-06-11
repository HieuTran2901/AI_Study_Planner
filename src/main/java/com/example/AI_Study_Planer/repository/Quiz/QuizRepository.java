package com.example.AI_Study_Planer.repository.Quiz;

import com.example.AI_Study_Planer.dto.response.Quiz.WeakTopicResponse;
import com.example.AI_Study_Planer.entity.Quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, String> {
    Optional<List<Quiz>> findByUserId(String userId);
    Optional<Quiz> findByIdAndUserId(String quizId, String userId);

    Optional<List<Quiz>> findTop10ByOrderByCreatedAtDesc();

    Optional<List<Quiz>> findByTopicTitleIn(List<String> topicTitles);
}
