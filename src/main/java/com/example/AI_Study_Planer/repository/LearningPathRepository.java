package com.example.AI_Study_Planer.repository;

import com.example.AI_Study_Planer.entity.AIRecommendation.LearningPath;
import com.example.AI_Study_Planer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, String> {
    Optional<LearningPath> findTopByUserOrderByCreatedAtDesc(User user);
}
