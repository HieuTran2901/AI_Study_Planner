export const LEARNING_LEVELS = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

export type LearningLevel = (typeof LEARNING_LEVELS)[number];
