package com.example.AI_Study_Planer.repository;

import com.example.AI_Study_Planer.entity.AIRecommendation.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topic, String> {
}
