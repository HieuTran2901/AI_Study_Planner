export const DIFFICULTIES = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];
