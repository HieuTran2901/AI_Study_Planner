package com.example.AI_Study_Planer.repository;

import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import com.example.AI_Study_Planer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, String> {
    Optional<LearningPath> findTopByUserOrderByCreatedAtDesc(User user);
    Optional<LearningPath> findByIdAndUserId(String id, String userId);


    @Query("""
        SELECT lp FROM LearningPath lp
        JOIN lp.topics t
        JOIN t.resources r
        WHERE r.id = :resourceId AND lp.user.id = :userId
        """)
    Optional<LearningPath> findByResourceIdAndUserId(String resourceId, String userId);
}
