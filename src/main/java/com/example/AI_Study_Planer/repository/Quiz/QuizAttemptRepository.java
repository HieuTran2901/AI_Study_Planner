package com.example.AI_Study_Planer.repository.Quiz;

import com.example.AI_Study_Planer.entity.Quiz.Quiz;
import com.example.AI_Study_Planer.entity.Quiz.QuizAttempt;
import com.example.AI_Study_Planer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, String> {

    Optional<List<QuizAttempt>> findByUserId(String id);
    Optional<List<QuizAttempt>> findTop5ByUserIdOrderByCompletedAtDesc(String userId);
    Optional<QuizAttempt> findTopByQuizAndUserOrderByCompletedAtDesc(
            Quiz quiz,
            User user
    );

    @Query("""
        SELECT COUNT(q)
        FROM QuizAttempt q
        WHERE q.user.id = :userId
        AND q.completedAt IS NOT NULL
    """)
    Integer countCompleted(@Param("userId") String userId);

    @Query("""
    SELECT COALESCE(AVG(q.score),0)
    FROM QuizAttempt q
    WHERE q.user.id = :userId
    AND q.completedAt IS NOT NULL
    """)
    Double getAverageScore(
            @Param("userId") String userId
    );

    @Query("""
    SELECT COALESCE(SUM(q.score),0)
    FROM QuizAttempt q
    WHERE q.user.id = :userId
    """)
    Integer getTotalPoints(@Param("userId") String userId);


}
