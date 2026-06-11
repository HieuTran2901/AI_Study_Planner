package com.example.AI_Study_Planer.entity.Quiz;

import com.example.AI_Study_Planer.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quiz_attempts")
@Data
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private Integer score;

    private Integer correctAnswers;

    private Integer totalQuestions;

    private Integer durationSeconds;

    private Boolean completed;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    private Integer progress;

    @OneToMany(mappedBy = "attempt")
    private List<QuizAnswer> answers;
}
