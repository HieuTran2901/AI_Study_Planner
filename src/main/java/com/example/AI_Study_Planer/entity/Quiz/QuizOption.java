package com.example.AI_Study_Planer.entity.Quiz;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "question_options")
@Data
public class QuizOption {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private QuizQuestion question;

    private String content;

    private Boolean correct;
}