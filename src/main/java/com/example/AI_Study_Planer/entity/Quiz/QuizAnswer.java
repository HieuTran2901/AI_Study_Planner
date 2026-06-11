package com.example.AI_Study_Planer.entity.Quiz;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "question_answers")
@Data
public class QuizAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "attempt_id")
    private QuizAttempt attempt;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuizQuestion question;

    private String selectedAnswer;

    private Boolean correct;
}
