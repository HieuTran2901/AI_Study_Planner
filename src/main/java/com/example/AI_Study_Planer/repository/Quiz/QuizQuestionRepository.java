package com.example.AI_Study_Planer.repository.Quiz;

import com.example.AI_Study_Planer.entity.Quiz.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, String> {
}
